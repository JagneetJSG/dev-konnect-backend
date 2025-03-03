const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 4,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate(value){
        if(!validator.isEmail(value))
            throw new Error("email is not  valid" + value)
    }
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    min: 18,
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female", "others"],
      message: `{VALUE} not permitted`
    },
    // validate(value){
    //     if(!["male", "female", "others"].includes(value)){
    //         throw new Error("Gender data is not valid")
    //     }
    // },
  },
  photoUrl: {
    type: String,
  },
  about: {
    type: String,
    default: "This is a default about of the user!"
  },
  skills: {
    type: [String],
  }
},
{
    timestamps: true
});

userSchema.index({firstName: 1, lastName: 1})

userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({_id: user._id}, "Dev@123Tinder", {expiresIn: "7d"})

    return token;
}
userSchema.methods.validatePassword = async function (passwordInputUser){
    const user = this;
    const hashPassword = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputUser, hashPassword)
return isPasswordValid;
}

module.exports = mongoose.model("user", userSchema);