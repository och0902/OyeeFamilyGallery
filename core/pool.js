'use strict';

const util = require('util');
const mysql = require('mysql');
/**
 * Connection to the database.
 *  */
const pool = mysql.createPool({
   connectionLimit: 50,
   host: process.env.POOL_HOST,
   user: process.env.POOL_USER, // use your mysql username.
   password: process.env.POOL_PSWORD, // user your mysql password.
   database: process.env.POOL_DATABASE
});

pool.getConnection((err, connection) => {
   if(err) 
      console.error("Something went wrong connecting to the database ...");
   
   if(connection) {
      console.log("Mysql database is connected sucessfully ..");	
      connection.release();
   }
   return;
});

pool.query = util.promisify(pool.query);

module.exports = pool;
