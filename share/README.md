### Generate JavaScript Proto
> First change
Generate for backend
```
npx grpc_tools_node_protoc --js_out=import_style=commonjs,binary:jslib --grpc_out=generate_package_definition:jslib protobuf/app.proto
```
Generate for frontend
```
protoc --plugin=protoc-gen-grpc-web="C:\protobuf\bin\protoc-gen-grpc-web.exe" --grpc-web_out=import_style=commonjs,mode=grpcwebtext:jslib protobuf/app.proto
```