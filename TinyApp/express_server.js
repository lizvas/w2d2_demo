var express = require("express");
var app = express();
var PORT = 8080; // default port 8080
var cookieParser = require("cookie-parser");
const uuidv4 = require("uuid/v4");

app.set("view engine", "ejs");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

function generateRandomString() {
  return uuidv4().substr(0, 6);
}

var urlDatabase = {
  b2xVn2: "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com",
  "8vd8lw": "http://www.facebook.com"
};

// var user = {};

app.post("/urls", (req, res) => {
  let randomId = generateRandomString();
  res.redirect("/urls/" + randomId);
});

app.get("/", (req, res) => {
  console.log(generateRandomString());
  let templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/urls", (req, res) => {
  let templateVars = { urls: urlDatabase, username: req.cookies["cookieName"] };
  res.render("urls_index", templateVars);
});

app.post("/login", (req, res) => {
  let username = req.body.username;
  res.cookie("cookieName", username);
  res.redirect("/urls");
});

app.get("/urls/new", (req, res) => {
  let usernameFromCookie = req.cookies["cookieName"];
  let templateVars = { username: usernameFromCookie };

  res.render("urls_new", templateVars);
});

app.get("/urls/:id", (req, res) => {
  let templateVars = {
    shortURL: req.params.id,
    longURL: urlDatabase[req.params.id]
  };
  res.render("urls_show", templateVars);
});

app.post("/urls/:id/delete", (req, res) => {
  delete urlDatabase[req.params.id];
  res.redirect("/urls");
});

app.post("/urls/:id/update", (req, res) => {
  urlDatabase[req.params.id] = req.body.longURL;
  res.redirect("/urls");
});

app.get("/u/:shortURL", (req, res) => {
  let longURL = req.params.shortURL;
  res.redirect(longURL);
});
app.get("/logout", (req, res) => {
  res.clearCookie("cookieName");
  res.send("Cookie deleted");
  res.redirect("/urls");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
