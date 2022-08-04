
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
