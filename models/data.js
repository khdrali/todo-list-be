const db = require("../db");

const getAllData = async (params) => {
  return await db`SELECT * FROM data`;
};

const getDataById = async (params) => {
  const { id } = params;
  return await db`SELECT * FROM data WHERE id=${id}`;
};

const createData = async (params) => {
  const { list, description, createby } = params;
  return await db`INSERT INTO data(list,description,createby) VALUES(${list},${description},${createby})RETURNING id`;
};

const updateData = async (params) => {
  const { list, description, createby, getData, id } = params;
  return await db`UPDATE data SET "list"=${
    list || getData?.list
  },"description"=${
    description || getData?.description
  },"createby"=${createby} WHERE id=${id} RETURNING *`;
};

const deleteData = async (params) => {
  const { id } = params;
  return await db`DELETE FROM data WHERE id=${id}`;
};

module.exports = {
  getAllData,
  createData,
  updateData,
  deleteData,
  getDataById,
};
