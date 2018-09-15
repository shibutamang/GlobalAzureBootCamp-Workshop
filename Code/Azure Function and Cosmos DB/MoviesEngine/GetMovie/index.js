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

    var moviesDao = new MoviesDao(docDbClient, process.env.DatabaseId, process.env.CollectionId);
    moviesDao.init(function (error, response) {
        if (error) {
            ApplyContext(context, error, 500);
        }
        moviesDao.getItem(req.query.movieId, function (error, response) {
            if (error) {
                ApplyContext(context, error, 500);
            }
            else if(!response){
                ApplyContext(context, [], 404);
            }
            else {
                ApplyContext(context, response, 200);
            }
        });
    });
};