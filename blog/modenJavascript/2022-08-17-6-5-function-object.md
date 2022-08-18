---
slug:  modern-javascript-6-5
title: (모던 자바스크립트) 6-5 객체로서의 함수와 기명 함수 표현식
authors: malone
tags: [Javascript, Modern Javascript]
keywords: [javascript, var, 자바스크립트]
---
<br/>

## name 프로퍼티

name 프로퍼티를 사용하면 함수 이름을 가져올 수 있다

```jsx
function sayHi() {
  alert("Hi");
}

alert(sayHi.name); // sayHi
```

익명 함수라도 자동으로 이름이 할당된다

```jsx
let sayHi = function() {
  alert("Hi");
};

alert(sayHi.name); // sayHi (익명 함수이지만 이름이 있네요!)
```

## length 프로퍼티

내장 프로퍼티 `length`는 함수 매개변수의 개수를 반환합니다. 예시를 살펴봅시다.

```jsx
function f1(a) {}
function f2(a, b) {}
function many(a, b, ...more) {}

alert(f1.length); // 1
alert(f2.length); // 2
alert(many.length); // 2
```

## 기명 함수 표현식

기명 함수 표현식은 이름이 있는 함수 표현식을 나타내는 용어이다

```jsx
let sayHi = function(who) {
  alert(`Hello, ${who}`);
};

// 이름을 붙였을때
let sayHi = function func(who) {
  alert(`Hello, ${who}`);
};
```

sayHi로 호출하는 것은 계속 가능하다. 그러면 func과 같은 이름을 붙였을 때 두가지 변화가 생기는데

- 이름을 사용해 함수 표현식 내부에서 자기 자신을 참조할 수 있다
- 기명 함수 표현식 외부에선 그 이름을 사용할 수 없다

```jsx
let sayHi = function func(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
    func("Guest"); // func를 사용해서 자신을 호출합니다.
  }
};

sayHi(); // Hello, Guest

// 하지만 아래와 같이 func를 호출하는 건 불가능합니다.
func(); // Error, func is not defined (기명 함수 표현식 밖에서는 그 이름에 접근할 수 없습니다.)

// 실제 사용 예시
let sayHi = function func(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
    func("Guest"); // 원하는 값이 제대로 출력됩니다.
  }
};

let welcome = sayHi;
sayHi = null;

welcome(); // Hello, Guest (중첩 호출이 제대로 동작함)
```