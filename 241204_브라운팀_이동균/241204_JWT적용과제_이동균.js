const express = require('express');
const app = express()
var jwt = require('jsonwebtoken'); // jwt 모듈 불러오기
var dotenv = require('dotenv');

// env 사용
dotenv.config();

app.listen(PORT)
app.use(express.json())

app.post('/login', (req, res) => {
    const { name } = req.body
    const token = jwt.sign({
        name: `${name}`
    }, process.env.PRIVATE_KEY, {
        expiresIn: '5m', // jwt 유효시간은 5분
        issuer: 'showmil'
    })

    res.cookie('token', token, {
        httpOnly: true, // JavaScripts로 쿠키 접근 방지
        secure: true, // HTTPS에서만 쿠키 전송
        maxAge: 60 * 60 * 1000, // 쿠키 유효 시간
    })

    res.status(200).json({
        message : "쿠키를 통해 jwt 전달 성공!"
    })
})

var decoded = jwt.verify(token, process.env.PRIVATE_KEY);
console.log(decoded);