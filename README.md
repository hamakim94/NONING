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
### 주의사항 

#### 1. 수정 전 git pull 받고 시작하기 
#### 2. 수정 전 git branch 잘 확인하기 

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
FE(BE)_날짜_개발한(중인)기능: 개발 내용   
```



#### code style
| Frontend                                                                       | Backend                                                                   |
|--------------------------------------------------------------------------------|---------------------------------------------------------------------------|
| 1. 폴더명: Camel case <br><br> 2. 파일명: Pascal case <br><br> 3. state명: Camel case | 1. 폴더명: Camel case <br><br> 2. 파일명/클래스명: Pascal case <br><br> 3. 경로명: 소문자 | 


