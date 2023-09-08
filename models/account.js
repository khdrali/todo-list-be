const db = require("../db");

const getAllUser = async (params) => {
  const data =
    await db`SELECT users.*, (SELECT json_build_object('list',data.list, 'description',data.description)) FROM users LEFT JOIN data ON users.id=data.createby`;
  return data;
};

const getUserById = async (params) => {
  const { id } = params;
  const dataId =
    await db`SELECT users.*, (SELECT json_build_object('list',data.list, 'description',data.description)) FROM users JOIN data ON users.id=data.createby WHERE users.id = ${id}`;
  return dataId;
};

const getUserByEmail = async (params) => {
  const { email } = params;

  return await db`SELECT * FROM users WHERE email=${email}`;
};

const getCreateUser = async (params) => {
  const { username, password, email } = params;
  await db`INSERT INTO users (username, password, email) VALUES (${username}, ${password}, ${email})`;
};

const getUpdateUser = async (params) => {
  const { username, password, email, getUser, id } = params;
  await db`UPDATE users SET 
  "username"=${username || getUser?.username},
  "password"=${password || getUser?.password},
  "email"=${email || getUser?.email}
  WHERE "id"=${id}`;
};

const getDeleteUser = async (params) => {
  const { id } = params;
  return await db`DELETE from"public"."users" WHERE "id"=${id}`;
};

module.exports = {
  getAllUser,
  getUserById,
  getUserByEmail,
  getCreateUser,
  getUpdateUser,
  getDeleteUser,
};
