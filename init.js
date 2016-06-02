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
    createDatabase();
    // dropDatabase();
  });
}

// Create the database
var createDatabase = function() {
  r.dbCreate(config.db).run(connection, function(error, result) {
    if (error) console.log(error);
    if ((result != null) && (result.dbs_created === 1)) {
      console.log('Database `comments` created');
    }
    else {
      console.log('Error: Database `comments` not created');
    }
    createTableComment();
  })
}

// Drop the database
var dropDatabase = function() {
  r.dbDrop(config.db).run(connection, function(error, result) {
    if (error) console.log(error);
    if ((result != null) && (result.dbs_created === 1)) {
      console.log('Database `comments` droped');
    }
  })
}

// Create the table Comment
var createTableComment = function() {
  r.db(config.db).tableCreate('Comment').run(connection, function(error, result) {
    if (error) console.log(error);

    if ((result != null) && (result.tables_created === 1)) {
      console.log('Table `Comment` created');
    }
    else {
      console.log('Error: Table `Comment` not created');
    }
    insertPosts();
  });
}

// Insert posts
var insertPosts = function() {
  r.db(config.db).table('Comment').insert([{"author":"Denis","text":"Sed arcu","id":"ee471f2e-619a-45c0-a3fa-91b246f87bee","createdAt":r.now().sub(Math.random()*365*24*60*60)},{"author":"Maxim","text":"Fuck off","id":"ee471f2e-619a-45c0-a3fa","createdAt":r.now().sub(Math.random()*365*24*60*60)}]).run(connection, function(error, result) {
    if (error) console.log(error);

    if ((result != null) && (result.errors === 0)) {
      console.log('Added posts data');
    }
    else {
      console.log('Error: Failed to add posts data');
    }

    console.log(result);
    connection.close();
    process.exit();
  });
}

// Roll out everything
connect();
