# 1.1. 왜 리액트인가?
- 아키텍처
  + 크로스 플랫폼 애플리케이션 프레임워크들의 아키텍처들의 공통점 : 모델, 뷰가 있음.
  + MVC(Model-View-Controller), MVVM(Model-View-View Model), MVW(Model-View-Whatever)
  + 프로그램이 사용자에게서 어떤 작업을 받으면 컨트롤러는 모델 데이터를 조회하거나 수정하고, 변경된 사항을 뷰에 반영함.
  + 반영하는 과정에서 보통 뷰를 변형하는데, 이 과정에서 성능이 떨어질 수도 있음. → 변형이 아니라 아예 새로 렌더링하는 방식 도입
    * CPU 점유율 늘고 (DOM 사용), 메모리 많이 사용, 끊김 현상 발생 가능

## 1.1.1. 리액트 이해
- 리액트 : 자바스크립트 라이브러리. 뷰만 신경 쓰는 라이브러리.
  + 컴포넌트 (component) : 특정 부분이 어떻게 생길지 정하는 선언체
    * 재사용이 가능한 API. 해당 컴포넌트 생김새&작동 방식을 정의함.
  + 템플릿 : 데이터셋이 주어지면 HTML 태그 형식을 문자열로 반환함. (컴포넌트 != 템플릿)
  + 렌더링 : 화면에 뷰를 보여 주는 것

### 1.1.1.1. 초기 렌더링
- `render()` : 컴포넌트가 어떻게 생겼는지 정의하는 역할. 뷰가 어떻게 생겼고 어떻게 작동하는지에 대한 정보를 지닌 객체를 반환함.
  + 컴포넌트 내부에 컴포넌트들도 재귀적으로 렌더링함.

### 1.1.1.2. 조화 과정
- 조화 과정 (reconciliation) : 새로운 요소로 갈아끼우기.
- 이전 컴포넌트 정보와 현재 `render`함수가 만든 컴포넌트 정보를 비교 -> 자바스크립트를 사용하여 둘의 차이를 알아내 최소의 연산으로 DOM 트리 업데이트.
![image](https://github.com/led156/TIL/assets/67251510/633b203c-c83d-4049-8e6d-2ff63ea60e9b)


# 1.2. 리액트의 특징
## 1.2.1. Virtual DOM
### 1.2.1.1. DOM이란?
- DOM(Document Object Model) : 객체로 문서 구조를 표현하는 방법
  + 정적이라서, 동적 UI에 최적화되어 있지 않음.
  + DOM 자체는 빠르지만, 웹 브라우저 단에서 DOM에 변화가 일어나면 웹 브라우저가 CSS를 다시 연산하고, 레이아웃을 구성하고, 페이지를 리페인트하는 과정에서 시간이 허비되는 것.
  + 해결법 : DOM을 최소한으로 저작하여 작업을 처리하는 방식으로 개선. -> Virtual DOM

### 1.2.1.2. Virtual DOM
- DOM 업데이트를 추상화한 자바스크립트 객체를 구성하여 사용함으로써 DOM 처리 횟수를 최소화하고 효율적으로 진행.
- 리액트에서 데이터가 변하여 웹 브라우저에 실제 DOM을 업데이트하는 절차
  1. 데이터를 업데이트하면 전체 UI를 Virtual DOM에 리렌더링
  2. 이전 Virtual DOM에 있던 내용과 현재 내용을 비교합니다.
  3. 바뀐 부분만 실제 DOM에 적용합니다. (이전 절의 그림)
- 지속적으로 데이터가 변화하는 대규모 애플리케이션 구축에 적절. [업데이트 처리 간결성]
  + UI를 업데이트하는 과정에서 생기는 복잡함을 모두 해소하고, 더욱 쉽게 업데이트에 접근 가능.

## 1.2.2. 기타 특징
|타 웹 프레임워크|리액트|
|--|--|
|Ajax|axios/fetch|
|데이터 모델링||
|라우팅|리액트 라우터|
|상태 관리|리덕스/MobX|


# 1.3. 작업 환경 설정
## 1.3.1. Node.js와 npm
- Node.js : 크롬 V8 자바스크립트 엔진으로 빌드한 자바스크립트 런타임.
- npm : Node.js 패키지 매니저 도구
- nvm(node version manager) : Node.js를 여러 버전으로 설치하여 관리해 주는 도구
```
brew install nvm

* 폴더 생성
mkdir ~/.nvm 

* 환경변수 설정
vi ~/.zshrc

* 다음의 텍스트를 붙여넣는다.
export PATH="$PATH:$HOME/.rvm/bin"
export PATH="$PATH:/opt/homebrew/bin"
# NVM
export NVM_DIR="$HOME/.nvm"
  [ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && . "/opt/homebrew/opt/nvm/nvm.sh"  # This loads nvm
  [ -s "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm" ] && . "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion

source ~/.zshrc

nvm -v

nvm install --lts
```

## 1.3.2. yarn
- yarn : 패키지 관리자 도구 (npm 대신, 더 빠르고 효율적인 캐시 시스템과 기타 부가 기능 제공)
```
npm install --global yarn
yarn --version
```

## 1.3.3. 에디터 설치
## 1.3.4. Git 설치

## 1.3.5. create-react-app으로 프로젝트 생성하기
- create-react-app : 리액트 프로젝트를 생성할 때 필요한 웹팩, 바벨의 설치 및 설정 과정을 생략하고 바로 간편하게 프로젝트 작업 환경을 구축해 주는 도구.
- `yarn create react-app <프로젝트 이름>` / `npm init react-app <프로젝트 이름>` : 리액트 프로젝트 생성
- `yarn start` / `npm start` : 리액트 개발 전용 서버 구동

