### Docker Install
Change directory to current folder.
```
docker build . -t cialloo/app
docker run -itd --name app -p 8080:8080 cialloo/app
```

### Generate JavaScript Proto
```
npx grpc_tools_node_protoc --js_out=import_style=commonjs,binary:./ --grpc_out=generate_package_definition:./ filename.proto
```