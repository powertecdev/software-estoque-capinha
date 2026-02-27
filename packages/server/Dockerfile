# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY packages/shared/package.json ./packages/shared/
COPY packages/server/package.json ./packages/server/
RUN npm ci --workspace=packages/server --workspace=packages/shared
COPY packages/shared ./packages/shared
COPY packages/server ./packages/server
COPY tsconfig.base.json ./
RUN cd packages/server && npx prisma generate
RUN npm run build:shared && npm run build:server

# Stage 2: Production
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/packages/server/dist ./dist
COPY --from=builder /app/packages/server/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages/server/package.json ./
EXPOSE 3333
CMD ["node", "dist/server.js"]
