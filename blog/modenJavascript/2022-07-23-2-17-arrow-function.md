---
slug:  modern-javascript-2-17
title: (모던자바스크립트) 2-17 화살표 함수 기본
authors: malone
tags: [Javascript, Modern Javascript]
keywords: [javascript, arrow function, 화살표 함수, 모던 자바스크립트]
---
<br/>

> 화살표 함수는 함수 표현식 보다 단순하고 간결한 문법으로 함수를 만들 수 있다
> 

```tsx
let func = (arg1, arg2, ...argN) => expression
```

이렇게 코드를 작성하면 인자 `arg1..argN`를 받는 함수 `func`이 만들어집니다. 함수 `func`는 화살표(`=>`) 우측의 `표현식(expression)`을 평가하고, 평가 결과를 반환합니다.

- 인수가 하나밖에 없다면 인수를 감싸는 괄호를 생략할 수 있다.

```tsx
let double = n => n * 2;
// let double = function(n) { return n * 2 }과 거의 동일합니다.

alert( double(3) ); // 6
```

- 하나도 없을 땐 괄호를 비워놓으면 됩니다. 다만, 이 때 괄호는 생략할 수 없습니다.

```tsx
let sayHi = () => alert("안녕하세요!");

sayHi();
```

## 본문이 여러 줄인 화살표 함수

소개해 드린 화살표 함수들은 `=>` 왼쪽에 있는 인수를 이용해 `=>` 오른쪽에 있는 표현식을 평가하는 함수이다

평가해야 할 표현식이나 구문이 여러 개인 함수가 있을 수도 있다. 이 경우 역시 화살표 함수 문법을 사용해 함수를 만들 수 있다. 이때는 중괄호 안에 평가해야 할 코드를 넣어주어야 한다. 그리고 `return` 지시자를 사용해 명시적으로 결과값을 반환해 주어야 한다

```tsx
let sum = (a, b) => {  // 중괄호는 본문 여러 줄로 구성되어 있음을 알려줍니다.
  let result = a + b;
  return result; // 중괄호를 사용했다면, return 지시자로 결괏값을 반환해주어야 합니다.
};

alert( sum(1, 2) ); // 3
```