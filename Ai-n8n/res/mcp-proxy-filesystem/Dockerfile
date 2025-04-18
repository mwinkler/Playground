FROM nikolaik/python-nodejs:latest

RUN uv tool install mcp-proxy
RUN npm install -g @modelcontextprotocol/server-filesystem
COPY ./server.sh /root/server.sh
RUN chmod +x /root/server.sh

EXPOSE 8080

ENTRYPOINT [ "uvx", "mcp-proxy", "--sse-port=8080", "--sse-host=0.0.0.0", "sh", "/root/server.sh" ]