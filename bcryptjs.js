const bcrypt = require("bcryptjs");

const saltRounds = 10;
const plainPwd = "durian";
// const plainPwd2 = "";

bcrypt.genSalt(saltRounds, (err, salt) => {
  console.log(salt);
  bcrypt.hash(plainPwd, salt, function(err, hash) {
      console.log(hash);
  });
});

const hashedPwd = "$2a$10$3UL4jD6cb1jCGt2sNHAFKOV8yq6qC5ao7ckjW1SZjy2bqWCvwjM5W";

bcrypt.compare("hello world", hashedPwd, (err, result) => {
  console.log("result", result);
}) //output is false (ln 16, 17), returns hashedPwd asynchronously (ln 7-12)

bcrypt.compare(plainPwd, hashedPwd, (err, result) => {
  console.log("result", result);
}) //output is true (ln 20, 21), returns hashedPwd asynchronously (ln 7-12)