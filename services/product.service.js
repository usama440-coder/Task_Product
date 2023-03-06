const { pool } = require("../db/db");

const createProduct = (data) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO PRODUCTS (name, description, price, image, name_ar, description_ar) VALUES (?, ?, ?, ?, ?, ?)",
      [
        data.name,
        data.description,
        data.price,
        data.image,
        data.name_ar,
        data.description_ar,
      ],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

const getProducts = (lang) => {
  let query;
  if (lang === "ar") {
    query = "SELECT id, name_ar, description_ar, price, image FROM PRODUCTS";
  } else {
    query = "SELECT id, name, description, price, image FROM PRODUCTS";
  }
  return new Promise((resolve, reject) => {
    pool.query(query, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};

const getProduct = (id, lang) => {
  let query;
  if (lang === "ar") {
    query =
      "SELECT id, name_ar, description_ar, price, image FROM PRODUCTS WHERE id=?";
  } else {
    query = "SELECT * FROM PRODUCTS WHERE id=?";
  }
  return new Promise((resolve, reject) => {
    pool.query(query, [id], (err, result) => {
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
