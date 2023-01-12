var mysql      = require('mysql2');
var connection = mysql.createConnection({
    host     : 'containers-us-west-66.railway.app',
    user     : 'root',
    password : 'Unj73x4rjbnw6dKTudDq',
    database : 'railway',
    port: 5866
  });

  connection.connect(function(err) {
    if (err) throw err;
  });

  module.exports = connection;