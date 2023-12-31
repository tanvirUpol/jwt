const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email_id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// static create user
UserSchema.statics.signup = async function (email_id, password) {
  if(!email_id || !password){
    throw new Error("Please enter a valid email and password");
  }
  const exists = await this.findOne({ email_id });

  if (exists) {
    throw new Error("This user already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  if (!exists) {
    const user = await this.create({
      email_id,
      password: hashedPassword,
    });

    return user;
  }
};

// static login method

UserSchema.statics.login = async function (email_id, password) {
  if(!email_id || !password){
    throw new Error("Please enter a valid email and password");
  }
  if (email_id && password) {
    const user = await this.findOne({ email_id });

    if (!user) {
      throw new Error("User does not exist");
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new Error("Incorrect password");
    }

    return user;
  }

  if (!email_id && !password) {
    throw new Error("Email and password are required");
  }

  if (email_id || !password) {
    throw new Error("Password is required");
  }

  if (!email_id || password) {
    throw new Error("Email is required");
  }
};

module.exports = mongoose.model("User", UserSchema);
