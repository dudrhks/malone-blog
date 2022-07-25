---
slug:  modern-javascript-2-16
title: (모던자바스크립트) 2-16 함수 표현식
authors: malone
tags: [Javascript, Modern Javascript]
keywords: [javascript, function expressions, 함수 표현식, 모던 자바스크립트]
---
<br/>

> 함수 선언 방식 외에 함수 표현식을 사용해서 함수를 만들 수 있다
> 

사용법

```tsx
let sayHi = function() {
  alert( "Hello" );
};
```

함수를 생성하고 변수에 값을 할당하는 것처럼 함수가 변수에 할당 되었다. 함수가 어떤 방식으로 만들어졌는지에 관계없이 함수는 값이고, 따라서 변수에 할당할 수 있다.

함수 표현식을 간단한 말로 풀면 다음과 같다. “함수를 만들고 그 함수를 변수에 할당하기”

```tsx
function sayHi() {
  alert( "Hello" );
}

alert( sayHi ); // 함수 코드가 보임
```

마지막 줄에서 `sayHi` 옆에 괄호가 없기 때문에 함수는 실행되지 않는다. 어떤 언어에선 괄호 없이 함수 이름만 언급해도 함수가 실행된다. 하지만 자바스크립트는 괄호가  있어야만 함수가 호출된다.

변수를 복사해 다른 변수에 할당하는 것처럼 함수를 복사해 다른 변수에 할당할 수 있다

```tsx
function sayHi() {   // (1) 함수 생성
  alert( "Hello" );
}

let func = sayHi;    // (2) 함수 복사

func(); // Hello     // (3) 복사한 함수를 실행(정상적으로 실행됩니다)!
sayHi(); // Hello    //     본래 함수도 정상적으로 실행됩니다.
```

<aside>
💡 함수 표현식은 같은 구문 안에서 값의 역할을 한다. 코드 블록이 아니고 값처럼 취급되어 변수에 할당된다. 모든 구문의 끝엔 세미 콜론`;` 을 붙이는 게 좋다. 함수 표현식에 쓰인 세미 콜론은 함수 표현식 때문이기 때문에 붙여진게 아니라, 구문의 끝이기 때무에  붙여졌다

</aside>

## 콜백함수

```tsx
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}

function showOk() {
  alert( "동의하셨습니다." );
}

function showCancel() {
  alert( "취소 버튼을 누르셨습니다." );
}

// 사용법: 함수 showOk와 showCancel가 ask 함수의 인수로 전달됨
ask("동의하십니까?", showOk, showCancel);
```

함수 `ask` 의 인수 `showOk`와 `showCancel`은 콜백함수 또는 콜백이라고 불린다

함수를 함수의 인수로 전달하고, 필요하다면 인수로 전달한 그 함수를 “나중에 호출(called back)”하는 것이 콜백 함수의 개념이다.

```tsx
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}

ask(
  "동의하십니까?",
  function() { alert("동의하셨습니다."); },
  function() { alert("취소 버튼을 누르셨습니다."); }
);
```

`ask(…)` 안에 함수가 선언된 것 처럼 이름 없이 선언한 함수는 **익명 함수(anonymous function)**라고 부른다

<aside>
💡 **함수는 “동작"을 나타내는 값이다.**

</aside>

## 함수 표현식 vs 함수 선언문

> 함수 표현식과 선언문의 차이
> 

### 첫번째

- 함수 선언문: 함수는 주요 코드 흐름 중간에 독자적인 구문 형태로 존재한다
    
    ```tsx
    // 함수 선언문
    function sum(a, b) {
      return a + b;
    }
    ```
    
- 함수 표현식: 함수는 표현식이나 구문 구성 내부에 생성된다. 아래 예시에선 함수가 함당 연산자 `=` 를 이용해 만든 “할당 표현식" 우측에 생성되었다
    
    ```tsx
    // 함수 표현식
    let sum = function(a, b) {
      return a + b;
    };
    ```
    

### 두번째

자바스크립트 엔진이 언제 함수를 생성하는지에 따라 차이를 보인다

**함수 표현식은 실제 실행 흐름이 해당 함수에 도달했을 때 함수를 생성한다. 따라서 실행 흐름이 함수에 도달했을 때부터 해당 함수를 사용할 수 있다**

**함수 선언문은 함수 선언문이 정의되기 전에도 호출할 수 있다**

전역 함수 선언문은 스크립트 어디에 있는냐에 상관없이 어디든지 사용할 수 있다

자바스크립트는 스크립트를 실행하기 전, 준비단계에서 전역에 선언된 함수 선언문을 찾고, 해당 함수를 생성한다. 스크립트가 진짜 실행되기 전 “초기화 단계"에서 함수 선언 방식으로 정의한 함수가 생성된다

스크립트는 함수 선언문이 모두 처리된 이후에서야 실행된다. 따라서 스크립트 어디서든 함수 선언문으로 선언한 함수에 접근 할 수 있다

함수 선언문, `sayHi`는 스크립트 실행 준비 단계에서 생성되기 때문에, 스크립트 내 어디에서든 접근할 수 있습니다.

```tsx
sayHi("John"); // Hello, John

function sayHi(name) {
  alert( `Hello, ${name}` );
}
```

### 세번째

**엄격 모드에서 함수 선언문이 코드 블록 내에 위치하면 해당 함수는 블록 내 어디서든 접근할 수 있다. 하지만 블록 밖에서는 함수에 접근하지 못한다**

```tsx
let age = 16; // 16을 저장했다 가정합시다.

if (age < 18) {
  welcome();               // \   (실행)
                           //  |
  function welcome() {     //  |
    alert("안녕!");        //  |  함수 선언문은 함수가 선언된 블록 내
  }                        //  |  어디에서든 유효합니다
                           //  |
  welcome();               // /   (실행)

} else {

  function welcome() {
    alert("안녕하세요!");
  }
}

// 여기는 중괄호 밖이기 때문에
// 중괄호 안에서 선언한 함수 선언문은 호출할 수 없습니다.

welcome(); // Error: welcome is not defined
```

 

함수 표현식을 사용하면 밖에서 호출할 수 있다
```tsx
let age = prompt("나이를 알려주세요.", 18);

let welcome;

if (age < 18) {

  welcome = function() {
    alert("안녕!");
  };

} else {

  welcome = function() {
    alert("안녕하세요!");
  };

}

welcome(); // 제대로 동작합니다.
```