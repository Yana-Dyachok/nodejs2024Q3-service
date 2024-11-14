FROM node:22-alpine As development
WORKDIR /usr/app
COPY package*.json . 
RUN npm ci --legacy-peer-deps && npm cache clean --force
COPY . .
CMD ["npm", "run", "start:dev"]

