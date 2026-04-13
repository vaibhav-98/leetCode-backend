# Use a Node.js base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/app

# Copy package.json and package-lock.json (if it exists)
COPY package*.json ./

# Install only production dependencies for the final image
# (Alternatively, run npm install if you want all dependencies)
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application's port (from .env, usually 3000)
EXPOSE 3000

# Set environment variables (optional, can be overridden by docker-compose or -e)
ENV PORT=3000
ENV NODE_ENV=production

# The command to start the application
CMD ["npm", "start"]
