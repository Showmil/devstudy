## 설계
### 회원
1) 로그인 POST /login
- req : body (id, pwd)
- res : `${name}님 환영합니다`

2) 회원가입 POST /join
- req : body (id, pwd, name)
- res : `${name}님 환영합니다`

3) 회원 정보 조회 GET /users/:id
- req : URL(id)
- res : id, name

4) 회원 탈퇴 DELETE /users/:id
- req : URL(id)
- res : `${name}님 다음에 또 뵙겠습니다.`

### 채널
- 채널 생성
- 채널 수정
- 채널 삭제

## 코드
```
const express = require('express')
const app = express()
app.listen(7777)
app.use(express.json())

let db = new Map()
var id = 1

// 로그인
app.post('/login', (req, res) => {
    
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
```

## 실행 결과
### 회원 가입 API
![](https://velog.velcdn.com/images/hilyhily334/post/04da6d33-da4e-4375-8077-49dee7bfc309/image.png)
- 회원가입이 정상적으로 되었을 때
![](https://velog.velcdn.com/images/hilyhily334/post/f0610d5a-1f8d-4c1c-a8b0-05b6a4bb7a2d/image.png)
- body 값이 비워져서 왔을 때
### 회원 개별 조회 API
![](https://velog.velcdn.com/images/hilyhily334/post/1be0fc98-71e5-4fac-96b3-08944d83c45c/image.png)
- 회원 정보가 정상적으로 될 때
![](https://velog.velcdn.com/images/hilyhily334/post/a33d4c8b-0a95-4b4a-b6fe-26c61e90a2a0/image.png)
- 없는 회원 정보를 조회할 때
### 회원 개별 탈퇴 API
![](https://velog.velcdn.com/images/hilyhily334/post/cb6b0563-2e1a-41b8-a0f2-827435b2c2e6/image.png)
- 정상적으로 탈퇴가 되었을 때
![](https://velog.velcdn.com/images/hilyhily334/post/ece3e416-ee1b-46e4-abbf-9ead9df38d16/image.png)
-  ID에 맞는 회원 정보가 없을 때