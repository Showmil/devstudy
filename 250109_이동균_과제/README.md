# 250109 과제

## 함수 포인터
- 함수포인터는 함수의 주소를 저장하는 포인터이다.
- 예시 코드
```
#include <stdio.h>

void sayHello() {
    printf("Hello, World!\n");
}

void execute(void (*funcPtr)()) {
    funcPtr();
}

int main() {
    void (*funcPtr)() = sayHello;
    execute(funcPtr);
    return 0;
}
```

## 구조체
- 구조체는 관련 데이터를 하나의 단위로 묶는 데에 사용한다.
- 예시 코드
```
#include <stdio.h>

struct Student {
    int id;
    char name[50];
    float grade;
};

int main() {
    struct Student student1 = {1, "이동균균", 89.5};
    printf("ID: %d, Name: %s, Grade: %.2f\n", student1.id, student1.name, student1.grade);
    return 0;
}
```

## enum
- 공용체라고도 하며, 상수를 정의하는 데 사용된다. 열거형 데이터 타입이고 연속된 자료일 때 쓰면 좋다.
- 예시 코드
```
#include <stdio.h>

enum Color { RED, GREEN, BLUE };

int main() {
    enum Color favoriteColor = GREEN;
    printf("좋아하는 색깔: %d\n", favoriteColor);  // 출력: 1
    return 0;
}
```

## 동적 메모리
- C에서 malloc 등의 방법을 이용하면, 메모리를 효율적으로 관리할 수 있다.
- 예시 코드
```
#include <stdio.h>
#include <stdlib.h>

int main() {
    int *arr = (int *)malloc(5 * sizeof(int));
    if (arr == NULL) {
        printf("동적 할당 실패패\n");
        return 1;
    }
    for (int i = 0; i < 5; i++) {
        arr[i] = i + 1;
    }
    for (int i = 0; i < 5; i++) {
        printf("%d ", arr[i]);
    }
    free(arr);
    return 0;
}
```

## 객체 지향 프로그래밍 방식
- **클래스**와 **객체**를 이용해 데이터와 메소드를 캡슐화하고 상속과 다형성을 지원하는 프로그래밍 방식
```
using System;

class Program {
    static void Main(string[] args) {
        Person person = new Person("이동균", 25);
        person.DisplayInfo();
    }
}

class Person {
    private string name;
    private int age;

    public Person(string name, int age) {
        this.name = name;
        this.age = age;
    }

    public void DisplayInfo() {
        Console.WriteLine($"Name: {name}, Age: {age}");
    }
}
```

## 추상화
- 추상 클래스와 인터페이스를 이용해, 불필요한 세부 사항을 숨기고 필요한 기능만 노출
```
using System;

abstract class Animal {
    public abstract void Speak();
}

class Dog : Animal {
    public override void Speak() {
        Console.WriteLine("Bark");
    }
}

class Program {
    static void Main() {
        Animal animal = new Dog();
        animal.Speak();
    }
}
```

## 캡슐화
- 데이터를 보호하고 외부로부터 불필요한 접근을 차단하는 것을 의미한다.
- 예시 코드
```
using System;

class BankAccount {
    private double balance;

    public double Balance {
        get { return balance; }
        set {
            if (value >= 0) {
                balance = value;
            }
        }
    }
}

class Program {
    static void Main() {
        BankAccount account = new BankAccount();
        account.Balance = 1000;
        Console.WriteLine(account.Balance);
    }
}
```

## 클래스
- 객체를 생성하기 위한 설계도라고 볼 수 있다. 데이터, 메소드, 생성자, 소멸자 등으로 구성된다.
- 예시 코드
```
using System;

class Car {
    public string Brand { get; set; }
    public string Model { get; set; }

    public void DisplayInfo() {
        Console.WriteLine($"Brand: {Brand}, Model: {Model}");
    }
}

class Program {
    static void Main() {
        Car car = new Car { Brand = "Toyota", Model = "Corolla" };
        car.DisplayInfo();
    }
}
```

## 생성자
- 객체가 생성될 때 자동으로 호출되는 메소드로, 일반적으로 초기화 작업을 실행한다.
```
using System;

class Person {
    public string Name { get; set; }

    public Person(string name) {
        Name = name;
    }

    public void Greet() {
        Console.WriteLine($"Hello, {Name}!");
    }
}

class Program {
    static void Main() {
        Person person = new Person("Alice");
        person.Greet();
    }
}
```

## 상속
- 기존 클래스의 기능을 기반으로 새로운 클래슬르 만드는 작업이다. 코드 재사용성과 유지보수 용이성에 장점을 가져 코딩 시간을 대폭 줄일 수 있다.
- 예시 코드 
```
using System;

class Animal {
    public void Eat() {
        Console.WriteLine("This animal eats food.");
    }
}

class Dog : Animal {
    public void Bark() {
        Console.WriteLine("The dog barks.");
    }
}

class Program {
    static void Main() {
        Dog dog = new Dog();
        dog.Eat();
        dog.Bark();
    }
}
```

## 오버로딩
- 메소드의 이름은 같으나 서로 다른 매개변수를 가져 다른 메소드로 취급되는 것을 의미한다.
- 예시 코드 
```
using System;

class MathOperations {
    public int Add(int a, int b) {
        return a + b;
    }

    public double Add(double a, double b) {
        return a + b;
    }
}

class Program {
    static void Main() {
        MathOperations math = new MathOperations();
        Console.WriteLine(math.Add(2, 3));
        Console.WriteLine(math.Add(2.5, 3.5));
    }
}
```

## 오버라이딩
- 부모 클래스의 메소드를 자식 클래스에서 재정의하는 것을 의미한다.
- 예시 코드
```
using System;

class Animal {
    public virtual void Speak() {
        Console.WriteLine("동물이 말한다.");
    }
}

class Cat : Animal {
    public override void Speak() {
        Console.WriteLine("야옹옹");
    }
}

class Program {
    static void Main() {
        Animal animal = new Cat();
        animal.Speak();
    }
}
```

## 인터페이스
- 인터페이스는 메소드와 속성의 **선언** 만을 포함하며, 이를 구현하는 클래스에서 정의해야 한다.
```
using System;

interface IShape {
    double GetArea();
}

class Circle : IShape {
    private double radius;

    public Circle(double radius) {
        this.radius = radius;
    }

    public double GetArea() {
        return Math.PI * radius * radius;
    }
}

class Program {
    static void Main() {
        IShape circle = new Circle(5);
        Console.WriteLine($"Area: {circle.GetArea()}");
    }
}
```