---
slug:  modern-javascript-6-9
title: (모던 자바스크립트) 6-9 함수 바인딩
authors: malone
tags: [Javascript, Modern Javascript]
keywords: [javascript, function, bind, 자바스크립트]
---
<br/>

# (모던 자바스크립트) 6-9 함수 바인딩

## 사라진 this

`setTimeout`을 에서는 `this`가 어떻게 사라질까?

```jsx
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

setTimeout(user.sayHi, 1000); // Hello, undefined!
```

`this.firstName`이 John이 되어야 하는데, 얼럿창엔 `undefined`가 출력된다

이유는 `setTimeout`에 객체에서 분리된 함수인 `user.sayHi`가 전달되기 때문이다

```jsx
let f = user.sayHi;
setTimeout(f, 1000); // user 컨텍스트를 잃어버림
```

이를 해결하는 방법에는 무엇이 있을까?

## 방법 1:래퍼

```jsx
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

setTimeout(function() {
  user.sayHi(); // Hello, John!
}, 1000);
```

외부 렉시컬 환경에서 `user`를 받아서 보통 때처럼 메서드 호출했기 때문에 정상적으로 동작한다

```jsx
// 이렇게도 사용할 수 있다
setTimeout(() => user.sayHi(), 1000); // Hello, John!
```

이렇게 코드를 작성하면 간결해제서 보기는 좋지만, 약간의 취약성이 생긴다

`setTimeout`이 트리거 되기 전에 (1초가 지나기 전에) `user`가 변경되면, 변경된 객체의 메서드를 호출하게 된다

```jsx
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

setTimeout(() => user.sayHi(), 1000);

// 1초가 지나기 전에 user의 값이 바뀜
user = { sayHi() { alert("또 다른 사용자!"); } };

// setTimeout에 또 다른 사용자!
```

## 방법 2: bind

모든 함수는 this를 수정하게 해주는 내장 메서드 bind를 제공한다

```jsx
// 더 복잡한 문법은 뒤에 나옵니다.
let boundFunc = func.bind(context);
```

`func.bind(context)`는 함수처럼 호출 가능한 특수 객체를 반환한다. 이 객체를 호출하면 `this`가 `context`로 고정된 함수 `func`를 반환한다

따라서 `boundFunc`를 호출하면 `this`가 고정된 `func`를 호출하는 것과 동일한 효과를 봅니다.

```jsx
let user = {
  firstName: "John"
};

function func() {
  alert(this.firstName);
}

let funcUser = func.bind(user);
funcUser(); // John
```

func.bind(user)는 func의 this를 user로 바인딩한 변형 이라고 생각하면 된다

인수는 원본 함수 func에 그대로 전달 된다

```jsx
let user = {
  firstName: "John"
};

function func(phrase) {
  alert(phrase + ', ' + this.firstName);
}

// this를 user로 바인딩합니다.
let funcUser = func.bind(user);

funcUser("Hello"); // Hello, John (인수 "Hello"가 넘겨지고 this는 user로 고정됩니다.)
```

## 부분 적용

`this` 뿐만 아니라 인수도 바인딩이 가능하다. 인수 바인딩은 잘 쓰이지 않지만 가끔 유용할 때가 있다

```jsx
let bound = func.bind(context, [arg1], [arg2], ...);
```

`bind`는 컨텍스트를 `this`로 고정하는 것 뿐만 아니라 함수의 인수도 고정해준다
```jsx
function mul(a, b) {
  return a * b;
}

// bind를 사용해 새로운 함수 double을 만든다
let double = mul.bind(null, 2);

alert( double(3) ); // = mul(2, 3) = 6
alert( double(4) ); // = mul(2, 4) = 8
alert( double(5) ); // = mul(2, 5) = 10
```