# 241122 강의 내용 정리

## map에 있는 객체들 전체 조회(map에 있는 값들 전체 json으로 전송)
- map에 저장된 데이터를 순회하면서 json 객체로 변환한 다음 클라이언트에 json으로 response한다.
- 예시 코드

## forEach
- 형태 : array.forEach(function(value, key, object){ ... })
- 전달받은 Array에서 값을 꺼내고 콜백함수인 function(value, key, object)를 실행시킨다. 그리고 그 다음 값을 꺼내고 콜백함수를 실행시키고 값이 없어질 때까지 반복
- array에서 key는 인덱스이고, value는 해당 인덱스에 해당하는 값이다. map은 key-value가 각각 key, value에 해당된다. object에는 전체 객체가 들어간다.
- 예시 코드
```
let map = new Map()
map.set(7, "seven")
map.set(9, "nine")
map.set(8, "eight")

map.forEach(function(a, b, c) {
	console.log(`a : ${a}, b : ${b}, c : ${c}`)
})
- 예시 코드 출력 결과
a : seven, b : 7, c : [object Map]
a : nine, b : 9, c : [object Map]
a : eight, b : 8, c : [object Map]
```

## map
- 형태 : array.map(function(value, key, object) { ... })
- 배열의 각 요소에 대해 콜백함수를 실행하고, **새로운 배열**을 반환한다. 원래 배열은 변하지 않으며 변환된 배열을 반환한다.

## forEach와 map의 차이점
- forEach는 반환값이 없으나, map은 새 배열을 반환한다.

## HTTP DELETE를 이용하여 객체 삭제해보기
<API 설계(URL, method)>

3) 개별 유튜버 삭제 DELETE /youtubers/:id
- req : params.id
- res : "channelTitle님, 다음에 또 뵙겠습니다."

4) 전체 유튜버 삭제 DELETE /youtubers
- req : X
- res : "전체 유튜버가 삭제되었습니다"

```
// 예시 코드
app.delete('/youtubers/:id', function(req, res) {
    let {id} = req.params
    id = parseInt(id)

    var youtuber = db.get(id)
    if (youtuber == undefined) {
        res.json({
            message : `요청하신 ${id}번은 없는 유튜버입니다.`
        })
    }
    const channelTitle = youtuber.channelTitle
    db.delete(id)

    res.json({
        message : `${channelTitle}님, 다음에 또 뵙겠습니다.`
    })
})
```

## 리팩토링
- 소프트웨어의 코드 내부(구조)를 변경하는 것
- 리팩토링은 언제 해야 할까?
1. 에러가 n회 발견되었을 때, 리팩토링을 해야한다.
2. 리팩토링을 하면서, 에러(문제점)을 발견할 수 있다.
등등 본인이 필요하다고 느낄 때
- **리팩토링을 해서는 안 될 때** : 배포, 운영 직전에는 절대로 해선 안 된다.

## HTTP PUT을 이용하여 객체를 수정해보기
<API 설계>

5) 개별 유튜버 수정 => PUT /youtubers/:id
- req : params.id, body <= channelTitle
- res : "(이전)channelTitle님, 채널명이 (새로운)channelTitle로 변경되었습니다."

```
// 예시 코드
app.put('/youtubers/:id', function(req, res) {
    let {id} = req.params
    id = parseInt(id)

    var youtuber = db.get(id)
    var oldTitle = youtuber.channelTitle
    if (youtuber == undefined) {
        res.json({
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
```

## HTTP 상태 코드
- HTTP 안에 작성되어서 들어가는 "상태"
- 조회/수정/삭제 성공 : 200
- 등록 성공 : 201
- 찾는 페이지 없음(url에 맞는 api 없음) : 404
- 서버가 죽었을 때(서버가 크리티컬한 오류를 맞았을 때): 500