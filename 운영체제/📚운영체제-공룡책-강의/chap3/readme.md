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
# 3.4. Interprocess Communication
- 프로세스는 concurrently하게 실행
  + 1. independent processes
    * 다른 프로세스와 공유하는 데이터가 없는 상태
  + 2. cooperating processes
    * 두 개의 프로세스가 서로 영향을 주고받으며 실행되는 상태
    * 데이터를 공유하거나 메시지를 주고 받을 때

## IPC : Inter-Process Communication
- IPC : 프로세스가 cooperating하기 위해 필요한 메커니즘.
  + 데이터를 교환함 (send / receive)
- ![image](https://github.com/led156/TIL/assets/67251510/b00cd4cd-bf03-47da-ada3-392c5a1df18f)
- 1. shared memory
- 2. message passing


# 3.5. IPC in Shared-Memory Systems
- Producer-Consumer Problem
  + producer(생산자)는 정보를 생산하고, consumer(소비자)는 정보를 소비함.
  + 예시1) 컴파일러는 (어셈블리 코드) 생산자, 어셈블러는 소비자
  + 예시2) 웹서버는 (HTML file) 생산자, 브라우저는 소비자

- shared-memory를 사용하면, 생산자/소비자를 concurrently하게 실행할 수 있음. → buffer를 공유.
  + producer : buffer를 채운다.
  + consumer : buffer를 비게 한다.
- 프로세스들의 메모리 영역은 각각 생성되는데? 따라서 shared memory라는 다른 메모리 영역을 운영체제가 관리하고 있어야 함.

- Define a shared buffer
  + ```c
    #define BUFFER_SIZE 10

    typedef struct {
      ...
    } item
  
    item buffer[BUFFER_SIZE];
    int in = 0;
    int out = 0;
    ```
  + <img width="335" alt="image" src="https://github.com/led156/TIL/assets/67251510/d3278757-0b4d-4928-92cd-807e936f14ab">

  
  + ```c
    item next_produced;
  
    while (true) {
      /* produce an item in next_produced */
  
      while (((in + 1) % BUFFER_SIZE) == out);
  
      buffer[in] = next_produced;
      in = (in + 1) % BUFFER_SIZE;
    }
    ```

  + ```c
    item next_consumed;
  
    while (true) {
      while (in == out);
  
      next_consumed = buffer[out];
      out = (out + 1) % BUFFER_SIZE;
  
      /* consume the item in next_consumed */
    }
    ```

- 다만, shared memory를 생성하는 것은 구현이 복잡해짐.
  + shared memory를 조작하는데 필요한 동작을 모두 프로그래머가 작성해야하기 때문에!

# 3.6. IPC in Message-Passing Systems
- Message-Passing
  + 운영체제가 알아서 목적지까지 전달해줌.
  + 두 개의 prosumer가 있을 때 shared memory 방식으로 구현하기 어렵지만, message passing으로는 쉽게 적용할 수 있음.
- send message - receive message
  + ```c
    message next_produced;

    while (true) {
      /* produce an item in next_produced */

      send(next_produced);
    }
    ```
  + ```c
    message next_consumed;

    while (true) {
      receive(next_consumed);

      /* consume the item in next_consumed */
    }
    ```
- Communication Links
  + 두 개의 프로세스 P, Q가 communicate 하고자 할 때, 메시지를 send 하거나 receive 하는 기능만 있으면 됨.
  + implemented(구현) 방식
    * direct / indirect communication
      + 부모님이 자식에게 용돈을 손으로 줌 / 부모님이 자식에게 줄 용돈을 탁자에 올려둠
      + direct communication : 통신의 수신자 또는 발신자의 이름을 명시적으로 지정해야 합니다. & communication 링크가 automatic하게 생성되어 하나의 링크만 설정됨
        - send(𝑃, message) – send a message to process 𝑃.
        - receive(𝑄, message) – receive a message from process 𝑄.
      + indirect communication : mailbox, port에 메시지를 보내거나 받음. & 두 개의 프로세스가 한 Port를 사용할 때 링크가 생성됨. 여러 개의 관계가 생길 수 있음
        - 메시지를 배치할 수 있는 위치 send(𝐴, message) – send a message to mailbox 𝐴
        - 메시지를 제거할 수 있는 위치 receive(𝐴, message) – receive a message from mailbox 𝐴.
        - 운영체제의 입장에서 제공할 것 :
          + Create a new mailbox.
          + Send and Receive message through the mailbox
          + Delete a mailbox
    
    * synchronous / asynchronous communication
      + 부모님이 자식의 잔고를 확인하고 용돈을 줌 / 부모님이 자식의 잔고와 상관없이 용돈을 줌
    * automatic / explicit buffering
      
    
  + design options for implementation
    * blocking / non-blocking : synchronous / asynchoronous
      + blocking이면, 전송이 끝날 때까지 기다리거나 해야함. 즉 동기화가 되어있는 것임.
    * Blocking send : 메시지가 수신될 때까지 sender가 차단됨
    * Non-blocking send : sender가 메시지를 계속 보냄
    * Blocking receive : 메시지를 사용할 수 있을 때까지 receiver가 차단됨
    * Non-blocking recevie : receiver가 유효한 메시지나 null 메시지를 검색함



# 프로세스간 통신의 실제
# 3.7. Examples of IPC Systems

- Examples of IPC Systems
  + Shared Memory : POSIX Shared Memory
    * POSIX : Portable Operating System Interface (for uniX)
  + Message Passing : Pipes
    * UNIX system 초기 IPC 메커니즘


## 3.7.1 POSIX Shared Memory
- memory-mapped 파일을 사용할 수 있음.
  1. create a shared-memory object : `fd = shm_open(name, O_CREAT | ORDWR, 0666);`
  2. configure the size of the object in bytes : `ftruncate(fd, 4096);`
  3. establish a memory-mapped file : `mmap(0, SIZE, PROT_READ | PROT_WRITE, MAP_SHARED, fd, 0);`

- ```c
  #include <stdio.h>
  #include <stdlib.h>
  #include <string.h>
  #include <fcntl.h>
  #include <sys/shm.h>
  #include <sys/stat.h>
  #include <sys/mman.h>

  int main()
  {
    const int SIZE = 4096;    // the size of shared memory
    const char *name = "OS";  // the name of shared memory
    const char *message_0 = "Hello, ";
    const char *message_1 = "Shared Memory!\n";

    int shm_fd;   // the file descriptor of shared memory
    char *ptr;    // pointer to shared memory

    /* create the shared memory object */
    shm_fd = shm_open(name, O_CREAT | O_RDWR, 0666);

    /* configure the size of the shared memory */
    ftruncate(shm_fd, SIZE);

    /* map the shared memory object */
    ptr = (char *)mmap(0, SIZE, PROT_READ | PROT_WRITE, MAP_SHARED, shm_fd, 0);

    /* write to the shared memory */
    sprintf(ptr, "%s", message_0); // 쓰고 난 다음
    ptr += strlen(message_0);      // 포인트를 옮김
    sprintf(pts, "%s", message_1);
    ptr += strlen(message_1);

    return 0;
  }
  ```
- `$ gcc 3.16_shm_producer.c -lrt`

- ```c
  #include <stdio.h>
  #include <stdlib.h>
  #include <fcntl.h>
  #include <sys/shm.h>
  #include <sys/stat.h>
  #include <sys/mman.h>

  int main()
  {
    const int SIZE = 4096;    // the size of shared memory
    const char *name = "OS";  // the name of shared memory

    int shm_fd;   // the file descriptor of shared memory
    char *ptr;    // pointer to shared memory

    /* create the shared memory object */
    shm_fd = shm_open(name, O_RDONLY, 0666);

    /* map the shared memory object */
    ptr = (char *)mmap(0, SIZE, PROT_READ | PROT_WRITE, MAP_SHARED, shm_fd, 0);

    /* read from the shared memory object */
    printf("%s", (char *)ptr);    // 제일 첫 부분,..

    /* remove the shared memory */
    shm_unlink(name);

    return 0;
  }
  ```
- `$ gcc 3.16_shm_consumer.c -lrt`


## 3.7.2. Pipes
- pipe 구현의 네가지 이슈
  1. unidirectional / bidirectional communication을 할 것인가?
  2. two-way communication이 가능한가. half-duplex / full-duplex
  3. 커뮤니케이션 간 relationship이 존재하는가?
  4. pipe가 네트워크를 통해 통신할 수 있는가?
- 두가지 타입
  + Ordinary pipes
    * 외부에서 접근할 수 없음
    * parent 프로세스는 파이프를 생성하고, 이를 사용해 파이프가 생성한 child 프로세서와 통신함
    * ![image](https://github.com/led156/TIL/assets/67251510/9b874071-bb57-489e-8d18-be9efe76e3b3)
    * `pipe(int fd[])`
    * `fd[0]` : the read end of the pipe
    * `fd[1]` : the write end
    * ```c
      #include <stdio.h>
      #include <string.h>
      #include <unistd.h>
      #include <sys/types.h>

      #define BUFFER_SIZE 25
      #define READ_END 0
      #define WRITE_END 1

      int main()
      {
        char write_msg[BUFFER_SIZE] = "Greetings";
        char read_msg[BUFFER_SIZE];
        int fd[2];
        pid_t pid;

        /* create the pipe */
        pipe(fd);

        pid = fork(); // fort a new process

        if (pid > 0) { // parent process
          close(fd[READ_END]);
          /* write to the pipe */
          write(fd[WRITE_END], write_msg, strlen(write_msg) + 1);
          close(fd[WRITE_END]);
        }
        else if (pid == 0) {  // child process
          close(fd[WRITE_END]);
          /* read to the pipe */
          read(fd[READ_END], read_msg, BUFFER_SIZE);
          printf("read %s\n", read_msg);
          close(fd[READ_END]);
        }
      }
      ```

  + Named pipes
    * 부모-자식 관계 없이 접근할 수 있음.



# 3.8. Communication in Client-Server Systems
- client-server systems
  + Sockets : 통신을 위한 endpoint 정의 (IP address, port number)
    - ![image](https://github.com/led156/TIL/assets/67251510/e2a9f2c4-61f2-4a86-bddb-47f59849e5ea)
    - Java 제공 소켓 인터페이스
      + Socket class : connection-oriented (TCP)
      + DatagramSocket class : connectionless (UDP)
      + MulticastSocket class : multiple recipients
      + ```java
        import java.net.*;
        import java.io.*;
        
        public class DataServer {
          public static void main(String[] args) throws Exception {
            ServerSocket server = new ServerSocket(6013);
        
            /* Now listen for connections */
            while (true) {
              Socket client = server.accept();
              PrintWriter pout = new PrintWrite(client.getOutputStream(), true);
        
              /* write the Date to the socket */
              pout.println(new java.util.Date().toString());
        
              /* close the socket and resume listening for connections */
              client.close()
            }
          }
        }
        ```
        
        
      + ```java
        import java.net.*;
        import java.io.*;
        
        public class DataClient {
          public static void main(String[] args) throws Exception {
            Socket socket = new Socket("127.0.0.1", 6013);
        
            InputStream in = socket.getInputStream();
            BufferedReader br = new BufferedReader(new InputStreamReader(in));
        
            /* read date from the socket */
            String line = null;
            while ((line = br.readLine()) != null)
              System.out.println(line);
        
            /* close the socket connections */
            socket.close();
          }
        }
        ```


  + RPCs (Remote Procedure Calls) : 네트워크 시스템의 프로세스 간 절차 호출을 추상화
    - 원격 서비스의 형태
    - 네트워크 연결을 통해 원격 제어 가능
    - 클라이언트는 리모트 호스트에 있는 procedure(프로시저)를 불러옴
    - client에 stub을 제공함으로써 통신의 세부 정부를 숨김
    - 파라미터를 marshals함
    - ![image](https://github.com/led156/TIL/assets/67251510/18d31802-6048-4b3d-ab99-2f4427c8ba2a)



