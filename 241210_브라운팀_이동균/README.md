# 241210 강의 요약

```
// 전체 도서 조회
router.get('/', (req, res) => {
    
})
// 개별 도서 조회
router.get('/books/:id', (req, res) => {

})
// 카테고리별 도서 목록 조회
router.get('/books', (req, res) => {

})

// 장바구니 조회
router.get('/carts', (req, res) => {
    
})
// 장바구니 도서 삭제
router.delete('/carts/:id', (req, res) => {

})
// 장바구니에서 선택한 주문 예상 상품 목록 조회
router.get('/carts', (req, res) => {

})

// 좋아요 추가
router.post('/likes/:id', (req, res) => {

})
// 좋아요 삭제
router.post('/books/:id', (req, res) => {

})

// 주문 하기
router.post('/orders', (req, res) => {
    
})
// 주문 목록 조회
router.get('/orders', (req, res) => {

})
// 주무나 상세 상품 조회
router.get('/orders/:id', (req, res) => {

})

// 회원가입
router.post('/join', (req, res) => {

})
// 로그인
router.post('/login', (req, res) => {

})
// 비밀번호 초기화 요청
router.post('/reset', (req, res) => {

})
// 비밀번호 초기화
router.put('/reset', (req, res) => {

})



```