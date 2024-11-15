# Stage 1: Build the app
FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the app files
COPY . .

# Build the app for production
RUN npm run build

# Stage 2: Run the app using a lightweight server
FROM nginx:stable-alpine

# Copy the built React app from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port the app runs on
EXPOSE 80

# Start the NGINX server
CMD ["nginx", "-g", "daemon off;"]
