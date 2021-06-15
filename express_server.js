const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = 8080; // default port 8080

app.set("view engine", "ejs");

app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

const users = {
  "Dimitriy": {
    id: "dm3",
    email: "1@1.com",
    password: "1"
  },
  "Kakao": {
    id: "kaka0User1",
    email: "2@2.com",
    password: "2"
  }
};

const emailChecker = (email, users) => {
  for (let user in users) {
    if (email === users[user].email) {
      return users[user];
    }
  } return false;
};

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/urls/new", (req, res) => {
  const templateVars = {
    urls: urlDatabase,
    username: req.cookies.username
  };
  res.render("urls_new", templateVars);
});

app.get("/urls", (req, res) => {
  const templateVars = {
    urls: urlDatabase,
    username: req.cookies.username
  };
  res.render("urls_index", templateVars);
});

app.post("/urls", (req, res) => {
  console.log(req.body); // Log the POST request body to the console
  res.send("Ok"); // Respond with 'Ok' (we will replace this)
});

// app.get("/u/:shortURL", (req, res) => {
app.get("/urls/:shortURL", (req, res) => {
  // make this more dynamic instead of hard coding
  const templateVars = {
    shortURL: req.params.shortURL,
    longURL: urlDatabase[req.params.shortURL].longURL,
    username: req.cookies.username
  };
  res.render("urls_show", templateVars);
});

// app.get("/u/:shortURL", (req, res) => {
app.get("/urls/:shortURL", (req, res) => {
  // const longURL = ...
  res.redirect(longURL);
});

function generateRandomString() {
  let result = "";
  const inputChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charLength = inputChars.length;
  const length = 8;
  for (i = 0; i < length; i = i + 1) {
    result += inputChars.charAt(Math.floor(Math.random() * charLength));
  }
  return result;
}

app.get("/register", (req, res) => {
  // if (userExists) {
  //   res.redirect("/urls");
  // } else {
  const templateVars = {
    email: "",
    username: req.cookies.username
  };
  res.render("urls_register", templateVars);
  // }
});

app.post("/register", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const id = generateRandomString(8);
  console.log("email=", email, "password", password);
  if (email === "" || password === "") {
    res.send("400 Bad Request");
  } else if (users.email || users.password) {
    res.send("The following account already exists");
  // }
  // if (!email || !password) {
  //   res.send ("Please enter a valid email and password");
  } else {
    users[id] = {
      id,
      email,
      password
    };
    
    res.cookie("userId", id);

    res.redirect("/urls");
    //assign user obj info it needs (userid for key)
    // res.send("Incorrect password!");
  }
}
);

app.get("/login", (req, res) => {
  const templateVars = {
    email: "",
    username: req.cookies.username
  };
  res.render("urls_login", templateVars);
}
);

app.post("/login", (req, res) => {
  const username = req.body.username;
  res.cookie("username", username);
  console.log(username);
  const email = req.body.email;
  const password = req.body.password;
  console.log("email=", email, "password", password);
  if (email === "" || password === "") {
    res.send("Error 400 Bad Request");
  }
  // if (!email || !password) {
  //   res.send ("Please enter your username and password");
  // }
  // if (email && password) {
  //   const user = emailChecker(email, users);
  //   if (password === user.password) {
  //     res.cookie("userId", user.id);
  //   } else {
  //     res.send("Incorrect password!");
  //   }
  // }

  res.redirect("/urls");
});

//POST Login
// 1. We are going to receive the email and password
// 2. We will validate and check the email and password in the UsersDatabase that they exist and are ok.
// 3. If they are good, we write a cookie and then redirect to the /urls
// 4. Else, then we res.send("Sorry the username or password does not match")

// app.get("/logout", (req, res) => {
//   const templateVars = {
//     email: "",
//     username: req.cookies.username
//   };
//   res.render("urls_login", templateVars);
//   }
// );

app.post("/logout", (req, res) => {
  res.clearCookie("username");
  res.redirect("/urls");
});