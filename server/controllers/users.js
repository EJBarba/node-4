const argon2 = require("argon2");

function register(req, res) {
  const db = req.app.get("db");
  const { username, email, password } = req.body;

  argon2
    .hash(password)
    .then(hash => {
      return db.users.insert(
        {
          username,
          email,
          password: hash
        },
        {
          fields: ["id", "username", "email"] // never want to return the password hash
        }
      );
    })
    .then(user => res.status(201).json(user))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function debug(req, res) {
  const db = req.app.get("db");
  res.status(200).send("neil degrasse yes");
}

module.exports = {
  register,
  debug
};
