const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const bcryptjs = require("bcryptjs");
const app = express();
const PORT = 8080; // default port 8080

app.set("view engine", "ejs");

app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

const urlDatabase = {
  "b2xVn2": { longURL: "http://www.lighthouselabs.ca", users: "dm3" },
  "9sm5xK": { longURL: "http://www.google.com", users: "dm3" },
  
};

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

const users = {
  "dm3": {
    id: "dm3",
    email: "1@1.com",
    password: "1"
  },
  "Kakao": {
    id: "Kakao",
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

// app.get("/login", (req, res) => {
//   if (!loggedIn (req.cookies.username))
// });

app.get("/urls", (req, res) => {
  const templateVars = {
    urls: urlDatabase,
    username: req.cookies.username
  };
  // console.log(templateVars);
  res.render("urls_index", templateVars);
});

app.post("/urls", (req, res) => {
  console.log(req.body); // Log the POST request body to the console
  const shortURL = generateRandomString();
  urlDatabase[shortURL] = {
    longURL: req.body.longURL,
    username: req.cookies.username
  }
  res.redirect(`urls/${shortURL}`)
  // res.send("Ok"); // Respond with 'Ok' (we will replace this)
});

app.post("/urls/:shortURL/delete", (req, res) => {
  const shortURL = req.params.shortURL;
  delete urlDatabase[shortURL];
  console.log(shortURL);
  res.redirect("/urls")
});

app.get("/urls/:shortURL", (req, res) => {
  // make this more dynamic instead of hard coding
  const templateVars = {
    shortURL: req.params.shortURL,
    longURL: urlDatabase[req.params.shortURL],
    username: req.cookies.username
  };
  res.render("urls_show", templateVars);
});

app.get("/u/:shortURL", (req, res) => {
  const longURL = urlDatabase[req.params.shortURL].longURL;
  res.redirect(longURL);
});

app.get("/register", (req, res) => {
  const templateVars = {
    email: "",
    username: req.cookies.username
  };
  res.render("urls_register", templateVars);
  // }
});

app.post("/register", (req, res) => {
  const newEmail = req.body.email;
  const newPassword = req.body.password;
  console.log("email=", email, "password", password);
  
  // if submission fields are blank
  if (!email || !password) {
    return res.status(400).send("400 Bad Request. Enter a valid email and password");
  } else {
  
  // pseudo if user email/pwd already exists

  const newUserId = generateRandomString(8);
  users[newUserId] = {
    id: newUserId,
    email: newEmail,
    password: bcrypt.hashSync(newPassword, 8),
  }

  const bcrypt = require('bcrypt');
  const saltRounds = 8;
  const plainPwd = "";
  const plainPwd2 = "";
  
  // users[id] = {
  //   id,
  //   email,
  //   password
  // }
};

  //   for ( user in users) {
    //     console.log(`${user}: ${users[user]}`);
//     if (userExists(users, "email", email)) {
//   return res.status(400).send("400 Bad Request. Account already exists!");
// }
// }

console.log(users.email);
    
  // const userExists = ;
  // if (userExists(email, users)) {
  //   res.status(400);
  //   res.send("400 Bad Request. The following account already exists");
  // }
  
  // if (!email && email !== "") {

    res.cookie("userId", id);
    
  // }
  res.redirect("/urls");
}
);

//assign user obj info it needs (userid for key)
// res.send("Incorrect password!");

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
  // console.log(username);
  const email = req.body.email;
  const password = req.body.password;
  // const { email, password } = req.body; simplified version of lines 177 & 178
  // console.log("email=", email, "password", password);
  if (email === "" || password === "") {
    res.send("Error 400 Bad Request");
  }
  
  res.cookie("username", username);
  res.redirect("/urls");
});

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