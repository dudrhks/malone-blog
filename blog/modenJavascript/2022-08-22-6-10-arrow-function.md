---
slug:  modern-javascript-6-10
title: (모던 자바스크립트) 6-10 화살표 함수 다시 살표보기
authors: malone
tags: [Javascript, Modern Javascript]
keywords: [javascript, function, arrow, 자바스크립트]
---
<br/>
> 화살표 함수는 다순히 함수를 짧게 쓰기 위한 용도로 사용되지 않는다. 화살표 함수는 몇 가지 독특하고 유용한 기능을 제공한다
> 

## 화살표 함수에는 ‘this’가 없다

화살표함수엔 `this`를 없다. 화살표 함수 본문에서 `this`에 접근하면, 외부에서 값을 가져온다.

이런 특징은 객체의 메서드 안에서 동일 객체의 프로퍼티를 대상으로 순회를 하는 데 사용할 수 있다

```jsx
let group = {
  title: "1모둠",
  students: ["보라", "호진", "지민"],

  showList() {
    this.students.forEach(
      student => alert(this.title + ': ' + student)
    );
  }
};

group.showList();
```

위에서 `forEach`에서 화살표 함수를 사용했기 때문에 화살표 함수 본문에 있는 `this.title`은 화살표 함수 바깥에 있는 메서드인 `showList`가 가리키는 대상과 동일해진다. 즉 `this.title`은 `group.title`과 같다

**⚠️ 화살표 함수는 new와 함께 실행할 수 없다**

`this`가 없기 때문에 화살효 함수는 생성자 함수로 사용할 수 없다는 제약이 있다

**💡 화살표 함수 vs .bind**

화살효 함수와 일반 함수를 `.bind(this)`를 사용해서 호출하는 것 사이에는 미묘한 차이가 있다

- `.bind(this)`는 함수의 한정된 버전을 만든다
- 화살효 함수는 어떤 것도 바인딩시키지 않는다. 화살효 함수엔 단지 `this`가 없을 뿐이다. 화살효 함수에서 `this`를 사용하면 일반 변수 서칭과 마찬가지로 `this`의 값을 외부 렉시컬 환경에서 찾는다

## 화살표 함수엔 ‘arguments’가 없다

화살효 함수는 일반 함수와는 다르게 모든 인수에 접근할 수 있게 해주는 유사 배열 객체 `arguments`를 지원하지 않는다

이런 특징은 현재 `this` 값과 `arguments` 정보를 함께 실어 호출을 포워딩해 주는 데코레이터를 만들 때 유용하게 사용된다

```jsx
function defer(f, ms) {
  return function() {
    setTimeout(() => f.apply(this, arguments), ms)
  };
}

function sayHi(who) {
  alert('안녕, ' + who);
}

let sayHiDeferred = defer(sayHi, 2000);
sayHiDeferred("철수"); // 2초 후 "안녕, 철수"가 출력됩니다.
```