**회원 API 설계**

**✅ SELECT**  
1) **로그인**: `POST /login`  
   - req: body (`email`, `password`)  
   - res: `${name}님 환영합니다` // 👉🏻 메인 페이지  

**✅ INSERT**  
2) **회원 가입**: `POST /join`  
   - req: body (`email`, `name`, `pwd`, `contact`)  
   - res: `${name}님 환영합니다` // 👉🏻 로그인 페이지  

**✅ SELECT**  
3) **회원 개별 "조회"**: `GET /users`  
   - req: body (`email`)  
   - res: 회원 객체를 통으로 전달  

**✅ DELETE**  
4) **회원 개별 "탈퇴"**: `DELETE /users`  
   - req: body (`email`)  
   - res: `${name}님 다음에 또 뵙겠습니다.` 👉🏻 or 메인 페이지  




**채널 API 설계 (URL, http method/status, req/res)**

1) **INSERT ✅ 채널 "생성"**:  
   - `POST /channels`  
   - req: body (`name`, `user_id`) cf. `userId`는 body ✖ header 숨겨서.. Token  
   - res 201: `${name}`님 채널을 응원합니다. 👉🏻 다른 페이지 띄워주고 싶어.. ex. 채널 관리 페이지  

2) **UPDATE ✅ 채널 개별 "수정"**:  
   - `PUT /channels/:id`  
   - req: URL (`id`), body (`name`)  
   - res 200: `채널명이 성공적으로 수정되었습니다. 기존: ${} -> 수정: ${}`  

3) **DELETE ✅ 채널 개별 "삭제"**:  
   - `DELETE /channels/:id`  
   - req: URL (`id`)  
   - res 200: `${name}`이 정상적으로 삭제되었습니다 👉🏻 메인 페이지...  

4) **SELECT ✅ 회원의 채널 전체 "조회"**:  
   - `GET /channels`  
   - req: body (`user_id`)  
   - res 200: 채널 전체 데이터 list, json array  

5) **SELECT ✅ 채널 개별 "조회"**:  
   - `GET /channels/:id`  
   - req: URL (`id`)  
   - res 200: 채널 개별 데이터  