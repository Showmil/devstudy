## HTTP 메소드 정리
- GET : 서버로부터 데이터를 **가져오기 위해** 사용된다. 데이터를 조회하기 위한 메소드로 **URL에 쿼리 문자열**을 통하여 요청한 데이터를 전달한다.
- POST : 서버에 데이터를 **생성하거나 제출하기 위해** 사용된다. **HTTP 메세지의 본문(body)**에 요청 데이터를 담아 전달한다.
- PUT : 서버에 데이터를 **업데이트 하거나 새로 생성**할 때 사용된다. **HTTP 메세지의 본문(body)에** 요청 데이터를 담아 전달한다.
- DELETE : 서버에서 특정 데이터를 삭제하기 위해 사용된다.

## app.use(express.json())
- body에 json값을 담아 requset로 받기 위하여 작성하는 미들웨어 함수

## API 설계
<API 설계 (URL, method)>

0) 전체 유튜버 조회 GET /youtubers
- req : X
- res : map을 전체 조회
1) 개별 유튜버 조회 GET /youtuber/:id : id로 map에서 객체를 찾아서, 그 객체의 정보를 뿌려줌
- req : params.id <= map에 저장된 key값 전달
- res : map에서 id로 객체를 조회해서 전달

2) 유튜버 등록 POST /youtuber
- req : body <= channelTitle, sub = 0, videoNum = 0 신규 유튜버 정보를 전달
- res : "channelTitle님, 유튜버 생활을 응원합니다!"

## 과제 버전 API
<API 설계 (URL, method)>

0) 전체 음식 조회 GET /foods
- req : X
- res : map을 전체 조회

1) 개별 음식 조회 GET /food/:id : id로 map에서 객체를 찾아서, 그 객체의 정보를 뿌려줌
- req : params.id <= map에 저장된 key값 전달
- res : map에서 id로 객체를 조회해서 전달

2) 개별 음식 등록 POST /food
- req : body <= name, ingredients = 0, calories = 0 신규 음식 정보를 전달
- res : "name을 음식 백과 사전에 추가했습니다!"