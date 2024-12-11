const conn = require('../mariadb');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const dotenv = require('dotenv')
const crypto = require('crypto')
dotenv.config()


const join = (req, res) => { // 회원가입 컨트롤러
    const { email, password } = req.body;

    const salt = crypto.randomBytes(10).toString('base64');
    const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 10, 'sha512').toString('base64');

    let sql = 'INSERT INTO users (email, password, salt) VALUES (?, ?, ?)';
    let values = [email, hashPassword, salt];

    conn.query(sql, values, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end(); // 400 BAD REQUEST
        }

        res.status(StatusCodes.CREATED).json(results); // 201 CREATED
    })
}

const login = (req, res) => { // 로그인 컨트롤러
    const { email, password } = req.body

    let sql = 'SELECT * FROM users WHERE email = ?';
    conn.query(sql, email, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        const loginUser = results[0];
        const hashPassword = crypto.pbkdf2Sync(password, loginUser.salt, 10000, 10, 'sha512').toString('base64')

        if (loginUser && loginUser.hashPassword == hashPassword) {
            // 토큰 발행
            const token = jwt.sign(
                {
                    email: loginUser.email,
                },
                process.env.PRIVATE_KEY,
                {
                    expiresIn: '5m',
                    issuer: 'songa',
                }
            );

            // 토큰 쿠키에 담기
            res.cookie('token', token, {
                httpOnly: true,
            });

            console.log(token)

            return res.status(StatusCodes.OK).json(results);
        } else {
            return res.status(StatusCodes.FORBIDDEN); // 401 : Unauthorized  403 : Forbidden (접근-권리 없음)
        }
    });
};

const passwordResetRequest = (req, res) => {
  const { email } = req.body;

  let sql = 'SELECT * FROM users WHERE email = ?';
  conn.query(sql, email, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    const user = results[0];
    if (user) {
      return res.status(StatusCodes.OK).end();
    } else {
      return res.status(StatusCodes.UNAUTHORIZED).end();
    }
  });
};


const passwordReset = (req, res) => {
    const { email, password } = req.body;

    const salt = crypto.randomBytes(10).toString('base64');
    const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 10, 'sha512').toString('base64');
    
    let sql = 'UPDATE users SET password = ?, salt = ? WHERE email = ?';
    let values = [hashPassword, salt, email];
    conn.query(sql, values, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        if (results.affectedRows == 0) {
            return res.status(StatusCodes.BAD_REQUEST).end();
        } else {
            return res.status(StatusCodes.OK).json(results);
        }
    });
};

module.exports = { join, login, passwordResetRequest, passwordReset }