# Multi-stage / lightweight Node.js container
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy application files
COPY package.json ./
COPY server.js ./
COPY public ./public

# Set default environment variables
ENV PORT=8080 \
    APP_ENV=production \
    APP_MESSAGE="Kubernetes Implemented Through Jenkins" \
    APP_VERSION="1.0.0"

# Expose container port
EXPOSE 8080

# Run non-root user for security best practice
USER node

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/healthz || exit 1

# Start server
CMD ["node", "server.js"]
