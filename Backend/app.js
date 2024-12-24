const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
// const jwt =require('jsonwebtoken');
// const bcrypt = require('bcrypt');

const userOTPverification = require("./models/userOTPverification");
require('dotenv').config();


app.use(cors());
app.use(express.json());

//  Configure DB
mongoose.connect(process.env.mongoURL).then(() => {
    console.log(`Database Connected: ✅ Successfully`);
}).catch((e) => {
    console.log(e);
});


const User = require('./models/appUserDetails'); // Path to your schema file

async function loginWithPhone(phoneNumber) {
  let user = await User.findOne({ phoneNumber });
  if (!user) {
    // New user, create a temporary user object
    user = new User({ phoneNumber });
  }
  return user;
}



app.listen(process.env.PORT,() => {
    console.log('App is Running');
});