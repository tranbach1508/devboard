FROM node:22-alpine

WORKDIR /app

# Root workspace
COPY package.json package-lock.json ./

# Workspace package.json files
COPY apps/backend/package.json ./apps/backend/package.json
COPY packages/shared/package.json ./packages/shared/package.json

# Install dependencies
RUN npm ci

# Copy source code
COPY apps/backend ./apps/backend
COPY packages/shared ./packages/shared

WORKDIR /app/apps/backend

CMD ["npm", "run", "dev"]