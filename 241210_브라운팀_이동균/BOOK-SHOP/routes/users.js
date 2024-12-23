const express = require("express");
const router = express.Router();
const conn = require('../mariadb')

// 회원가입
router.post('/join', (req, res) => {
    const { email, password } = req.body;

    let sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
    let values = [email, password];

    conn.query(sql, values, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(400).end(); // BAD REQUEST
        }

        res.status(201).json(results);
    })
})
// 로그인
router.post('/login', (req, res) => {

})
// 비밀번호 초기화 요청
router.post('/reset', (req, res) => {

})
// 비밀번호 초기화
router.put('/reset', (req, res) => {

})

module.exports = router