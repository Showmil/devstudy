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

## 주문 API
### 1. 장바구니에서 선택한 주문 상품 목록 조회
Method: GET
URI: /orders
HTTP status code: 200
Request Body: 없음
Response Body:
[
  {
    "cartItemId": "장바구니 도서 id",
    "bookId": "도서 id",
    "title": "도서 제목",
    "summary": "도서 요약",
    "count": "수량",
    "price": "가격"
  },
  {
    "cartItemId": "장바구니 도서 id",
    "bookId": "도서 id",
    "title": "도서 제목",
    "summary": "도서 요약",
    "count": "수량",
    "price": "가격"
  }
]