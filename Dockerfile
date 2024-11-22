# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Set environment variable for PostgreSQL connection (optional if using env variables)
ENV DATABASE_URL=postgres://seniorlove:seniorlove@localhost:5432/seniorlove

# Expose the port your backend runs on
EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]
