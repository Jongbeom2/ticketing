# kubectl 명령어

### .yaml config 적용

```
kubectl apply -f infra/k8s
```

### image build 후 deployment 다시 시작

```
kubectl rollout restart deployment deployment-name
```

### create secret

```
kubectl create secret generic secret-name --from-literal=key=value
```

# docker 명령어

### docker hub 로그인

```
docker login
```

### docker hub에 image 업로드

```
docker push image-name
```

### 사용하지 않는 reosurce 삭제

```
docker container prune
```

```
docker image prune -a
```
