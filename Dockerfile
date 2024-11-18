# Stage 1: Build stage
FROM node:22-alpine AS development
WORKDIR /app
COPY package*.json . 
COPY prisma ./prisma
RUN npm install --force && npm cache clean --force
RUN npx prisma generate
COPY . .

# Stage 2: Production stage (Final image)
FROM node:22-alpine AS production
WORKDIR /app
COPY --from=development /app /app
RUN npm install --force --omit=dev  
EXPOSE 4000
CMD ["npm", "run", "start:dev"]
