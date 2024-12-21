# 241220 강의 요약

## TRUNCATE
- 테이블의 모든 데이터를 빠르게 삭제하는 SQL 명령어이다. 데이터만 삭제하며 테이블 자체는 남아있다. AUTO_INCREMENT 값 역시 초기화된다.

## SET FOREIGN_KY_CHECKS = 0
- MySQL에서 외래키 제약 조건을 일시적으로 비활성화 하거나 다시 활성화 하는데에 사용된다. 외래키 제약조건을 비활성화 함으로써, 참조 무결성을 위반할 가능성이 있는 작업을 허용한다.
```
-- 외래 키 제약 조건 비활성화
SET FOREIGN_KEY_CHECKS = 0;

-- 테이블 데이터 삭제
TRUNCATE TABLE parent_table;

-- 외래 키 제약 조건 활성화
SET FOREIGN_KEY_CHECKS = 1;
```

## async와 await를 이용한 비동기 작업
- async는 항상 promise를 return한다는 특성을 이용해, 비동기 작업을 하고 싶은 부분을 **async를 이용한 모듈화**를 하고, promise를 return 받는다.
- 그 뒤 promise를 return받는 해당 모듈들을 통하여 비동기 작업을 진행한다.