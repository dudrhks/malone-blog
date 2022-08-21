---
slug:  modern-javascript-6-6
title: (모던 자바스크립트) 6-6 new Function 문법
authors: malone
tags: [Javascript, Modern Javascript]
keywords: [javascript, new Function, 자바스크립트]
---
<br/>

> 함수 표현식과 함수 선언문 이외에 함수를 만들 수 있는 방법이 하나 더 있다
> 

## 문법

```jsx
let func = new Function ([arg1, arg2, ...argN], functionBody);
```

새로 만들어지는 함수는 인수 `arg1…argN`과 함수 본문 `functionBody`로 구성된다

```jsx
let sayHi = new Function('alert("Hello")');

sayHi(); // Hello
```

기존에 사용하던 방법과 `new Function`을 사용해 함수를 만드는 방법의 가장 큰 차이는 런타임에 받은 문자열을 사용해 함수를 만들 수 있다

함수 표현식과 함수 선언문은 개발자가 직접 스크립트를 작성해야만 함수를 만들 수 있었죠.

그러나 new Function이라는 문법을 사용하면 어떤 문자열도 함수로 바꿀 수 있다 서버에서 전달받은 문자열을 이용해 새로운 함수를 만들고 이를 실행하는 것도 가능하다

```jsx
let str = ... 서버에서 동적으로 전달받은 문자열(코드 형태) ...

let func = new Function(str);
func();
```

## 클로저

함수의 특별한 프로퍼티 `[[Environment]]` 에 저장된 정보를 이요해 자기 자신이 태어난 곳을 기억한다

`[[Environment]]` 는 함수가 만들어진 렉시컬 환경을 참조한다

`new Function`을 이용해 함수를 만들면 함수의 `[[Environment]]` 프로퍼티가 현재 렉시컬 환경이 아닌 전역 레시컬 환경을 참조하게 된다

따라서 `new Function`을 이용해 만든 함수는 외부 변수에 접근할 수 없고, 전역 변수에만 접근할 수 있다
```jsx
function getFunc() {
  let value = "test";

  let func = new Function('alert(value)');

  return func;
}

getFunc()(); // ReferenceError: value is not defined
```