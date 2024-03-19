# fetcher

A simple fetcher for fetching data from a URL.

### Dependencies

Requires Node.js 8.0.0 or higher.

### Installing

```bash
npm install
```

### Usage

```bash
node main.js https://www.example.com https://www.google.com

node main.js --metadata https://www.example.com https://www.google.com
```

### Use docker

```bash
docker build -t fetcher .

docker run -itd fetcher

docker ps | grep 'fetcher' | awk '{print $1}' # get container id

docker exec -it <container_id> sh # get into container

$/usr/src/app node main.js https://www.example.com https://www.google.com

```
