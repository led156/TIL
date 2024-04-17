# 6.1. 스키마리스 데이터의 애드 혹 분석
- JSON에 의한 스키마리스 데이터를 집계하는 절차에 대해 소개
  |역할|소프트웨어|
  |---|---|
  |데이터 소스|Twitter 스트리밍 API|
  |분산 스토리지|MongoDB 3.4.6|
  |분산 데이터 처리|Apache Spark 2.2.0|
  |데이터 정형|pandas 0.20.3|
  |대화식 콘솔|주피터 Console 5.1.0|

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

3. Twitter 스트리밍 API를 호출하는 스크립트
```

```

### 테스트 환경의 구축


# 6.2.


# 6.3.


