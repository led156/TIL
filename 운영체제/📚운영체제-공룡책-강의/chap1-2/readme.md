# ✏️ 주요 개념
- 운영체제와 커널이란
- 


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





