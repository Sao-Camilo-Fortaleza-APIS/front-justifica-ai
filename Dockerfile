FROM node:20-alpine
WORKDIR /app
RUN npm install -D vite@^5.3.4
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
EXPOSE 5179
CMD ["npm", "run", "dev"]