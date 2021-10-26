const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const path = require("path");
var cors = require('cors')
const mongoose = require('mongoose');

// mongoose.connect('mongodb+srv://saim:123@user.dkpid.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
mongoose.connect('mongodb+srv://abdurrehman:Disccompact890@cluster0.7d9p9.mongodb.net/users?retryWrites=true&w=majority');

app.use(cors(["localhost:5000", "localhost:3000"]))
app.use(express.json())

app.use("/", express.static(path.join(__dirname, "forms/build")));

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






app.get("/**", (req, res, next) => {
  // res.sendFile(path.join(__dirname, "./web/build/index.html"))
  res.redirect("/")
})





app.get("/api/v1/login", (req, res) => {
  res.send(User)
 
  });
  app.post('/api/v1/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!req.body.email ||
        !req.body.password
    ) {
        console.log("required field missing");
        res.status(403).send("required field missing");
        return;
    }

    console.log(req.body)


    User.findOne({ email: email })
        .then(userData => {
            console.log(userData)
            if (userData.password === password) {
                res.json(
                    userData
                )
            }
            else {
                res.send("Invalid email")
                res.status(401).json('Password Incorrect')
            }
        })
        .catch(err => 
            {
            res.send("Invalid email")
            res.status(400).json('Error: ' + err)
        });
})


app.put("/api/v1/profile", (req, res) => {
  res.send("Hello HERE IS YOUR PROFILE!");
});

app.delete("/api/v1/profile", (req, res) => {
  res.send("Hello! PROFILE IS DELETED");
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
