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






