# 리퀘스트, 리스폰스

![image](https://github.com/led156/TIL/assets/67251510/6112c7f5-d0ef-4bef-a7da-f2ef2c9257ab)
- http는 클라이언트로부터 리퀘스트가 송신되며, 그 결과가 리스폰스로 되돌아옴

[HTTP 리퀘스트 메시지](https://hoyeonkim795.github.io/posts/HTTP%EB%A6%AC%ED%80%98%EC%8A%A4%ED%8A%B8%EB%A9%94%EC%8B%9C%EC%A7%80/)

## 리퀘스트
![image](https://github.com/led156/TIL/assets/67251510/0558c892-fb1a-4b52-a8b0-8e36d86af4df)


## 리스폰스
![image](https://github.com/led156/TIL/assets/67251510/93a4731d-c2c0-4ba5-9f43-602806c6261a)


# HTTP의 스테이트리스(stateless)
- 리퀘스트, 리스폰스를 교환하는 동안 상태(state)를 관리하지 않음
  + 이전에 보낸 리퀘스트 또는 되돌려준 리스폰스에 대해 전혀 기억하지 않음
- 데이터를 빠르고 확실하게 처리하는 범위성(scalability)을 확보 가능!
- 다만, 로그인 상태같은 유지하기 위해 쿠키(Cookie) 도입. ➡️

# 리퀘스트 URI로 리소스를 식별
- 리퀘스트를 송신할 때 리퀘스트 URI라고 불리는 형식으로 URI를 포함해야 함
  + 모든 URI를 리퀘스트 URI에 포함한다
  + Host 헤더 필드에 네트워크 로케이션을 포함한다

# HTTP 메소드
![image](https://github.com/led156/TIL/assets/67251510/ecc6f5a9-2c39-4fb5-b27c-512a2735a85b)
[HTTP Request Method 종류와 설명](https://gnaseel.tistory.com/24#google_vignette)
[HTTP 메소드의 멱등성(Idempotence)과 Delete 메소드가 멱등한 이유](https://mangkyu.tistory.com/251)

## REST
- Representational State Transfer(REST)는 API 작동 방식에 대한 조건을 부과하는 소프트웨어 아키텍처
  + [RESTful API란 무엇인가요?](https://aws.amazon.com/ko/what-is/restful-api/)

# 지속 연결 (Persistent Connection)
- HTTP/1.1에서 추가.
  + 리소스를 필요로 하는 작업이 많아짐에 따라, 매번 TCP 연결과 종료를 할 수 없기 때문에 고안된 방법.
- 연결과 종료를 반복하면서 생기는 오버헤드를 줄임.
  + 파이프라인화 : 여러 리퀘스트를 보낼 수 있음 (다음을 기다리지 않고)
 
[애플리케이션 계층(4) - 웹과 HTTP(비지속, 지속 연결)](https://dkswnkk.tistory.com/522)

# 쿠키
[HTTP 쿠키](https://developer.mozilla.org/ko/docs/Web/HTTP/Cookies)
[쿠키(Cookie): 쿠키가 필요한 이유, 쿠키의 구조, 사용 방법과 주의사항](https://engineerinsight.tistory.com/84)


