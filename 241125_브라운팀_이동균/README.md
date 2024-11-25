# 241125 강의 요악

## 핸들러(handler)
- HTTP request가 날아오면 자동으로 호출되는 메소드를 뜻함.

## json 여러개 담아서 응답(response)로 보내기
- 배열에 담아서 보내면 된다.
```
// 예시 코드
const fruits = [
    { id: 1, name: 'apple' },
    { id: 2, name: 'orange' },
    { id: 3, name: 'strawberry' },
    { id : 4, name : 'blueberry' }
]

app.get('/fruits', function (req, res) {
    res.json(fruits)
})
```

## array.find() 메소드
- 배열에서 조건을 만족하는 첫 번째 요소를 반환한다. 조건은 콜백함수를 통해 정의한다.
```
// 예시 코드
var findFruit = fruits.find(f => (f.id == id))
```

## 예외 처리
- 찾는 값이 없을 때, if-else문을 통하여 404 코드와 에러 메세지를 보내준다.

## ==, === 차이
- ==는 두 값의 타입이 다르면, 자동으로 **타입 변환**을 수행한 뒤 비교한다.
- ===는  **두 값의 타입과 값이 모두 같은 경우**에만 True를 반환한다.

## 실제 유튜브 프로젝트
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