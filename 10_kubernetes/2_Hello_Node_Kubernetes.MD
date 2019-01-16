## 개요
- 개발한 코드를 [Kubernetes Engine](https://cloud.google.com/container-engine/)에서 실행되는 [Kubernetes](https://kubernetes.io/)에서 실행되는 복제 된 응용 프로그램으로 바꾸는 것
- ![이 실험의 다양한 파트](https://gcpstaging-qwiklab-website-prod.s3.amazonaws.com/bundles/assets/641fcb4eefdf381baeeecbda634fe27abfd2bdb25d7c5dcbadbff9c285de79c2.png)

### 진행
- Node.js 서버 만들기
- Docker 컨텐이너 이미지 만들기
- 컨테이너 클러스터 만들기
- Kubernetes 포드 만들기
- 서비스 규모 확대

## 설정
1. 활성 계정 이름 나열
```
gcloud auth list
```
- 산출
```
Credentialed accounts:
 - <myaccount>@<mydomain>.com (active)
```
- 예제 출력
```
Credentialed accounts:
 - google1623327_student@qwiklabs.net
 ```

1. 프로젝트 ID 나열
```
gcloud config list project
```
- 산출
```
[core]
project = <project_ID>
```
- 예제 출력
```
[core]
project = qwiklabs-gcp-44776a13dea667a6
```

1. Node.js 애플리케이션 만들기
```
vi server.js
```
- 편집기 시작
```
i
```
- 내용 파일 추가
```
var http = require('http');
var handleRequest = function(request, response) {
  response.writeHead(200);
  response.end("Hello World!");
}
var www = http.createServer(handleRequest);
www.listen(8080);
```
- Esc 다음 (serve.js 파일 저장)
```
:wq
```
- 내장 웹 미리보기 기능을 사용하여 프록시 요청
![미리보기](https://gcpstaging-qwiklab-website-prod.s3.amazonaws.com/bundles/assets/6ba62726ff0694669ee2b9c921b8c0dbb27c73b600a5afba9e83c59242b16639.png)
- 노드 서버 중지 (Ctrl + c)

## Docker 컨테이너 이미지 만들기
- 
```
vi Dockerfile
```
```
i
```
```
FROM node:6.9.2
EXPOSE 8080
COPY server.js .
CMD node server.js
```
> nodeDocker 허브에 있는 이미지에서 시작하십시오 .
  포트를 노출하십시오 8080.
  server.js파일을 이미지에 복사하십시오 .
  이전에 수동으로 수행 한 것처럼 노드 서버를 시작하십시오.

- GCP Project ID로 대체하여 이미지 생성
```
docker build -t gcr.io/PROJECT_ID/hello-node:v1 .
```
```
docker run -d -p 8080:8080 gcr.io/PROJECT_ID/hello-node:v1
```
- 출력 결과
```
325301e6b2bffd1d0049c621866831316d653c0b25a496d04ce0ec6854cb7998
```

- 컨테이너 중지
```
docker ps
```
```
CONTAINER ID        IMAGE                              COMMAND
2c66d0efcbd4        gcr.io/PROJECT_ID/hello-node:v1    "/bin/sh -c 'node
```
```
docker stop [CONTAINER ID]
```
- 콘솔 출력
```
2c66d0efcbd4
```

- [GCR](https://cloud.google.com/container-registry/)로 이미지 푸시
```
gcloud docker -- push gcr.io/PROJECT_ID/hello-node:v1
```
- 실행결과
```
The push refers to a repository [gcr.io/qwiklabs-gcp-6h281a111f098/hello-node]
ba6ca48af64e: Pushed
381c97ba7dc3: Pushed
604c78617f34: Pushed
fa18e5ffd316: Pushed
0a5e2b2ddeaa: Pushed
53c779688d06: Pushed
60a0858edcd5: Pushed
b6ca02dfe5e6: Pushed
v1: digest: sha256:8a9349a355c8e06a48a1e8906652b9259bba6d594097f115060acca8e3e941a2 size: 2002
```

## 클러스터 만들기
- 클러스터는 Kubernetes 마스터 API 서버와 작업자 노드(Compute Engine)로 구성
(GCP Project ID)
```
gcloud config set project PROJECT_ID
```
- 클러스터 생성
```
gcloud container clusters create hello-world \
                --num-nodes 2 \
                --machine-type n1-standard-1 \
                --zone us-central1-a
```
```
Creating cluster hello-world...done.
Created [https://container.googleapis.com/v1/projects/PROJECT_ID/zones/us-central1-a/clusters/hello-world].
kubeconfig entry generated for hello-world.
NAME         ZONE           MASTER_VERSION  MASTER_IP       MACHINE_TYPE   STATUS
hello-world  us-central1-a  1.5.7           146.148.46.124  n1-standard-1  RUNNING
```

- 탐색 메뉴 > Kubernetes 엔진 선택