const express = require("express");
const app = express();
const PORT = 8080; // default port 8080

app.set("view engine", "ejs");

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

const bodyParser = require("body-parser");
app.use(express.urlencoded({extended: true}));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

 app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

 app.get("/urls", (req, res) => {
  const templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});

app.post("/urls", (req, res) => {
  console.log(req.body); // Log the POST request body to the console
  res.send("Ok"); // Respond with 'Ok' (we will replace this)
});

app.get("/u/:shortURL", (req, res) => {
  // make this more dynamic instead of hard coding
  const templateVars = { shortURL: req.params.shortURL, longURL: "http://localhost:8080/urls/b2xVn2" };
  res.render("urls_show", templateVars);
});

app.get("/u/:shortURL", (req, res) => {
  // const longURL = ...
  res.redirect(longURL);
});

function generateRandomString() {
  const result = "";
  const inputChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charLength = inputChars.length;
  for (i = 0; i < length; i = i + 1) {
    result += inputChars.charAt(Math.floor(Math.random() * charLength));
  }
  return 
};

const users = { 
  "Dimitriy": {
    id: "dm3", 
    email: "user@example.com", 
    password: "abc123"
  },
 "Kakao": {
    id: "kaka0User1", 
    email: "user2@example.com", 
    password: "zyx262524"
  }
}

app.get("/register", (req, res) => {
  const templateVars = {email: ""};
  res.render("urls_register", templateVars);
  }
);

app.post("/register", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log("email=", email, "password", password)
});

app.get("/login", (req, res) => {
  const templateVars = {email: ""};
  res.render("urls_login", templateVars);
  }
);

app.post("/register", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log("email=", email, "password", password)
});

//POST Login
// 1. We are going to receive the email and password
// 2. We will validate and check the email and password in the UsersDatabase that they exist and are ok.
// 3. If they are good, we write a cookie and then redirect to the /urls
// 4. Else, then we res.send("Sorry the username or password does not match")