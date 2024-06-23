# 5장. ref: DOM에 이름 달기
- ref(reference) : HTML에서 Id를 사용하여 DOM에 이름을 다는 것처럼 리액트 프로젝트 내부에서 DOM에 이름을 다는 방법
  +  리액트 컴포넌트 안에서도 id를 사용할 수는 있지만, 같은 컴포넌트를 여러 번 사용할 경우 중복 id가 생기기 때문에 유일해야하는 Id가 깨져버림.
  +  ref는 전역적으로 작동하지 않고 컴포넌트 내부에서만 작동하기 때문에 문제가 발생하지 않음.

# 5.1. ref는 어떤 상황에서 사용해야 할까?
- DOM을 꼭 직접적으로 건드려야 할 때 ref를 사용해야 함.

## 5.1.1. state로 예제 컴포넌트 생성 (클래스형 컴포넌트)
- 컴포넌트 만들기 -> ref 달기 -> 동작 때마다 포커스 주기
```js
import { Component } from "react";
import './ValidationSample.css';

class ValidationSample extends Component {
    state = {
        password: '',
        clicked: false,
        validated: false
    }

    handleChange = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    handleButtonClick = () => {
        this.setState({
            clicked: true,
            validated: this.state.password === '0000'
        });
    }

    
    render() {
        return (
            <div>
                <input
                    type="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    className={this.state.clicked ? (this.state.validated ? 'success' : 'failure') : ''}/>
                <button onClick={this.handleButtonClick}>검증하기</button>
            </div>
        );
    }

}

export default ValidationSample
```

## 5.1.2. App 컴포넌트에서 예제 컴포넌트 렌더링

## 5.1.3. DOM을 꼭 사용해야 하는 상황
- 앞 예제에서 state를 사용하였지만 가끔 이로 해결할 수 없는 기능이 있음.
  + 특정 input에 포커스 주기
  + 스크롤 박스 조작하기
  + Canvas 요소에 그림 그리기 등

# 5.2. ref 사용
- ref 사용 방법 두가지: 콜백 함수, createRef 함수 사용

## 5.2.1. 콜백 함수를 통한 ref 설정
- ref를 달고자 하는 요소에 ref라는 콜백 함수를 Props로 전달해주기
  + 콜백 함수는 ref 값을 파라미터로 전달받아, 이를 함수 내부에서 컴포넌트의 멤버 변수로 설정해줌.
  + `<input ref={(ref) => {this.input=ref}} />` : this.input은 input 요소의 DOM을 가리키게 됨

## 5.2.2. createRef를 통한 ref 설정
- createRef : 리액트 내장 함수 (리액트 v16.3 이후 도입)
```js
    input = React.createRef();

    handleFocus = () => {
        this.input.current.focus();
    }

    render() {
        return (
            <div>
                <input ref={this.input} />
            </div>
        );
    }
```
- ` = React.createRef();`: 컴포넌트 내부에서 멤버 변수로 ref 담아주기
- `<input ref={this.input} />` : 해당 멤버 변수를 달고자 하는 요소에 ref props로 넣어주면 설정 완료
- `this.input.current.focus();` : 나중에 ref를 설정해 준 DOM에 접근하기 위해 current 조회

## 5.2.3. 적용
- 5.1절에서 만든 컴포넌트에 버튼을 한 번 눌렀을 때, 포커스가 다시 Input 쪽으로 넘어가도록 코드 작성하기
  
### 5.2.3.1. input에 ref 달기
- ref 달기
```js
...
    input = React.createRef();
...
    <input
        ref={this.input}
...
```

### 5.2.3.2. 버튼 OnClick 이벤트 코드 수정
- input에 포커스 주도록 코드 수정하기. `this.input`이 컴포넌트 내부의 input 요소를 가리키게 됨.
```js
    handleButtonClick = () => {
        this.setState({
            clicked: true,
            validated: this.state.password === '0000'
        });
        this.input.current.focus();
    }
```

# 5.3. 컴포넌트에 ref 달기
- 컴포넌트에도 ref를 달 수 있는데, 주로 컴포넌트 내부에 있는 DOM을 컴포넌트 외부에서 사용할 때 쓴다.

## 5.3.1. 사용법
- `<MyComponent ref={(ref) => {this.myComponent=ref}} />` : MyComponent 내부의 메서드 및 멤버 변수 (ref)에도 접근할 수 있게 됨.

## 5.3.2. 컴포넌트 초기 설정
- 스크롤박스가 있는 컴포넌트를 만들고, 스크롤바를 아래로 내리는 작업을 부모 컴포넌트에서 실행하는 예제.

### 5.3.2.1. 컴포넌트 파일 생성
```js
import { Component } from "react";

class ScrollBox extends Component {
    render() {
        const style = {
            border: '1px solid black',
            height: '300px',
            width: '300px',
            overflow: 'auto',
            position: 'relative'
        };

        const innerStyle = {
            width: '100%',
            height: '650px',
            background: 'linear-gradient(white, black)'
        }

        return (
            <div
                style={style}
                ref={(ref) => {this.box=ref}}>
                <div style={innerStyle}/>
            </div>
        );
    }
}

export default ScrollBox;
```

### 5.3.2.2. App 컴포넌트에서 스크롤 박스 컴포넌트 렌더링

## 5.3.3. 컴포넌트에 메서드 설정
- 컴포넌트에 스크롤바를 맨 아래쪽으로 내리는 메서드를 만들어, 가장 밑으로 가는 버튼 만들기
  + scrollTop: 세로 스크롤바 위치(0~350)
  + scrollHeight: 스크롤이 있는 박스 안의 div 높이(650)
  + clientHeight: 스크롤이 있는 박스의 높이(300)
```js
  scrollToBottom = () => {
    const { scrollHeight, clientHeight } = this.box;
    /* 앞 코드에는 비구조화 할당 문법을 사용했습니다.
    다음 코드와 같은 의미입니다.
    const scrollHeight = this.box.scrollHeight;
    const clientHeight = this.box.cliengHeight;
    */
    this.box.scrollTop = scrollHeight - clientHeight;
  };
```

## 5.3.4. 컴포넌트에 ref 달고 내부 메서드 사용
```js
import './App.css';
import React, { Component } from 'react';
import ScrollBox from './ScrollBox';

class App extends Component {
  render() {
    return (
      <div>
        <ScrollBox ref={ref => (this.scrollBox = ref)} />
        <button onClick={() => this.scrollBox.scrollToBottom()}>
          맨 밑으로
        </button>
      </div>
    );
  }
}

export default App;
```
- 부모 컴포넌트인 App 컴포넌트에서 ScrollBox에 ref를 달면 사용할 수 위에서 만든 내부 메서드를 있게 됨
- ⭐️ 주의점 : `<button onClick={() => this.scrollBox.scrollToBottom()}>`. 컴포넌트가 처음 렌더링될 때 this.scrollBox값이 undefined이므로 오류가 발생, 따라서 화살표 함수 문법을 사용해 아예 새로운 함수를 만들고 그 내부에서 메서드를 실행하면, 이미 한 번 렌더링을 해서 this.scrollBox를 설정한 시점이므로 오류가 발생하지 않음.

# 5.4. 정리
- 컴포넌트 내부에서 DOM에 직접 접근해야 할 때는 ref를 사용한다. 다만 ref를 사용하지 않고도 원하는 기능을 구현할 수 있는지 고려해야 함.
  + 클래스형 컴포넌트로 이를 구현해보는 시간을 가져봄.
  + 함수 컴포넌트에서는 useRef라는 Hook 함수를 사용하여 구현한다. (8장)
- 컴포넌트들끼리 데이터를 교류할 때는 언제나 데이터를 부모 ↔ 자식 흐름으로 교류해야 함 (리덕스, Context API 사용)







