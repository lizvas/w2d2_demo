var express = require('express');

var app = express ();
var port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'))


//ENDPOINT
app.get('/', function (req, res) {
  res.redirect('quotes');
})

app.get('/quotes', function(req, res) {
//list the quotes on the page

res.render('quotes', {quotes: movieQuotesDb, comments: quoteComments);
//message is the name of key on browser page
//quotes is the data we want
});

app.listen(port, function() {
  console.log("Server listening on port " + port);
});