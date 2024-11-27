const express = require('express')
const router = express.Router()
router.use(express.json())

let db = new Map()
var id = 1

router
    .route('/')
    .post((req, res) => {
        if (req.body.channelTitle) {
            db.set(id++, req.body)
            req.status(201).json({
                message : `${db.get(id - 1).channelTitle}채널을 응원합니다!`
            })   
        } else {
            res.status(400).json({
                message: "요청 값을 제대로 보내주세요."
            })
        }
    }) // 채널 개별 생성
    .get((req, res) => {
        var { userId } = req.body
        var channels = []
        if (db.size) {
            if (userId) {
                db.forEach((value, key) => {
                    if (value.userId === userId) {
                        channels.push(value)
                    }
                })
                if (channels.length) {
                    res.status(200).json(channels)
                } else {
                    res.status(404).json({
                        message : "조회할 채널이 없습니다."
                    }) 
                }
            } else {
                res.status(404).json({
                    message : "로그인이 필요한 페이지입니다."
                })
            }
        } else {
            res.status(404).json({
                message : "조회할 채널이 없습니다."
            })
        }

    }) // 채널 전체 조회

router
    .route('/:id')
    .put((req, res) => {
        let { id } = req.params.id
        id = parseInt(id)

        var channel = db.get(id)
        var oldTitle = channel.channelTitle
        if (channel) {
            var newTitle = req.body.channelTitle
            channel.channelTitle = newTitle
            db.set(id, channel)
            res.json({
                message : `채널명이 정상적으로 수정되었습니다. 기존 ${oldTitle} -> 수정 후 ${newTitle}`
            })
        } else {
            res.status(404).json({
                message : `채널 정보를 찾을 수 없습니다.`
            })
        }

    }) // 채널 개별 수정
    .delete((req, res) => {
        let { id } = req.params.id
        id = parseInt(id)
        var channel = db.get(id)
        if (channel) {
            db.delete(id)
            res.status(200).json({
                message : `${channel.channelTitle}이 정상적으로 삭제되었습니다.`
            })
        }

    }) // 채널 개별 삭제
    .get((req, res) => {
        let { id } = req.params
        id = parsInt(id)
        var channel = db.get(id)
        if (channel) {
            res.status(200).json(channel)
        } else {
            res.status(404).json({
                message : `채널 정보를 찾을 수 없습니다.`
            })
        }
    }) // 채널 개별 조회

module.exports = router