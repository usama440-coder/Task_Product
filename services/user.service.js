const { pool } = require("../db/db");

const createUser = (data) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO USERS (name, email, password) VALUES (?, ?, ?)`,
      [data.name, data.email, data.password],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

const getUsers = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT id, name, email, joining FROM USERS",
      (err, result, fields) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

const getUser = (email) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT id, name, email, password, joining FROM USERS WHERE email=?",
      [email],
      (err, result, fields) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

const getUserId = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT id, name, email, password, joining FROM USERS WHERE id=?",
      [id],
      (err, result, fields) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

module.exports = { createUser, getUsers, getUser, getUserId };
