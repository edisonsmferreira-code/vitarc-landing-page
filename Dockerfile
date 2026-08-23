# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar package.json e pnpm-lock.yaml PRIMEIRO
COPY package.json pnpm-lock.yaml ./

# Copiar patches ANTES de instalar! (CRÍTICO)
COPY patches ./patches

# Instalar pnpm
RUN npm install -g pnpm@10.4.1

# Instalar dependências (agora patches/ existe!)
RUN pnpm install --frozen-lockfile

# Copiar resto do código-fonte
COPY client ./client
COPY server ./server
COPY shared ./shared
COPY tsconfig.json tsconfig.node.json vite.config.ts components.json ./

# Build da aplicação
RUN pnpm build

# Stage 2: Runtime
FROM node:20-alpine

WORKDIR /app

# Copiar apenas o necessário do stage anterior
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/client/dist ./client/dist

# Copiar package.json para runtime
COPY package.json ./

# Instalar apenas dependências de produção
RUN npm install -g pnpm@10.4.1 && \
    pnpm install --prod --frozen-lockfile

# Expor porta
ENV PORT=8080
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:8080', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Iniciar aplicação
CMD ["node", "dist/index.js"]
