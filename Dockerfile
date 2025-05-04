# Use official Node image
FROM node:20

# Create app directory
WORKDIR /app

# Install bun
RUN curl -fsSL https://bun.sh/install | bash && \
    mv /root/.bun/bin/bun /usr/local/bin/bun

# Copy project files
COPY . .

# Install dependencies
RUN bun install

# Build the SvelteKit app
RUN bun run build

# Expose Vite preview port
EXPOSE 4173

# Run preview server
CMD ["bun", "run", "preview", "--", "--host", "0.0.0.0"]
