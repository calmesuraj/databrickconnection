# ---------- Install dependencies (root) ----------
FROM node:20-alpine AS deps
WORKDIR /app

COPY package*.json ./
COPY client/package*.json ./client/
COPY server/package*.json ./server/

RUN npm ci

# ---------- Build client ----------
FROM deps AS client_build
WORKDIR /app/client
COPY client/ .
RUN npm run build

# ---------- Build server ----------
FROM deps AS server_build
WORKDIR /app/server
COPY server/ .
RUN npm run build

# ---------- Runtime ----------
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

# install only prod deps from root lock
COPY package*.json ./
RUN npm ci --omit=dev

# copy built server
COPY --from=server_build /app/server/dist ./dist

# copy client build to public
COPY --from=client_build /app/client/dist ./public

EXPOSE 8080
CMD ["node", "dist/server.js"]