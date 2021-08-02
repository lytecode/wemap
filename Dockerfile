# Install node latest
FROM node:latest

# Set the workdir /var/www/myapp
WORKDIR /var/www/wemap

# Copy the package.json to workdir
COPY package.json yarn.lock ./

# Run yarn - install the dependencies
RUN yarn

# Copy application source
COPY . .

# Copy .env.docker to workdir/.env - use the docker env
# COPY .env.docker ./.env

# Expose application ports - (8080 - for API)
EXPOSE 8080

# Generate build
RUN yarn build

# Start the application
CMD ["yarn", "start"]