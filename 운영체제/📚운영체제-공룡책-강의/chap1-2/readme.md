# ✏️ 주요 개념
- 운영체제와 커널이란
- 운영체제가 하는 일
- 운영체제 운영 (multiprogrammming, multiasking, kernel mode, ...)

---

# 01. 운영체제가 뭐길래?

## 개념
- 운영체제 : a software that operates a computer system.
  + 컴퓨터 : a machine that processes the information. = 정보를 처리하는 기계
  + 정보 : (by 클로드 섀넌) 정보량 $I(x) = -\log_2{P(x)}$
    * a quantitative representation that measures the uncertainty = 불확실한 상황을 수치적으로 표현한 것
    * 정보의 최소 단위 bit(binary digit)
    * → 정보의 처리를 위해 정보의 상태 변환을 할 수 있는 장치가 필요함 (0에서 1로, 1에서 0으로)
    * 부울 대수(Boolean Algebra); NOT, AND, OR [논리 게이트 -> 논리 회로]
    * 정보의 저장과 전송 : 플립-플롭, 데이터 버스

### 컴퓨터가 정보를 처리하는 방법
- 덧셈 : 반가산기, 전가산기(full-adder)
- 뺄셈 : 2의 보수 표현법
- 곱셈과 나눗셈 : 덧셈과 뺄셈의 반복
- 실수 연산 : 부동 소수점 표현법
  <details>
    <summary>❓부동 소수점</summary>
  
  - 부동 소수점(floating point) : 소수점이 떠 다닌다는 의미.
    + 유효숫자를 사용한 곱셈 형태로 표현됨. [부호] x [가수] x [밑수]^[지수] (예시 : + 12.345 x 10^1). 지수의 값을 변경하게 되면 소수점 자리가 바뀌므로 이것이 마치 떠다니는 것처럼 보이게 됨.
    + 2진수 표현에서 정규화 과정을 거치면 가수부는 언제나 1로 시작하는 수가 되기 때문에 첫번째 자리는 생략 가능하며, 더 많은 수를 표현할 수 있게 됨. [🔗자세한 설명](https://devocean.sk.com/blog/techBoardDetail.do?ID=165270&boardType=techBlog)
  - 고정 소수점 : 소수점을 기준으로 정수부와 소수부로 표현됨.
  
  </details>
- 함수 : GOTO
  + 삼각함수, 미분, 적분, 사진 촬영, ....

### 컴퓨터의 범용성(universality), 범용 컴퓨터(general-purpose computer)
- NOT, AND, OR 게이트만으로 모든 계산을 할 수 있다.
- NAND 게이트만으로 모든 계산을 할 수 있다.
- 즉, 하드웨어가 있으면 모든 소프트웨어가 할 일을 지원해줄 수 있다는 뜻.


### 컴퓨터의 계산가능성(computability)
- Turing-computable : 튜링 머신으로 계산가능한 것.
- 정지 문제; Halting Problem : 튜링 머신으로 풀 수 없는 문제.
  * 오토마타(튜링) → ISA(폰 노이만)
  * 폰 노이만 아키텍처 : instruction-execution cycle(fetches-executed), instruction register 사용
 
### 프로그램
- 프로그램 : A program is a set of instructions = 명령어의 집합.
  + that tells a computer’s hardware to perform a task. = 컴퓨터에게 어떤 태스크를 수행하도록 말하는

### 운영체제 = 프로그램
- is a program running at all times on the computer = 컴퓨터 위에서 항상 돌아가는 프로그램
- to provide system services to application programs = 애플리케이션 프로그램에게 시스템 서비스를 제공함.
- to manage processes, resources, user interfaces, and so on = 프로세스, 리소스, 유저 인터페이스 등을 관리함.
- 즉, 하드웨어 디바이스가 존재하면 이를 제어할 운영체제가 필요하고, 이를 통해 애플리케이션이 실행될 수 있게 함.

# 02. 운영체제의 개념과 구조

# Chap1. Introduction

## 1.1. What Operating Systems Do
- 컴퓨터 시스템의 네 가지 컴포넌트
  + 하드웨어
  + 운영체제
  + 애플리케이션 프로그램
  + 유저
  + <img width="608" alt="image" src="https://github.com/led156/TIL/assets/67251510/0f43aea2-6e9b-43d4-9f2b-9147dad72529">

- 운영체제의 정의
  + "the one program running at all times on the computer", usually called the kernel

- 컴퓨터 시스템 구조
  + 한 개 또는 여러개의 CPU
  + 버스를 통해 디바이스 컨트롤러가 연결되어 있음.
  + <img width="410" alt="image" src="https://github.com/led156/TIL/assets/67251510/f5987eec-4bb4-47b9-8143-acc3ee7e7a66">

## 1.2. Computer-System Organization
- bootstrap program
  + the first program to run on computer power-on, = 전원을 켰을 때 가장 먼저 실행되는 프로그램 (커널)
  + and then loads the operating system = 운영체제를 메모리에 로드해줌

- Interrupts
  + <img width="438" alt="image" src="https://github.com/led156/TIL/assets/67251510/d98d3c57-899a-4160-810e-562fbcbb62df">
  + 하드웨어가 인터럽트를 트리거시킬 수 있음.
  + 이를 통해 CPU에게 시그널을 보냄. (버스를 통해서)

- 메모리 계층구조
  + storage capacity, and access time에 따라 달라짐
  + <img width="238" alt="image" src="https://github.com/led156/TIL/assets/67251510/4d711389-e2f2-4c63-a8d1-de24f4f8ca99">

- I/O Structure
  + DMA(Directed Memory Access) : CPU를 거치지 않고 디바이스끼리 바로 통신하는 것
  + <img width="356" alt="image" src="https://github.com/led156/TIL/assets/67251510/d06e6bd0-72d0-4d48-9294-1bbded4f6d22">

## 1.3. Computer System Architecture
- 컴퓨터 시스템 컴포넌트
  + CPU - The hardware that executes instructions.
  + Processor - A physical chip that contains one or more CPUs.
  + Core - The back computation unit of the CPU.
  + Multicore - Including multiple computing cores on the same CPU.
  + Multiprocessor - Including multiple processors.

### Symmetric multiprocessing (SMP)
- 여러개의 프로세서. (여러개의 CPU)
- <img width="418" alt="image" src="https://github.com/led156/TIL/assets/67251510/0c8df942-393d-4300-b091-7690dcf10ebb">

### Multi-core design
- 같은 프로세서 칩 안에 코어를 여러 개 두는 것. (주로 사용)
- <img width="448" alt="image" src="https://github.com/led156/TIL/assets/67251510/4ed1fa27-15c2-4ae1-877e-0013f06f510d">

## 1.4. Operating System Operations
### Multiprogramming
- <img width="131" alt="image" src="https://github.com/led156/TIL/assets/67251510/6cfbd299-f8c9-4299-b34f-7227c2e53478">
- 여러 개의 프로그램을 동시에 메모리에 올려놓는 것 → CPU 사용효율을 높일 수 있음.

### Multitasking (=multiprocessing) ; concurrency(동시성)
- 멀티 프로그래밍이 된다면, time-sharing(시분할)로 CPU를 스위칭하면서 유저는 여러 개의 job과 interact 할 수 있게 됨.
- CPU scheduling : If several processes are ready to run at the same time, the system must choose which process will run next
  + 여러 개의 프로세스가 동시에 ready 상태에 있을 때, 시스템은 다음에 run할 프로세스를 선택해야 함. (cpu 효율을 보장하는)
<details>
    <summary>❓Concurrency(동시성) vs. Parallelism(병렬성)</summary>

- [🔗](https://spacebike.tistory.com/22)
  
|Concurrency (동시성)|Parallelism (병렬성)|
|--|--|
|동시에 실행되는 것처럼 보이는 것|실제로 동시에 실행되는 것|
|논리적인 개념|물리적인 개념|
|싱글코어, 멀티코어에서 가능|멀티코어에서만 가능|
|![image](https://github.com/led156/TIL/assets/67251510/65884d42-b9e9-4dd3-bc63-342ed0a876b0)|![image](https://github.com/led156/TIL/assets/67251510/a6addefd-7139-46e4-bb10-a01ab00d7d30)|
|태스크가 동시에 수행되므로 동기화 문제가 발생할 수 있음.|여러 작업을 동시에 수행하여 race condition 혹은 동기화 문제가 발생할 수 있음.|

</details>
 
### opretation mode
- user mode & kernel mode
  + incorrect한 프로그램을 보장해줌. incorrectly한 실행을 막아주는 것. (커널모드에서만 하드웨어 직접적 제어가 가능하기 때문)
  + <img width="507" alt="image" src="https://github.com/led156/TIL/assets/67251510/a3efeaf5-757e-422f-88de-b8ae6d5033ed">
  + system call(시스템콜) : os한테 서비스를 요청하는 것.

## 1.7. Virtualization
- virtualization (가상화)
  + VMM(Virtual Machine Manager)를 이용해 한 컴퓨터에서 여러 개의 다른 환경을 실행시키는 것.
  + <img width="643" alt="image" src="https://github.com/led156/TIL/assets/67251510/849ac49e-5733-4b9a-8b9e-f8f7189fda27">

## 1.10. Computing Environments
- Operating Systems in the Variety of Computing Environments
  + Traditional Computing
  + Mobile Computing
  + Client-Server Computing
  + Peer-to-Peer Computing
  + Cloud Computing (edge computing)
  + Real-Time Embedded Systems
  + <img width="683" alt="image" src="https://github.com/led156/TIL/assets/67251510/302986f3-b208-4c27-8fca-e299d9d0bc98">
  + <img width="406" alt="image" src="https://github.com/led156/TIL/assets/67251510/3335a654-f2f9-41bd-839f-8b98eb372664">

<details>
    <summary>❓가상화 vs. 클라우드</summary>

[Virtualization(가상화) 개념 쉽게 이해하기](https://selog.tistory.com/entry/%EA%B0%80%EC%83%81%ED%99%94-Virtualization%EA%B0%80%EC%83%81%ED%99%94-%EA%B0%9C%EB%85%90-%EC%89%BD%EA%B2%8C-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0)

[가상화란?(가상화 개념, 가상화 클라우드 차이](https://claudy.tistory.com/entry/%EA%B0%80%EC%83%81%ED%99%94Virtualization%EB%9E%80%EA%B0%80%EC%83%81%ED%99%94-%EA%B0%9C%EB%85%90-%EA%B0%80%EC%83%81%ED%99%94-%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C-%EC%B0%A8%EC%9D%B4)

[클라우드와 가상화의 차이는 무엇일까요?](https://www.redhat.com/ko/topics/cloud-computing/cloud-vs-virtualization)

- 가상화 : 하나의 실물 컴퓨팅 자원을 마치 여러 개인 것처럼 가상으로 쪼개서 사용하는 것. 컴퓨터 리소스의 추상화를 일컫는 광범위한 용어.
  + (기술) 단일한 물리 하드웨어 시스템에서 여러 시뮬레이션 환경이나 전용 리소스를 생성할 수 있는 기술
  + 추상화 : 1개의 자원을 여러 개로 나눌 수 있는 것처럼 여기거나, 여러 개의 자원을 하나인 것처럼 생각하는 것
  + 1. 하이퍼바이저(VM) 기반의 가상화 : 리소스 전체를 가상화하여 하나의 하드웨어에서 여러 개의 가상머신을 생성해 실제 물리적인 장치는 아니지만 실제 컴퓨터처럼 동작하게 함.
  + 2. 컨테이너 기반의 가상화 : host os 위에 컨테이너 엔진이 올라가 OS 수준에서 프로세스를 컨테이너 형태로 격리하는 방법. (VM보다 메모리 사용량이 적고, 디스크 사용량도 적어 상대적으로 가벼움)
- 클라우드 : 가상화 기술을 기반으로 네트워크를 통해 인프라 자원 뿐만 아니라 네트워킹, 플랫폼, 오케스트레이션, 보안, 복구 등의 다양한 서비스들을 제공할 수 있는 환경.
  + (환경) 네트워크 전체에서 확장 가능한 리소스를 추상화하고 풀링하는 IT 환경
    
[클라우드 컴퓨팅(Cloud Computing)이란?](https://www.samsungsds.com/kr/cloud-glossary/cloud-computing.html)

</details>


# Chap2. O/S structures
## 2.1. Operating System Services

- OS provides an environment for the execution of programs. = OS 하는 일
  + User interface
  + Program execution
  + I/O operation
  + File-system manipulation
  + Communications
  + Error detection
  + Resource allocation
  + Logging
  + Protection and security
- <img width="649" alt="image" src="https://github.com/led156/TIL/assets/67251510/eeaf7341-6c61-4bd4-adc5-e6af2d4f7e22">


## 2.2. User and Operating-System Interface
- 유저 인터페이스
  + CLI(command line interface)
  + GUI(graphical user interface)
  + Touch-Screen Interface


## 2.3. System Calls
- System calls
  + provide an interface to the services made available by the OS. 
  + API: Application Programming Interface
  + <img width="278" alt="image" src="https://github.com/led156/TIL/assets/67251510/ea69bc12-70ae-448e-9904-182d2b2974a9">
  + standard library를 통해 호출. `printf`
  + <img width="484" alt="image" src="https://github.com/led156/TIL/assets/67251510/79ffdb93-7cbd-464b-99df-57f8db16c3a8">

---

# 🙋 
1. 운영체제가 중요한 이유
- 실행할 프로그램에 필요한 자원을 할당하고, 프로그램이 올바르게 실행되도록 돕는 특별한 프로그램이기 때문.
- 프로세스 관리: 여러 프로세스가 CPU를 공유하며 실행되도록 스케줄링하고, 필요한 자원을 할당합니다.
- 자원 접근 및 관리: 메모리, 저장장치, 네트워크 등의 자원을 효율적으로 관리하고 사용자가 접근할 수 있도록 합니다.
- 파일 시스템 관리: 데이터를 저장하고 검색할 수 있는 파일 시스템을 관리하여 데이터 관리를 지원합니다.
  
2. 멀티코어 CPU의 장점
  - 멀티코어 CPU는 여러 개의 코어를 하나의 칩에 통합하여 병렬적으로 작업을 처리할 수 있으므로, 멀티프로세서보다 멀티스레드 작업에 유리함.
    
3. 동시성을 바탕으로 CPU 스케줄링이 왜 필요한지 이유를 설명
- 동시성은 여러 작업이 동시에 실행될 수 있는 개념을 의미
- CPU 스케줄링은 여러 프로세스가 CPU를 공유하며 실행될 때, 각 프로세스에게 CPU를 할당하고 관리하는 기술입니다.
- 이유:
  + 자원 공유: 여러 프로세스가 자원을 공유하기 때문에 효율적인 자원 관리가 필요합니다.
  + 공평성: 모든 프로세스가 CPU 시간을 공평하게 배분받아야 합니다.
  + 성능 최적화: CPU를 최대한 활용하여 시스템 성능을 최적화할 수 있습니다.
    
4. interrupt가 발생하는 이유를 동기(예외) 인터럽트 관점으로 설명
- 동기 인터럽트는 프로세서가 명령어를 실행하는 도중 발생하는 인터럽트입니다.
- 이유:
  + 하드웨어 오류: 하드웨어 장치에서 오류가 발생할 경우, CPU에게 이를 알리기 위해 인터럽트가 발생합니다.
  + 프로그램 오류: 프로그램이 잘못된 명령어를 실행하거나 잘못된 데이터에 접근할 경우 발생할 수 있습니다.
  + 예외 상황: 예를 들어 0으로 나누기와 같은 예외적인 상황이 발생할 경우 CPU는 이를 처리하기 위해 인터럽트를 발생시킵니다.
    
5. 프로그램과 프로세스의 개념을 차이를 기준으로 설명
- 프로그램: 실행 가능한 명령어들의 집합을 의미합니다. 일반적으로 디스크나 다른 저장 장치에 저장되어 있습니다.
- 프로세스: 실행 중인 프로그램으로, 메모리에 올라와 CPU에서 실행되고 있는 상태를 말합니다.
