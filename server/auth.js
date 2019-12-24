var config2 = require('./config'),
    Q = require('q'),
    databaseURL = config2.databaseURL;


var pg = require('pg');
pg.defaults.ssl = true;
console.log('databaseURL: ' + databaseURL);
var pool = new pg.Client(databaseURL);
var connection = null;

function validateToken (req, res, next) {
    return next();
};

function query (sql, values, singleItem, dontLog) {
    if (!dontLog) {
        typeof values !== 'undefined' ? console.log(sql, values) : console.log(sql);
    }
    var deferred = Q.defer();
    createConnection().then(function(conn) {
        try {
            console.log('start');
            conn.query(sql, values, function (err, result) {
                if (err) {
                    deferred.reject(err);
                } else {
                    console.log(result.rows)
                    deferred.resolve(singleItem ? result.rows[0] : result.rows);
                }
            });
        } catch (e) {
            console.log('Error');
            console.log(e);
            deferred.reject(e);
        }
    }).catch();
    return deferred.promise;
};


function createConnection(){
    var deferred = Q.defer();
    if (connection == null){
        console.log('Start connect to Heroku');
        pool.connect(function(err, client, done) {
            if (err) {
                //console.log(err);
                process.exit(1);
            }
            connection = client;
            console.log('Heroku connected');
            deferred.resolve(connection);
        });
    } else {
        deferred.resolve(connection);
    }
    return deferred.promise;
};

exports.close = function() {
    pool.end();
};

exports.query = query;
exports.validateToken = validateToken;
exports.createConnection = createConnection;