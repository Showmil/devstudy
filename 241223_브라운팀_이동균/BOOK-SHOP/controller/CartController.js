const conn = require('../mariadb');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const dotenv = require('dotenv')
const crypto = require('crypto')
dotenv.config()

const addToCart = (req, res) => {
  const { book_id, quantity, user_id } = req.body;
  let authorization = ensureAuthorization(req);

  let sql = "INSERT INTO cartItems (book_id, quantity, user_id) VALUES (?, ?, ?)";
  let values = [book_id, quantity, authorization.id];
  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    return res.status(StatusCodes.OK).json(results);
  });
};

const getCartItems = (req, res) => {
  let authorization = ensureAuthorization(req);
    const { user_id, selected } = req.body; // selected = [1, 3]

    let sql = `
  SELECT cartItems.id, book_id, title, summary, quantity, price
  FROM cartItems LEFT JOIN books
  ON cartItems.book_id = books.id
  WHERE user_id=? AND cartItems.id IN (?);`;
    conn.query(sql, [authorization.id, selected], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        return res.status(StatusCodes.OK).json(results);
    });

};

const removeCartItem = (req, res) => {
  const { id } = req.params; // cartItemId

  let sql = "DELETE FROM cartItems WHERE id = ?";``
  conn.query(sql, id, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    return res.status(StatusCodes.OK).json(results);
  });
};

function ensureAuthorization(req) {
  let receivedJwt = req.headers["authorization"];
  console.log("received jwt: ", receivedJwt);

  let decodedJwt = jwt.verify(receivedJwt, process.env.PRIVATE_KEY);
  console.log(decodedJwt);

  return decodedJwt;
}


module.exports = { addToCart, getCartItems, removeCartItem };