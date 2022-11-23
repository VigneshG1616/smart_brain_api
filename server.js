const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const userData = {
  users: [
    {
      id: "123",
      name: "Andy",
      email: "andy@myapp.com",
      password: "andy@123",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "124",
      name: "Becky",
      email: "becky@myapp.com",
      password: "becky@123",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "125",
      name: "Carl",
      email: "carl@myapp.com",
      password: "carl@123",
      entries: 0,
      joined: new Date(),
    },
  ],
};

app.get("/", (req, res) => {
  res.json(userData.users);
});

app.post("/signin", (req, res) => {
  if (
    req.body.email === userData.users[2].email &&
    req.body.password === userData.users[2].password
  ) {
    res.json(userData);
  }
  console.log(req.body.email);
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  const i = userData.users.length - 1;
  userData.users.push({
    id: String(parseInt(userData.users[i].id) + 1),
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  });

  res.json("Registered");
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  userData.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(404).json("Profile not found");
  }
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  let found = false;
  userData.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(404).json("Profile not found, Failed to put entries");
  }
});

app.listen(3131, () => {
  console.log("app is running on port 3131");
});
