# 241216 강의 요약

## COUNT()
- 특정 조건에 맞는 데이터의 개수를 세는 SQL 집계 함수로 테이블 내 행의 개수를 세거나 특정 조건에 부합하는 데이터의 개수를 확인할 때 사용
- 예시 코드
```
SELECT COUNT(*) FROM employees;
```

## AS
- SQL에서 별칭을 부여하는 데 사용
- 예시 코드
```
SELECT first_name AS "First Name", last_name AS "Last Name" FROM employees;
```

## 서브쿼리
- SQL 문 안에서 다른 SQL 쿼리를 중첩하여 사용하는 방법
- 예시 코드
```
SELECT first_name, salary
FROM employees
WHERE department_id = (
    SELECT department_id
    FROM departments
    WHERE department_name = 'Sales'
);
```