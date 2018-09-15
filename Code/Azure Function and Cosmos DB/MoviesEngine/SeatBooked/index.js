var DocumentDBClient = require('documentdb').DocumentClient;
var MoviesDao = require('../Common/movieDao');
var docDbClient = new DocumentDBClient(process.env.CosmosDBHost, {
    masterKey: process.env.CosmosDBAuthKey
});

function ApplyContext(context, body, status) {
    context.res = {
        status: status,
        body: body
    };
    context.log(body);
    context.done();
}


module.exports = function (context, req) {
    context.log(req.method);

    var isEventGridEvent = false;
    var header = req.headers["aeg-event-type"];

    if(header){
        isEventGridEvent = true;
    }
    if (header && header === 'SubscriptionValidation') {
        var event = req.body[0]
        var isValidationEvent = event && event.data &&
            event.data.validationCode &&
            event.eventType && event.eventType == 'Microsoft.EventGrid.SubscriptionValidationEvent'
        if (isValidationEvent) {
            var validationResponse = {
                "validationResponse": event.data.validationCode
            };
            ApplyContext(context, validationResponse, 200);
            return;
        }
    }
    
    var requestContent = [];

    if(isEventGridEvent){
        requestContent = req.body[0].data;
    }
    else{
        requestContent = req.body;
    }

    if (req.method != "POST") {
        ApplyContext(context, req.method + ' method is not valid', 400);
        return;
    }
    if (req.body == undefined || req.body == null) {
        ApplyContext(context, "Body can't be null", 400);
        return;
    }
    var moviesDao = new MoviesDao(docDbClient, process.env.DatabaseId, process.env.CollectionId);
    moviesDao.init(function (error, response) {
        if (error) {
            ApplyContext(context, error, 500);
        }
        moviesDao.updateTicketOrder(requestContent.movieId, requestContent.noOfTicketsToBook, function (error, response) {
            if (error) {
                ApplyContext(context, error, 500);
            }
            else if (!response) {
                ApplyContext(context, [], 404);
            }
            else {
                ApplyContext(context, response, 200);
            }
        });
    });
};