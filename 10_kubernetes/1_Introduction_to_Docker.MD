## Docker
- 응용 프로그램을 개발, 운송 및 실행하기 위한 개방형 플랫폼
- 코드를 신속하게 제공하고, 테스트 속도와 배포속도를 높이고 코드와 실행 사이의 주기를 단축하는 게 도움이 된다.

## 설치 및 요구사항 
1. Google Console 열기
1. Google Cloud Shell 활성화![shell](https://gcpstaging-qwiklab-website-prod.s3.amazonaws.com/bundles/assets/bdd6397bf6a7f59197c396bf64c6f56a0a578511a8cec39a747511711f2d8404.png)
1. START CLUDUD SHELL: GCP 명령 줄 도구
![cloud shell](https://gcpstaging-qwiklab-website-prod.s3.amazonaws.com/bundles/assets/2b3aa073e2de48f786ec9497068b23b4bb0479e055c72b245c68c629a3eb6bb5.png)
1. gcloud auth list: 활성 계정 이름 리스트
```
gcloud auth list
```
- 산출
```
Credentialed accounts:
 - <myaccount>@<mydomain>.com (active)
 ```
 - 예제 
 ```
 Credentialed accounts:
 - google1623327_student@qwiklabs.net
 ```
 1. gcloud config list project: 프로젝트 ID 리스트
 ```
 gcloud config list project
 ```
 - 산출
 ```
 [core]
project = <project_ID>
```
- 예제
```
[core]
project = qwiklabs-gcp-44776a13dea667a6
```
[GCP 문서](https://cloud.google.com/sdk/gcloud)

## hello world
1. 컨테이너 실행
```
docker run hello-world
```
- 명령 출력
```
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
9db2ca6ccae0: Pull complete
Digest: sha256:4b8ff392a12ed9ea17784bd3c9a8b1fa3299cac44aca35a85c90c5e3c7afacdc
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.
...
```
1. 컨테이너 이미지 보기
```
docker images
```
- 명령 출력
```
REPOSITORY     TAG      IMAGE ID       CREATED       SIZE
hello-world    latest   1815c82652c0   6 days ago    1.84 kB
```
> 이미지는 SHA256 해시 형식
[SHA256](https://www.movable-type.co.uk/scripts/sha256.html)
1. 다시 hello-world 실행
```
docker run hello-world
```
- 명력 출력
```
Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
...
```

1. 실행중인 컨테이너
```
docker ps
```
- 명력 출력
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
```
> 실행중인 컨테이너가 없습니다. 이전에 실행 한 hello-world 컨테이너가 이미 종료되었습니다.

1. 실행을 완료 한 컨테이너 포함 조회
```
docker ps -a
```
- 명령 출력
```
CONTAINER ID      IMAGE           COMMAND      ...     NAMES
6027ecba1c39      hello-world     "/hello"     ...     elated_knuth
358d709b8341      hello-world     "/hello"     ...     epic_lewin
```
> Names는 무작위로 생성되지만 지저할 수 있다.
  ```docker run --name [container-name] hello-world


## build
1. Docker 이미지 작성
```
mkdir test && cd test
```
> 폴더 만들고 전환
- Dockerfile 만들기
```
cat > Dockerfile <<EOF
# Use an official Node runtime as the parent image
FROM node:6

# Set the working directory in the container to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
ADD . /app

# Make the container's port 80 available to the outside world
EXPOSE 80

# Run app.js using node when the container launches
CMD ["node", "app.js"]
EOF
```
> 초기 행은 기본 상위 이미지를 지정합니다.이 경우 노드 버전 6의 공식 Docker 이미지입니다.
> 두 번째로는 컨테이너의 작업 디렉토리 (현재)를 설정합니다.
> 셋째로, 현재 디렉토리의 내용 (에 의해 표시된 ".")을 컨테이너에 추가합니다.
> 그런 다음 컨테이너 포트를 공개하여 해당 포트에서 연결을 허용하고 마지막으로 node 명령을 실행하여 응용 프로그램을 시작합니다.
[Docker 명령 참조](https://docs.docker.com/engine/reference/builder/#known-issues-run)

1. 노드 응용 프로그램 생성
```
cat > app.js <<EOF
const http = require('http');

const hostname = '0.0.0.0';
const port = 80;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
        res.end('Hello World\n');
});

server.listen(port, hostname, () => {
    console.log('Server running at http://%s:%s/', hostname, port);
});

process.on('SIGINT', function() {
    console.log('Caught interrupt signal and will exit');
    process.exit();
});
EOF
```

1. Dockerfile이 있는 디렉토리에서 명령 실행
```
docker build -t node-app:0.1 .
```
- 실행 결과
```
Sending build context to Docker daemon 3.072 kB
Step 1 : FROM node:6
6: Pulling from library/node
...
...
...
Step 5 : CMD node app.js
 ---> Running in b677acd1edd9
 ---> f166cd2a9f10
Removing intermediate container b677acd1edd9
Successfully built f166cd2a9f10
```
> -t name:tag (이미지 태그와 이름과 함께)
> 이미지 이름: node-app
> 태그: 0.1

1. build한 이미지 보기
```
docker images
```
- 출력 결과
```
REPOSITORY     TAG      IMAGE ID        CREATED            SIZE
node-app       0.1      f166cd2a9f10    25 seconds ago     656.2 MB
node           6        5a767079e3df    15 hours ago       656.2 MB
hello-world    latest   1815c82652c0    6 days ago         1.84 kB
```

## operation
1. 컨테이너 실행
```
docker run -p 4000:80 --name my-app node-app:0.1
```
- 명력 출력
```
Server running at http://0.0.0.0:80/
```
> --name플래그는 컨테이너 이름을 지정 가능
> 컨테이너 포트 80, 호스트 포트 4000에 매핑
> http://locahlost:4000

1. 다른 터미널을 열고 (Cloud Shell에서 +아이콘을 클릭) 서버 테스트
```
curl http://localhost:4000
```
- 명력 출력
```
Hello World
```
> 백그라운드에서 실행되도록하려면 (터미널 세션에 연결되지 않음) -d플래그 지정

1. 초기 터미널 닫은 후 컨테이너 중지 및 제거
```
docker stop my-app && docker rm my-app
```

2. 백그라운드에서 컨테이너 시작
```
docker run -p 4000:80 --name my-app -d node-app:0.1

docker ps
```
- 명령 출력
```
CONTAINER ID   IMAGE          COMMAND        CREATED         ...  NAMES
xxxxxxxxxxxx   node-app:0.1   "node app.js"  16 seconds ago  ...  my-app
```

3. 도커 로그 보기
```
docker logs [container_id]
```
- 명령 출력
```
Server running at http://0.0.0.0:80/
```

4. 이전에 생성한 디렉토리 열기
```
cd test
```

5. 다른 문자열로 "안녕하세요"를 대체
```
....
const server = http.createServer((req, res) => {
    res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
        res.end('Welcome to Cloud\n');
});
....
```

6. 이미지 작성 및 태그 지정 (0.2)
```
docker build -t node-app:0.2 .
```

7. 컨테이너 테스트
```
curl http://localhost:8080
curl http://localhost:4000
```

## 디버그
1. 컨테이러 로그 보기
```
docker logs -f [container_id]
```
> 실행 중일때는 -f 옵션 사용
-명령출력
```
Server running at http://0.0.0.0:80/
```

2. 실행중인 컨테이너에 대화식 Bash 세션 시작 (다른 터미널)
```
docker exec -it [container_id] bash
```
- 명령 출력
```
root@xxxxxxxxxxxx:/app#
```

3. 디렉토리 보기
```
ls
```
- 명령 출력
```
Dockerfile  app.js
root@xxxxxxxxxxxx:/app#
```

4. Bash 세션 종료
```
exit
```

5. Docker 컨테이너의 메타 데이터 검사
```
docker inspect [container_id]
```
- 명력 출력
```
[
    {
        "Id": "xxxxxxxxxxxx....",
        "Created": "2017-08-07T22:57:49.261726726Z",
        "Path": "node",
        "Args": [
            "app.js"
        ],
...
```
> --format은 반환된 JSON의 특정 필드 검사에 사용
```
docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' [container_id]
```
- 출력 예제
```
192.168.9.3
```
[Docker 검사](https://docs.docker.com/engine/reference/commandline/inspect/#examples)
[Docker exec](https://docs.docker.com/engine/reference/commandline/exec/)

## 게시
- 이미지를 [Google 컨테이너 레지스트리](https://cloud.google.com/container-registry/)로 푸시
- gcr이 호스팅하는 비공개 레지스트리에 이미지를 푸시하려면 레지스트리 이름으로 이미지에 태그를 지정해야 한다. 형식은 [hostname]/[project-id]/[image]:[tag]
  - [hostname]= gcr.io
  - [project-id]= 귀하의 프로젝트 ID
  - [image]= 귀하의 이미지 이름
  - [tag]= 원하는 문자열 태그. 지정하지 않으면 기본값은 "latest"입니다.

1. 프로젝트 ID 찾기
```
gcloud config list project
```
- 명령 출력
```
[core]
project = [project-id]

Your active configuration is: [default]
```

2. gcr용 docker 이미지
```
docker tag node-app:0.2 gcr.io/[project-id]/node-app:0.2
docker images
```
- 명령 출력
```
REPOSITORY                      TAG         IMAGE ID          CREATED
node-app                        0.2         76b3beef845e      22 hours ago
gcr.io/[project-id]/node-app    0.2         76b3beef845e      22 hours ago
node-app                        0.1         f166cd2a9f10      26 hours ago
node                            6           5a767079e3df      7 days ago
hello-world                     latest      1815c82652c0      7 weeks ago
```

3. gcr에 푸시
```
gcloud docker -- push gcr.io/[project-id]/node-app:0.2
```

4. gcr 콘솔 이동
- 콘솔을 통해 Tools > Container Registry로 이동
- http://gcr.io/[project-id]/node-app
![gcr 콘솔 이미지](https://gcpstaging-qwiklab-website-prod.s3.amazonaws.com/bundles/assets/d3c4fdf0cd8fc620d92a29960c821e50717876ced4c76247e4a1279381a86c82.png)

5. 모든 컨테이너 중지 및 제거
```
docker stop $(docker ps -q)
docker rm $(docker ps -aq)
```

6. 노드 이미지 제거 전 하위 이미지 제거 및 교체
```
docker rmi node-app:0.2 gcr.io/[project-id]/node-app node-app:0.1
docker rmi node:6
docker rmi $(docker images -aq) # remove remaining images
docker images
```
- 명령 출력
```
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
```

7. 이미지 당겨서 실행
```
gcloud docker -- pull gcr.io/[project-id]/node-app:0.2
docker run -p 4000:80 -d gcr.io/[project-id]/node-app:0.2
curl http://localhost:4000
```
- 명령 출력
```
Welcome to Cloud
```