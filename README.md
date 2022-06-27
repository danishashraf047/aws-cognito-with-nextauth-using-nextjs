# aws-cognito-with-nextauth-using-nextjs

## Getting Started

Install project dependencies (for the first when you will clone this repo):

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Run the production server:

```bash
npm run build
```

```bash
npm run start
```

Run the production based app inside Docker:

```bash
docker build . -t aws-cognito-with-nextauth-using-nextjs
```

```bash
docker run -it -p 8080:3000 aws-cognito-with-nextauth-using-nextjs
```

You will be able to use the from this URL: <http://localhost:8080>

Docker useful commands

```bash
# Show containers
docker container ls

# List images
docker image ls OR docker images -a

# Delete image
docker rmi -f {image-id}

# Build locally
docker build . -t aws-cognito-with-nextauth-using-nextjs

# Run locally
docker run -it -p 8080:3000 aws-cognito-with-nextauth-using-nextjs
```
