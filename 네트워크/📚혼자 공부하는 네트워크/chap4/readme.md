# 04-1. 전송 계층 개요: IP의 한계와 포트

- 네트워크 계층의 IP : 신뢰할 수 없는 통신 / 비연결형 통신을 수행한다는 한계가 있음. ➡️ 전송 계층은 신뢰할 수 있는 통신 & 연결형 통신을 가능하게 함.

## 신뢰할 수 없는 통신과 비연결형 통신
- 신뢰할 수 없는 통신 : 패킷이 수신지까지 제대로 전송되었다는 보장을 하지 않음.
- 비연결형 통신 : 송수신 호스트 간에 사전 연결 수립 작업을 거치지 않음.

## IP의 한계를 보완하는 전송 계층
### TCP (↔️ UDP)
1. 연결형 통신
  - TCP는 두 호스트가 정보를 주고받기 전에 연결을 먼저 수립함.
2. 신뢰성 있는 통신
  - TCP가 패킷이 수신지까지 올바른 순서대로 확실히 전달되는 것을 보장하기 위해 여러 기능을 제공함.

## 응용 계층과의 연결 다리, 포트
- 패킷은 호스트에 도달한 것뿐만 아니라, 실행 중인 특정 애플리케이션 프로세스까지 전달되어야 함. => 패킷의 최종 수신 대상은 특정 애플리케이션 프로세스임!
- 프로세스를 식별할 수 있는 정보를 포트(port)라고 함. ; 패킷 내 수신지 포트와 송신지 포트를 통해 송수신지 호스트의 애플리케이션을 식별함.

  
### 포트의 분류
- 사용 가능한 비트의 수는 2^16 = 0~65535번
- 포트 번호는 범위에 따라 달라짐.
  + |포트 종류|포트 번호 범위|
    |---|---|
    |잘 알려진 포트 well known port /시스템 포트 system port|0~1023|
    |등록된 포트 registered port|1024~49151|
    |동적 포트 dynamic port|49152~65535|


## 포트 기반 NAT
### NAT 변환 테이블
![image](https://github.com/user-attachments/assets/7fee7bcd-4cdc-4142-864c-96ebc93f6e3b)

- NAT에서 사설 IP - 공인 IP 주소가 일대일로 대응된다면, 사설 IP 수만큼 공인 IP 주소가 필요하게 됨. 이는 무리가 됨.
- 따라서 여러 사설 IP 주소가 하나의 공인 IP 주소로 변환되도록 해야하는데, 포트를 사용하면 됨.

### NAPT, Network Address Port Tanslation
![image](https://github.com/user-attachments/assets/ab98ee86-f362-48fd-b648-fda3685cab56)

## 포트 포워딩
...

## ICMP
...

# 04-2 TCP와 UDP
## TCP 통신 단계와 세그먼트 구조
- 단계 : 연결 수립 - 데이터 송수신(재전송을 통한 오류 제어, 흐름 제어, 혼잡 제어) - 연결 종료

### TCP 세그먼트 구조
![image](https://github.com/user-attachments/assets/ba4dedd1-1e66-448f-985d-3afc79ac015f)

- MSS(Maximum Segment Size) : TCP로 전송할 수 있는 최대 페이로드 크기 (MTU와 다르게 헤더 크기는 제외!)
- sequence number(순서 번호) : 순서 번호가 명시되는 필드. 송수신되는 세그먼트의 올바른 순서를 보장하기 위해 세그먼트 데이터의 첫 바이트에 부여되는 번호임.
  + 초기 순서 번호 + 송신한 바이트 수가 됨. (송신한 바이트를 더해 가는 형태로 누적값)
- acknowledgment number(확인 응답 번호) : 상대 호스트가 보낸 세그먼트에 대한 응답으로, 다음으로 수신하기를 기대하는 순서 번호가 명시됨.
  + 순서 번호에 대한 응답. (수신자가 다음으로 받기를 희망하는 순서 번호)
  + 확인 응답 번호 값을 보내기 위해 제어 비트에서는 ACK 플래그를 1로 설정해야 함. -> 다음 응답을 희망하기 때문.
- control bits / flag bits : 현재 세그먼트에 대한 부가 정보를 나타냄. (ACK, SYN, FIN)
  + 8비트로 구성.
  + ACK : 세그먼트의 승인을 나타내기 위한 비트
  + SYN : 연결을 수립하기 위한 비트
  + FIN : 연결을 종료하기 위한 비트
- window : 수신 윈도우의 크기가 명시됨.

## TCP 연결 수립과 종료
### 연결 수립 : 쓰리 웨이 핸드셰이크, three-way handshake
![image](https://github.com/user-attachments/assets/dc599aa8-b725-46ba-9d9c-8a133d6a7b62)

![image](https://github.com/user-attachments/assets/68cba9ad-2aef-4ef0-84b2-d6ffd4104981)


### 연결 종료 : 포 웨이 핸드셰이크, four-way handshake
![image](https://github.com/user-attachments/assets/7d5c073a-61c6-453b-bdae-af22f4570bee)

![image](https://github.com/user-attachments/assets/89bebfa0-72bc-4a97-bc9a-d79160f3bce1)


## TCP 상태
- 상태 state : 현재 어떤 통신 과정에 있는지를 나타내는 정보. (stateful 프로토콜) -> 연결형 통신 & 신뢰할 수 있는 통신을 유지하기 위해 다양한 상태를 사용함.

![image](https://github.com/user-attachments/assets/1ccdaccc-06f3-456b-bcc0-fcf78fbbd933)

### 1. 연결이 수립되지 않은 상태
![image](https://github.com/user-attachments/assets/b7433483-dfde-4513-9440-528e7f28606b)

- CLOSED : 아무런 연결이 없는 상태
- LISTEN : 일종의 연결 대기 상태. 서버로서 동작하는 패시브 오픈 호스트는 LISTEN 상태를 유지함. (SYN 세그먼트를 기다리는 상태)


### 2. 연결 수립 상태
![image](https://github.com/user-attachments/assets/7d3a5adc-08ba-4960-80ce-e1c29d670bb7)

- SYN-SENT : 액티브 오픈 호스트가 SYN 세그먼트를 보낸 뒤 그에 대한 응답인 SYN + ACK 세그먼트를 기다리는 상태. (연결 요청을 보낸 뒤 대기하는 상태)


### 3. 연결 종료 상태





