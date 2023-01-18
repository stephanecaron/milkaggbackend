var mysql      = require('mysql2');
var connection = mysql.createConnection({
    host     : 'containers-us-west-66.railway.app',
    user     : 'root',
    password : 'UumllcAssVAJSt9euVmP',
    database : 'railway',
    port: 5866
  });

  connection.connect(function(err) {
    if (err) throw err;
  });

  module.exports = connection;