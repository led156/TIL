# 3장 컴포넌트

- 컴포넌트의 기능
  + 데이터가 주어졌을 때 이에 맞추어 UI를 만들어줌.
  + 라이프사이클 API를 이용하여 컴포넌트가 화면에서 나타날 때, 사라질 때, 변화가 일어날 때 주어진 작업들을 처리함
  + 임의 메서드를 만들어 특별한 기능을 붙여줌.
 
# 3.1. 클래스형 컴포넌트

```js
/* 함수 컴포넌트 */
function App() {
  const name = '리액트';
  return <div className="react">{name}</div>;
}

/* 클래스형 컴포넌트 */
class App extends Component {
  render() {
    const name = '리액트';
    return <div className="react">{name}</div>;
  }
}
```

||클래스형 컴포넌트|함수 컴포넌트|
|--|--|--|
|state 기능 및 라이프사이클 기능|O|X|
|임의 메서드 정의 가능|O|X|
|render 함수 필수|O|X|
|장점||선언하기 편함.<br/>메모리 자원 덜 사용<br/>배포시 파일 크기 더 작음|
|단점||state와 라이프사이클 API 사용 어려움 (Hooks 기능으로 일부 해결)|

- 공식 문서에서는 함수 컴포넌트 + Hooks 사용을 권장.

# 3.2. 첫 컴포넌트 생성
- 컴포넌트 생성 : 파일 만들기 → 코드 작성하기 → 모듈 내보내기 및 불러오기

## 3.2.1. src 디렉토리에 MyComponent.js 파일 생성

## 3.2.2. 코드 작성하기
- ES6의 화살표 함수 [🔗](https://velog.io/@parksj3205/2019-08-30-1208-%EC%9E%91%EC%84%B1%EB%90%A8)

## 3.2.3. 모듈 내보내기 및 불러오기
### 3.2.3.1. 모듈 내보내기 (export)
```js
export default MyComponent
```

### 3.2.3.2. 모듈 불러오기 (import)
```js
import MyComponent from './MyCoponent';

const App = () => {
  return <MyCoponent />;
};
```


# 3.3. props
- props(properties) : 컴포넌트 속성을 설정할 때 사용하는 요소.
  + 이를 통해 해당 컴포넌트를 불러와 사용하는 부모 컴포넌트에서 설정할 수 있다. (⁇ 부모 컴포넌트 : App 컴포넌트)

## 3.3.1. JSX 내부에서 props 렌더링
- props 값을 컴포넌트 함수의 파라미터로 받아 와서 사용할 수 있음.
```js
const MyComponent = (props) => {
    return <div>나의 새롭고 멋진 {props.name}</div>;
};
```

## 3.3.2. 컴포넌트를 사용할 때 props 값 지정하기
```js
const App = () => {
  return <MyComponent name="React" />;
};
```

## 3.3.3. props 기본값 설정: defaultProps
```
const MyComponent = (props) => {
    return <div>나의 새롭고 멋진 {props.name}</div>;
};

MyComponent.defaultProps = {
    name: '기본 이름'
};
```

Warning: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead. [🔗](https://velog.io/@jay/react18.3defaultProps)

## 3.3.4. 태그 사이의 내용을 보여 주는 children
- props children : 컴포넌트 태그 사이의 내용을 보여주는 props
```js
/* App.js */
const App = () => {
  return <MyComponent name="React">리액트</MyComponent>;
};

/* MyComponent.js */
const MyComponent = (props) => {
    return (
    <div>나의 새롭고 멋진 {props.name} <br />
    chileren 값은 {props.children} 입니다.
    </div>)
    ;
};
```

## 3.3.5. 비구조화 할당 문법을 통해 props 내부 값 추출하기
- 비구조화 할당 문법 (destructing assignment), 구조 분해 문법
  + 을 사용하여 내부 값을 바로 추출할 수 있음.

## 3.3.6. propTypes를 통한 props 검증 
- props propTypes :컴포넌트의 필수 props를 지정하거나 props의 타입을 지정할 때 사용.

### 3.3.6.1. isRequired를 사용하여 필수 propTypes 설정
- propTypes를 지정하지 않았을 때 경고 메시지를 띄워 주는 작업.
- `isRequired` 붙이기.

### 3.3.6.2. 더 많은 PropTypes 종류
[🔗 Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component#step-2-read-props-inside-the-child-component)


#3.4. state
- state
  + 컴포넌트 내부에서 바뀔 수 있는 값.
  + 컴포넌트가 사용되는 과정에서 부모 컴포넌트가 설정하는 값.
  + 컴포넌트 자신은 해당 props를 읽기 전용으로만 사용할 수 있다. → 바꾸려면 부모 컴포넌트에서 바꾸어 주어야 한다.
  + 예시) App 컴포넌트에서 props를 변경할 수 있지만, MyComponent에서는 전달받은 name 값을 직접 바꿀 수 없음.

## 3.4.1. (1) 클래스형 컴포넌트의 state
```js
import React, { Component } from 'react';

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 0
        };
    }
    render() {
        const { number } = this.state; // state 를 조회 할 때에는 this.state 로 조회합니다.
        return (
            <div>
                <h1>{number}</h1>
                <button
                // onClick 을 통하여 버튼이 클릭됐을 때 호출 할 함수를 지정합니다.
                onClick={() => {
                    // this.setState를 사용하여 state에 새로운 값을 넣을 수 있습니다.
                    this.setState(
                    {
                        number: number + 1
                    },
                    () => {
                        console.log('방금 setState 가 호출되었습니다.');
                        console.log(this.state);
                    }
                );
            }}
            >
                +1
            </button>
        </div>
        );
    }
}

export default Counter;
```
- `constructor(...) {...}` : 컴포넌트의 생성자 메소드.
- `render() {...}`
  + `this.state` : 현재 state 조회
  + `<button onClick={...}>` : onClick이라는 값을 Props로 넣어줌. 버튼이 클릭될 때 호출시킬 함수를 설정.

### 3.4.1.1. state 객체 안에 여러 값이 있을 때

### 3.4.1.2. state를 constructor에서 꺼내기

### 3.4.1.3. this.setState에 객체 대신 함수 인자 전달하기
- `this.setState` : 상태가 비동기적으로 업데이트됨.
  + ❓ 비동기 [🔗](https://velog.io/@daybreak/%EB%8F%99%EA%B8%B0-%EB%B9%84%EB%8F%99%EA%B8%B0-%EC%B2%98%EB%A6%AC)
    * 동기 방식은 서버에서 요청을 보냈을 때 응답이 돌아와야 다음 동작을 수행할 수 있다. 즉 A작업이 모두 진행 될때까지 B작업은 대기해야한다.
    * 비동기 방식은 반대로 요청을 보냈을 때 응답 상태와 상관없이 다음 동작을 수행 할 수 있다. 즉 A작업이 시작하면 동시에 B작업이 실행된다. A작업은 결과값이 나오는대로 출력된다.
    * 동기는 디자인이 비동기보다 간단하고 직관적일수 있지만 결과가 주어질 때 까지 아무것도 못하고 대기해야하는 문제가 있다. 비동기는 동기보다 복잡하지만 결과가 주어지는데 시간이 걸려도 그 시간동안 다른 작업을 할 수 있어서 보다 효율적일 수 있다.
- 함수 내부에서 `this.setState`를 두 번 호출하려면, 객체 대신에 함수를 인자로 넣어 주면 됨.
  + ⭐️ 각 함수는 현재 상태가 아닌 이전 상태(prevState)를 인자로 받아 상태를 업데이트하므로, 상태값이 비동기적으로 업데이트되더라도 각 호출이 정확한 상태값을 기반으로 작동합니다.
```js
this.setState(prevState => {
  return {
    number: prevState.number + 1
  };
});
// 위 코드와 아래 코드는 완전히 똑같은 기능을 하는 코드입니다.
// 아래 코드는 함수에서 바로 객체를 반환한다는 의미입니다.
this.setState(prevState => ({
  number: prevState.number + 1
}));
```

- 화살표 함수에서 값을 바로 반환하고 싶다면 코드 블록 { }를 생략하자. 예시) `const sum = (a, b) => a + b;`

### 3.4.1.4. this.setState가 끝난후 특정 작업 실행하기
- setState의 두 번째 파라미터로 콜백 함수 등록하여 작업을 처리.
  + ❓ 콜백 함수 [🔗](https://inpa.tistory.com/entry/JS-%F0%9F%93%9A-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%BD%9C%EB%B0%B1-%ED%95%A8%EC%88%98) 
    * 매개변수로 함수 객체를 전달해서 호출 함수 내에서 매개변수 함수를 실행하는 것
    * ```js
      function sayHello(callback) {
        var name = "Alice";
        callback(name); // 콜백 함수 호출
      }
      
      // 익명 화살표 콜백 함수
      sayHello((name) => {
        console.log("Hello, " + name);
      }); // Hello, Alice
      ```
    * 콜백 함수는 비동기 이벤트 작업을 위해 자바스크립트에서 광범위하게 사용된다.
    * 추가 자료 [🌐 자바스크립트의 핵심 '비동기' 완벽 이해 ❗](https://inpa.tistory.com/entry/%F0%9F%8C%90-js-async)




## 3.4.2. (2) 함수 컴포넌트에서 useState 사용하기
- 리액트 16.8 버전 이후 useState라는 함수를 이용하여 함수 컴포넌트에서도 state를 사용할 수 있게 됨. (Hooks를 사용해서)

### 3.4.2.1. 배열 비구조화 할당
```js
const array = [1, 2];
const [one, two] = array;
```


### 3.4.2.2. useState 사용하기
```js
import { useState } from "react";

const Say = () => {
    const [message, setMessage] = useState('');
    const onClickEnter = () => setMessage('안녕하세요!');
    const onClickLeave = () => setMessage('안녕히가세요!');

    return (
        <div>
            <button onClick={onClickEnter}>입장</button>
            <button onClick={onClickLeave}>퇴장</button>
            <h1>{message}</h1>
        </div>
    );  
};

export default Say;
```
- 클래스형 컴포넌트에서는 state 초깃값에 객체 형태를 넣어주어야 하지만, useState에서는 자유이다.
  + 함수를 호출하면 배열이 반환됨. 첫 번째 원소는 현재 상태이고, 두 번째 원소는 상태를 바꾸어 주는 setter 함수임.


#3.5 state를 사용할 때 주의 사항
- state 값을 바꾸어야 할 때는 setState 혹은 useState를 통해 전달받는 세터 함수를 사용해야 함.
  + ```js
    /* 잘못된 상황 */

    /* 클래스형 컴포넌트 */
    this.state.number = this.state.number + 1;
    
    /* 함수 컴포넌트 */
    const [object, setObject] = useState({ a: 1, b: 1});
    object.b = 2
    
    ```
  + <details> <summary>왜❓</summary>
    1. 상태 관리의 일관성 유지 : React는 상태 변화가 발생할 때마다 컴포넌트를 리렌더링하여 UI를 최신 상태로 유지합니다. setState 또는 세터 함수는 상태가 변경되었음을 React에게 알리는 역할을 합니다. 상태를 직접 변경하면 React는 상태가 변경되었는지 알지 못하기 때문에, UI가 업데이트되지 않습니다. <br/>
    2. 리렌더링의 트리거 : React의 상태 관리 시스템은 setState나 세터 함수 호출을 통해 리렌더링을 트리거합니다. 상태를 직접 변경하면 리렌더링이 발생하지 않으므로, 변경 사항이 화면에 반영되지 않습니다.<br/>
    3. React의 최적화 기능 무력화 : React는 상태 변화가 있을 때만 필요한 부분만 리렌더링하는 최적화를 수행합니다. setState를 사용하면 React는 상태 변화를 추적하고, 필요할 때만 리렌더링을 수행합니다. 직접 상태를 변경하면 이러한 최적화가 무력화되어, 성능 문제가 발생할 수 있습니다.<br/>
    4. 상태 변경의 예측 가능성 : setState를 사용하면 상태 변경이 예측 가능한 방식으로 이루어집니다. 상태 변경은 항상 일관된 방법으로 이루어지며, 이는 디버깅과 유지보수를 쉽게 만듭니다. 직접 상태를 변경하면 상태 변경이 예측 불가능해지고, 복잡한 버그가 발생할 수 있습니다.<br/>
    5. 상태 병합 : setState는 객체 형태로 새로운 상태를 받아 기존 상태와 병합합니다. 이를 통해 기존 상태를 유지하면서 일부 속성만 업데이트할 수 있습니다. 직접 상태를 변경하면 이러한 병합 기능을 사용할 수 없게 됩니다. </details>
          

#3.6. 정리
![image](https://github.com/led156/TIL/assets/67251510/fcd8c2e2-7716-46f7-a8e8-78a29641cde4)
- props : 부모 컴포넌트가 설정
  + 값이 무조건 고정적이지 않음 : 부모 컴포넌트 state를 자식 컴포넌트의 props로 전달하고, 자식 컴포넌트에서 특정 이벤트가 발생할 때 부모 컴포넌트의 메서드를 호출하면 유동적으로 사용 가능.
- state : 컴포넌트 자체값, 내부에서 값을 업데이트 가능.
  

