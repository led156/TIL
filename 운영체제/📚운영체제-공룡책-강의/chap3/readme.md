# ✏️ 주요 개념
- 프로세스의 개념 (PCB, 프로세스 스케줄링, 문맥 교환)
- 프로세스 생성 (부모-자식)

---

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
  + <details>
    <summary> ❓ wait이 호출될 때 어떤 일이 발생할까 </summary>
    - wait : 좀비 프로세스 방지
    
    [SIGCHLD와 wait() 함수 사용](https://blog.naver.com/nds239/10131452097) <br/>
    [프로세스 생성과 종료 총정리 및 wait 시스템콜 상세](https://bannavi.tistory.com/69) <br/>
    [Exceptional Control Flow : Process Synchronizing(wait, waitpid)](https://littlejay.tistory.com/227)
    ![image](https://github.com/led156/TIL/assets/67251510/f03f1e59-57a7-4579-a306-e0f5f406d0fe)
    - SIGCHLD : 자식 프로세스의 상태가 바뀌면 발생하는 시그널
      + 자식 프로세스가 종료하면 부모 프로세스에게 SIGCHLD 시그널을 보내게 됨.
        * 자식 프로세스가 종료될 때 status 정보를 넣어줘서 exit() 함수를 실행함.
      + 부모 프로세스가 해당 시그널을 받고, wait을 종료함.
    - 부모 프로세스가 자식 프로세스 여러 개를 기다리는 상태일 때, wait 함수는 가장 먼저 종료된 자식 프로세스를 받고, 끝나버릴 수 있음 → 나머지 자식 프로세스는 zombie, orphan 프로세스로 남아있을 가능성이 있음.
      + 해결1 : `while (wait(NULL) > 0);` / `while (waitpid(-1, NULL, WNOHANG) > 0)`
    - `waitpid(pid_t pid, int &status, int options)` : 특정 프로세스를 wait
      + pid == -1 : 아무 자식 프로세스나 기다림
      + pid < -1 : 프로세스 그룹 id가 pid의 절댓값과 동일한 값을 기다림 (?)
        * PGID : 프로세스 그룹(Process Group)은 1개 이상의 프로세스의 묶음을 의미한다. PGID(Process Group ID)는 이러한 프로세스 그룹을 식별하기 위해 부여되는 번호이다.
      + pid == 0 : 부모 프로세스의 그룹 id가 같은 자식 프로세스를 기다림
      + pid > 0 : pid값이 일치하는 자식 프로세스를 기다림
      + options
        * 0 : 자식 프로세스가 종료될 때까지 block (wait과 동일한 방식)
        * WNOHANG : non-blocking 모드로 동작하여, 부모 프로세스는 그대로 진행됨.
    - 부모, 자식 프로세스 중 누굴 먼저 수행할지는 스케줄링 알고리즘에 따라 결정되기 때문에 수행 순서를 결정할 순 없음
      + 하지만 두 프로세스들은 concurrently(병행적)하게 수행이 되고 오고, wait 함수들로 인해 동기화를 시켜 수행의 flow는 제어 가능함.
    
    </details>
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
# 3.3. Operations on Processes
- 새로운 프로세스는 `fork()`라는 시스템 콜에 의해 생성됨.
  + 부모 프로세스의 주소공간을 복사해서 구성됨.
  + parent process : `fork()` return zero
  + child process : `fork()` return nonzero pid
+ 예제
  - ```c
    #include <stdio.h>
    #include <unistd.h>
    int main()
    {
      pid_t pid;
      pid = fork();
      printf("Hello, Process! %d\n", pid);
    }
    ```
  - 출력결과
    ```
    Hello, Process! 2547
    Hello, Process! 0
    ```

- child process의 Run을 기다릴 수 있음 : `wait()`
  + 부모 프로세스는 ready queue에서 대기하게 됨.
  + 예제
    * ```c
      #include <stdio.h>
      #include <unistd.h>
      #include <wait.h>
      int main()
      {
        pid_t pid;
        pid = fork();
        if (pid > 0)
        wait(NULL);
        printf("Hello, Process! %d\n", pid);
      }
      ```
  + 출력 결과
    * ```
      Hello, Process! 0
      Hello, Process! 2547
      ```

- Exercise 3.1
  + ```c
    int value = 5;

    int main()
    {
      pid_t pid;
      pid = fork();

      if (pid == 0) { // child process
        value += 15;
        return 0;
      }
      else if (pid > 0) { // parent process
        wait(NULL);
        printf("Parent: value = %d\n", value);
      }
    }
    ```
  + ```
    Parent: value = 5
    ```
  + 부모-자식 프로세스의 경우 코드, 데이터, 스택, 힙 영역 모두 따로 가지게 됨! (스레드와 달리)
  + ![image](https://github.com/led156/TIL/assets/67251510/6cd71554-c2b9-4e9f-877c-bb717bd2d231)
  + ![image](https://github.com/led156/TIL/assets/67251510/db252dc5-5541-43b0-b3c7-2b7bfc9eb205)


- Exercise 3.2
  + ```c
    #include <stdio.h>
    #include <unistd.h>
    #include <wait.h>
    /** How many processes are created? */
    int main() {
      fork(); // fork a child process
      fork(); // fork another child process
      fork(); // and fork another
      return 0;
    }
    ```
  + ![image](https://github.com/led156/TIL/assets/67251510/9167f108-443c-430a-8635-e039592985dc)


- Exercise 3.11
  + ```c
    #include <stdio.h>
    #include <unistd.h>
    /** How many processes are created? */
    int main() {
      int i;
      for (i = 0; i < 4; ++i)
        fork();
      return 0;
    }
    ```
  + ![image](https://github.com/led156/TIL/assets/67251510/5b9b4236-99be-4521-a3dc-5f71c3edd7ce)


- Exercise 3.11
  + ```c
    int main()
    {
      pid_t pid;
      pid = fork();

      if (pid == 0) {  // child process
        execlp("/bin/ls", "ls", NULL);
        printf("LINE J\n");
      }
      else if (pid > 0) { // parent process
        wait(NULL);
        printf("Child Complete\n");
      }
    
      return 0;
    }
    ```
  + `int execlp( const char *file, const char *arg, ...)` : 지정 디렉토리에 있는, 프로그램을 실행하는 것. 따라서 해당 명령어 뒤에 있는 명령어들은 작동X
  + ```
    Child Complete
    ```


- Exercise 3.13
  + ```c
    int main()
    {
      pid_t pid, pid1;
      pid = fork();

      if (pid == 0) {
        pid1 = getpid();
        printf("CHILD: pid = %d \n", pid); 
        printf("CHILD: pid1 = %d \n", pid1); // 생성된 자식 프로세스 pid
      }
      else if (pid > 0) {
        wait(NULL);
        pid1 = getpid();
        printf("PARENT: pid = %d \n", pid); // 생성한 자식 프로세스 pid
        printf("PARENT: pid1 = %d \n", pid1); // 본인 pid
      }
      
      return 0;
    }
    ```
  + `getpid()` : 본인 pid 반환
  + ```
    CHILD: pid = 0
    CHILD: pid1 = 5157
    PARENT: pid = 5157
    PARENT: pid1 = 5156
    ```



- Exercise 3.16
  + ```c
    #define SIZE 5
    int nums[SIZE] = {0, 1, 2, 3, 4};

    int main()
    {
      pid_t pid;
      int i;
      pid = fork();

      if (pid == 0) {
        for (i = 0; i < SIZE; ++i) {
          nums[i] *= i;
          printf("CHILD: %d \n", nums[i]);
        }
      }
      else if (pid > 0) {
        wait(NULL);
        for (i = 0; i < SIZE; ++i) {
          printf("PARENT: %d \n", nums[i]);
        }
      }
      
      return 0;
    }
    ```
  + ```
    CHILD: 0
    CHILD: 1
    CHILD: 4
    CHILD: 9
    CHILD: 16
    PARENT: 0
    PARENT: 1
    PARENT: 2
    PARENT: 3
    PARENT: 4
    ```

- 자식 프로세스를 생성한 이후 명령어를 항상 부모 프로세스가 먼저 실행한다는 보장이 없음. (syncronazation)

---
# 🙋
- 좀비 프로세스 / 고아 프로세스의 문제점 및 해결방법. 그리고 시스템에 더 치명적인 영향을 미치는 것이 무엇일지 차이점을 토대로 설명.
  + 좀비 프로세스 (zombie process)
    * [문제점1] 리소스 낭비 : 프로세스 테이블 엔트리를 차지하기 때문에 제한 발생.
    * [문제점2] 시스템 성능 저하
    * [해결방법1] 부모 프로세스 수정 : `wait()` / `waitpid()` 함수를 사용해 자식 프로세스의 종료 상태를 수집하는 것을 의미.
  + 고아 프로세스 (orphan process)
    * [문제점1] 리소스 낭비 : 부모 프로세스가 종료되었기 때문에 더 이상 관리되지 않는 프로세스가 됨.
    * [문제점2] 제어 불가능성 : 부모 프로세스가 없기 때문에, 특정 제어 작업을 수행할 수 없음. (예상치 못한 동작 유발 가능)
    * [해결방법1] : 유닉스 계열 시스템에서는 부모 프로세스가 종료될 시, 고아 프로세스의 부모는 자동으로 PID 1 (init 프로세스)가 됨. (주기적으로 프로세스 상태를 수집하고 정리해서 해당 작업 수행) → init 프로세스가 자동으로 관리하기 때문에 좀비 프로세스만큼 심각한 문제는 아님.

---

# ✏️ 주요 개념

# 프로세스간 통신


# 프로세스간 통신의 실제



