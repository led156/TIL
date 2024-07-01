# Chapter3. Processes

# 프로세스의 이해
# 3.1. Process Concept
## process : program in execution. = 실행 중인 프로그램
  + 운영체제의 작업의 단위 → 운영체제의 가장 큰 역할 : 프로세스 관리
  + CPU time, memory, files, I/O devices : 프로세스는 해당 리소스들을 통해 작업을 수행함.
### multiple sections
  + ![image](https://github.com/led156/TIL/assets/67251510/464c2535-4101-49bc-a1d9-89414103eeaf)

  + Text section:
    * the executable code = 실행 코드
  + Data section:
    * global variables = 전역 변수
  + Heap section:
    * memory that is dynamically allocated during program run time = 동적 할당 메모리 
  + Stack section:
    * temporary data storage when invoking functions
    * such as function parameters, return addresses, and local variables = 로컬 변수, 함수 호출
  + ![image](https://github.com/led156/TIL/assets/67251510/dd8f1a73-0795-4bcf-89dc-93b61c5533c5)
    * uninitialized data : x
    * initialized data : y
    * stack : main, values, i, ...
    * heap : malloc(*values)

## process state (프로세스 상태)
  + ![image](https://github.com/led156/TIL/assets/67251510/1d887a22-d943-4f76-8d0f-82c83676c253)

  + New: the process is being created. = 막 생성된 상태
  + Running: Instructions are being executed. = 명령어 실행 중인 상태
  + Waiting: the process is waiting for some event to occur. = 어떤 이벤트를 기다리는 상태
    * such as an I/O completion or reception of a signal. (시그널, I/O 완료를 기다림)
  + Ready: the process is waiting to be assigned to a processor. (할당되기 위해 대기하는 상태)
  + Terminated: the process has finished execution. (종료한 상태)

## PCB (Process Control Block)
- 각 프로세스는 PCB로 표현됨.
  + Process state (new, running, waiting, ready, terminated)
  + Program counter (메모리 주소) : context
  + CPU registers (IR, DR) : context
  + CPU-scheduling information
  + Memory-management information
  + Accounting information (계정 정보, 어떤 유저가 ...)
  + I/O status information (자원 정보)
  + ![image](https://github.com/led156/TIL/assets/67251510/1ce05452-61c9-4c0f-bdb6-b84ac0ee0784)


## thread, 스레드
- ▪ A thread is a lightweight process.
- a program that performs a single thread of execution. = 하나의 스레드로 실행되는
  + only one task at a time. = 한 번에 한 태스크밖에 수행할 수 없음.
- 현대의 경우 - to allow a process to have multiple threads of execution
  + to perform more than one task at a time. = 한 번에 하나 이상의 태스크를 수행할 수 있음.


# 3.2. Process Scheduling
- multiprogramming (Parallel)
  + to have some process running at all times = 동시에 프로세스를 실행시키기 위해
  + so as to maximize CPU utilization = CPU 사용 효율을 최대화
- time sharing
  + to switch a CPU core among processes so frequently = CPU core에 적재되는 프로세스를 빈번하게 스위치해서
  + that users can interact with each program while it is running = 유저는 각각의 프로그램이 동시에 러닝되는 것처럼 보이도록 함

## Scheduling Queues
- ready queue, waiting queue(대기열)에서 프로세스가 ready & waiting(I/O 사용) 하게 됨. (PCB의 링크드 리스트로 구현)
  + ![image](https://github.com/led156/TIL/assets/67251510/3c43ad7d-809c-47b9-ab35-a616ee74e28f)
  + ![image](https://github.com/led156/TIL/assets/67251510/28ea5f20-cf5e-4589-802a-0c150622996c)

## Context Switch, 문맥 교환
- 프로세스 입장에서 프로세스가 사용되는 상태를 표현한 것을 context라 할 수 있음.
- interrupt가 발생한다면,
  + the system saves the current context of the running process, = 러닝 중인 프로세스는 현재의 context를 저장함. 
  + so that, later, it can restore that context when it should be resumed. = 다시 재개될 때 context를 복원함.
- context switch
  + switches the CPU core to another process. = 다른 프로세스를 스위치시키는 것.
  + performs a state save of the current process = 프로세스 상태 저장
  + and a state restore of a different process. = 프로세스 상태 불러오기
  + ![image](https://github.com/led156/TIL/assets/67251510/5f915902-d417-4224-968d-9213e7af76b2)

# 3.3. Operations on Processes
## 3.3.1. process creation
- parent - child `fork()`
- ![image](https://github.com/led156/TIL/assets/67251510/e4415621-85e9-4131-9fd8-006934912fea)
- execution : 실행할 때 concurrently하게 실행되거나 자식 프로세스가 멈추길 waits 할 수도 있음.
- address-space : 부모 프로세스를 (PCB만 다르게) duplicate하거나 새로운 new program을 가질 수도 있음.

```c
#include <stdio.h>
#include <unistd.h>
#include <wait.h>

int main()
{
  pid_t pid;
  // fork a child process
  pid = fork();
  if (pid < 0) { // error occurred
    fprintf(stderr, "Fork Failed");
    return 1;
  }
  else if (pid == 0) { // child process
    execlp("/bin/ls", "ls", NULL);
  }
  else { // parent process
    wait(NULL);
    printf("Child Complete");
  }
  return 0;
}
```
- ![image](https://github.com/led156/TIL/assets/67251510/bf96a985-3d39-4c9b-b3ba-9e2b1282791b)
- new program, wait



## 3.3.2. process termination.
- 마지막 문장을 실행하거나 `exit()`를 호출하면 끝남.
  + 메모리, 오픈한 파일 등 리소스를 해제함.

### Zombie and Orphan
- zombie, 좀비 (daemon, background ...) : 부모가 자식 프로세스를 기다리지 않음.
- orphan, 고아 : 부모 프로세스가 자식 프로세스보다 먼저 끝나는 경우


# 프로세스의 생성


# 프로세스간 통신


# 프로세스간 통신의 실제



