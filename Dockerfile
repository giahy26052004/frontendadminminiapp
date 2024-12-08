# Use official Node.js image from the Docker Hub
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /frontend

# Copy the package.json and package-lock.json to the container
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Expose the port the app runs on (usually 3000 for Next.js apps)
EXPOSE 3000

# Build the Next.js application (if applicable)
RUN npm run build

# Start the application (assuming Next.js or a similar framework)
CMD ["npm", "start"]
