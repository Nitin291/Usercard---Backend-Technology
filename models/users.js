const mongoose = require ('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/testapp1")

const userschema = mongoose.Schema({
  image: String,
  Name: String,
  email: String
})

const Users = mongoose.model('User', userschema);
module.exports = Users;
