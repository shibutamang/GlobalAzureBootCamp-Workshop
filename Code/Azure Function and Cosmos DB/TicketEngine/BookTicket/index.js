var DocumentDBClient = require('documentdb').DocumentClient;
var TicketsDao = require('../Common/ticketDao');
var request = require('request');
var docDbClient = new DocumentDBClient(process.env.CosmosDBHost, {
    masterKey: process.env.CosmosDBAuthKey
});
const crypto = require("crypto");

function ApplyContext(context, body, status) {
    context.res = {
        status: status,
        body: body
    };
    context.log(body);
    context.done();
}

function SendEventViaHttp(orderBody, context) {
    request.post({
        url: process.env.MovieEngineUrl + '/api/SeatBooked',
        json: orderBody
    },
        function (err, httpResponse, body) {
            if (err) {

                ApplyContext(context, error, 500);

            }
            else {

                request.post({
                    url: process.env.BillingEngine + '/api/SendBill',
                    json: orderBody
                },
                    function (err, httpResponse, body) {
                        if (err) {
                            ApplyContext(context, error, 500);
                        }
                        else {
                            ApplyContext(context, body, httpResponse.statusCode);
                        }
                    });

            }
        });

}

function SendViaEventGrid(body, context) {
    const uniqueId = crypto.randomBytes(16).toString("hex");
    request.post({
        url: process.env.EventGridTopicEndpoint,
        json: [
            {
                "id": uniqueId,
                "eventType": "ticketBooked",
                "subject": "bookMyShow/movies/ticketBooked",
                "eventTime": new Date(),
                "data": body,
                "dataVersion": "1.0"
            }
        ],
        headers: {
            'aeg-sas-key': process.env.EventGridTopicAuthKey
        }

    },
        function (err, httpResponse, body) {
            if (err) {
                ApplyContext(context, err, 500);
            }
            else {
                ApplyContext(context, body, httpResponse.statusCode);
            }
        });
}

module.exports = function (context, req) {
    context.log(req.method);
    if (req.method != "POST") {
        ApplyContext(context, req.method + ' method is not valid', 400);
        return;
    }
    if (req.body == undefined || req.body == null) {
        ApplyContext(context, "Body can't be null", 400);
        return;
    }

    var ticketsDao = new TicketsDao(docDbClient, process.env.DatabaseId, process.env.CollectionId);
    ticketsDao.init(function (error, response) {
        if (error) {
            ApplyContext(context, error, 500);
        }
        ticketsDao.addItem(req.body, function (error, response) {
            if (error) {
                ApplyContext(context, error, 500);
            }
            else {
                if (process.env.EventTriggerType && process.env.EventTriggerType == "eg") {
                    SendViaEventGrid(req.body, context);
                }
                else {
                    SendEventViaHttp(req.body, context);
                }
            }
        });
    });
};