# CPU scheduling
- multiprogramming ; CPU를 효율적으로 사용하기 위해서 cpu 스케줄링이 필요함
- ![image](https://github.com/user-attachments/assets/e48ccbc4-98c5-42bf-984e-88ee4e6be68d)
  + CPU burst : cpu 사용시간 → 많으면 CPU bound
  + I/O burst : i/o 사용시간 → 많으면 I/O bound
  + 근데 i/o bound가 많은 프로그램이 더 많더라.. (타임 스케줄링의 필요성)
- ready 상태에 있는 프로세스 중, cpu를 할당할 프로세스를 고르는 것.

## Preemptive .vs. Non-preemptive
- Non-preemptive 비선점 : 프로세스가 cpu를 놓을 때까지, 종료시키거나 스위칭할 수 없음.
- preemptive 선점 : 프로세스가 스케줄러에 의해 교체당할 수 있음.
- CPU 스케줄링의 의사결정
  1. running → waiting : non-preemptive
  2. running → ready : preemptive or non-preemptive
  3. waiting → ready : preemptive or non-preemptive
  4. terminated : non-preemptive

### dispatcher
- CPU의 핵심을 제어하는 모듈 (어떤 프로세스를 실행할 지 선택은 스케줄러가, 실제 실행은 디스패처가)
  + 다른 프로세스로의 context switching
  + user mode 교체
  + 프로그램을 다시 시작하기 위해 적절한 위치로 이동

- dispatcher latency : 프로세스를 멈추고 다른 프로세스를 실행할 때 걸리는 지연시간 (짧은 것이 좋음)
  + `vmstat 1 3` : 1초에 context switche가 얼마나 일어나는지 확인 가능
 

# 5.2 Scheduling Criteria
- 스케줄링 목표
  +  CPU utilization : cpu 효율성 높이기
  +  Throughtput : 처리량을 높이기
  +  Turnaround time : 실행에서 종료까지 시간을 최소화시키기
  +  Waiting time : 레디큐에서 프로세스가 기다리는 시간을 최소화하기
  +  Response time : 응답을 기다리는 시간을 최소화하기
- CPU 스케줄링의 문제 : 레디큐에 존재하는 프로세스 중 어느 것을 골라 cpu를 할당할 것인가.


# 5.3. Scheduling Algorithm
- FCFS : First-Come, First-Served
- SJF : Shortest Job First (SRTF: Shortest Remaining Time First)
- RR : Round-Robin
- Priority-based
- MLQ : Multi-Level Queue
- MLFQ : Multi-Level Feedback Queue



## 비선점형 preemptive
### FCFS Scheduling
- 가장 먼저 요청한 프로세스에게 CPU를 주는 스케줄링 알고리즘 (FIFO queue로 쉽게 구현 가능)
- [예시]
  + ![image](https://github.com/user-attachments/assets/c7106950-560c-4e33-a921-9526318e2299)
  + ![image](https://github.com/user-attachments/assets/0062b5f1-dc54-4d94-bfdc-a9912258e481)
  + ![image](https://github.com/user-attachments/assets/2f0f6a74-452a-49c1-b321-4e22067d3596)
  + ![image](https://github.com/user-attachments/assets/a12c75d6-aedf-4058-971d-3442319edd05)
- CPU-burst time, 도착 순서에 따라 매우 달라짐
- CPU-bound 프로세스 하나, I/O-bound 프로세스 여러개가 있을 때 어떤 상황이 발생하는가? → cpu를 많이 쓰는 한 프로세스에 의해서, cpu를 적게만 써도 되는 다른 프로세스가 효율적이지 못하게 오래 기다려야 함. → convoy effect

### SJF Scheduling
- 프로세스의 다음 CPU busrt를 보고, 가장 작은 것을 선택하는 알고리즘.
- [예시]
  + ![image](https://github.com/user-attachments/assets/5005b593-d502-4dc6-ba7a-98bd26278b1c)
  + ![image](https://github.com/user-attachments/assets/9ce69792-1c71-48a4-bc23-915e4e683e14)
  + ![image](https://github.com/user-attachments/assets/52726735-55c3-4020-b2f6-8079fe552e86)




## 선점형 non-preemptive




