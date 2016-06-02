var r = require('rethinkdb');
var config = require('./config.js');
var util = require('util');

var connection;

// Connect
var connect = function() {
  r.connect({
    host: config.host,
    port: config.port,
    db: config.db
  }, function(error, conn) {
    if (error) throw error;
    connection = conn;
    dropDatabase();
  });
}

// Drop the database
var dropDatabase = function() {
  r.dbDrop(config.db).run(connection, function(error, result) {
    if (error) console.log(error);
    if ((result != null) && (result.dbs_created === 1)) {
      console.log('Database `comments` droped');
    }
    connection.close();
    process.exit();
  })
}

// Roll out everything
connect();
