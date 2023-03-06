const { pool } = require("../db/db");

const createProduct = (data) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO PRODUCTS (name, description, price, image) VALUES (?, ?, ?, ?)",
      [data.name, data.description, data.price, data.image],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

const getProducts = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM PRODUCTS", (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};

const getProduct = (id) => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM PRODUCTS WHERE ID=?", [id], (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};

const deleteProduct = (id) => {
  return new Promise((resolve, reject) => {
    pool.query("DELETE FROM PRODUCTS WHERE ID=?", [id], (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};

const updateProduct = (id, data) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE PRODUCTS SET name=?, description=?, price=?, image=? WHERE id=?",
      [data.name, data.description, data.price, data.image, id],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};
