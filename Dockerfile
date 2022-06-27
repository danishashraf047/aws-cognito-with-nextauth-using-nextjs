# FROM public.ecr.aws/bitnami/node:14.15.1-debian-10-r8
# FROM node:18-alpine
# FROM node:16-alpine
FROM node:14-alpine
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]