const express = require("express");
const app = express();
const PORT = 8080; // default port 8080

app.set("view engine", "ejs");

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/hello", (req, res) => {
  const templateVars = { greeting: 'Hello World!' };
  res.send("<html><body>Hello <b>World</b></body></html>\n");
  res.render("hello_world", templateVars);
// <!-- This would display the string "Hello World!" -->
// <h1><%= greeting %></h1>
// <!-- This line will only show if greeting is truthy -->
  // <h1><%= greeting %></h1>
  // <% }%>
// By using the <%= %> syntax, we tell EJS that we want the result of this code to show up on our page. If we would like to run some code without it displaying on the page, then we can use the slightly different syntax of <% %>
});

app.get("/set", (req, res) => {
  const a = 1;
  res.send(`a = ${a}`);
 });
 
 app.get("/fetch", (req, res) => {
  res.send(`a = ${a}`);
 });

 app.get("/urls", (req, res) => {
  const templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});

app.get("/urls/:shortURL", (req, res) => {
  const templateVars = { shortURL: req.params.shortURL, longURL: "http://localhost:8080/urls/b2xVn2" };
  res.render("urls_show", templateVars);
});