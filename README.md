# ncp_object_storage_manager
NCP(Naver Cloud Platform) ObjectStorage에 파일 좀 쉽게 올리자

NCP 콘솔에서 업로드할 경우, 한번에 올라가는데 파일 갯수 제한이 있고 올라가더라도 폴더 구분이 되지 않는다.
그래서 만들었다.

## 사용법
1. config.json에 정보 입력
2. public 폴더 생성 후 올릴 파일들 카피
```
mkdir public
```
3. 실행
```
npm run start
```
