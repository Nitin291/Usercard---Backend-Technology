const express = require('express');
const app = express();
const path = require('path');
const usermodel = require('./models/users');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
  res.render('index');
});

app.get("/read", async (req, res) => {
  let allusers = await usermodel.find();  
    res.render("read", { Users: allusers });
});

app.post("/create", async (req, res) => {
  let { Name, email, image } = req.body;
  let createduser = await usermodel.create({
    Name,
    email,
    image
  });
  res.redirect("/read");
});

app.get('/delete/:id', async (req, res) => {
  await usermodel.findOneAndDelete({ _id: req.params.id });
  res.redirect("/read");
});

app.get('/edit/:userid', async (req, res) => {
  let user = await usermodel.findOne({ _id: req.params.userid });
  res.render("edit", { user });
});

app.post('/update/:userid', async (req, res) => {
  let { image, Name, email } = req.body;
  let user = await usermodel.findOneAndUpdate(
    { _id: req.params.userid },
    { image, Name, email },
    { new: true }
  );
  res.redirect("/read");
});

app.listen(3000);
