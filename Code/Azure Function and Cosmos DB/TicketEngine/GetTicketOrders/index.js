var DocumentDBClient = require('documentdb').DocumentClient;
var TicketsDao = require('../Common/ticketDao');
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
    var ticketsDao = new TicketsDao(docDbClient, process.env.DatabaseId, process.env.CollectionId);
    ticketsDao.init(function (error, response) {
        if (error) {
            ApplyContext(context, error, 500);
        }
        ticketsDao.find("SELECT * from root r", function (error, response) {
            if (error) {
                ApplyContext(context, error, 500);
            }
            else {
                ApplyContext(context, response, 200);
            }
        });
    });
};