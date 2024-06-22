# 4장 이벤트 핸들링
- 이벤트 : 사용자가 웹 브라우저에서 DOM 요소들과 상호 작용하는 것.


# 4.1. 리액트의 이벤트 시스템
## 4.1.1. 이벤트를 사용할 때 주의 사항
1. 이벤트 이름은 카멜 표기법으로 작성합니다.
   - onclick → onClick, onkeyup → onKeyUp
3. 이벤트에 실행할 자바스크립트 코드를 전달하는 것이 아니라, 함수 형태의 값을 전달합니다.
   - HTML과 다르게 함수 형태의 객체를 전달.
5. DOM 요소에만 이벤트를 설정할 수 있습니다.
   - 우리가 직접 만든 컴포넌트에는 이벤트를 자체적으로 설정할 수 없음. `<MyComponent conClick={doSomething}/>`

## 4.1.2. 이벤트 종류 [🔗](https://legacy.reactjs.org/docs/events.html)


# 4.2. 예제로 이벤트 핸들링 익히기 (클래스형 컴포넌트)
## 4.2.1. 컴포넌트 생성 및 불러오기
### 4.2.1.1. 컴포넌트 생성

### 4.2.1.2. App.js에서 EventPractice 렌더링


## 4.2.2. onChange 이벤트 핸들링하기
### 4.2.2.1. onChange 이벤트 설정
```js
import { Component } from "react";

class EventPractice extends Component {
    render() {
        return (
            <div>
                <h1>이벤트 연습</h1>
                <input
                    type="text"
                    name="message"
                    placeholder="아무거나 입력해 보세요"
                    onChange={
                        (e) => {
                            console.log(e.target.value)
                        }
                    }
                ></input>
            </div>
        );
    }
}

export default EventPractice;
```
- `onChange={ (e) => {...} }` : 여기서 e 객체는 SyntheticEvent. 웹 브라우저의 네이티브 이벤트를 감싸는 객체. (네이티브 이벤트가 아님)
  + 네이티브 이벤트 ❓
    * 이벤트 발생 시, 이벤트 핸들러는 SyntheticEvent(일반적인 이벤트 객체)의 인스턴스를 전달. 일반적으로 우리가 사용하는 event 객체는 native event 객체가 아니라 래핑된 이벤트 객체인 Syntheticevent를 사용.
  + 네이티브 이벤트와 인터페이스가 같으므로 순수 자바스크립트에서 HTML 이벤트를 다룰 때와 똑같이 사용하면 됨. `e.target.value`
  + SyntheticEvent는 네이티브 이벤트와 달리 이벤트가 끝나고 나면 이벤트가 초기화됨. 따라서 정보를 참조할 수 없음.
  + 만약, 비동기적으로 이벤트 객체를 참조할 일이 있다면 `e.persist()` 함수 호출.
 
### 4.2.2.2. state에 input 값 담기

### 4.2.2.3. 버튼을 누를 때 comment 값을 공백으로 설정
```
import { Component } from "react";

class EventPractice extends Component {
    state = {
        message: ''
    }

    render() {
        return (
            <div>
                <h1>이벤트 연습</h1>
                <input
                    type="text"
                    name="message"
                    placeholder="아무거나 입력해 보세요"
                    value={this.state.message}
                    onChange={
                        (e) => {
                            this.setState({
                                message: e.target.value
                            })
                        }
                    }
                ></input>

                <button onClick={
                    () => {
                        alert(this.state.message);
                        this.setState({
                            message: ''
                        });
                    }
                }>확인</button>
            </div>
        );
    }
}

export default EventPractice;
```

## 4.2.3. 임의 메서드 만들기
- 함수 형태의 값을 전달하기 때문에 이벤트를 처리할 때 렌더링을 하는 동시에 함수를 만들어서 전달해주는 형태임.
- 이 방법 대신 _함수를 미리 준비하여 전달하는 방법_도 있음. (성능 차이는 없지만, 가독성을 훨씬 높음)

### 4.2.3.1. 기본 방식
```js
import { Component } from "react";

class EventPractice extends Component {
    state = {
        message: ''
    }
    
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handelClikc.bind(this);
    }

    handleChange(e) {
        this.setState({
            message: e.target.value
        });
    }

    handelClick(e) {
        alert(this.state.message);
        this.setState({
            message: ''
        });
    }


    render() {
        return (
            <div>
                <h1>이벤트 연습</h1>
                <input
                    type="text"
                    name="message"
                    placeholder="아무거나 입력해 보세요"
                    value={this.state.message}
                    onChange={
                        this.handleChange
                    }
                ></input>

                <button onClick={
                    this.handelClick
                }>확인</button>
            </div>
        );
    }
}

export default EventPractice;
```
- `this.handleChange = this.handleChange.bind(this); ...` : 함수가 호출될 때 this는 호출부에 따라 결정됨 → 클래스의 임의 메서드가 특정 HTML 요소의 이벤트로 등록되는 과정에서 메서드와 this의 관계가 끊어져 버림. ⭐️
  + 따라서 컴포넌트 자신으로 제대로 가리키기 위해서 메서드를 this와 바인딩하는 작업이 필요함. (하지 않으면 this가 undefined를 가리키게 됨)

### 4.2.3.2. Property Initializer Syntax를 사용한 메서드 작성
- 메서드 바인딩 : 생성자 메서드에서 하는 것이 정석.
  + 다만 새 메서드를 만들 때마다 constuctor도 수정해야 하기 때문에 불편할 수 있음.
  + 따라서 바벨의 transform-class-properties 문법을 사용해 화살표 함수 형태로 메서드를 정의함. [🔗](https://1995-dev.tistory.com/71)
 
```js
class EventPractice extends Component {
    state = {
        message: ''
    }

    handleChange = (e) => {
        this.setState({
            message: e.target.value
        });
    }

    handleClick = () => {
        alert(this.state.message);
        this.setState({
            message: ''
        });
    }
...
```

## 4.2.4. input 여러 개 다루기


## 4.2.5. onKeyPress 이벤트 핸들링하기




# 4.3. 함수 컴포넌트로 구현해 보기



# 4.4. 정리



