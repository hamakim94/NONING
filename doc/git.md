## Develop Rules

#### branch 

```
master -> develop -> FE_develop -> feat-frontend/기능명
	   -> develop -> BE_develop -> feat-backend/기능명
     -> develop -> cHAT_develop -> feat-chat/기능명
	   -> develop -> docs
```

- master
  - develop
    - BE_develop
    - FE_develop
    - CHAT_develop
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
