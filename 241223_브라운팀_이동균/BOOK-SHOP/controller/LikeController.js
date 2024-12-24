const jwt = require('jsonwebtoken');
const conn = require('../mariadb');
const { statusCodes } = require('http-status-codes')
const dotenv = require('dotenv')
const crypto = require('crypto')
dotenv.config()

const addLike = (req, res) => {
  // 좋아요 추가
  const { liked_book_id } = req.params;
  // const { user_id } = req.body;

  let authorization = ensureAuthorization(req);
  
  let sql = "INSERT INTO likes (user_id, liked_book_id) VALUES (?, ?)";
  let values = [authorization.id, liked_book_id];
  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
  
    return res.status(StatusCodes.OK).json(results);
  });
};
  

const removeLike = (req, res) => {
  // 좋아요 제거(취소)
  const { id } = req.params; // book_id
  
  let authorization = ensureAuthorization(req);
  
  let sql = "DELETE FROM likes WHERE user_id = ? AND liked_book_id = ?";
  let values = [authorization.id, id];
  conn.query(sql, values, (err, results) => {
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

module.exports = { addLike, removeLike };