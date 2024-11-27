# 241127 강의 요약

## Server와 Router의 역할
- Server : Request를 받는다.
- Router : Request의 URL에 따라 route를 정해준다.

## Node.js에서 라우팅이란?
- Request(요청)이 날아왔을 때, 원하는 경로에 따라 적절한 방향으로 경로를 안내해주는 것
- URL, Method => 콜백 함수

## 여러 개의 API 파일 하나로 합치기
- 미리 만들어둔 API 파일을 모듈로 만들기
- app.js에서 require를 통해 모듈 호출

## API 파일 모듈화 시키기
```
// user-demo.js

const express = require('express')
const router = express.Router() // app.js에서 사용할 수 있게 모듈화
router.use(express.json())

// 이때 기존의 방식이 app.get(), app.post() ... 이였으나 app 변수가 사라졌으므로 app을 router로 변경

router.get()
router.post()

module.exports = router  // 해당 파일을 모듈화하고, 외부로 내보낸다.(외부에서 사용 가능하게 한다.)

// ---------------------------------------------------
// app.js

const express = require('express')
const app = express()

app.listen(7777)

const userRouter = require('./routes/users.js')
const channelRouter = require('./routes/channels.js')

app.use('/', userRouter) // '/'로 접속했을 때 해당 모듈을 불러옴
app.use('/channels', channelRouter) // '/channels'로 접속했을 때 해당 모듈을 불러옴, 공통 URL을 빼주는 개념
```