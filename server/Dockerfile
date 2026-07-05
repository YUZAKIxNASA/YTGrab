# Use official Node LTS
FROM node:18-alpine
WORKDIR /usr/src/app

# add yt-dlp
RUN apk add --no-cache python3 py3-pip ffmpeg curl
RUN pip3 install yt-dlp

COPY package*.json ./
RUN npm ci --production

COPY ./src ./src

ENV NODE_ENV=production
EXPOSE 8000
CMD ["node","src/index.js"]
