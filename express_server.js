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
    //change to 'hash' later (ln 141)
    password: "1"
  },
  "Kakao": {
    id: "Kakao",
    email: "2@2.com",
    password: "2"
  }
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
    res.cookie("username", username);
    res.render("urls_register", templateVars);
  });
  
  app.post("/register", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log("email=", email, "password", password);
    
    if (!email || !password) {
      return res.status(400).send("400 Bad Request. Enter a valid email and password");
    } else if (email) {
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
    res.cookie("username", username);
    res.redirect("/login");
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
    res.cookie("username", username);
  }
  );
  
  app.post("/login", (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    // const { email, password } = req.body; simplified version of lines 177 & 178
    // console.log("email=", email, "password", password);
    if (email === "" || password === "") {
      res.send("Error 400 Bad Request. Please enter your username and password");
      return res.redirect("/login");
    } if (email && !password) {
      return res.status(403).send(`Please input correct password.`);
    }
      res.cookie("username", username);
      return res.redirect("/urls");
    
  });

  const emailChecker = (email, users) => {
    for (let user in users) {
      if (email === users[user].email) {
        return users[user];
      }
    } return false;
  };

  // if (email && password) {
    //   const user = emailChecker(email, users);
    //   if (password === user.password) {
      //     res.cookie("userId", user.id);
      //   } else {
        //     res.send("Incorrect password!");
        //   }
        // }
        
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