---
slug:  modern-javacript-2-3
title: (모던 자바스크립트) 2-3 strict mode
authors: malone
tags: [Javacript, Moden Javacript]
keywords: [javascript, 엄격 모드, strict mode, 모던 자바스크립트]
---
<br/>

> strict mode(엄격모드)는 ES5 부터 추가된 모드로 strict mode는 자바스크립트 언어의 문법을 좀 더 엄격히 적용하여 오류를 발생시킬 가능성이 높거나 자바스크립트 엔진의 최적화 작어에 문제를 일으킬 수 있는 코드에 대해 에러를 발생시킨다.
> 

## strict mode의 사용법

strict mode를 적용하려면 전역의 선두 또는 함수 몸체의 선두에 `‘use strict’;` 를 추가한다. 전역의 선두에 추가하면 스크립트 전체에 엄격모드가 실행된다

```jsx
"use strict";

// 이 코드는 모던한 방식으로 실행됩니다.
...
```

## strict mode 사용시 주의점

<aside>
⚠️  **"use strict"는 반드시 최상단에 위치시켜야한다**

</aside>

`“use strict”`는 스크립트 최상단에 있어야한다. 그렇지 않으면 엄격모드가 활성화 되지 않을 수도 있다

```jsx
alert("some code");
// 하단에 위치한 "use strict"는 스크립트 상단에 위치하지 않으므로 무시됩니다.

"use strict";

// 엄격 모드가 활성화되지 않습니다.
```

`"use strict"`의 위에는 주석만 사용할 수 있습니다.

## strict mode가 발생시키는 에러

### 암묵적 전역

선언하지 않는 변수를 참조하면 ReferenceErrorr가 발생한다.

```jsx
(function(){
	'use strict';

	x = 1;
	console.log(x); // ReferenceError: x is not defined
}());
```

### 변수, 함수, 매개변수의 삭제

delete 연산자로 변수, 함수, 매개변수를 삭제하면 SyntaxError가 발생한다.

```jsx
(function(){
	'use strict';

	var x = 1;
	delete x; // SyntaxError: Delete of an unqualified indentifier in strict mode.
}());
```

### 매개변수 이름의 중복

중복된 매개변수 이름을 사용하면 SyntaxErrorr가 발생한다

```jsx
(function(){
	'use strict';

	// SyntaxError: Duplicate parameter name not allowded in this context
	function foo(x, x){
		return x + x;
	}
	console.log(foo(1.2));
}());
```

### with 문의 사용

## strict mode 선언시 발생하게 되는 변화

### 일반함수의 this

strict mode에서 함수를 일반 함수로서 호출하면 this에 undefined가 바인딩된다. 생성자 함수가 아닌 일반 함수 내부에서는 this를 사용할 필효가 없기 때문이다.

### arguments 객체

strict mode에서는 매개변수에 전달된 인수을 재할당하여 변경해도 arguments 객체에 반영되지 않는다.