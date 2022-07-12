---
slug:  modern-javacript-2-5
title: (모던 자바스크립트) 2-5 alert, prompt, confirm을 이용한 상호작용
authors: malone
tags: [Javacript, Moden Javacript]
keywords: [javascript, prompt, confirm, alert, 상호작용, 모던 자바스크립트]
---
<br/>

# [모던자바스크립트]2-6 ****alert, prompt, confirm을 이용한 상호작용****

> 브라운저 환경에서 사용되는 최소한의 사용자 인터페이스 기능을 알아본다
> 

## alert

`alert` 함수는 실행되면 사용자가 ‘확인(OK) 번튼을 누를 때 까지 메세지를 보여주는 창이 떠있는다

```tsx
alert("Hello");
```

## prompt

브라우저에서 제공하는 `prompt` 함수는 두 개의 인수를 받는다

```tsx
result = prompt(title, [default]);
```

함수가 실행 되면 텍스트 메세지와 입력필드, 확인 및 취소 버튼있는 창이 뜬다

`title`: 사용자에게 보여줄 문자열

`default`: 입력 필드의 초기값(선택값)

사용자는 `prompt` 입력필드에 입력값을 넣고 확인을 누르면 값을 전달할 수 있다. 취소나 `esc`를 누르면 값을 입력하지 않고 창을 종료 시킬수 있다

<aside>
⚠️ IE 에서는 항상 두번쨰 매개변수의 ‘기본값'을 넣어줘야한다.

</aside>

## comfirm

`confirm` 함수는 실행되면 매개변수로 받은 질문과 확인 취소 버튼이 있는 창을 뛰운다. 확인을 누리면 `true` 그 이외의 경우는 `false`를 반환한다