FROM node:22-alpine As development
WORKDIR /app
COPY package*.json . 
COPY prisma ./prisma
RUN npm install --legacy-peer-deps  --force && npm cache clean --force
RUN npx prisma generate
COPY . .
EXPOSE 4000
CMD ["npm", "run", "start:dev"]


