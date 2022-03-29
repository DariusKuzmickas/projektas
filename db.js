var sqlite3 = require('sqlite3');
var mkdirp = require('mkdirp');
var crypto = require('crypto');

mkdirp.sync('var/db');

var db = new sqlite3.Database('var/db/finance.db');

db.serialize(function() {
  // create the database schema for the users
  db.run("CREATE TABLE IF NOT EXISTS users ( \
    username TEXT UNIQUE, \
    hashed_password BLOB, \
    salt BLOB \
  )");
  
  // create an initial user (username: darius, password: labasrytas123)
  var salt = crypto.randomBytes(16);
  db.run('INSERT OR IGNORE INTO users (username, hashed_password, salt) VALUES (?, ?, ?)', [
    'darius',
    crypto.pbkdf2Sync('labasrytas123', salt, 310000, 32, 'sha256'),
    salt
  ]);
});

module.exports = db;
