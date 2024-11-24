const express = require('express')
const app = express()
app.listen(3000)

let youtuber = {
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
db.set(id++, youtuber)
db.set(id++, youtuber2)

app.get('/', function(req, res) {
    var youtubers = {}
    db.forEach(function (value, key){
        youtubers[key] = value
    })
    res.json(youtubers)
})

app.get('/youtubers', function(req, res) {
    db.forEach(function(youtuber) {

    })
})

app.use(express.json()) // post에서 json을 body에 넣어 request하기 위한 미들웨어
app.post('/youtuber', function(req, res){
    // body에 데이터 넣어서 보내기
    console.log(req.body)

    db.set(id++, req.body)
    res.json({message : `${db.get(id - 1).channelTitle}님, 유튜버 생활을 응원합니다!`})
})

app.get('/youtuber/:id', function(req, res) {
    const {id} = req.params
    if (db.get(id) == youtuber) {
        res.send(youtuber)
    } else if (db.get(id) == youtuber2) {
        res.send(youtuber2)
    } else {
        res.json({
            message : "유튜버를 찾을 수 없습니다."
        })
    }
})