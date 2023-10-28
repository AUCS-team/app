### Docker Install
Change directory to current folder.
```
docker build . -t cialloo/app
docker run -itd --name app -p 8080:8080 cialloo/app
```