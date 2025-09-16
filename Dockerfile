# ---- Dockerfile.dev ----
FROM node:20-alpine

# Install bash (needed for some npm scripts) and nano (optional)
RUN apk add --no-cache bash

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Increase file watchers to avoid ENOSPC errors
RUN echo "fs.inotify.max_user_watches=524288" >> /etc/sysctl.conf \
    && sysctl -p

# Env variables
ENV CHOKIDAR_USEPOLLING=true
ENV CHOKIDAR_INTERVAL=300
ENV NODE_ENV=development
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

EXPOSE 3000

# Run Nuxt dev with polling mode to avoid watcher limits
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000", "--watch-poll"]
