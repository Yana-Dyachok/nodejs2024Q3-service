FROM node:22-alpine As development
WORKDIR /usr/app
COPY package*.json . 
COPY prisma ./prisma
RUN npm ci --legacy-peer-deps && npm cache clean --force
RUN npx prisma generate
EXPOSE 4000
COPY . .
CMD ["npm", "run", "start:dev"]
