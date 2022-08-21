---
slug:  modern-javascript-6-7
title: (모던 자바스크립트) 6-7 setTimeout과 setInterval을 이용한 호출 스케줄링
authors: malone
tags: [Javascript, Modern Javascript]
keywords: [javascript, setTimeout, setInterval을, 자바스크립트]
---
<br/>

# (모던 자바스크립트) 6-7 ****setTimeout과 setInterval을 이용한 호출 스케줄링****

> 일정 시간이 지난 후에 원하는 함수를 예약 실행(호출)할 수 있게 하는 것을 ‘호출 스케일링’이라고 한다
> 

- `setTimeout`을 이용해 일정 시간이 지난 후에 함수를 실행하는 방법
- `setInterval`을 이용해 일정 시간 간격을 두고 함수를 실행하는 방법

자바스크립트 명세서엔 `setTimeout`과 `setInterval`가 명시되어있지 않습니다. 하지만 시중에 나와 있는 모든 브라우저, Node.js를 호함한 자바스크립트 호스트 환경 대부분이 이와 유사한 메서드와 내부 스케쥴러를 지원한다

## setTimeout

```jsx
let timerId = setTimeout(func|code, [delay], [arg1], [arg2], ...)
```

매개변수

`func|code`

실행하고자 하는 코드로, 함수 또는 문자열 형태이다. 대게는 이 자리에 함수가 들어간다. 하위 호환성을 위해 문자열도 받을 수 있게 해놓았지만 추천하지 않는다

`delay`

실행 전 대기 시간으로, 단위는 밀리초이며 기본값은 0이다

`arg1, arg2..`

함수에 전달할 인수들로, IE( 이하에선 지원하지 않는다

```jsx
function sayHi() {
  alert('안녕하세요.');
}

setTimeout(sayHi, 1000);

// 함수에 인수를 넘겨 줄 수 있다
function sayHi(who, phrase) {
  alert( who + ' 님, ' + phrase );
}

setTimeout(sayHi, 1000, "홍길동", "안녕하세요."); // 홍길동 님, 안녕하세요.
```

`setTimeout`의 첫 번째 인수가 문자열이면 자바스크립트는 이 문자열을 이용해 함수를 만든다

```jsx
setTimeout("alert('안녕하세요.')", 1000);
```

그런데 이렇게 문자열을 사용하는 방법은 추천하지 않습니다. 되도록 다음 예시와 같이 익명 화살표 함수를 사용하세요.

```jsx
setTimeout(() => alert('안녕하세요.'), 1000);
```

**💡 함수를 실행하지 말고 넘기겨야 한다**

초보 개발자는 `setTimeout`에 함수를 넘길 떄 함수에 `()`을 붙이는 실수를 하고 한다

### clearTimeout으로 스케줄링 취소하기

`setTimeout`을 호출하면 타이머 식별자가 반환된다. 스케줄링을 취소하고 싶을 떈 이 식별자를 사용하면 된다

```jsx
let timerId = setTimeout(...);
clearTimeout(timerId);

// 예시
let timerId = setTimeout(() => alert("아무런 일도 일어나지 않습니다."), 1000);
alert(timerId); // 타이머 식별자

clearTimeout(timerId);
alert(timerId); // 위 타이머 식별자와 동일함 (취소 후에도 식별자의 값은 null이 되지 않습니다.)
```

## setInterval

`setInterval` 메서드는 `setTimeout`과 동일한 문법을 사용한다

```jsx
let timerId = setInterval(func|code, [delay], [arg1], [arg2], ...)
```

`setTimeout`이 함수를 단 한번만 실행하는 것과 달리 `setInterval`은 함수를 주기적으로 실행하게 한다

함수 호출을 중단하려면 `clearInterval()`을 사용하면 된다

```jsx
// 2초 간격으로 메시지를 보여줌
let timerId = setInterval(() => alert('째깍'), 2000);

// 5초 후에 정지
setTimeout(() => { clearInterval(timerId); alert('정지'); }, 5000);
```

**💡 alert창이 떠 있더라도 타이머는 멈추지 않는다**

## 대기 시간이 0인 setTimeout

`setTimeout(func, 0)`이나 `setTimeout(func)`을 사용하면 `setTimeout`의 대기 시간을 0으로 설정할 수 잇다

이렇게 대기 시간을 0으로 설정하면 `func` 을 가능한 한 빨리 실행할 수 있다. 이때 스케줄러는 현재 실행 중인 스크립트의 처리가 종료된 이후에 스케줄링한 함수를 실행한다

이런 특징을 이용하면 현재 스크립트의 실행이 종료된 직후에 원하는 함수가 실행될 수 있게 할 수 있다

```jsx
setTimeout(() => alert("World"));

alert("Hello");
```