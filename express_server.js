const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const app = express();
const PORT = 8080; // default port 8080

app.set("view engine", "ejs");

app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

const urlDatabase = {
  "b2xVn2": {longURL: "http://www.lighthouselabs.ca", user_id: "dm3"},
  "9sm5xK": {longURL: "http://www.google.com", user_id: "dm3"},
  "b6UTxQ": {longURL: "https://www.tsn.ca", user_id: "dm3"},
  "i3BoGr": {longURL: "https://www.google.ca", user_id: "dm3"}
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
    user_id: "dm3",
    email: "1@1.com",
    //change to 'hash' later (ln 141)
    password: "1"
  },
  "Kakao": {
    user_id: "Kakao",
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
    user_id: req.cookies.user_id
  };
  if (templateVars.user_id) {
    res.render("urls_new", templateVars);
  } else {
    res.redirect("/login");
  }
});
  
  app.get("/urls", (req, res) => {
    const urlsForUser = (user_id, urlDatabase) => {

    };
    const regUserUrls = Object.keys(urlsForUser(user_id, urlDatabase));
      if (!regUserUrls.includes(req.params.shortURL)) {
         return res.status(401).send("Error 401. You are unauthorised to make changes here. Log in in order to do so.");
       }
    const templateVars = {
      user_id: req.cookies.user_id,
      urls: urlsForUser(urlDatabase, user_id),
      user: users[req.cookies.user_id]
    };
    res.render("urls_index", templateVars);
  });
  
  app.post("/urls", (req, res) => {
    console.log(req.body); // Log the POST request body to the console
    const shortURL = generateRandomString();
    urlDatabase[shortURL] = {
      longURL: req.body.longURL,
      user_id: req.cookies.user_id,
    }
    res.redirect(`urls/${shortURL}`)
  });
  
  app.post("/urls/:shortURL/delete", (req, res) => {
    const shortURL = req.params.shortURL;
    delete urlDatabase[shortURL];
    console.log(shortURL);
    res.redirect("/urls")
  });
  
  app.get("/urls/:shortURL", (req, res) => {
    const longURL = urlDatabase[req.params.shortURL].longURL;
    const templateVars = {
      shortURL: req.params.shortURL,
      longURL: longURL,
      user_id: req.cookies.user_id
    };
    console.log("104", longURL);
    res.render("urls_show", templateVars);
  });
  
  app.get("/u/:shortURL", (req, res) => {
    const longURL = urlDatabase[req.params.shortURL].longURL;
    res.redirect(longURL);
  });
  
  app.get("/register", (req, res) => {
    const templateVars = {
      user_id: req.cookies["user_id"],
    };
    res.render("urls_register", templateVars);
  });
  
  app.post("/register", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user_id = generateRandomString(8);
    console.log("email=", email, "password", password);
    
    if (!email || !password) {
      return res.status(400).send("400 Bad Request. Enter a valid email and password");
    } else if (emailChecker(email, users)) {
      return res.status(400).send(`400 Bad Request. ${email} is already registered. Please use it to log in.`);
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          const newUserId = generateRandomString(8);
          const newUser = {
            id: newUserId,
            email: email,
            password: hash
          }
          users[newUserId] = newUser;
          console.log(users);
        })
      })
    };
    res.cookie("user_id", user_id);
    console.log("1111", res.cookie);
    res.redirect("/login");
  }
  );
  
  //assign user obj info it needs (userid for key)
  // res.send("Incorrect password!");
  
  app.get("/login", (req, res) => {
    const templateVars = {
      email: "",
      user_id: req.cookies.user_id
    };
    console.log("159", req.cookies);
    res.render("urls_login", templateVars);
    req.cookies("user_id", user_id);
  }
  
  );
  
  app.post("/login", (req, res) => {
    const user_id = req.cookies;
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
      console.log("line 170", email, password);
      res.status(403).send("Error 403 Bad Request. Please enter your user_id and password");
    } else if (!emailChecker(email, users)) {
      res.status(403).send("Error 403 Bad Request. Email not registered.");
    } else {
      const user = emailChecker (email, users)
        if (password === user.password) {
          console.log("HERE");
          res.cookie("user_id", user.user_id);
          console.log("176", res.cookie);
          res.redirect("/urls");
        } else {
          res.status(403).send("Error 403 Bad Request. Incorrect Password!");
        }
    }
   
    });
            
  app.post("/logout", (req, res) => {
    res.clearCookie("user_id");
    res.redirect("/urls");
});