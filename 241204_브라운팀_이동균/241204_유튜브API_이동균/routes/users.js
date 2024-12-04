const express = require('express')
const router = express.Router() // app.js에서 사용할 수 있게 모듈화
const { body, param, validationResult } = require('express-validator')
const conn = require('../mariadb')

// jwt 모듈
var jwt = require('jsonwebtoken');

// env 모듈
var dotenv = require('dotenv');
dotenv.config();

router.use(express.json())

const validate = (req, res, next) => {
    const err = validationResult(req)
    if (!err.isEmpty()) {
        return res.status(400).json(err.array())
    } else {
        return next()
    }
}

// 로그인
router.post('/login',
    [
        body('email').notEmpty().isEmail().withMessage('이메일 확인 필요'),
        body('password').notEmpty().isString().withMessage('비밀번호 확인 필요'),
        validate
    ],
    (req, res) => {
    const { email, password } = req.body
    var loginUser = {}
    
    let sql = `SELECT * FROM users WHERE email = ?`
    conn.query(
        sql, email,
        function (err, results, fields) {
            if (err) {
                    console.log(err)
                    return res.status(400).end()
                }

            var loginUser = results[0];

            if (loginUser && loginUser.passowrd == password) {
                // token 발급
                const token = jwt.sign({
                    email: loginUser.email,
                    name : loginUser.name
                }, process.env.PRIVATE_KEY, {
                    expiresIn: '5m', // 5분 뒤에 만료된다는 뜻
                    issuer: 'showmil'
                })

                res.cookie("token", token, {
                    httpOnly: true, // JavaScripts로 쿠키 접근 방지
                    secure: true, // HTTPS에서만 쿠키 전송
                    maxAge: 60 * 60 * 1000, // 쿠키 유효 시간
                });

                res.status(200).json({
                    message: `${loginUser.name}님, 로그인 되었습니다.`
                })
            } else {
                res.status(403).json({
                    message : "이메일 또는 비밀번호가 틀렸습니다."
                })
            }
        }
    )
})

// 회원가입
router.post('/join', [
        body('email').notEmpty().isEmail().withMessage('이메일 확인 필요'),
        body('contact').notEmpty().isString().withMessage('비밀번호 확인 필요'),
        body('name').notEmpty().isString().withMessage('이름 확인 필요'),
        body('password').notEmpty().isString().withMessage('비밀번호 확인 필요'),
        validate
    ],
    (req, res) => {
        const { email, name, password, contact } = req.body

        let sql = `INSERT INTO users (email, name, password, contact) VALUES (?, ?, ?, ?)`
        let values = [email, name, password, contact]
        conn.query(
            sql, values,
            function (err, results, fields) {
                if (err) {
                    console.log(err)
                    return res.status(400).end()
                }

                res.status(201).json(results)
            }
        )
})

router
    .route('/users')
    // 회원 개별 조회
    .get([
            body('email').notEmpty().isEmail().withMessage('이메일 확인 필요'),
            validate
        ],
        (req, res) => {
        let { email } = req.body
        let sql = `SELECT * FROM users WHERE email = ?`
        conn.query(
            sql, email,
            function (err, results, fields) {
                if (err) {
                    console.log(err)
                    return res.status(400).end()
                }

                if (results.length)
                    res.status(200).json(results)
                else {
                    res.status(404).json({
                        message: "회원 정보가 없습니다."
                    })
                }
            }
        );
    })
    // 회원 개별 탈퇴
    .delete(
        [
            body('email').notEmpty().isEmail().withMessage('이메일 확인 필요'),
            validate
        ], (req, res) => {
        let { email } = req.body
        let sql = `DELETE FROM users WHERE email = ?`
        conn.query(
            sql, email,
            function (err, results) {
                if (err) {
                    console.log(err)
                    return res.status(400).end()
                }

                if (results.affectedRows == 0) {
                    return res.status(400).end()
                } else {
                    res.status(200).json(results)
                }
            }
        );
    })