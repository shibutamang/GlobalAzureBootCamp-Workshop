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
    if(req.method != "POST"){
        ApplyContext(context, req.method + ' method is not valid', 400);
        return;
    }
    if(req.body == undefined || req.body == null){
        ApplyContext(context, "Body can't be null", 400);
        return;
    }
    var moviesDao = new MoviesDao(docDbClient, process.env.DatabaseId, process.env.CollectionId);
    moviesDao.init(function (error, response) {
        if (error) {
            ApplyContext(context, error, 500);
        }
        moviesDao.addItem(req.body, function (error, response) {
            if (error) {
                ApplyContext(context, error, 500);
            }
            else {
                ApplyContext(context, {"message": "Successfully added movie to database !"}, 200);
            }
        });
    });
};