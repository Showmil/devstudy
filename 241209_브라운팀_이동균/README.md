# API 설계

## 회원 API
### 1. 회원 가입
Method: POST
URI: /join
HTTP status code: 201
Request Body:
{
  "email": "사용자가 입력한 이메일",
  "password": "사용자가 입력한 비밀번호"
}
Response Body: X
### 2. 로그인
Method: POST
URI: /login
HTTP status code: 200
Request Body:
{
  "email": "사용자가 입력한 이메일",
  "password": "사용자가 입력한 비밀번호"
}
Response Body: JWT Token
### 3. 비밀번호 초기화 (수정)
Method: PUT
URI: /reset
HTTP status code: 200
Request Body:
{
  "password": "사용자가 입력한 비밀번호"
}
Response Body: X


## 도서 API
### 1. 전체 도서 조회
Method: GET
URI: /books
HTTP status code: 200
Request Body: X
Response Body:
[
  {
    "title": "도서 제목",
    "summary": "요약 설명",
    "author": "도서 작가",
    "price": "가격",
    "likes": "좋아요 수"
  },
  {
    "title": "도서 제목",
    "summary": "요약 설명",
    "author": "도서 작가",
    "price": "가격",
    "likes": "좋아요 수"
  }
]
### 2. 개별 도서 조회
Method: GET
URI: /books/{bookId}
HTTP status code: 200
Request Body: X
Response Body:
{
  "id": "도서 id",
  "title": "도서 제목",
  "category": "카테고리",
  "format": "포맷",
  "isbn": "isbn",
  "summary": "요약 설명",
  "description": "상세 설명",
  "author": "도서 작가",
  "pages": "쪽수",
  "index": "목차",
  "price": "가격",
  "likes": "좋아요 수",
  "pubDate": "출판일",
  "liked": "boolean"
}
### 3. 카테고리별 도서 목록 조회
Method: GET
URI: /books?categoryId={categoryId}&new={boolean}
HTTP status code: 200
Request Body: 없음
Response Body:
[
  {
    "id": "도서 id",
    "title": "도서 제목",
    "summary": "요약 설명",
    "author": "도서 작가",
    "price": "가격",
    "likes": "좋아요 수",
    "pubDate": "출판일"
  },
  {
    "id": "도서 id",
    "title": "도서 제목",
    "summary": "요약 설명",
    "author": "도서 작가",
    "price": "가격",
    "likes": "좋아요 수",
    "pubDate": "출판일"
  }
]

## 좋아요 API
### 1. 좋아요 추가
Method: PUT
URI: /likes/{bookId}
HTTP status code: 200
Request Body: X
Response Body: X
### 2. 좋아요 취소
Method: PUT
URI: /likes/{bookId}
HTTP status code: 200
Request Body: X
Response Body: X

## 장바구니 API
### 1. 장바구니 담기
Method: POST
URI: /cart
HTTP status code: 201
Request Body:
{
  "bookid": "도서 id",
  "count": "수량"
}
Response Body: 없음
### 2. 장바구니 조회
Method: GET
URI: /cart
HTTP status code: 200
Request Body: 없음
Response Body:
[
  {
    "bookid": "도서 id",
    "title": "도서 제목",
    "summary": "도서 요약",
    "count": "수량",
    "price": "가격"
  },
  {
    "bookid": "도서 id",
    "title": "도서 제목",
    "summary": "도서 요약",
    "count": "수량",
    "price": "가격"
  }
]
### 3. 장바구니 도서 삭제
Method: DELETE
URI: /cart/{bookId}
HTTP status code: 200
Request Body: X
Response Body: X

## 결제(주문) API

결제하기 -> 주문하기 -> 주문 등록 = 데이터베이스 주문 insert
-> 장바구니에서 주문된 상품은 delete

### 1. 주문 등록 API
Method: POST
URI: /orders
HTTP status code: 성공 200
Request Body:
{
    "items": [
        {
            "cartItemId": "장바구니 도서 id",
            "bookId": "도서 id",
            "count": "수량"
        },
        {
            "cartItemId": "장바구니 도서 id",
            "bookId": "도서 id",
            "count": "수량"
        }
    ],
    "delivery": {
        "address": "주소",
        "receiver": "이름",
        "contact": "010-0000-0000"
    },
    "totalPrice": "총 금액"
}
Response Body:

### 2. 주문 목록(내역) 조회 API
Method: GET
URI: /orders
HTTP status code: 성공 200
Request Body: X

Response Body :
{
    "order_id": "주문 id",
    "created_at": "주문일자",
    "delivery": {
        "address": "주소",
        "receiver": "이름",
        "contact": "전화번호"
    },
    "bookTitle": "대표 책 제목",
    "totalPrice": "결제 금액",
    "totalCount": "총 수량"
}
### 3. 주문 상세 상품 조회 API
Method: GET
URI: /orders/{orderId}
HTTP status code: 성공 200
Request Body: X

Response Body 예시:
[
    {
        "bookId": "도서 id",
        "bookTitle": "도서 제목",
        "author": "작가명",
        "price": "가격",
        "count": "수량"
    },
    {
        "bookId": "도서 id",
        "bookTitle": "도서 제목",
        "author": "작가명",
        "price": "가격",
        "count": "수량"
    }
]

# API 설계 과정
## 결제 과정
1. 사용자가 장바구니에 담긴 상품을 주문한다.
2. 주문 정보가 데이터베이스에 저장된다.
3. 주문이 완료된 상품들은 장바구니에서 제거된다.

### 주문 등록 API
요청 시 배송 정보와 결제 금액, 그리고 장바구니 상품 목록을 담아 서버로 보내면, 서버는 이 정보를 바탕으로 주문을 확정하고 데이터베이스에 저장한다. 
주문이 완료되면 해당 상품들은 장바구니에서 제거된다.

### 주문 목록 조회 API
요청에 별도의 본문은 필요 없으며, 응답으로 주문 정보들(주문 ID, 주문 날짜, 배송 정보, 대표 도서 제목, 총 결제 금액, 총 수량 등)을 반환한다.

### 주문 상세 상품 조회 API
orderId를 경로에 포함하여 요청하면, 해당 주문에 포함된 모든 책의 상세 정보를(제목, 작가, 가격, 수량 등) 배열 형태로 반환한다.