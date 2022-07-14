## 프로젝트명 : 

## 팀원소개

#### 이승연(팀장/ Backend)

#### 이도엽(maintainer/ Frontend)

#### 이보나(Frontend)

#### 김민균(Frontend)

#### 이재순(maintainer/ Backend)

<br/>

## 프로젝트 소개 
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

<br/>

## 서비스 설명 

#### 폴더 구조 - Frontend
<br/>


#### 폴더 구조 - Backend
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





## 개발 일정 



7/11~7/17

-화면명세서, 기능명세서, ERD, 개발일정 명확하게

7/14

- 민균
  - Jira Epic(Plan) 등록
  - wireframe 초안 제작(진행중) (w. @이보나 @이도엽)
  - 14:30 질문할거 생각해보기 
