FROM denoland/deno:1.37.2

# Set the working directory in the container
WORKDIR /app

# Copy your Deno application source code into the container
COPY . .

# Expose a port for your Deno application to listen on (e.g., 8080)
EXPOSE 8088

# Define the command to run your Deno application
CMD ["deno", "run", "--allow-net", "server.ts"]