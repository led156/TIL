# 6.1. 스키마리스 데이터의 애드 혹 분석
- JSON에 의한 스키마리스 데이터를 집계하는 절차에 대해 소개
  |역할|소프트웨어|
  |---|---|
  |데이터 소스|Reddit API|
  |분산 스토리지|MongoDB 5.0|
  |분산 데이터 처리|Apache Spark 2.2.0|
  |데이터 정형|pandas|
  |대화식 콘솔|주피터 Console|

## 스키마리스 데이터 수집하기
- 스트리밍 APIs를 이용해 데이터를 수집한 뒤, 샘플링된 데이터를 실시간으로 수집해 MongoDB에 보관한다.

1. Java, Python 설치
```
$ java -version # 자바 설치
$ python --version # 파이썬 설치
```

2. MongoDB 설치
https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/
```
$ brew tap mongodb/brew
$ brew update
$ brew install mongodb-community@7.0
$ brew services start mongodb-community@7.0
$ brew services stop mongodb-community@7.0
```

> `error 15872`
> - 오류 문구
>   ```
>   ❯ brew services start mongodb-community@7.0
>   ==> Successfully started `mongodb-community` (label: homebrew.mxcl.mongodb-co
>   ❯ brew services list
>   Name              Status       User     File
>   mongodb-community error  15872 eunbilee ~/Library/LaunchAgents/homebrew.mxcl.
>   ```
>   + start 오류는 없지만, 리스트를 보았을 때 에러 상태이고, DB 접근이 되지 않음.
> - 해결 방법
>   + 시도1 : file ownership 확인 `ls -lrt /tmp/mongodb-27017.sock` [🔗](https://www.mongodb.com/community/forums/t/unable-to-start-mongo-instance-on-mac-os-monterrey-12-6-using-homebrew/186682/2)
>     * 결과 : 소유자는 내가 맞았음. 해결 X
>   + 시도2 : 재부팅 후 서비스 다시 시작
>     * 결과 :
>       ```
>       ❯ brew services start mongodb-community
>       ==> Successfully started `mongodb-community` (label: homebrew.mxcl.mongodb-co
>       ❯ brew services list
>       Name              Status  User     File
>       mongodb-community started eunbilee ~/Library/LaunchAgents/homebrew.mxcl.mongo
>       ```
>   + ✅ 시도3 : 7.0 버전 삭제 후 5.0 버전으로 다시 설치 [🔗](https://choboit.tistory.com/m/95)
>     ```
>     ❯ brew uninstall mongodb-community
>     Uninstalling /opt/homebrew/Cellar/mongodb-community/7.0.8... (11 files, 267.2MB)
>     ❯ brew install mongodb-community@5.0
>     ❯ brew services start mongodb-community@5.0
>     ==> Successfully started `mongodb-community@5.0` (label: homebrew.mxcl.mongod
>     ❯ brew services list
>     Name                  Status  User     File
>     mongodb-community@5.0 started eunbilee ~/Library/LaunchAgents/homebrew.mxcl.m
>     ```
>     
> - 문제 원인
>   버전 오류

- http://localhost:27017/ 접속 시 `It looks like you are trying to access MongoDB over HTTP on the native driver port.` 오류없이 잘 나타남.
  + ```python
    try:
    client = pymongo.MongoClient(#"someInvalidURIOrNonExistantHost",
                                     serverSelectionTimeoutMS=3000)
    client.server_info() # force connection on a request as the
                         # connect=True parameter of MongoClient seems
                         # to be useless here 
    except pymongo.errors.ServerSelectionTimeoutError as err:
        # do whatever you need
        print(err)
    ```


3-1. (Tweet)Reddit 스트리밍 API를 호출해 MongoDB에 저장하는 스크립트 [🔗 ](https://seungyeup.github.io/posts/big-data-chapt6/)
```
# reddit api docs : https://www.reddit.com/dev/api

import datetime
import json
import pymongo
import requests
import tqdm
import configparser

# config = configparser.ConfigParser() -> token 내 %문제로 ConfigParser 사용할 수 없음
config = configparser.RawConfigParser()
config.read('config.ini')

# api keys
CLIENT_ID = config['REDDIT_DEFAULT']['CLIENT_ID']
CLIENT_SECRET = config['REDDIT_DEFAULT']['CLIENT_SECRET']
USERNAME = config['REDDIT_DEFAULT']['USERNAME']
PASSWORD = config['REDDIT_DEFAULT']['PASSWORD']
AUTH_TOKEN = config['REDDIT_DEFAULT']['AUTH_TOKEN']


def bearer_oauth(r):
    """
    Method required by bearer token authentication.
    """

    r.headers["Authorization"] = f"Bearer {AUTH_TOKEN}"
    return r


base_url = 'https://oauth.reddit.com/hot'

response = requests.get(base_url, auth=bearer_oauth, stream=True)

# save in mongo
mongo = pymongo.MongoClient()
for line in tqdm.tqdm(response.iter_lines(), unit='reddit', mininterval=10):
    if line:
        reddit = json.loads(line)
        reddit['_timestamp'] = datetime.datetime.utcnow().isoformat()
        mongo.reddit.sample.insert_one(reddit)
```

3-2. Tweet 데이터를 MongoDB에 저장하는 스크립트
- Tweet 실시간 스트리밍 api가 유료화되어, 캐글에 있는 트위터 데이터 사용 [🔗](https://www.kaggle.com/datasets/gpreda/covid19-tweets)
- [코드 : ] ()


4. 대화식 실행 환경의 준비 및 Spark 설치

- apache spark 설치 [🔗]()
  + mongodb - spark connector를 사용하기 위해서 필요한 spark version 안내 [🔗](https://www.mongodb.com/docs/spark-connector/current/)
    * connector 관련 버전 오류 & scala version 확인 [🔗](https://stackoverflow.com/a/70269614)
    * spark 3.1 ~ 3.2.4 버전이 필요함. (현재 Homebrew에서 spark 3.x 이상 버전만 받을 수 있음)
  + homebrew 이전 버전 rb(루비스크립트)로 설치하기 [🔗](https://europani.github.io/etc/2022/09/28/003-brew-old-version.html) [🔗](https://stackoverflow.com/a/75540829)
    * https://github.com/Homebrew/homebrew-core/blob/3b8e66b865a86ee8e9402d90a3ace143624a101e/Formula/apache-spark.rb 를 raw 파일로 다운로드.
    * 그리고 brew install apache-spark.rb
- pyspark 설치 [🔗](https://blog.voidmainvoid.net/347)
- 환경변수 설정 [🔗](https://key4920.github.io/docs/bigdata_platform/ApacheSpark/spark_install/) [🔗](https://yjinaa.github.io/install-spark-on-m1/)
- jars [🔗](https://stackoverflow.com/questions/51434808/spark-submit-packages-vs-jars)
  ```
  org.mongodb.spark:mongo-spark-connector_2.12:10.2.2
  org.mongodb:mongodb-driver-sync:5.0.0
  org.mongodb:mongodb-driver-core:5.0.0
  org.mongodb:bson:5.0.0
  org.mongodb:bson-record-codec:5.0.0
  ```

```
❯ brew install apache-spark.rb
❯ vi .bash_profile # 또는 vi ~/.zshrc
export PYSPARK_DRIVER_PYTHON=jupyter
export PYSPARK_DRIVER_PYTHON_OPTS="notebook"
export PYSPARK_PYTHON=python3
❯ source .bash_profile # 또는 vi ~/.zshrc
❯ spark-shell
...
Welcome to
      ____              __
     / __/__  ___ _____/ /__
    _\ \/ _ \/ _ `/ __/  '_/
   /___/ .__/\_,_/_/ /_/\_\   version 3.1.2
      /_/

Using Scala version 2.12.10 (OpenJDK 64-Bit Server VM, Java 11.0.23)
...
❯ pyspark --packages org.mongodb.spark:mongo-spark-connector_2.12:10.2.2,org.mongodb:mongodb-driver-sync:5.0.0,org.mongodb:mongodb-driver-core:5.0.0,org.mongodb:bson:5.0.0,org.mongodb:bson-record-codec:5.0.0
[I 2024-04-18 18:15:04.186 LabApp] JupyterLab extension loaded from /opt/anaconda3/lib/python3.9/site-packages/jupyterlab
[I 2024-04-18 18:15:04.187 LabApp] JupyterLab application directory is /opt/anaconda3/share/jupyter/lab
...
```

- pyspark를 실행하면, 파이썬으로 대화식의 spark를 실행할 수 있음.
  ```python
  import pandas as pd

  try:
      client = pymongo.MongoClient(#"someInvalidURIOrNonExistantHost",
                                       serverSelectionTimeoutMS=3000)
      client.server_info() # force connection on a request as the
                           # connect=True parameter of MongoClient seems
                           # to be useless here 
      print(client.tweets.sample.find_one())
      
      reddit_sample_data = pd.DataFrame(list(client.tweets.sample.find(limit=5)))
      display(reddit_sample_data.head())
  except pymongo.errors.ServerSelectionTimeoutError as err:
      # do whatever you need
      print(err)
  ```

5. Spark에 의한 분산 환경
- 데이터 프레임을 일시적인 뷰로 등록하고, 데이터 프레임을 SQL로 집계 (열 지향 스토리지처럼 칼럼 단위 읽기에 최적화되어 있지 않으므로 고속 집계를 위한 데이터 추출이 필요)
  ```python
  from pyspark.sql import SparkSession
  
  spark = SparkSession \
      .builder.master("myApp") \
      .config("spark.serializer", "org.apache.spark.serializer.KryoSerializer") \
      .config("spark.mongodb.read.connection.uri", "mongodb://127.0.0.1:27017/tweets.sample") \
      .config("spark.mongodb.write.connection.uri", "mongodb://127.0.0.1:27017/tweets.sample") \
      .config("spark.driver.bindAddress", "127.0.0.1") \
      .config('spark.jars.packages', 'org.mongodb.spark:mongo-spark-connector_2.12:10.2.2') \
      .getOrCreate()
  
  df = spark.read.format('mongodb')\
      .option("spark.mongodb.read.database", "tweets") \
      .option("spark.mongodb.read.collection", "sample") \
      .load()
  
  df.createOrReplaceTempView('tweets')
  
  query = '''
      select *
      from (
      select source, count(*) cnt
      from tweets
      group by source)
      order by cnt desc
  '''
  
  spark.sql(query).show(5)
  ```
- 텍스트 데이터의 가공 (데이터 처리)
  ```
  
  ```

# 6.2. Hadoop에 의한 데이터 파이프라인
- Hive, Presto를 사용한 배치형의 데이터 처리. 매일매일의 데이터 처리 (ETL 프로세스-데이터 마트 작성: 데이터 파이프라인)
  |역할|소프트웨어|
  |---|---|
  |벌크 형 데이터 전송|Embulk|
  |분산 시스템|Hadoop|
  |데이터 구조화|Hive|
  |쿼리 엔진|Presto|



# 6.3. 워크플로 관리 도구에 의한 자동화
- 데이터 파이프라인을 자동화하기 위해, 오류 발생 시의 복구를 염두에 두고 워크플로를 설계
  |역할|소프트웨어|
  |---|---|
  |워크플로 관리|Apache Airflow|



# 6.4. 클라우드 서비스에 의한 데이터 파이프라인


