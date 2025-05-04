# Use Bun base image (lighter and optimized for Bun apps)
FROM oven/bun:1.0.25

# Set working directory
WORKDIR /app

# Copy everything
COPY . .

# Install dependencies
RUN bun install --production

# Build the SvelteKit app
RUN bun run build

# Expose the Vite preview port
EXPOSE 4173

# Run the preview server and listen on all interfaces
CMD ["bun", "run", "preview", "--", "--host", "0.0.0.0"]
