const express = require('express')
const app = express()
app.listen(3000)

let youtuber1 = {
	channelTitle : "십오야",
	sub : "227만명",
	video : "6.6천개"
}

let youtuber2 = {
	channelTitle : "침착맨",
	sub : "265만명",
	video : "7.3천개"
}

let db = new Map()
var id = 1
db.set(id++, youtuber1)
db.set(id++, youtuber2)

app.get('/', function(req, res) {
    res.json("유튜버 조회 API")
})

app.get('/youtubers', function(req, res) { // 전체 유튜버 조회
    var youtubers = {}
    if (db.size !== 0) {
        db.forEach(function (value, key){
            youtubers[key] = value
        })
        res.json(youtubers)
    } else {
        res.status(404).json({
            message : "조회할 유튜버가 없습니다."
        })
    }
})

app.use(express.json()) // post에서 json을 body에 넣어 request하기 위한 미들웨어
app.post('/youtubers', function(req, res){
    // body에 데이터 넣어서 보내기
    console.log(req.body)

    const channelTitle = req.body.channelTitle
    if (channelTitle) {
        db.set(id++, req.body)
        res.status(201).json({message : `${db.get(id - 1).channelTitle}님, 유튜버 생활을 응원합니다!`})
    } else {
        res.status(400).json({
            message : "요청 값을 제대로 보내주세요."
        })
    }
})

app.get('/youtubers/:id', function(req, res) {
    let {id} = req.params
    id = parseInt(id)
    
    var youtuber = db.get(id)
    if (youtuber == undefined) {
        res.status(404).json({
            message: "유튜버를 찾을 수 없습니다."
        });
    } else {
        res.json(youtuber);
    }
})

// 개별 유튜버 삭제
app.delete('/youtubers/:id', function(req, res) {
    let {id} = req.params
    id = parseInt(id)

    var youtuber = db.get(id)
    if (youtuber) {
        const channelTitle = youtuber.channelTitle
        db.delete(id)

        res.json({
            message : `${channelTitle}님, 다음에 또 뵙겠습니다.`
        })
    } else {
        res.status(404).json({
            message : `요청하신 ${id}번은 없는 유튜버입니다.`
        })
    }
})

// 전체 유튜버 삭제
app.delete('/youtubers', function(req, res) {
    if (db.size >= 1) {
        db.clear()
        res.json({
            message : "전체 유튜버가 삭제되었습니다"
        })
    } else {
        res.status(404).json({
            message : "삭제할 유튜버가 없습니다."
        })
    }
})

app.put('/youtubers/:id', function(req, res) {
    let {id} = req.params
    id = parseInt(id)

    var youtuber = db.get(id)
    var oldTitle = youtuber.channelTitle
    if (youtuber == undefined) {
        res.status(404).json({
            message : `요청하신 ${id}번은 없는 유튜버입니다.`
        })
    } else {
        var newTitle = req.body.channelTitle
        youtuber.channelTitle = newTitle
        db.set(id, youtuber)

        res.json({
            message : `${oldTitle}님, 채널명이 ${newTitle}로 변경되었습니다.`
        })
    }

    const channelTitle = youtuber.channelTitle
})