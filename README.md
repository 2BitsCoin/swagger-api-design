# Waves API v2 [_working draft_]

## Deployment
```
pacman -S node docker
node server.js
docker pull swaggerapi/swagger-ui
docker run -p 80:8080 -e "API_URL=http://localhost:8888/node.v2.yaml" swaggerapi/swagger-ui
```

And open http://localhost.