# Use a specific version (better for stability)
FROM node:18.20.2-alpine

# Create app directory
WORKDIR /app

# Copy only dependency files first (for caching)
COPY app/package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy remaining app files
COPY app/ .

# Add a non-root user (security best practice)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# App port
EXPOSE 3000

# Health check (used by Docker/K8s)
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -qO- http://localhost:3000/health || exit 1

# Start app
CMD ["npm", "start"]