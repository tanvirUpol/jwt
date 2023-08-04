const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "9999 years" });
};

// login user
const loginUser = async (req, res) => {
  const { email_id, password } = req.body;

  try {
    const user = await User.login(email_id, password);
    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email_id, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// signup user
const signupUser = async (req, res) => {
  // email_id, password,outlet_division,role
  const { email_id, password } = req.body;

  try {
    const user = await User.signup(email_id, password);

    // create a token
    const token = createToken(user._id);

    // const role = user.role.toLowerCase()

    res.status(200).json({ email_id, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  loginUser,
  signupUser,
};
