const User = require("../models/user");

exports.createUser = async () => {
  const userCount = await User.count();

  if (userCount === 0) {
    await new User({
      firstName: "Hari",
      lastName: "Narayan",
      email: "hari@test.com",
      password: "12345678",
    }).save();

    console.log("User created.");
  }
};
