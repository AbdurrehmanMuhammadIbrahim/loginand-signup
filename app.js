const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const path = require("path");
var cors = require('cors')
const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://saim:123@user.dkpid.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

app.use(cors(["localhost:5000", "localhost:3000"]))
app.use(express.json())

app.use("/", express.static(path.join(__dirname, "login/build")));

const User = mongoose.model('User', 

{ 

  firstName: String,
  lastName: String,
  email:String,
  password:String

 });


 app.post("/api/v1/login", (req, res) => {






  let newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  })

  newUser.save(() => {
    console.log("Data Saved in MondoDB")
    res.send('Data Saved in MondoDB')


  })
});











app.get("/api/v1/profile", (req, res) => {
  res.send({
    name: "abdurrehman",
    rollno: "12345",
    address: "ffbeegjebgie vlnv genviwe",
  });
});


app.put("/api/v1/profile", (req, res) => {
  res.send("Hello HERE IS YOUR PROFILE!");
});
app.post("/api/v1/profile", (req, res) => {
  res.send("Hello HERE IS YOUR PROFILE!");
});
app.delete("/api/v1/profile", (req, res) => {
  res.send("Hello! PROFILE IS DELETED");
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
