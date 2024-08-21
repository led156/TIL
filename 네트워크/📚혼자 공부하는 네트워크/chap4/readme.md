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

<img width="522" alt="image" src="https://github.com/user-attachments/assets/fce4bba2-60d5-45a5-a1cb-5bb62f9256aa">


### 1. 연결이 수립되지 않은 상태
![image](https://github.com/user-attachments/assets/b7433483-dfde-4513-9440-528e7f28606b)

- CLOSED : 아무런 연결이 없는 상태
- LISTEN : 일종의 연결 대기 상태. 서버로서 동작하는 패시브 오픈 호스트는 LISTEN 상태를 유지함. (SYN 세그먼트를 기다리는 상태)


### 2. 연결 수립 상태
![image](https://github.com/user-attachments/assets/7d3a5adc-08ba-4960-80ce-e1c29d670bb7)

- SYN-SENT : 액티브 오픈 호스트가 SYN 세그먼트를 보낸 뒤 그에 대한 응답인 SYN + ACK 세그먼트를 기다리는 상태. (연결 요청을 보낸 뒤 대기하는 상태)
- SYN-RECEIVED : 패시브 오픈 호스트가 SYN + ACK 세그먼트를 보낸 뒤 그에 대한 ACK 세그먼트를 기다리는 상태.
- ESTABLISHED : 연결이 확립되었음을 나타내는 상태. 데이터를 송수신할 수 있는 상태를 의미. (쓰리 웨이 핸드쉐이크 과정에서 마지막 ACK를 주고받으면 해당 상태가 됨)


### 3. 연결 종료 상태
<img width="536" alt="image" src="https://github.com/user-attachments/assets/b0191705-3e25-454b-9410-d69aebf091bf">

- FIN-WAIT-1 : 연결 종료의 첫 단계. FIN 세그먼트로 연결 종료 요청을 보낸 액티브 클로즈 호스트는 FIN-WAIT-1 상태로 접어들어간다.
- CLOSE-WAIT : 종료 요청인 FIN 세그먼트를 받은 패시브 클로즈 호스트가 그에 대한 응답으로 ACK 세그먼트를 보낸 후 대기하는 상태.
- FIN-WAIT-2 : FIN-Wait-1 상태에서 ACK 세그먼트를 받게 되면 FIN-WAIT-2 상태가 됨. 상대 호스트의 FIN 세그먼트를 기다리는 상태
- LAST-ACK : CLOSE-WAIT 상태에서 FIN 세그먼트를 전송한 뒤 이에 대한 ACK 세그먼트를 기다리는 상태
- TIME-WAIT : 액티브 클로즈 호스트가 FIN 세그먼트를 수신한 뒤, 이에 대한 ACK 세그먼트를 전송한 뒤 접어드는 상태.
  + 패시브 클로즈 호스트는 마지막 ACK 세그먼트를 수신하고 CLOSED 상태로 전이함.
  + TIME-WAIT 상태에 접어든 액티브 클로즈 호스트는 일정 시간을 기다리고 CLOSED 상태로 전이함. → 상태 호스트가 받았어야 할 마지막 ACK 세그먼트가 올바르게 전송되지 않았을 수도 있으므로.
- CLOSING 상태 : 동시에 연결을 종료하려 할 때 전이되는 상태
  + <img width="519" alt="image" src="https://github.com/user-attachments/assets/e70af82d-6eee-4a58-b49c-318524b673ed">


## UDP 데이터그램 구조
- 비연결형 통신, 신뢰할 수 없는 프로토콜로 연결 수립 및 해제, 재전송을 통한 오류 제어, 혼잡 제어, 흐름 제어 등을 수행X
- 상태를 유지하지도, 활용하지도 않는다는 점에서 스테이트리스 프로토콜 일종이라고도 함.
- ![image](https://github.com/user-attachments/assets/0437c2b2-86e8-44b4-9bf4-f4dd592ae572)
  + 체크섬 : 데이터그램 전송 과정에서 오류가 발생했는지 검사하기 위한 필드.
- TCP에 비해 오버헤드가 작기 때문에, 주로 실시간 스트리밍 서비스, 인터넷 전화처럼 실시간성이 강조되는 상황에서 TCP보다 더 많이 쓰임


# 04-3 TCP의 오류, 흐름, 혼잡 제어
- RTT(Round Trip Time) : 메시지를 전송하고, 답변을 받는 데까지 걸리는 시간을 뜻함

## 오류 제어: 재전송 기법
- 잘못된 세그먼트를 재전송함.
- 신뢰성을 보장하기 위한 조건
  1. 송신 호스트가 송싱한 세그먼트에 문제가 발생했음을 인지하고 → 중복된 ACK 세그먼트 수신이나 타임아웃 발생시
  2. 오류를 감지하게 되면 해당 세그먼트를 재전송할 수 있어야 함.

### 1. 중복된 ACK 세그먼트를 수신했을 때
<img width="323" alt="image" src="https://github.com/user-attachments/assets/921f8d4d-a069-4278-b90d-ea78c978eac3">


### 2. 타임아웃이 발생했을 때
- TCP 세그먼트를 송신하는 호스트는 모두 재전송 타이머 값을 유지함 → 카운트다운이 모두 끝난 상황을 타임아웃이라고 함.
<img width="628" alt="image" src="https://github.com/user-attachments/assets/404d390f-3762-40f8-8f5c-e704371fbc5a">


## ARQ: 재전송 기법
- ARQ(Automatic Repeat Request, 자동 재전송 요구) : 문제가 생긴 메시지를 재전송하여 신뢰성을 확보하는 방식.

### Stop-and-Wait ARQ
- 제대로 전달했음을 확인하기 전까지는 새로운 메시지를 보내지 않는 방식.
- 즉, 메시지를 송신하고, 이에 대한 확인 응답을 받고, 다시 메시지를 송신하고, ... 를 반복함. 
→ 단순함에도 높은 신뢰성을 보장함. 다만, 네트워크 이용 효율이 낮아질 수 있음.

### Go-Back-NARG (누적 확인 응답)
- 파이프라이닝 방식 사용
- <img width="655" alt="image" src="https://github.com/user-attachments/assets/c488c7ba-e0d0-4672-9974-f55695c27555">
- 송신 호스트는 여러 세그먼트를 보내고, 수신 호스트는 그에 대한 ACK 세그먼트를 보낸다. 송신 호스트의 순서 번호 n+2번 세그먼트가 전송 과정에서 유실되었다면, 수신 호스트는 그 외 모든 세그먼트를 올바르게 수신했다 해도 이를 폐기함.
- 송신 호스트 입장에서는 n+2번 세그먼트에 대한 ACK 세그먼트를 받지 못했기에, 타임아웃이 발생하고 잘못된 송신이 있음을 인지한다. 따라서 ACK 세그먼트를 수신받지 못한 n+2번 세그먼트부터 다시 전송한다.
- 빠른 재전송(fast retransmit) : 재전송 타이머가 만료되기 전이라도 세 번의 동일한 ACK 세그먼트가 수신되었다면 해당 세그먼트를 곧바로 재전송하는 기능. → 시간 낭비를 줄이며 손실된 세그먼트를 재전송함으로써 성능을 높이는 기술임.
<img width="469" alt="image" src="https://github.com/user-attachments/assets/c8488f6a-cc0e-4755-ace0-90e39b398ccc">

## Selective Repeat ARQ (개별 확인 응답)
- 앞선 방식은 문제가 발생한 후의 세그먼트들을 모두 폐기하고 다시 재전송해야 하므로 단점이 됨. 따라서 이는 수신 호스트 측에서 제대로 전송받은 각각의 패킷들에 대해 ACK 세그먼트를 보내는 방식임.
<img width="688" alt="image" src="https://github.com/user-attachments/assets/242b548b-43be-4b21-a1e2-daa04c7237ae">


## 흐름 제어: 슬라이딩 윈도우
- 수신 호스트가 받을 수 있는 바이트를 넘지않도록 고려하는 것
- 수신 버퍼 : 수신된 세그먼트가 애플리케이션 프로세스에 의해 읽히기 전에 임시로 저장되는 공간
  + 송신 호스트가 흐름 제어를 고려하지 않고 수신 버퍼의 크기보다 많은 데이터를 전송하면 일부 세그먼트를 처리하지 못 할 수도 있음. → 버퍼 오버플로
- 이런 상황을 방지하고자 송신 호스트가 수신 호스트의 처리 속도를 고려하며 송수신 속도를 균일하게 유지하는 것을 의미함. (파이프라이닝 방식 사용으로 연속적으로 보내기 때문에 인해 필요)
- <img width="663" alt="image" src="https://github.com/user-attachments/assets/50b00b4e-1da7-42c0-8c7d-59fdd63077de">
- 윈도우의 크기만큼 확인 응답을 받지 않고도 한 번에 전송 가능하다는 의미를 담고 있음.
  + 첫 번째 세그먼트를 올바르게 수신했다면, 수신 윈도우는 오른쪽으로 한 칸 이동함. (슬라이딩 윈도우)
- <img width="717" alt="image" src="https://github.com/user-attachments/assets/d03dfdae-a64b-4d88-b0c9-ae8651b195dc">


## 혼잡 제어
- 송신 호스트가 네트워크 혼잡도를 판단하고 혼잡한 정도에 맞춰 유동적으로 전송량을 조절하며 전송함.
- 혼잡 윈도우 : 혼잡 없이 전송할 수 있을 법한 데이터양을 의미함. → 송신 호스트가 직접 계산하여 알아내야 함.

### 혼잡 제어 알고리즘 : AIMD(Additive Increase/Multiplicative Decrease)
- 혼잡이 감지되지 않는다면 혼잡 윈도우를 RTT마다 1씩 선형적으로 증사시키고, 감지되지 않는다면 혼잡 윈도우를 절반으로 떨어뜨리는 동작을 반복하는 알고리즘.

### 혼잡 제어 알고리즘 : 느린 시작 slow start
- 혼잡 윈도우를 1부터 시작해 문제없이 수신된 ACK 세그먼트 하나당 1씩 증가시킴. (RTT마다 2배씩 지수적으로 증가함) → 초기 전송 속도 빠르게 확보 가능
- <img width="686" alt="image" src="https://github.com/user-attachments/assets/dcf101cb-4bc4-4268-a2ac-69b2ab6caaa3">
- 느린 시작 임계치 slow start threshold : 혼잡 윈도우 값이 계속 증가하다가 느린 시작 임계치 이상이 되거나, 타임아웃이 발생하거나, 세 번의 중복된 ACK 세그먼트가 발생하여 혼잡이 감지되면 다음 세가지 방법 중 하나를 선택함.
  <img width="661" alt="image" src="https://github.com/user-attachments/assets/3dc5f97c-f76a-4409-a095-081b76efc840">

### 혼잡 회피 알고리즘 congesting avoidance
- RTT마다 혼잡 윈도우를 1MSS(Maximun Segment Size)씩 증가시키는 알고리즘. (선형적으로 증가시킴) → 느린 시작 임계치를 넘어서 혼잡 발생 우려가 있으므로, 조심해서 혼잡 윈도우를 증가시키는 방식.
- <img width="571" alt="image" src="https://github.com/user-attachments/assets/cd1426e2-bf80-4740-bab4-7bfd8e3a26db">
- 이때 타임아웃이 발생하면 혼잡 윈도우 값은 1로, 느린 시작 임계치는 혼잡이 감지된 시점의 혼잡 윈도우 값의 절반으로 초기화한 뒤 다시 느린 시작을 수행함.
- 혼잡 회피 도중 세 번의 중복 ACK 세그먼트가 발생되었을 때는 혼잡 윈도우 값과 느린 시작 임계치를 대략 절반으로 떨어뜨린 뒤 빠른 회복 알고리즘을 수행함.
- (타임아웃이 발생한 세그먼트나 세 번의 중복 ACK 세그먼트가 발생한 세그먼트는 재전송함.)

### 빠른 회복 알고리즘 fast recovery
- 세 번의 중복 ACK 세그먼트를 수신하면 빠른 재전송과 더불어 빠른 회복 알고리즘이 수행됨.
- 세 번의 중복 ACK 세그먼트를 수신했을 때 느린 시작은 건너뛰고 혼잡 회피를 수행하는 알고리즘. (빠르게 전송률을 회복하기 위한 알고리즘)
- 빠른 회복 도중이라도 타임아웃이 발생하면 혼잡 윈도우 크기는 1로, 느린 시작 임계치는 혼잡이 감지된 시점의 절반으로 떨어뜨린 후 다시 느린 시작을 수행함.


<img width="667" alt="image" src="https://github.com/user-attachments/assets/39139cf4-9df6-4975-a786-eb7387c4e027">

