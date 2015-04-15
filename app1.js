var express = require('express');
 
var app = express();
 
app.get('/', function (req, res) {
  res.send('hello blue');
});
var count = 0;
while(count <10000)
{
	count++;
}
 
app.listen(process.env.PORT || 5000);
 
module.exports = app;