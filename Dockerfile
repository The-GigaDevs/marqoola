# ==== CONFIGURE =====
# Use a Node 16 base image
FROM node:current-alpine3.18 AS build
# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
COPY . .

ENV NODE_ENV production

# ==== BUILD =====
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci
# Build the app
RUN npm run build

FROM nginx:stable-alpine

WORKDIR /
RUN apk add --no-cache bash




COPY --from=build /app/build /usr/share/nginx/html

# new
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./create-env-file.sh /usr/share/nginx/html
# Add bash
RUN chmod +x /usr/share/nginx/html/create-env-file.sh
# ==== RUN =======
# Set the env to "production"
ENV NODE_ENV production
# Expose the port on which the app will be running (3000 is the default that `serve` uses)
EXPOSE 80
# Start the app
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/create-env-file.sh && nginx -g \"daemon off;\""]
