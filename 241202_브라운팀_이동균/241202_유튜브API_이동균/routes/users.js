const express = require('express')
const router = express.Router() // app.js에서 사용할 수 있게 모듈화
const conn = require('../mariadb')

router.use(express.json())

// 로그인
router.post('/login', (req, res) => {
    const { email, password } = req.body
    var loginUser = {}
    
    let sql = `SELECT * FROM users WHERE email = ?`
    conn.query(
        sql, email,
        function (err, results, fields) {
            var loginUser = results[0];

            if (loginUser && loginUser.passowrd == password) {
                res.status(200).json({
                    message: `${loginUser.name}님, 로그인 되었습니다.`
                })
            } else {
                res.status(404).json({
                    message : "이메일 또는 비밀번호가 틀렸습니다."
                })
            }
        }
    )
})

// 회원가입
router.post('/join', (req, res) => {
    if (req.body == {}) {
        res.status(400).json({
            message : "입력 값을 다시 확인해주세요."
        })
    } else {
        const { email, name, password, contact } = req.body

        let sql = `INSERT INTO users (email, name, password, contact) VALUES (?, ?, ?, ?)`
        let values = [email, name, password, contact]
        conn.query(
            sql, values,
            function (err, results, fields) {
                res.status(201).json(results)
            }
        )

        db.set(userId, req.body)
        res.status(201).json({
            message : `${db.get(userId).name}님 환영합니다.`
        })
    }
})

router
    .route('/users')
    // 회원 개별 조회
    .get((req, res) => {
        let { email } = req.body
        let sql = `SELECT * FROM users WHERE email = ?`
        conn.query(
            sql, email,
            function (err, results, fields) {
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
    .delete((req, res) => {
        let { email } = req.body
        let sql = `DELETE FROM users WHERE email = ?`
        conn.query(
            sql, email,
            function (err, results, fields) {
                res.status(200).json(result)
            }
        );
    })