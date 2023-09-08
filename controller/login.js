require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const account = require("../models/account");

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkEmail = await account.getUserByEmail({ email });
    if (checkEmail?.length === 0) {
      throw { message: "Email Not Found" };
    }

    bcrypt.compare(password, checkEmail[0].password, (err, result) => {
      try {
        if (err) {
          throw { code: 500, message: "Error On The Server" };
        }
        const token = jwt.sign(
          {
            id: checkEmail[0]?.id,
            username: checkEmail[0]?.Username,
            password: checkEmail[0]?.Password,
            email: checkEmail[0]?.email,
          },
          process.env.JWT_KEY
        );
        if (result) {
          res.status(200).json({
            status: true,
            message: "Login Successfully",
            data: {
              token,
              profile: checkEmail[0],
            },
          });
        } else {
          throw {
            code: 400,
            message: "Email Or Password You Entered Incorrect",
          };
        }
      } catch (error) {
        res.status(error?.code ?? 500).json({
          status: false,
          message: error?.message ?? error,
          data: [],
        });
      }
    });
    // const checkPassword = password === checkEmail[0].password;
    // if (!checkPassword) {
    //   throw { message: "Password Incorrect" };
    // }
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error?.message || "Error",
      data: [],
    });
  }
};

module.exports = { Login };
