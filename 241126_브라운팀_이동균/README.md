# 241126 강의 요악

## javascript 빈 객체 확인하기
- Object.keys() <= 추천 !
- for문
- lodash 라이브러리 : isEmpty

## Object.keys()를 이용해 객체가 비어있나 확인하기
- Object.keys(obj) : 객체 obj 의 **속성 이름**들을 배열로 반환해주는 함수.
```
// 예시 코드
const obj1 = {}
const obj2 = { message : "안 빔" }
const num = 1
const str = "one"

console.log(Object.keys(obj1)) // 빈 배열 [] 출력, length === 0
console.log(Object.keys(obj2)) // [ 'message' ] 출력, length === 1
```

## 채널 API 설계(URL, HTTP method/status, req/res)

1) 채널 생성 POST /channels
- req : body(channelTitle)
- res 201 : `${channelTitle}님, 채널을 응원합니다.`

2) 채널 개별 수정 PUT /channels/:id
- req : URL(id), body(channelTitle)
- res 200 : `채널명이 성공적으로 수정되었습니다. 기존 : ${} -> 수정 : ${}`

3) 채널 개별 삭제 DELETE /channels/:id
- req : URL(id)
- res 200 : `삭제 되었습니다.`

4) 채녈 전체 조회 GET /channels
- req : X 
- res 200 : 채널 전체 데이터

5) 채널 개별 조회 GET /channels/:id
- req : URL(id)
- res 200 : 채널 개별 데이터 

## app route
```
app.get('/channels')
app.post('/channels')
app.put('/channels')

// 와 같은 코드를 route 기능을 이용해 아래와 같이 바꿀 수 있다.

app
    .route('/channels')
    .get()
    .post()
    .put()

```
