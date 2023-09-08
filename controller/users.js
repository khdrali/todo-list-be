const account = require("../models/account");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userAll = async (req, res) => {
  try {
    const data = await account.getAllUser();
    res.status(200).json({
      status: true,
      message: "Data Displayed Successfully",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error?.message ?? error,
      data: [],
    });
  }
};

const userById = async (req, res) => {
  try {
    const { id } = req.params;
    const dataId = await account.getUserById({ id });
    res.json({
      status: true,
      message: "Data Displayed Successfully",
      data: dataId,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error?.message ?? error,
      data: [],
    });
  }
};

const CreateUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const duplicateEmail = await account.getUserByEmail({ email });
    if (duplicateEmail.length >= 1) {
      throw { code: 401, message: "E-mail Has Been Resgitered" };
    }
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        throw "The Authentication Process Failed, Please Try Again";
      }
      const addToDb = await account.getCreateUser({
        username,
        password: hash,
        email,
      });
      res.json({
        status: true,
        message: "Data Added Successfully",
        data: addToDb,
      });
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error?.message ?? error,
      data: [],
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, email } = req.body;
    getUser = await account.getUserById({ id });
    if (!getUser) {
      throw { code: 404, message: "Data Not Found" };
    }
    bcrypt.hash(
      password || getUser[0].password,
      saltRounds,
      async (err, hash) => {
        if (err) {
          throw "The Authentication Process Failed, Please Try Again";
        }

        if (getUser) {
          await account.getUpdateUser({
            username:
              !username || username === "" ? getUser[0].username : username,
            password: !password || password === "" ? getUser[0].password : hash,
            email: !email || email === "" ? getUser[0].email : email,
            getUser: getUser[0],
            id,
          });
          res.json({
            status: true,
            message: "Data Updated Successfully",
          });
        }
      }
    );
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error?.message ?? error,
      data: [],
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const checkDuplicateId = await account.getUserById({ id });
    if (checkDuplicateId <= 0) {
      throw { code: 404, message: "User Not Found" };
    }
    account.getDeleteUser({ id });
    res.json({
      status: true,
      message: "Id Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error?.message ?? error,
      data: [],
    });
  }
};

module.exports = { userAll, userById, CreateUser, updateUser, deleteUser };
