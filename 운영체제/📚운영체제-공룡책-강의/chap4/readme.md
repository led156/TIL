
# 4.1. Overview
- 프로세스는 여러 개의 스레드를 가질 수 있음.
- 스레드
  + lightweight process
  + 가장 작은 CPU 점유 단위가 될 수 있음 : thread ID, program counter, register set, stack
  + ![image](https://github.com/user-attachments/assets/ad07e412-22a1-460c-bc4e-6355b6bbc04b)


- multithreading
  + 예시) 서버가 한 연결을 받았을 때, 나머지 요청에 대해 처리할 수 없음.
  + 멀티 스레딩을 사용하면 여러 요청을 처리할 수 있음.
  + ![image](https://github.com/user-attachments/assets/e1089cc9-6a12-45b7-9c7a-f3b231e62a2d)

  + 장점1) Responsiveness : may allow continued execution
  + 장점2) Resource Sharing : threads share resources of process,
  + 장점3) Economy : cheaper than process creation, (context switching에 큰 오버헤드가 발생하기 때문)
  + 장점4) Scalability : process can take advantage of multiprocessor architectures



# 4.4. Thread Library
- 구현 방법
  1. Inheritance from the Thread class
     + Thread 클래스를 상속받아서, `public void run()` 메서드를 오버라이딩함.
     + 다만, 자바에서 다중상속이 되지 않으므로 다른 클래스를 상속받을 수 없게 됨.
  2. Implementing the Runnable interface
     + Runnable 인터페이스를 implements해서, `public void run()` 메서드를 오버라이딩함.
  3. Using the Lambda expression (beginning with Java Version 1.8)

- 방법1 : Thread 클래스 상속받기
  + ```java
    class MyThread1 extends Thread {
      public void run() {
        try {
          while (true) {
            System.out.println("Hello, Thread!");
            Thread.sleep(500);
          }
        }
        catch (InterruptedException ie) {
          System.out.println("I'm interrupted");
        }
    }


    public class ThreadExample1 {
      public static final void main(String[] args) {
        MyThread1 thread = new MyThread1();
        thread.start(); // 메인 스레드가 새로운 스레드를 실행함. 아직 context switching이 일어나지 않아 다음 명령어 실행.
        System.out.println("Hello, My Child!"); // 먼저 출력되고, Hello, Thread 출력
      }
    }
    ```


- 방법 2: Runnable 인터페이스 구현하기
  + ```java
    class MyThread2 implements Runnable {
      public void run() {
        try {
          while (true) {
            System.out.println("Hello, Runnable!");
            Thread.sleep(500);
          }
        }
          catch (InterruptedException ie) {
            System.out.println("I'm interrupted");
          }
      }
    }


    public class ThreadExample2 {
      public static final void main(String[] args) {
        Thread thread = new Thread(new MyThread2());
        thread.start();
        System.out.println("Hello, My Runnable Child!");
      }  
    }
    ```

- 방법 3: Runnable 람다 표현식 사용하기
  + ```java
    public class ThreadExample3 {
      public static final void main(String[] args) {
        Runnable task = () -> {
          try {
            while (true) {
              System.out.println("Hello, Lambda Runnable!");
              Thread.sleep(500);
            }
          }
          catch (InterruptedException ie) {
            System.out.println("I'm interrupted");
          }
        };
    
        Thread thread = new Thread(task);
        thread.start();
        System.out.println("Hello, My Lambda Child!");
      }
    }
    ```

- 부모 쓰레드의 대기 : wait → join
  + ```java
    public class ThreadExample4 {
      public static final void main(String[] args) {
        Runnable task = () -> {
          for (int i = 0; i < 5; i++) {
            System.out.println("Hello, Lambda Runnable!");
          }
        };
    
        Thread thread = new Thread(task);
        thread.start();
    
        try {
          thread.join();
        }
        catch (InterruptedException ie) {
          System.out.println("Parent thread is interrupted");
        }
        System.out.println("Hello, My Joined Child!"); // 스레드가 다 종료될 때까지 기다렸다가 실행됨.
      }
    }
    ```
  + ```
    Hello, Lambda Runnable!
    Hello, Lambda Runnable!
    Hello, Lambda Runnable!
    Hello, Lambda Runnable!
    Hello, Lambda Runnable!
    ello, My Joined Child!
    ```


- 쓰레드의 종료 : stop → interrupt
  + ```java
    public class ThreadExample5 {
      public static final void main(String[] args) throws InterruptedException {
        Runnable task = () -> {
          try {
            while (true) {
              System.out.println("Hello, Lambda Runnable!");
              Thread.sleep(100);
            }
          }
            catch (InterruptedException ie) {
              System.out.println("I'm interrupted");
            }
        };
        Thread thread = new Thread(task);
        thread.start();
        Thread.sleep(500);
        thread.interrupt();
        System.out.println("Hello, My Interrupted Child!");
      }
    }
    ```
  + ```
    Hello, Lambda Runnable!
    Hello, Lambda Runnable!
    Hello, Lambda Runnable!
    Hello, Lambda Runnable!
    Hello, Lambda Runnable!
    I'm interrupted
    Hello, My Interrupted Child!
    ```

# 4.2. Multicore Programming
- 멀티스레딩은 multicore 시스템일 때 효율적임 (하나의 칩에서 하나의 프로세스가 다른 스레드를 각각의 코어에 두고 실행하면 되므로)

- Consider an application with four threads.
  + single-core: threads will be interleaved over time.
  + multiple-cores: some threads can run in parallel.
  + ![image](https://github.com/user-attachments/assets/998bd4c2-5b4b-4311-9b7a-f39c61b95d51)

- 프로그래밍할 때 고려할 것
  + Identifying tasks: 나눌 수 있는 태스크를 찾아야 함. 동시에 할 수 있는 건 뭔지, dependency가 필요한 건 뭔지 찾아야 함.
  + Balance : 나눠진 태스크에 같은 value, 같은 Work를 수행할 수 있게 해야 함.
  + Data splitting : 나눠진 코어에 실행될 데이터도 고려해야 함.
  + Data dependency : 동기화 및 의존성을 해결한 데이터의 실행을 고려해야 함.
  + Testing and debugging : more difficult than single-thread
 
- 코어가 많을수록 프로그램 실행 속도가 좋은지?
  + Amdahl’s Law: serially하게 수행되는 작업이 있기 때문에 무조건 많다고 속도가 폭발적으로 증가하진 않는다.
    * ![image](https://github.com/user-attachments/assets/904403d6-f12f-4947-b53f-2c34212a8912)



# 4.3. Multithreading Models
- 스레드의 종류 : user / kernel
  + user thread : user mode 위에서 실행. (커널의 서포팅 X)
  + kernel thread : 운영체제가 직접 매니징함.
  + <details>
    <summary>❓ User thread vs. Kernel thread</summary>
    [Thread (2) - Multithreading Model, Implicit Threading, and Other Issues](https://jooona.tistory.com/9)
    [system call/function call](https://jungtak.tistory.com/129)
    [오버헤드가 발생하는 상황](https://megak.tistory.com/151)
    
    - 어떤 작업이든 kernel이 개입하는 순간 시스템콜이 필수적으로 필요함 → 성능적으로 큰 overhead 발생 & 속도 저하
      + 시스템 콜 : OS커널안에 있는 부분을 호출하는 것. (모드 스위치 발생하기 때문에 => 오버헤드 큼)
        1. 프로세스 상태 저장
        2. 모드 스위치 (kernel이 CPU 사용)
        3. kernel에서 전달받은 파라미터 검사
        4. 시스템 콜에 해당하는 함수 사용
        5. kernel 상태 저장
        6. 모드 스위치 (caller 프로세스 전환)
 
   - user thread : kernel과 무관하게 동작하기 때문에 비교적 빠름. thread 끼리의 스위칭이나 스케쥴링도 비교적 간편함. 다만 kernel이 user thread 존재를 모르기 때문에 kernel과의 소통이 힘듦.
   - kernel thread : 스케쥴링과 같은 결정을 내려야 하는 상황에서, thread가 많은 프로세스에 우선순위를 주는 등의 고려가 가능함. (하지만 오버헤드와, kernel 복잡도가 굉장히 증가함 + 연산속도 비교적 느림)
    
    
    </details>

1. Many-to-One Model
   + user thread를 사용하는 장점과 유사함. 빠르고 생성 및 관리가 쉬움.
   + 다만, 하나의 스레드라도 시스템콜을 수행하다가 block이 되면 kernel과 연결되어 있는 길이 하나뿐이기 때문에 모든 스레드들이 block됨.
   + 빠르고 쉬운 관리와 시스템 콜을 잘 사용하지 않는 경우에 유리할듯.
   + ![image](https://github.com/user-attachments/assets/8fe88268-6136-4b84-ae16-391c2fabce09)

3. One-to-One Model
   + 스레드 하나가 block 되더라도 다른 스레드들은 정상적으로 작동 가능하며, 동시성(concurrency)을 보장함.
   + 여러 개의 멀티코어 시스템에서 여러 개의 스레드들이 병렬적으로 실행이 가능하다는 장점도 있음.
   + 다만 스레드 생성과 관리가 어렵기 때문에, 스레드가 많아지게 되면 성능에 큰 부담이 됨.
   + 시스템들은 스레드의 최대 개수를 정해두어 관리하는 방법으로 오버헤드를 방지함.
   + ![image](https://github.com/user-attachments/assets/9fc7af7f-7e05-49b6-ad2a-1b66ce6a8c2e)

5. Many-to-Many Model
   + user thread > kernel thread
   + kernel 스레드가 여러 개 존재하기 때문에 멀티코어 시스템에서 병렬적인 수행이 가능.
   + 많은 수의 스레드들이 좀 더 쉽게 지원되는 장점을 가지지만, 구현이 어려움.
   + ![image](https://github.com/user-attachments/assets/9f53dc9c-1217-47d0-aa3d-eeb10f89e7cb)



# 4.4. Thread Libraries
- 세가지 라이브러리
  + POSIX Pthreads
  + Windows thread
  + JAVA threa


- ```c
  #include <stdio.h>
  #include <stdlib.h>
  #include <pthread.h>
  
  /* the data shared by the threads */
  int sum;
  /* thread call this function */
  void * runner(void *param);

  int main(int argc, char *argv[])
  {
    pthread_t tid; // thread identifier
    pthread_attr_t attr; // thread attributes
  
    pthread_attr_init(&attr);
    pthread_create(&tid, &attr, runner, argv[1]); // new thread
    pthread_join(tid, NULL);
  
    printf("sum = %d\n", sum);
  }
  
  void *runner(void *param)
  {
    int i, upper = atoi(param);
    sum = 0;
    for (i = 0; i <= upper; i++)
      sum += i;
    pthread_exit(0);
  }
  ```
- ```
  $ gcc -pthread 4.11_pthread.c
  $ ./a.out 10
  > 50
  ```

- Exercise 4.17
  + <img width="705" alt="image" src="https://github.com/user-attachments/assets/fcadcbfc-77f0-472a-a612-72ef64b4db29">

- Exercise 4.19
  + ```c
    #include <stdio.h>
    #include <unistd.h>
    #include <wait.h>
    #include <pthread.h>

    int value = 0;
    void * runner(void *param);
    
    int main(int argc, char *argv[])
    {
      pid_t pid;
      pthread_t tid;
      pthread_attr_t attr;
      pid = fork();
      if (pid == 0) { // child process
        pthread_attr_init(&attr);
        pthread_create(&tid, &attr, runner, NULL);
        pthread_join(tid, NULL);
        printf("CHILD: value = %d\n", value); // LINE C
      }
      else if (pid > 0) { // parent process
        wait(NULL);
        printf("PARENT: value = %d\n", value); // LINE P
      }
    }
    void *runner(void *param)
    {
      value = 5;
      pthread_exit(0);
    }
    ```
  + ```
    CHILD: value = 5
    PARENT: value = 0
    ```


# 4.5. Implicit Threading


- 4가지의 대체 접근법
  + Thread Pools (Implicit Threading)
    * create a number of threads in a pool where they await work. 작업을 기다리는 풀에 여러 개의 스레드를 만듦.
    * 사용이 완료되면 스레드를 소멸시키기 않고 다시 반납시켜, 재사용함. (생성과 소멸로 인해 발생하는 오버헤드를 줄임)
  + Fork & Join
    * explicit threading, but an excellent candidate for implicit threading. 
  + OpenMP (Implicit Threading)
    * a set of compiler directives and an API for programs written in C/C++. 컴파일러 지시 집합 & C/C++로 작성된 프로그램에 대한 API
    * 병렬로 실행할 수 있는 코드 블럭을 식별함. → 해당 지역에 대해서 알아서 멀티스레딩되도록 함
    * 예제1
      + ```c
        #include <stdio.h>
        #include <omp.h>
        int main(int argc, char *argv[])
        {
          #pragma omp parallel // compiler directive
          {
            printf("I am a parallel region.\n");
          }
          return 0;
        }
        ```
      + ```
        $ gcc -fopenmp 4.20_OpenMP1.c
        > I am a parallel region.
        > I am a parallel region.
        > ...
        ```
    * 예제2
      + ```c
        #include <stdio.h>
        #include <omp.h>
        int main(int argc, char *argv[])
        {
          omp_set_num_threads(4);
          #pragma omp parallel
          {
            printf("OpenMP thread: %d\n", omp_get_thread_num()); // 실행 순서는 항상 다름
          }
          return 0;
        }
        ```
      + ```
        OpenMP thread: 0
        OpenMP thread: 3
        OpenMP thread: 1
        OpenMP thread: 2
        ```
    * 예제3
      + ```c
        #include <stdio.h>
        #include <omp.h>
        #define SIZE 100000000

        int a[SIZE], b[SIZE], c[SIZE];

        int main(int argc, char *argv[])
        {
          int i;
          for (i = 0; i < SIZE; ++i)
            a[i] = b[i] = i;

          #pragma omp parallel for
          for (i = 0; i < SIZE; ++i) {
            c[i] = a[i] + b[i];
          }

          return 0;
        }
        ```
      + ```
        $ time ./sum_not_parallel (omp parallel 하지 않은 프로그램)
        real 0m0.586s
        user 0m0.364s
        sys 0m0.223s
        $ time ./sum_with_openmp (omp parallel 한 프로그램)
        real 0m0.423s
        user 0m1.091s
        sys 0m0.441s
        ```
      + omp parallel 할 때, sys(커널 스레드)에서 다 처리함 → 따라서 sys time으로만 봄.
  + Grand Central Dispatch (GCD)
    * developed by Apple for its macOS and iOS operating system. macOS & iOS 운영체제용













