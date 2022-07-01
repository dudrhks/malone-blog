---
slug:  axios-common-request
title: React 프로젝트 에서 Axios request 공통 로직 작성해보기(feat:typescript)
authors: malone
tags: [Axios, Javascript, Typescript, React]
---
<br/>
> react 프로젝트에서 반복되는 axios request 요청을 할 때 반복되는 코드를 줄일 수 없을까를 고민해 보았다
> 

## 기본적인 요청로직

일반적으로 내가 react 프로젝트에서 사용했던 axios request 로직은 아래와 같다

```jsx
import axios from 'axios';

// 인스턴스 생성
export const axiosInstance = axios.create({
  baseURL: '/api',
  headers: {
		'Content-Type': 'application/json'
  },
});

export async function login(params: LoginReq) {
  const { data } = await axiosAuthInstance.post<LoginRes>('/auth/login', params);
  return data;
}

export async function userInfo(params: UserInfoReq) {
  const { data } = await axiosAuthInstance.get<InfoRes>('/auth/userInfo', { params  });
  return data;
}
```

## 😡 반복되는 로직

위의 코드 처럼 사용하다보니 실제 호출하는 로직을 작성할때 항상 async, await, 결과값 리턴 로직을 반복해서 작성하다보니 좀더 반복되는 코드들을 줄 일 수 없을 까를 생각하게 되었다.

그래서 생각하다가 공통으로 처리 할 수 있는 부분을 추려 새로운 함수를 생성하는 방법을 사용해보게 되었다

## 공통 request 함수 생성

### instance 생성

```tsx
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});
```

### request 함수 생성

```tsx
export async function request({ method = 'GET', url, params }) {
	let data; 
	// GET method가 아니면 data 변수에 params를 담아준다
	if(params && method !== "GET") data = params
	
	// method는 기본설정은 GET으로 설정
  const { data } = await api.request({ method: method || 'GET', url, ...(data ? { data } : { params }) });
  return data;
}
```

### 타입스크립트 선언

- response type을 제네릭 타입으로 받을 수 있도록 선언
- AxiosRequestConfig 의 매소드를 사용할 수 있게 선언

```tsx
// AxiosRequestConfig type을 extends을 받아줌으로서 config 매소드를 사용할수 있게 한다
interface Request extends AxiosRequestConfig {
  url: string; // url 주소는 필수적으로 사용하독한다
}

// 제네릭 타입 설정
export async function request<R>{ method = 'GET', url, params }: Request) {
	let data; 
	if(params && method !== "GET") data = params;
  const { data } = await api.request<R>({ method: method || 'GET', url, ...(data ? { data } : { params }) });
  return data;
}
```

### 함수 사용

- 반복적인 코드 사용을 최소화 하여 사용 할 수 있게 request 함수를 사용하여 api호출 함수를 구성하였다

```tsx
export function login(params: LoginReq) {
  return request<LoginRes>({url:'/auth/login', method:'POST', params});
}

export function userInfo() {
  return request<UserInfoRes>({url:'/auth/userInfo'});
}
```

## 후기

매번똑같은 async, awiat 구문을 반복해서 작성만 해서 줄일 수 없을까 고민만 했는데 

최근 한번 해보자는 생각이 들어서 시도해봤는데 생각처럼 반복되는 코드들을 

많이 줄일 수 있게 되어서 잘 된것 같다. 

계속해서 효율적으로 코드를 작성할 수 있게 고민을 많이 하고 시도해 보도록 해야겠다