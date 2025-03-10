# Use Node.js version 18.20.7 as the base image
FROM node:18.20.7

# Update package lists and install dependencies for building native modules
# - build-essential: Includes tools like gcc, g++ for compiling C++ code
# - python3: Required by some native modules (e.g., bcrypt) for building
# Clean up apt cache to reduce image size
RUN apt-get update && apt-get install -y \
    build-essential \
    libssl-dev \
    python3 \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory inside the container to /app
WORKDIR /app

# Copy package.json to the working directory
COPY package.json ./

# Install bcrypt explicitly with source build to ensure compatibility
# Then install all other dependencies from package.json
# --build-from-source: Forces bcrypt to compile from source
# --verbose: Shows detailed output for debugging if needed
RUN npm install bcrypt@5.1.1 --build-from-source --verbose && npm install

# Copy the entire project directory into the container
COPY . .

# Define the command to start the application
# "npm start" runs the "start" script from package.json (node server.js)
CMD ["npm", "start"]