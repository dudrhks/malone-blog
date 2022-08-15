---
slug:  modern-javascript-6-3
title: (모던 자바스크립트) 6-3 변수의 유효범위와 클로저
authors: malone
tags: [Javascript, Modern Javascript]
keywords: [javascript, 유효범위, 클로져 자바스크립트]
---
<br/>

## 코드 블록

코드 블록 `{…}` 안에서 선언한 변수는 블록 안에서만 사용할 수 있다

```jsx
{
  // 지역 변수를 선언하고 몇 가지 조작을 했지만 그 결과를 밖에서 볼 수 없습니다.

  let message = "안녕하세요."; // 블록 내에서만 변숫값을 얻을 수 있습니다.

  alert(message); // 안녕하세요.
}

alert(message); // ReferenceError: message is not defined
```

`if`, `for`, `while` 등에서도 마찬가지로 `{...}` 안에서 선언한 변수는 오직 블록 안에서만 접근 가능합니다.

```jsx
if (true) {
  let phrase = "안녕하세요!";

  alert(phrase); // 안녕하세요!
}

alert(phrase); // ReferenceError: phrase is not defined
```

## 중첩 함수

함수 내부에서 선언한 함수는 중첩 함수라고 부른다
```jsx
function sayHiBye(firstName, lastName) {

  // 헬퍼(helper) 중첩 함수
  function getFullName() {
    return firstName + " " + lastName;
  }

  alert( "Hello, " + getFullName() );
  alert( "Bye, " + getFullName() );

}
```