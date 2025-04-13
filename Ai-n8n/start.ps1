mkdir ./data/n8n
mkdir ./data/ollama
kind create cluster -n ai-hands-on --config .\res\00_kind_config.yaml
kubectl apply -f .\res\01_n8n.yaml
kubectl apply -f .\res\02_ollama.yaml

