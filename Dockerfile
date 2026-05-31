FROM node:22-alpine
WORKDIR /app

RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY prisma ./prisma/

RUN HUSKY=0 pnpm install
RUN pnpm prisma generate

EXPOSE 3000
CMD ["sh", "-c", "pnpm prisma:push && pnpm dev"]
