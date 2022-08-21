---
slug:  modern-javascript-6-8
title: (모던 자바스크립트) 6-8 call/apply와 데코레이터, 포워딩
authors: malone
tags: [Javascript, Modern Javascript]
keywords: [javascript, call, apply, 자바스크립트]
---
<br/>

> 자바스크립트는 함수를 다룰 때 탁월한 유연성을 제공한다. 함수는 이곳저곳 전달될 수 있고, 객체로도 사용될 수 있다
> 

## 코드 변경없이 캐싱 기능 추가하기

CPU를 많이 잡아먹지만 결과는 안정적인 함수 slow(x)가 있다고 가정 할때, 결과가 안정적이라는 말은 x가 같으면 호출 결과도 같다는 것을 의미이다

slow(x)가 자주 호출된다면, 결과를 어딘가에 저장(캐싱)해 재연산에 걸리는 시간을 줄이고 싶을 것이다
```jsx
function slow(x) {
  // CPU 집약적인 작업이 여기에 올 수 있습니다.
  alert(`slow(${x})을/를 호출함`);
  return x;
}

function cachingDecorator(func) {
  let cache = new Map();

  return function(x) {
    if (cache.has(x)) {    // cache에 해당 키가 있으면
      return cache.get(x); // 대응하는 값을 cache에서 읽어옵니다.
    }

    let result = func(x);  // 그렇지 않은 경우엔 func를 호출하고,

    cache.set(x, result);  // 그 결과를 캐싱(저장)합니다.
    return result;
  };
}

slow = cachingDecorator(slow);

alert( slow(1) ); // slow(1)이 저장되었습니다.
alert( "다시 호출: " + slow(1) ); // 동일한 결과

alert( slow(2) ); // slow(2)가 저장되었습니다.
alert( "다시 호출: " + slow(2) ); // 윗줄과 동일한 결과
```