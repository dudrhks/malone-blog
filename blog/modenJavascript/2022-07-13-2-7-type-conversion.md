---
slug:  modern-javascript-2-7
title: (모던 자바스크립트) 2-6 alert, prompt, confirm을 이용한 상호작용
authors: malone
tags: [Javascript, Modern Javascript]
keywords: [javascript, type, conversion, 형 변환, 모던 자바스크립트]
---
<br/>

> 함수와 연산자에 전달되는 값은 대부분 적잘한 자료형으로 자동 변환되는데 이런 과정을 형 변환(type conversion) 이라고 한다
> 

## 문자형으로 형 변환

문자형으로의 형 변환은 문자형의 값이 필요할 때 일어난다

`alert`는 매개변수를 문자형을 받기 때문에 `alert(value)`에서 value는 문형이어햐 하는데 만약 다른 형의 값을 전달 받으면 이 값을 문자형으로 변환 해서 보여준다

```tsx
let value = true;
alert(typeof value); // boolean

value = String(value); // 변수 value엔 문자열 "true"가 저장됩니다.
alert(typeof value); // string
```

## 숫자형으로 변환

숫자형으로 변환은 수학과 관련된 함수와 표현식에서 자동으로 일어나는데 숫자형이 아닌 값에 / 를 적용한 경우 같은 경우에 자동 으로 문자열을 숫자형으로 자동 변환 된 후 연산이 수행된다

```tsx
alert( "6" / "2" ); // 3, 문자열이 숫자형으로 자동변환된 후 연산이 수행됩니다.
```

`Number(value)` 함수를 사용하면 주어진 값(value)을 숫자형으로 명시해서 변환할 수 있다

```tsx
let str = "123";
alert(typeof str); // string

let num = Number(str); // 문자열 "123"이 숫자 123으로 변환됩니다.

alert(typeof num); // number
```

숫자 이외의 글자가 들어가 있는 문자열을 `Number`등을 통해 숫자형으로 변환하려고 하면, 결과는 `NaN`이 된다

```tsx
let age = Number("임의의 문자열 123");

alert(age); // NaN, 형 변환이 실패합니다.
```

### 숫자형으로 변환시 적용되는 규칙

| 전달 받은 값 | 형 변환후 |
| --- | --- |
| undefined | NaN |
| null | 0 |
| true and false | 1 과 0 |
| string | 문자열의 처음과 끝 공백이 제거됩니다. 공백 제거 후 남아있는 문자열이 없다면 , 그렇지 않다면 문자열에서 숫자를 읽습니다. 변환에 실패하면 NaN이 됩니다. |

## 불린형으로 변환

`Boolean(value)` 을 호출하면 명시적으로 불리언으로의 형 변환을 할 수 잇다

불린형으로 변환 시 적용되는 규칙이 있는데

- 숫자 `0`, 빈 문자열, `null`, `undefinded`, `NaN`과 같이 직관적으로도 “비어있다고” 느껴지는 값들은 `false` , 그 외는 값은 `true` 이다

```tsx
alert( Boolean(1) ); // 숫자 1(true)
alert( Boolean(0) ); // 숫자 0(false)

alert( Boolean("hello") ); // 문자열(true)
alert( Boolean("") ); // 빈 문자열(false)
```

<aside>
⚠️ **주의: 문자열 `"0"`은 `true`입니다.**

</aside>

PHP 등의 일부 언어에서는 `“0”` 을 `false`로 취급하지만. 자바스크립트에서는 비어 있지 않는 문자열은 언제나 `true`이다
```tsx
alert( Boolean("0") ); // true
alert( Boolean(" ") ); // 공백이 있는 문자열도 비어있지 않은 문자열이기 때문에 true로 변환됩니다.
```