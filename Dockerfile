# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar arquivos de lock do pnpm
COPY pnpm-lock.yaml package.json ./

# Instalar pnpm
RUN npm install -g pnpm@10.4.1

# Instalar dependências
RUN pnpm install --frozen-lockfile

# Copiar código-fonte
COPY . .

# Build da aplicação
RUN pnpm build

# Stage 2: Runtime
FROM node:20-alpine

WORKDIR /app

# Copiar apenas o necessário do stage anterior
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/client/dist ./client/dist
COPY --from=builder /app/dist/index.js ./

# Instalar apenas dependências de produção
COPY package.json ./
RUN npm install -g pnpm@10.4.1 && \
    pnpm install --prod --frozen-lockfile

# Expor porta (Google Cloud Run usa 8080)
ENV PORT=8080
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:8080', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Iniciar a aplicação
CMD ["node", "dist/index.js"]
