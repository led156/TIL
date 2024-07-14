# TCP/IP의 4계층(layer)
- 계층
  + 애플리케이션 계층
  + 트랜스포트 계층
  + 데이터링크 계층
  + 링크 계층
- 계층화의 장점
  + 단절화 : 각 계층의 일부분만 바꾸어도 된다. 연결부분만 결정되어 있기 때문
  + 설계의 편의 : 자기 자신이 담당하는 부분만 고려해 설계하면 됨.
  + [계층화의 이점과 단점](https://doingsomething.tistory.com/95)

## 애플리케이션 계층
- 유저에게 제공되는 애플리케이션에서 사용하는 통신의 움직임을 결정
- FTP, DNS, HTTP

## 트랜스포트 계층
- 컴퓨터 사이의 데이터 흐름 제공
- TCP, UDP

## 네트워크 계층(인터넷 계층)
- 네트워크 상에서 패킷 이동을 다룸
  + 패킷 : 전송하는 데이터의 최소 단위

## 링크 계층(데이터 링크, 네트워크 인터페이스 계층)
- 하드웨어적인 면을 다룸
- 디바이스 드라이버, 인터페이스 카드(NIC)


# HTTP 관련 프로토콜
![image](https://github.com/led156/TIL/assets/67251510/f429874b-b66c-428d-8120-e3455bbca907)

## IP (internet protocol) : 배송
- IP주소, MAC 주소를 가지고 패킷을 상대방에게 전달하는 역할
- ARP(Address Resolution Protocol) 사용하여 다음 중계 장소를 찾아감
  + 수신지의 IP 주소를 바탕으로 MAC 주소를 조사할 수 있다.

## TCP (transfer control protocol) : 신뢰성
- 신뢰성 있는 바이트 스트림 서비스 제공
  + 바이트 스트림 서비스 : 용량이 큰 데이터를 TCP 세그먼트로 불리는 단위 패킷으로 작게 분해하여 관리
  + 신뢰성 : 쓰리웨이 핸드셰이킹 (3 way handshaking)
    * [TCP 3 Way-Handshake & 4 Way-Handshake](https://mindnet.tistory.com/entry/네트워크-쉽게-이해하기-22편-TCP-3-WayHandshake-4-WayHandshake)

## DNS (domain name system) : 이름 해결
- 도메인과 IP 주소 이름을 확인


# URI, URL
[URI와 URL, 어떤 차이점이 있나요?](https://www.elancer.co.kr/blog/view?seq=74)

![image](https://github.com/led156/TIL/assets/67251510/3ad91c1f-ae7c-446d-836f-3bf99e5b6814)
