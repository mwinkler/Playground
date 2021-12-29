## Argo CD

```
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/core-install.yaml
kubectl patch svc argocd-server -n argocd --type merge --patch-file argocd/patch.json
```

Open via https://localhost:51443  
'admin' pw is in 'argocd-inital-admin-secret'

## Gitea

```
cd gitea
docker-compose up -d
```

Open via http://localhost:3000