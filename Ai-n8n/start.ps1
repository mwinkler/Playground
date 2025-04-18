mkdir ./data/n8n -ErrorAction Ignore
mkdir ./data/ollama -ErrorAction Ignore
kind create cluster -n ai-hands-on --config .\res\00_kind_config.yaml
kubectl apply -f .\res\01_n8n.yaml
kubectl apply -f .\res\02_ollama.yaml
kubectl apply -f .\res\03_mcp_server.yaml
