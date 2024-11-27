const express = require('express')
const app = express()
app.listen(7777)
app.use(express.json())

let db = new Map()
var id = 1

// 로그인
app.post('/login', (req, res) => {
    const { userId, password } = req.body
    var loginUser = {}
    db.forEach((user, id) => {
        if (user.userId === userId) {
            loginUser = user
        }
    })

    if (Object.keys(loginUser) !== 0) {
        if (loginUser.password = password) {
            console.log("로그인이 성공했습니다.")
        } else {
            console.log("비밀번호가 틀렸습니다.")
        }
    } else {
        console.log("아이디가 없습니다.")
    }
})

// 회원가입
app.post('/join', (req, res) => {
    if (Object.keys(req.body).length === 0) {
        res.status(400).json({
            message : "입력 값을 다시 확인해주세요."
        })
    } else {
        db.set(id++, req.body)
        res.status(201).json({
            message : `${db.get(id - 1).name}님 환영합니다.`
        })
    }
})

app
    .route('/users/:id')
    // 회원 개별 조회
    .get((req, res) => {
    let { id } = req.params
    id = parseInt(id)

    const user = db.get(id)
    if (user) {
        res.status(200).json({
            userId: user.userId,
            name : user.name
        })
    } else {
        res.status(404).json({
            message : "회원 정보가 없습니다."
        })
    }
    })
    // 회원 개별 탈퇴
    .delete((req, res) => {
    let { id } = req.params
    id = parseInt(id)

    const user = db.get(id)
    if (user) {
        db.delete(id)
        res.status(200).json({
            message : `${user.name}님 다음에 또 뵙겠습니다.`
        })
    } else {
        res.status(404).json({
            message : "회원 정보가 없습니다."
        })
    }
})