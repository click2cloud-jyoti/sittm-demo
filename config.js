const {
    Client,
    Pool
} = require('pg');
//const dotenv = require('dotenv');
//dotenv.config();

// read variables from environment
// var user = process.env.DB_User || "postgres";
// var host = process.env.DB_Host || "localhost";
// var database = process.env.DB_Name || "sittm-dev";
// var password = process.env.DB_Password || "smartvm";
// var db_port = process.env.DB_Port || "5432";
var user = process.env.DB_User || "postgres";
var host = process.env.DB_Host || "192.168.1.31";
var database = process.env.DB_Name || "sittm-dev";
var password = process.env.DB_Password || "Newuser@3210";
var db_port = process.env.DB_Port || "5432";

// creating db connection
const pool = new Pool({
    user: user,
    host: host,
    database: database,
    password: password,
    port: db_port
});



// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'postgres',
//     password: 'ROOT#123',
//     port: 5432
// });
// export the variables
// module.exports = pool;

module.exports = {
    postgresQueryExecute: (queryStr, callback, callbackerr) => {
        pool.connect((err, client, done) => {
            if (err) {
                console.log(err);
                callbackerr(err)
            } else {
                console.log(queryStr);
                client.query(queryStr, (err, response) => {
                    done();
                    if (err) {
                        console.log(err);
                        callbackerr(err)
                    } else {
                        callback(response || [])
                    }
                })
            }
        })
    },
    pool : pool
}