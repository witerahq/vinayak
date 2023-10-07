// models/User.js
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  location: { type: String, required: true },
  specialty:  { type: String },
  latitude:{type:Number},
  longitude:{type:Number},
  role: {
    type: String,
    enum: ['patient', 'doctor', 'admin'], // Add more roles as needed
    default: 'patient',
  },
  image:{
      type: String,
      default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoLm3XaM3Q3cr6UnbgEpOfV0AH0ZTj6-ioSgh8l_UF7l01I3XbaZ84OaGw0VEq3QvYdYE&usqp=CAU'
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  emailVerificationCode: {
    type: String,
  },
  lastEmailVerificationSent: {
    type: Date,
    default: null,
  }
}, {timestamps: true});
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

module.exports = User;
