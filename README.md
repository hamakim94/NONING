## 프로젝트명 : 

## 팀원소개

#### 이승연(팀장/ Backend)

#### 이도엽(FE maintainer/ Frontend)

#### 이보나(Frontend)

#### 김민균(Jira maintainer/ Frontend)

#### 이재순(BE maintainer/ Backend)

<br/>

## 프로젝트 소개 
“넌 가능해? 난 불가능!”

쉽게 접하는 사소한 논쟁거리!

실시간으로 가능한 고민상담까지!!

**새콤달콤한 깻잎**에서 만나보세요.

<br/>

새콤달콤 notion : https://rainy-ixia-034.notion.site/adcfe6c242624dcd922986681bafe7ba


<br/>

## 사용언어, 기술스택 
<img src="https://img.shields.io/badge/Language-JAVA-red"/> 

<img src="https://img.shields.io/badge/Frontend-Vue-brightgreen"/>

<br/>

## 협업툴 

#### Git
#### Jira
#### Notion
#### MatterMost
#### Webex


## 버전 관리


<br/>

## 기획

#### 기능명세서
https://rainy-ixia-034.notion.site/02145f77a865406c806b8f886c348a18?v=55311276537b4783ae4deb995fba81e0

#### 프로젝트 계획서
https://rainy-ixia-034.notion.site/dee646f3456e42f7934d8852ca9ad2bb

<br/>

## 서비스 설명 

#### 폴더 구조 - Frontend
```

```

<br/>

#### 폴더 구조 - Backend
```

```

<br/>


## 페이지 기능 소개 
<br/>


## Git Branch Command

#### 원격 저장소 갱신

```
git remote update
```

#### 원격 저장소 갱신(브랜치 삭제까지 포함)

```
git remote update --prune
```

#### branch 전체 목록 조회(빨간 것이 원격저장소)

```
git branch -a
```

#### branch 바꾸기

branch 변경 + 파일 복원

```
git checkout {브랜치명}
```

branch만 변경

```
git switch {브랜치명}
```

파일만 복원

```
git restore {파일명}
```

#### branch 생성 (각 Dev 브랜치에서 생성할 것)

#### ex) BE는 BE Develop에서 생성)
```
git branch {브랜치명}    <= 로컬에 브랜치 생성 하는 것
git checkout -b {브랜치명} <= 로컬에 브랜치 생성함과 동시에 브랜치 바꾸기
```

#### branch 푸쉬(로컬-> 원격) (주로 이렇게 쓸 것)
```
git push origin {브랜치명}
```
<br/>

## Develop Rules

<br/>

#### branch 

```
master -> develop -> FE_develop -> feat/기능명
	   -> develop -> BE_develop -> feat/기능명
	   -> develop -> docs
```

- master
  - develop
    - BE_develop
    - FE_develop
    - docs

#### merge

- 각 파트 maintainer들만 merge 권한

#### commit 메시지 

```
FE/BE/Docs_날짜_개발한(중인)기능: 개발 내용 (진행중/ 완료/ 수정 완료/ 수정 진행중) 
```

#### commit 주의사항 및 규칙
```
- 수정 전 git pull 받고 시작하기 
- 수정 전 git branch 잘 확인하기 
- git add . 사용 금지 
- 관련 있는 코드들끼리만 commit (commit 메세지 잘 쓰기)
```

#### code style
- 이름 규칙 <br/>

| Frontend                                                                       | Backend                                                                                                                        |
|--------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------|
| 1. 폴더명: Camel case <br><br> 2. 파일명: Pascal case <br><br> 3. state명: Camel case | 1. 폴더명: Camel case <br><br> 2. 파일명/클래스명: Pascal case <br><br> 3. URL: https://velog.io/@pjh612/REST-API-URI-%EA%B7%9C%EC%B9%99 | 

- Boolean 타입의 변수 작명규칙 <br/>
  : is 접두사 사용 -> (ex) isExist <br/>
<br/>
- 들여쓰기 (indent) <br/> 
  : 4 space 방식  <br/>
<br/>
- 작은따옴표(')를 사용할 건지, 큰따옴표(")를 사용할 건지 <br/>
  : 큰따옴표(") 사용
<br/>

이외 https://naver.github.io/hackday-conventions-java/ 참고

## JIRA 테스크 컨벤션
- 머릿말에 [BE], [FE], [Design], [Extra]를 달아서 분류한다.
- 영어로 작성한다.
- ex) [FE] UX login form ..
- ex) [BE] use swagger ...

