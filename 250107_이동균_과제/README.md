# 250107 강의 요약

## 컴파일 언어를 이해해야 하는 이유
- 모든 프로그래밍 언어의 동작 원리는 거의 똑같다
- 자바스크립트와 같은 스크립트 언어로는 동작 원리를 이해하기 힘든 구조이다
- C언어의 변수와 데이터타입, 배열, 포인터 등의 동작 원리들은 자바스크립트 언어 동작의 근간을 이룬다
- 타입을 변수와 함수에 기본으로 사용해보면 타입스크립트를 더 쉽게 이해할 수 있다

## Hello World 출력
```
#include <stdio.h>

int main() {
    printf("Hello, World!\n");
    return 0;
}
```

## 변수
- 값을 저장하는 메모리 공간
- int : 정수 / float : 실수 / char : 문자 / float, double : 실수

## 상수
- 변경 할 수 없는 값
```
#define PI 3.14
const int MAX = 100;
```

## 데이터 입력
- scanf를 이용하여 데이터 입력받기 가능
```
#include <stdio.h>

int main() {
    int num;
    printf("숫자 입력: ");
    scanf("%d", &num);
    printf("입력한 숫자: %d\n", num);
    return 0;
}
```