const todo = require("../models/data");
const users = require("../models/account");
const jwt = require("jsonwebtoken");
const { decodedToken } = require("../utils/jwtToken");

const dataAll = async (req, res) => {
  try {
    const data = await todo.getAllData();
    res.status(200).json({
      status: true,
      message: "Data Displayed Successfuly",
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

const getCreateData = async (req, res) => {
  try {
    const { list, description } = req.body;
    const { authorization } = req.headers;

    //decode jwt token
    const decoded = decodedToken(authorization);
    //get user id from jwt token
    const userIdToken = decoded?.id;

    //check user id
    const checkUserId = await users.getAllUser({ id: userIdToken });
    if (checkUserId.length < 1) {
      throw { code: 400, message: "User Doesnt Exist!" };
    }

    const data = await todo.createData({
      list,
      description,
      createby: userIdToken,
    });
    res.status(200).json({
      status: true,
      message: "Data Successfully Created",
      data: [],
    });
  } catch (error) {
    res.status(error?.statusCode ?? 500).json({
      status: false,
      message: error?.message ?? error,
      data: [],
    });
  }
};

const getUpdateData = async (req, res) => {
  try {
    const { id } = req.params;
    const { list, description, createby } = req.body;
    const { authorization } = req.headers;

    //decode jwt token
    const decoded = decodedToken(authorization);
    //get user id from jwt token
    const userIdToken = decoded?.id;

    //check user id
    const checkUserId = await users.getAllUser({ id: userIdToken });
    if (checkUserId.length < 1) {
      throw { code: 400, message: "User Doesnt Exist!" };
    }

    const getData = await todo.getAllData({ id });
    if (getData.length < 1) {
      throw { code: 404, message: "Data Not Found" };
    }
    await todo.updateData({
      list: !list || list === "" ? getData[0].list : list,
      description:
        !description || description === ""
          ? getData[0].description
          : description,
      createby: userIdToken,
      id,
    });
    res.status(200).json({
      status: true,
      message: "Data Updated Successfully",
    });
  } catch (error) {
    res.status(error?.statusCode ?? 500).json({
      status: false,
      message: error?.message ?? error,
      data: [],
    });
  }
};

const getDeleteData = async (req, res) => {
  try {
    const { id } = req.params;
    // const { authorization } = req.headers;

    // //decode jwt token
    // const decoded = decodedToken(authorization);
    // //get user id from jwt token
    // const userIdToken = decoded?.id;

    // //check user id
    // const checkUserId = await users.getAllUser({ id: userIdToken });
    // if (checkUserId.length < 1) {
    //   throw { code: 400, message: "User Doesnt Exist!" };
    // }

    const getData = await todo.getAllData({ id });
    if (getData.length < 1) {
      throw { code: 404, message: "Data Not Found" };
    }

    await todo.deleteData({ id });
    res.status(200).json({
      status: true,
      message: "Data Deleted Successfully",
    });
  } catch (error) {
    res.status(error?.statusCode ?? 500).json({
      status: false,
      message: error?.message ?? error,
      data: [],
    });
  }
};
module.exports = { dataAll, getCreateData, getUpdateData, getDeleteData };
