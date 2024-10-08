<img width="471" alt="image" src="https://github.com/led156/TIL/assets/67251510/c0c92183-58fb-4c4f-9b24-881c75e30129">


# 3.1. 대규모 분산 처리의 프레임워크
## 구조화 데이터와 비구조화 데이터
- 스키마(schema) : 테이블의 칼럼 명, 데이터형, 테이블 간의 관계 등을 스키마로 정함.
- 구조화된 데이터(structed data) : 스키마가 명확하게 정의된 데이터.
- 기존 데이터 웨어하우스에는 항상 구조화된 데이터만 축적하는 것이 일반적이었다.
  + 다만, 빅데이터에 항상 SQL로 집계할 수 있는 구조화된 데이터만 있는 것이 아님. (텍스트, 이미지, 동영상 등의 데이터 = 비구조화 데이터(unstructed data))
- 이런 비구조화 데이터를 분산 스토리지 등에 저장하고 분산 시스템에서 처리하는 것이 데이터 레이크의 개념.
  + 데이터를 가공하는 과정에서 스키마를 정의하고, 구조화된 데이터로 변환함으로써 다른 데이터와 마찬가지로 분석할 수 있다.

### 스키마리스 데이터
- 스키마리스 데이터(schemaless data) : 데이터 서식(CSV, JSON, XML)은 정해져 있지만, 칼럼 수나 데이터형을 명확하지 않은 것.
  + NoSQL DB, 데이터 레이크에서 이를 대응하기도 함.
  + 최근 인터넷 데이터 형식으로 JSON 형식을 이용하는 경우가 많은데, JSON은 그대로 저장하고 거기서 필요한 필드만을 추출하는 편이 사용됨.

### 데이터 구조화의 파이프라인
<img width="476" alt="image" src="https://github.com/led156/TIL/assets/67251510/5d68f32b-7298-42aa-bbe9-e266c7f9106c">

- 데이터소스에서 수집된 비구조화 데이터, 스키마리스 데이터는 분산 스토리지에 보존됨. (e.g. 웹 서버 로그 파일, 업무용 데이터베이스에서 추출한 마스터 데이터 등)
- 분산 스토리지에 수집된 데이터를 스키마를 명확하게 한 테이블 형식의 구조화 데이터로 변환한다.
  + 구조화 데이터의 압축률을 높이기 위해 열 지향 스토리지로 저장.
  + 💡 열 지향 스토리지에서 압축률이 좋은 이유
    * 각 열에 대한 데이터를 연속적으로 저장하는데, 이는 같은 열에 속한 데이터가 서로 비슷한 유형 및 패턴을 가질 가능성이 높다는 것을 의미함.
    * 동일한 데이터가 같은 열에 반복적으로 나타날 가능성이 높음.
    * ❗️ 다만, 기존 rdbm(행 지향형)과 달리 일관성(acid)을 보장하지 못함.
- 팩트 테이블 : 시간에 따라 증가하는 구조화 데이터
  + 디멘전 테이블 : 팩트 테이블에 따른 부속 데이터
- 이 단계에서는 테이블을 조인하지 않고, 데이터 마트에 대해 생각하지 않는다. 우선은 데이터를 구조화해서 SQL로 집계 가능한 테이블을 만들도록 함.

### 열 지향 스토리지의 작성
- ⑴MPP 데이터베이스의 경우 제품에 따라 스토리지 형식이 고정되어 있음. 다만 ⑵Hadoop에서는 직접 열 지향 스토리지 형식을 선택하고, 다른 쿼리 엔진에서 그것을 집계할 수 있음.
  + Hadoop에서 사용할 수 있는 열 지향 스토리지 :
    * Apache ORC : 구조화 데이터를 위한 열 지향 스토리지. 처음에 스키마를 정한 후 데이터를 저장
    * Apache Parquet : 스키마리스에 가까운 데이터 구조로 되어 있어 JSON 같이 뒤얽힌 데이터도 그대로 저장할 수 있음.
- 비구조화 데이터를 읽어 열 지향 스토리지로 변환하는 과정에서는 데이터의 가공 및 압축을 위해 많은 컴퓨터 리소스가 필요함 → 따라서 분산 처리 프레임워크(Hadoop, Spark) 도입

## Hadoop
<img width="555" alt="image" src="https://github.com/led156/TIL/assets/67251510/8d2b9403-7bd3-437b-a4c7-9b4e55102b03">

- Hadoop은 단일 소프트웨어가 아니라 분산 시스템을 구성하는 다수의 소프트웨어로 이루어진 집합체.
  + 리소스 관리자(YARN) 상에서 복수의 분산 애플리케이션이 동작하는 구성.
  + 대규모 분산시스템을 구축하기 위한 공통 플랫폼의 역할을 담당.
 
### 분산 시스템의 구성 요소
- HDFS(Hadoop Distributed File System) : 분산 파일 시스템(distributed file system)
- YARN(Yet Another Resource Negotiator) : 리소스 관리자(resource manager)
- MapReduce : 분산 데이터 처리(distributed data processing) 기반
- 모든 분산 시스템이 하둡에 의존하지 않고, 일부만 사용하거나 혹은 이용하지 않는 구성도 있음 (e.g. 분산 파일 시스템은 'HDFS', 리소스 관리자는 'Mesos', 분산 데이터 처리는 'Spark')

### 분산 파일 시스템(HDFS)과 리소스 관리자(YARN)
<img width="599" alt="image" src="https://github.com/led156/TIL/assets/67251510/96046ced-7bcb-431a-a3d3-4a45f2a22049">

- 하둡에서 처리되는 데이터 대부분은 분산 파일 시스템인 HDFS에 저정됨.
  + 네트워크에 연결된 파일 서버와 같은 존재.
  + 다수의 컴퓨터에 파일을 복사하여 중복성을 높인다는 특징이 있음.
- CPU나 메모리 등의 계산 리소스는 리소스 매니저인 YARN에 의해 관리됨.
  + 애플리케이션이 사용하는 CPU 코어와 메모리를 '컨테이너' 단위로 관리함. (OS 수준의 가상화 기술이 아니라, 어떤 호스트에서 어떤 프로세스를 실행시킬 것인지 결정하는 애플리케이션 수준의 기술)
  + 하둡에서 분산 애플리케이션을 실행하면 YARN이 클러스터 전체의 부하를 보고 비어 있는 호스트부터 컨테이너를 할당함.
- 분산 시스템은 많은 계산 리소스를 소비하지만, 호스트 수에 따라 사용할 수 있는 리소스 상한이 결정됨.
  + 한정된 리소스로 다수의 분산 애플리케이션이 동시에 실행되므로 애플리케이션 간 리소스 쟁탈이 발생함.
  + 리소스 관리자는 어느 애플리케이션에, 얼만큼의 리소스를 할당할 지 관리함으로써 모든 애플리케이션이 차질없이 실행되도록 제어함.
- 리소스 관리자를 사용하면 애플리케이션마다 우선순위를 결정할 수 있음
  + 별로 중요하지 않은 배치 처리에는 낮은 우선순위를 부여.

### 분산 데이터 처리(MapReduce) 및 쿼리 엔진(Hive)
<img width="541" alt="image" src="https://github.com/led156/TIL/assets/67251510/0f9907f8-202e-4a5f-8685-3d71deaa8777">

- MapReduce는 임의의 자바 프로그램을 실행시킬 수 있기 때문에, 비구조화 데이터를 가공하는 데 적합함.
- Apache Hive(Hive on MR) : 쿼리를 자동으로 MapReduce 프로그램으로 변환하는 소프트웨어로 개발됨.
  + MapReduce : 대량의 데이터를 배치 처리하기 위한 시스템으로, 한 번 실행시 분산 파일시스템에서 대량의 데이터를 읽을 수 있지만 작은 프로그램을 실행하려면 오버헤드가 너무 큼.
  + Hive는 초기에 MapReduce에 의존하고 있었기 때문에, 시간이 걸리는 배치 처리에 적합하나, 애드 혹 쿼리를 여러 번 실행하는 데는 부적합함.
 
### Hive on Tez
<img width="601" alt="image" src="https://github.com/led156/TIL/assets/67251510/aca33601-3d49-495c-8c18-69732d887c4f">

- Apache Tez : MapReduce 프로그램에서 1회의 MapReduce 스테이지가 끝날 때까지 다음 처리를 진행할 수 없는데, Tez에서는 스테이지의 종료를 기다리지 않고 처리가 끝난 데이터를 차례대로 후속 처리에 전달함으로써 쿼리 전체의 실행 시간을 단축함.
- 현재 Hive는 Tez를 사용해도 동작하게 재작성되어 있음(Hive on Tez). 따라서 기존 MapReduce에 있던 몇 가지 단점을 해소함으로써 고속화를 실현함.

### 대화형 쿼리 엔진(Impala, Presto)
<img width="595" alt="image" src="https://github.com/led156/TIL/assets/67251510/f05a7078-e157-493e-b437-4d2af6bfe43a">

- Hive를 고속화하는 것이 아니라 처음부터 대화형 쿼리 실행만 전문으로 하는 쿼리 엔진 : Apache Impala, Presto
- MapReduce, Tez는 장시간 배치 처리를 가정해 한정된 리소스를 유효하게 활용하도록 설계됨.
  + 대화형 쿼리 엔진으로는 순간 최대 속도를 높이기 위해 모든 오버헤드가 제거되어 사용할 수 있는 리소스를 최대한 활용함.
  + 그 결과, MPP 데이터베이스와 비교해도 손색없는 응답시간을 실현함.

### 정리
- 목적에 따라 성질이 다른 쿼리 엔진(SQL-on-Hadoop)을 구분할 수 있음
  + 대량의 비구조화 데이터를 가공하는 무거운 배치 처리 : Hive. 높은 처리량(Throughtput)으로 리소스를 활용할 수 있음.
  + 완성한 구조화 데이터를 대화식으로 집계할 때 : Impala, Presto. 지연이 적음.
  + MPP 데이터베이스와 비교해 기능적으로 따라잡지 못한 부분❓도 있지만, 분산 스토리지에 저장된 데이터를 신속하게 집계할 수 있는 점에서 우수.

## Spark
- MapReduce보다 더 효율적인 데이터 처리를 실현. Hadoop(Tez)과는 다른 독립적 프로젝트
- 대량의 메모리를 활용하여 고속화를 실현하는 것.
  + MapReduce 개발 시절, 처리 데이터양보다 훨씬 작은 메모리를 사용할 수 밖에 없었음. → 따라서 대부분의 처리를 디스크의 I/O에 사용.
  + 하지만 메모리양이 증가함에 따라, '가능한 한 많은 데이터를 메모리상에 올려, 디스크에는 아무것도 기록하지 않는다'라는 선택이 현실화됨.
    * 이때 비정상 종료되어 휘발되면, 단순히 다시 처리해 중간 데이터를 다시 만들면 된다는 개념.

### MapReduce 대체하기
<img width="595" alt="image" src="https://github.com/led156/TIL/assets/67251510/32bcd79f-8de4-48c9-96a1-2cdfec6e0597">

- 스파크는 하둡을 대체하는 것이 아닌, 맵리듀스를 대체하는 존재임.
  + 그래서 분산 파일 시스템인 HDFS나 리소스 관리자 YARN을 그대로 사용할 수 있다.
  + 하둡을 이용하지 않아도 되며, 분산 스토리지로 Amazon S3나 분산 데이터베이스인 카산드라(cassandra)를 사용하는 것도 가능하다.
- 스파크의 실행은 자바 런타임이 필요하지만, 스파크 상에서 실행되는 데이터 처리는 스크립트 언어를 사용할 수 있음.
  + 자바, 스칼라, 파이썬, R언어
- Spark SQL(SQL로 쿼리실행), Spark Streaming(스트림 처리 수행)
  + 따라서, 대규모 배치 처리뿐만 아니라 대화형 쿼리 실행(SQL)과 실시간 스트림 처리에 이르기까지 널리 이용됨.

# 3.2. 쿼리 엔진
- 'Hive'에 의한 구조화 데이터의 생성과 'Prsto'에 의한 대화식 쿼리를 사용해 데이터 마트를 만들기까지의 흐름을 살펴본다.
## 데이터 마트 구축의 파이프라인
<img width="485" alt="image" src="https://github.com/led156/TIL/assets/67251510/f0f0417e-8f98-4f09-9e5e-f3c80a65e1c7">

- ❶ 분산 스토리지에 저장된 데이터를 구조화, 열 지향 스토리지 형식으로 저장.
  + 다수의 텍스트 파일을 읽어 가공하는 큰 부하의 처리 : Hive 사용
  + Hive에서 만든 각 테이블 정보는 'Hive 메타 스토어(Hive metastore)'라고 불리는 특별한 데이터베이스에 저장됨.
- ❷ 구조화 데이터를 결합, 집계하고 비정규화 테이블로 데이터 마트에 써서 내보냄.
  + 열 지향 스토리지를 이용한 쿼리 실행 : Presto 사용 (시간 단축)

## Hive에 의한 구조화 데이터 작성
1. CSV파일 읽어 들이기.
   ```Hive
   hive> CREATE EXTERNAL TABLE access_log_csv( /* 외부 테이블 지정 */
       >   time string, request string, status int, bytes int
       > )
       > ROW FORMAT SERDE 'org.apache.hadoop.hive.serde2.OpenCSVSerde'
       > STORED AS TEXTFILE LOCATION '/var/log/access_log/' /* 경로 지정 */
       > TBLPROPERTIES ('skip.header.line.count'='1'); /* CSV의 헤더행 스킵 */
   ```
   - 외부 테이블 : Hive 외부에 있는 파일을 참고해 마치 거기에 테이블이 존재하는 것처럼 읽어 들이기 위해 지정하는 것.
   - `access_log_csv`라는 테이블명을 참고해 데이터를 추출, 텍스트 파일이 로드되고 구조화 데이터로의 변환이 이뤄짐.
   - 대부분 SQL-on-Hadoop 쿼리 엔진은 데이터를 내부로 가져오지 않아도 텍스트 파일을 그대로 집계할 수 있음.

   ```Hive
   hive> SELECT status, count(*) cnt
       > FROM access_log_csv GROUP BY status LIMIT 2;
   Time taken: 8.664 seconds
   ```
   - 이와 같이 외부 테이블로 지정한 경로에 포함된 모든 CSV 파일이 로드되고 집계됨.
   - → 애드 혹 데이터를 분석하기에 유용, 시간을 들여 데이터를 전송하지 않아도 원하는 정보를 얻을 수 있음.
   - 다만, 매번 쿼리 실행마다 매번 텍스트 파일을 불러오기 때문에 빠르다고 할 수는 없음. → 따라서 열 지향 스토리지로 변환 필요.

### 열 지향 스토리지로의 변환
2. 테이블을 열 지향 스토리지 형식인 ORC 형식으로 변환.
   ```Hive
   /* ORC 형식의 테이블 'access_log_orc'로 변환 */
   hive> CREATE TABLE access_log_orc STORED AS ORC AS
       > SELECT cast(time AS timestamp) time,
       >        request, status,
       >        cast(bytes AS bigint) bytes
       > FROM access_log_csv;
   hive> SELECT status, count(*) cnt
       > FROM access_log_orc GROUP BY status LIMIT 2;
   Time taken: 1.567 seconds
   ```
   - 텍스트 데이터를 열 지향 스토리지로 변환함으로써 데이터 집계 속도가 고속화됨.
   - 다만, 변환에 시간이 걸리므로, Hive와 같은 배치형의 쿼리 엔진에서 실행하는데 적합.
   - 이와 같이 SELECT문으로 새로운 테이블을 만드는 것이 데이터 구조화 프로세스에 해당한다.

### Hive로 비정규화 테이블을 작성하기
- 데이터 구조화가 완료되면 다음으로는 데이터 마트의 구축이 있다.
  + 즉, 테이블을 결합, 집약해서 '비정규화 테이블'을 만든다.
  + Presto(대화형 쿼리 엔진) vs. Hive(배치형 쿼리 엔진) 을 사용할지?
    * 이때 쿼리 엔진 자체의 성능은 최종적 실행 시간에 그다지 많은 영향을 끼치지 않는데,
    * 따라서 배치형 시스템을 사용하는 편이 레코드수가 많을수록 리소스 이용 효율을 높일 수 있다 → Hive
  + 다만, 비정규화 테이블을 만들 때 오랜 시간이 걸리는 것은 일반적이다. 따라서 효율적인 쿼리를 작성하여 보다 최적화시켜야한다.

### 서브 쿼리 안에서 레코드 수 줄이기
1. 초기 단계에서 팩트 테이블을 작게 하여 쿼리 최적화.
- Hive가 읽어 들이는 데이터의 양을 의식하면서 쿼리를 작성하지 않으면 생각만큼의 성능이 나오지 않음. (Hive가 데이터베이스가 아니라 데이터 처리를 위한 배치 처리 구조이기 때문,)
- ❶ 비효율적인 쿼리 예
  + ```Hive
    SELECT ...
    FROM access_log a
    JOIN users b ON b.id = a.user_id
    WHERE b.created_at = '2017-01-01'
    ```
  + 팩트 테이블(`access_log`), 디멘전 테이블(`users`)
  + 팩트 테이블을 필터링할 조건이 없기 때문에, 모든 데이터를 읽어 들인 후에 결합하고 이후에 나오는 WHERE에 의한 검색을 하게 됨. → 대량의 중간 데이터가 생성됨. (시간이 지날수록 팩트 테이블의 크기가 커지기 때문에, 문제가 된다.)
 
    
- ❷ 효율적인 쿼리 예
  + ```Hive
    SELECT ...
    FROM (
      SELECT * access_log
      WHERE time >= TIMESTAMP '2017-01-01 00:00:00'
    ) a
    JOIN users b ON b.id = a.user_id
    WHERE b.created_at = '2017-01-01'
    ```
  + 따라서 서브 쿼리 안에서 팩트 테이블을 작게 하기.
  + = 데이터 양을 감소시킨 후에 테이블을 결합하는 것

### 데이터의 편향을 방지하는 방법
2. 분산 시스템의 성능 발휘를 하여 쿼리 최적화.
- 고속화를 방해하는 다른 하나의 문제는 '데이터의 편차(data skew, 데이터 스큐)'이다.
- 만약 분산되어 있는 데이터를 한곳에 모아 중복이 없는 값을 세어야하는 작업을 하려면, 분산 처리가 어려워 다른 처리보다 시간이 오래 걸린다. (`SELECT count(dinstinct ..`)
- 예시) 일별 고유 유저 수의 추이 확인
- ❶ 비효율적인 쿼리 예
  + ```Hive
    SELECT date, count(distinct user_id) users
    FROM access_log GROUP BY date
    ```
  + `group by` : 분산 처리됨. `distinct user_id` : 분산 처리되지 않음.
  + `group by`에 의해 그룹화되어 처리되므로 (30일이라면 최대 30으로 분할) 충분히 고속으로 실행됨.
    * 단, 이는 하루 데이터양이 거의 균등하다는 조건하에 이뤄짐. (데이터양에 편차가 있다면 문제 발생)
    * 다른 예시) 웹페이지당 고유 방문자 수를 알고 싶다면, 페이지당 큰 편차가 있기 때문에 쿼리 실행 시간이 늦어지게 됨. → 데이터 편향 문제.
  
- ❷ 효율적인 쿼리 예
  + ```Hive
    SELECT date, count(*) users
    FROM ( SELECT DISTINCT date, user_id FROM access_log ) t
    GROUP BY date
    ```
  + 데이터 편차를 최대한 없애기 위해서는, 모든 노드에 데이터가 균등하게 분산되도록 해야 함.
  + `SELECT DISTINCT` 처럼 중복을 제거함으로써 부하를 잘 분산할 수 있음.
  + 데이터 편차가 발생하기 쉬운 구문 : 테이블의 결합, ORDER BY에 의한 정렬 등...

## 대화형 쿼리 엔진 Presto의 구조
- 쿼리 실행의 지연을 감소시키는 것을 목적으로 개발된 것 : 대화형 쿼리 엔진
  + 지연을 감소시키므로써, 작은 쿼리를 여러 번 실행시키는 것에 대해 적합하도록 함. (↔ Hive)

### 플러그인 가능한 스토리지
<img width="595" alt="image" src="https://github.com/led156/TIL/assets/67251510/cccf5d51-564b-41c3-ae0b-d8860189e0ba">

- 일반적인 MPP DB에서는 스토리지와 컴퓨팅 노드가 밀접하게 결합되어 있음 → 데이터를 로드하지 않으면 집계를 시작할 수 없음
  + Presto는 전용 스토리지를 갖고 있지 않음 → Hive와 마찬가지로 다양한 데이터 소스에서 직접 데이터를 읽음. = '플러그인 가능한 스토리지 설계'

- Hive 메타 스토어(Hive metastore)에 등록된 테이블을 가져올 수 있다.
  + 따라서 Hive에서 만든 구조화 데이터를 좀 더 집계하는 등의 목적에 적합.
  + CSV 같은 텍스트 데이터를 가져올 수 있지만, Hive보다 더 뛰어나지 않음. 성능을 최대 발휘하기 위해서는 원래 스토리지가 열 지향 데이터 구조로 되어 있어야 함.
- ORC 형식의 로드에 최적화되어 있다.
  + 확장성이 높은 분산 스토리지에 배치하여 최대의 성능을 발휘함.
  + 데이터 로딩 속도를 높이려면
    * presto 클러스터를 분산 스토리지와 네트워크의 가까운 곳에 설치한 후에
    * 그것들을 가능한 한 고속 네트워크에 연결하도록 해야 함.
- Hive metastore 외에도 다양한 데이터 소스를 테이블로 참고할 수 있음. (MySQL, Cassandra와 같은 NoSQL DB)

### CPU 처리의 최적화
- 쿼리 실행 단계
  1. 쿼리를 분석하여 최적의 실행 계획을 생성한다.
  2. 이를 자바 바이트 코드로 변환한다.
  3. 바이트 코드는 presto 워커 노드에 배포되고, 그것은 런타임 시스템에 의해 기계 코드로 컴파일된다.
  4. 코드 실행은 멀티 스레드화되어 단일 머신에서 수백 태스크나 병렬로 실행된다.
  5. 열 지향 스토리지에서의 읽기도 병렬화되어 데이터가 도달할 때마다 처리가 진행된다.
  + → CPU 이용 효율이 높음. 따라서 메모리와 CPU 리소스만 충분하다면 데이터 읽기 속도가 쿼리 실행 시간을 결정함.
- 리소스가 부족하면 나중에 실행된 쿼리는 앞 쿼리가 끝날 때까지 기다려야 함. 따라서 너무 큰 쿼리를 실행해서는 안 됨.

### 인 메모리 처리에 의한 고속화
- Hive와 달리 presto는 쿼리 실행 과정에서 디스크 쓰기를 하지 않음.
  + 따라서 모든 데이터 처리를 메모리상에서하고, 메모리가 부족하면 기다리거나 오류로 실패를 띄움.
- 이때 취급 데이터 양이 아무리 많아도 그에 비례해서 메모리 소비가 늘어나지는 않는다.
  + 예) GROUP BY에 의한 데이터 집약은 단순한 반복 처리 → 메모리 소비량은 거의 고정.
  + 게다가 하드웨어적으로 메모리를 추가하는 것도 어렵지 않아, 대부분 쿼리에서 중간 데이터를 디스크에 쓰는 것은 쓸데없는 오버헤드로 여겨짐.
- ➡ 대규모 배치 처리, 거대한 테이블끼리 결합 등과 같이 디스크를 이용해야 하는 것은 Hive, 이외의 단시간 쿼리 실행에는 대화형 쿼리 엔진을 사용하는 것이 효율적.

### 분산 결합과 브로드캐스트 결합
- 테이블 결합은 종종 대량의 메모리를 소비함.
  + 예) 2개의 팩트 테이블을 결합할 때, 매우 많은 조인 키를 메모리상에 계속 유지해야 함.
1. 분산 결합(distribute join)
- 기본 presto 결합 방법.
- 같은 키를 갖는 데이터는 동일한 노드에 모임.
<img width="486" alt="image" src="https://github.com/led156/TIL/assets/67251510/692abce4-2275-4ee8-9fc1-869dc33e7150">

- 다만, 노드 간의 데이터 전송을 위한 네트워크 통신으로 종종 쿼리 지연을 초래함.
   
2. 브로드캐스트 결합(broadcast join)
- 결합하는 테이블의 모든 데이터가 각 노드에 복사됨.
<img width="445" alt="image" src="https://github.com/led156/TIL/assets/67251510/2cd75a3b-e13a-4554-8fe0-bbdbc1a32a2f">

- 하나의 팩트 테이블에 복수의 디멘전 테이블을 결합하는 경우(스타스키마) : 보통 디멘전 테이블은 메모리에 들어갈 정도로 작음.
  + 따라서 처음에만 복사하면 팩트 테이블을 재배치할 필요가 없어서 테이블 결합이 훨씬 빨라짐.
  + ❓ 스타 스키마(star schema/join schema) vs. 눈송이 스키마(snowflake schema) ([🔗](https://sunrise-min.tistory.com/entry/Star-schema%EC%99%80-Snowflake-schema-%EB%B9%84%EA%B5%90))
    | |스타 스키마|눈송이 스키마|
    |--|--|--|
    |구조|![image](https://github.com/led156/TIL/assets/67251510/85359bb2-6cfe-461d-9432-be07d1d16f11)|![image](https://github.com/led156/TIL/assets/67251510/a58cc1c5-7a3e-4f1e-890c-c5eda97f4cf8)|
    |설명|- 데이터 웨어하우스 스키마 중 가장 단순한 종류의 스키마</br>- 한 개의 팩트 테이블과 pk 및 각 디멘전 테이블로 이루어진 스키마|- 디멘전 테이블의 계층적 형태를 포함하는 일종의 스타 스키마</br>- 테이블을 추가 테이블로 분할하는 정규화를 사용→중복성을 줄이고 메모리 낭비 방지|
    |특징|-디멘전 테이블에 중복 항목이 발생할 수 있음</br>-더 많은 공간(space)을 사용함.</br>- 단순한 관계가 있는 데이터마트에 적합|- 관리하기 쉽지만 설계와 이해가 복잡함</br>- 쿼리 실행시 더 많은 조인이 필요하므로 집계 효율이 떨어질 수 있음</br>- 데이터 웨어하우스에 적합|
- 이를 위해서 분산 결합을 명시적으로 무효화하고, 쿼리 안의 SELECT 문으로 먼저 팩트 테이블을 지정하여 그것에 디멘전 테이블을 결합해야 함.

### 열 지향 스토리지 집계
- 위 구조로 인해 presto에서 열 지향 스토리지의 집계를 매우 빨리 실행할 수 있음.
  ```hive
  $ presto --catalog hive --schema default /*Hive 메타 스토어를 이용하는 presto 가동*/
  presto:default> SELECT status, count(*) cnt
               -> FROM access_log_orc GROUP BY status LIMIT 2;
  ```

## 데이터 분석의 프레임워크 선택하기
...

# 3.3. 데이터 마트의 구축
- 분산 시스템 준비 후 시각화를 위해 데이터 마트를 만드는 절차에 들어감.
- 해당 목차에선 과정에서 필요한 각종 테이블의 역할과 비정규화 테이블을 만들기까지의 흐름을 살펴본다.
## 팩트 테이블
- 큰 팩트 테이블을 빠르게 집계할 수 있는 방법 : 열 지향 스토리지에서 데이터를 압축.
- 팩트 테이블의 작성 방법
  <img width="441" alt="image" src="https://github.com/led156/TIL/assets/67251510/5c16b76e-31f8-4f07-bf97-d6a0e33e6c89">
  1. 추가(append) : 새로 도착한 데이터만을 증분으로 추가.
  2. 치환(replace) : 과거의 데이터를 포함하여 테이블 전체를 치환.

### 테이블 파티셔닝
- '추가' 방식의 장점 : 효율적이다.
- '추가' 방식의 단점 :
  + 추가 실패 시 팩트 테이블에 일부 결손이 발생함
  + 추가를 잘못해서 여러 번 실행하면 팩트 테이블에 일부 중복이 발생함.
  + 나중에 팩트 테이블을 다시 만들고 싶은 경우의 관리가 복잡함.
  + → 따라서 테이블 파티셔닝 추가 도입
- 테이블 파티셔닝(table partitioning) : 하나의 테이블을 여러 물리적인 파티션으로 나눔으로써 파티션 단위로 정리하여 데이터를 쓰거나 삭제할 수 있도록 한 것.
  <img width="446" alt="image" src="https://github.com/led156/TIL/assets/67251510/ac1529d0-5157-4fd1-9592-80586b525919">

  + 특정 주기로 새 파티션을 만들고 이를 팩트 테이블에 붙여 놓는다.
  + 각 파티션은 매번 교체하고, 만약 이미 존재한다면 덮어쓴다.
  + → 데이터가 중복될 가능성을 배제하면서 필요에 따라 여러 번 데이터의 기록을 바로 잡을 수 있다.

### 데이터 마트의 치환
- 데이터 웨어하우스 구축 : 테이블 파티셔닝이 유용
- 데이터 마트 구축 :
  + 데이터 마트 데이터양이 한정되어 있기 때문에,
    * 거대한 양의 테이블이 빈번하지 않음. 따라서 치환 방식을 적용하기 어렵지 않다.
    * 예시) 일일 보고서를 위해 지난 30일 동안의 데이터를 매일 꺼내서 치환.
- '치환' 방식의 장점 :
  + 데이터의 중복이나 빠뜨릴 가능성이 없음.
  + 테이블을 다시 만들고 싶다면 쿼리 실행 한 번이면 됨.
  + 스키마 변경 등에도 유연하게 대응 가능.
  + 오래된 데이터가 자동으로 지워지기 때문에 데이터 마트가 계속 확대되지도 않음.
- '치환' 방식의 단점 : 처리 시간.
  + 데이터 양이 너무 많다면 쓰는 데 시간이 오래 걸림. (MPP 데이터베이스라면 쓰기를 병렬화하여 어느정도 개선 가능)
  + 그래도 안 된다면 테이블 파티셔닝을 실시하거나 모니터링해야 함.
- 각 데이터 처리가 1시간 이내에 완료되도록 워크플로를 짠다
  + 1시간 이내에 팩트 테이블 생성이 가능하다면, 매번 치환으로도 충분.
 
## 집계 테이블
- 집계 테이블(summary table) : 팩트 테이블을 어느 정도 모아 집계하는 것 (→ 데이터 양이 크게 줄어듦)
  + 필요한 칼럼을 골라 숫자 데이터를 집계하여 만든다.
  + 일일 집계(daily summary)
    <img width="595" alt="image" src="https://github.com/led156/TIL/assets/67251510/0a921a3b-d2d5-4952-bbb0-cb82a1dd2d27">
    ```hive
    /* 일별 액세스 수와 바이트 수를 집계 */
    hive> CREATE TABLE access_sumary STORED AS ORC AS
        > SELECT time, status /* 디멘전 */
        >        count(*) count, sum(bytes) bytes /* 측정값 */
        > FROM (
        >    SELECT cast(substr(time, 1, 10) AS date) time, status, bytes
        >    FROM access_log_orc
        >    WHERE time BETWEEN '1995-07-10' AND '1995-07-20') t
        > GROUP BY time, status;
    ```
  + 테이블 집계에 의해 생성된 레코드 수는 칼럼 값의 조합 수에 따라 결정됨 → 실행 전까지 얼마나 줄어들지 모른다.
  + 집계 테이블을 작게 하려면 모든 칼럼의 카디널리티를 줄여야 함 → 칼럼 값 조합 수를 줄이는 것.
    * 카디널리티(cardinality) : 각 칼럼이 취하는 값의 범위.
      - 성별은 카디널리티가 작다. IP주소/가수이름은 카디널리티가 크다.
    * 카디널리티를 무리하게 낮추면 원래 정보가 크게 손실될 수 있음. (최종 레코드수가 수억 건이라면 집계하지 않고 MPP 데이터베이스로 바로 써내는 것도 좋음.)
      
### 집계 테이블에서의 숫자 계산에 주의하자
- 집계 테이블은 다차원 모델에서 차원을 감소시키는 효과가 있다.
  <img width="384" alt="image" src="https://github.com/led156/TIL/assets/67251510/1191efdf-c233-47ef-8755-88ac4ee4c5e5">

  + 분석 내용은 줄어들지만, 측정값으로 계산된 결과에는 변함이 없음. → 가급적 불필요한 디멘전을 제거함으로써 데이터 마트가 작아지고, 시각화 기능이 향상됨.
  + 하지만, 모든 측정값이 동일하게 계산되지는 않음
    * 예시1) 평균값(avg) : 집계 테이블을 사용하면 제대로 계산할 수 없음 (평균의 평균 != 전체 평균) → 계산 필드(sum, count,..)를 사용해 BI도구 등 동적으로 평균값을 계산하자.
    * 예시2) 고유수의 카운트 : (일일 순 사용자에서 월간 순 사용자 수를?) → SELECT DISTINCT를 사용하여 중복을 제거한 작은 테이블을 만들어두자.

## 스냅샷 테이블
- 마스터 데이터처럼 업데이트될 가능성이 있는 테이블에 대해...
1. 스냅샷 테이블(snapshot table) : 정기적으로 테이블을 통째로 저장하는 방법
   - 데이터 분석의 경우 스냅샷 테이블이 취급하기 쉬움
     + → 레코드 수가 많을수록 거대해지지만, 빅데이터 기술이 있으므로 개의치 말자.
     + 시간이 지날수록 점점 커지므로 이것도 일종의 팩트 테이블로 간주함.
   - ⑴ 다른 팩트 테이블과 스냅샷 테이블을 결합해, 디멘전 테이블로 사용할 수도 있다.
     + 예시1) 스냅샷의 날짜를 지정하여 과거의 마스터 테이블을 언제든지 볼 수 있다.
       ```
       WITH users AS (
         SELECT * FROM users_snapshot WHERE date = '2017-01-01')
       SELECT ... FROM fact_table f
       JOIN users u ON u.id = f.user_id
       ```
   - ⑵ 팩트 테이블과 스냅샷 테이블을 날짜를 포함해 결합할 수도 있다.
     + 매일 변화하는 마스터 정보를 이용하여 데이터를 분석하고 싶을 때 유용
     + 예시2) 고객 정보로 회원 상태가 포함되어 있고, 시간과 함께 변화하고 있다 하면, 회원 상태에 따라 데이터를 분석하기 위해 필요.
       ```
       SELECT ... FROM fact_table f
       JOIN users_snapshot u ON u.id = f.user_id AND u.date = f.date
       ```
   - 스냅샷 테이블이 지워지지 않도록 데이터 레이크나 데이터 웨어하우스와 같은 영구적 저장소에 보관하자.
   - 정규화된 데이터베이스 상에서 마스터 정보는 다수의 테이블로 구성되는 경우가 있는데, 이 테이블 하나하나씩 스냅샷 하는 것이 아니라 미리 모든 테이블을 결합하여 비정규화한 상태에서 스냅샷 해도 상관없다. (데이터 분석 시에는 모든 테이블을 결합하기 때문에)
2. 이력 테이블(history table) : 변경 내용만으로 저장하는 방법
   - 데이터의 양을 줄이는 데 도움이 됨..
   - 하지만 어느 순간의 완전한 마스터 테이블을 나중에 복원하기 어려움. → 디멘전 테이블로 사용하기 힘들다.
     + 이력에서 마스터 테이블을 복원하고 싶을 때 : 이력을 과거까지 거슬러 올라가서, 그중 최신 레코드만을 선택함으로써 마스터 테이블과 비슷한 것을 재구축.
       ```
       SELECT * FROM (
         SELECT *, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY date DESC) number
         FROM users_history
         WHERE date >= current_date() - INTERVAL '365' DAYS) t
       WHERE number = 1
       ```
     + 이러한 복잡한 처리는 비효율적이므로, 마스터 관계의 테이블을 기본적으로 매일 스냅샷하는 것이 낫다.

## [마지막 단계] 디멘전을 추가하여 비정규화 테이블 완성시키기
- 마지막 단계로 팩트 테이블과 디멘전 테이블을 결합하여 비정규화 테이블을 만듦.
  + 디멘전 테이블로는 스냅샷을 사용할 뿐만 아니라 목적에 따라 각종 중간 테이블이 만들어짐.
- 예시) 웹사이트의 액세스 해석
  + 세션 ID를 사용하여 사용자의 동향을 분석하기
  + 세션당 '처음 액세스 시간'과 '마지막 액세스 시간'을 정리 → 처음 액세스 이후의 경과 일수를 알 수 있음.
    ```
    CREATE TABLE sessions AS
    SELECT session_id,
           min(time) AS min_time,
           max(time) AS max_time
    FROM access_log GROUP BY session_id
    ```
  + 세션 ID는 자체로 카디날리티가 매우 커서 테이블을 집약해도 작아지지 않고, 시각화도 어렵다
    <img width="526" alt="image" src="https://github.com/led156/TIL/assets/67251510/cafc9f72-1d68-4ae0-acf0-504eca9734db">

    * 따라서, 좀 더 카디날리티가 작은 디멘전을 만들어 결합하고, 시각화에 필요하지 않은 칼럼은 가급적 제거함.

### 데이터 집계의 기본형
- 데이터를 집계하는 전형적인 쿼리
  ```
  SELECT
    - 디멘전
    date_trunc('day', a.time) time, /* 1일 단위로 그룹화 */
    - 추가 디멘전
    date_diff('day', b.min_time, a.time) days, /* 방문한 후의 일 수 */
    - 측정값
    count(*) count
  FROM (
    /* ❶ 팩트 테이블로부터 필요한 칼럼만을 추출 */
    SELECT time, session_id FROM access_log
    WHERE time BETWEEN TIMESTAMP '2017-01-01' AND TIMESTAMP '2018-01-01') a /* 집계 기간 검색 */
  /* ❷ 디멘전 테이블과 결합 */
  JOIN sessions b ON b.session_id = a.session_id
  /* ❸ 그룹화 */
  GROUP BY 1, 2
  ```
  + ❶ 팩트 테이블에서 필요한 데이터를 꺼냄. (칼럼 수를 줄임으로써 데이터 로드 속도가 빨라짐)
  + ❷ 디멘전 테이블과 결합하여 데이터 마트에 저장할 칼럼을 선택함.
    * 가급적 카디널리티를 작게 하여, 시각화의 프로세스에서 이용하고 싶은 디멘전만 추가 (세션ID 같이 카디널리티가 높은 것은 가급적 피하기)
  + ❸ 그룹화하여 측정값을 집계함.
  + ⇨ 충분히 작은 비정규화 테이블 생성
