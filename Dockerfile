
# ==== CONFIGURE =====
# Use a Node 16 base image
FROM node:16-alpine AS build
# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
COPY . .
# ==== BUILD =====
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci
# Build the app
RUN npm run build

FROM nginx:stable-alpine

WORKDIR /

ARG REACT_APP_API_URL
RUN [ -z "$REACT_APP_API_URL" ] && echo "REACT_APP_API_URL is required" && exit 1 || true
ARG REACT_APP_AUTH0_CLIENT_ID
RUN [ -z "$REACT_APP_AUTH0_CLIENT_ID" ] && echo "REACT_APP_AUTH0_CLIENT_ID is required" && exit 1 || true
ARG REACT_APP_AUTH0_DOMAIN
RUN [ -z "$REACT_APP_AUTH0_DOMAIN" ] && echo "REACT_APP_AUTH0_DOMAIN is required" && exit 1 || true
ARG REACT_APP_AUTH0_AUDIENCE
RUN [ -z "$REACT_APP_AUTH0_AUDIENCE" ] && echo "REACT_APP_AUTH0_AUDIENCE is required" && exit 1 || true

# ENV REACT_APP_API_URL $REACT_APP_API_URL
# ENV REACT_APP_AUTH0_CLIENT_ID $REACT_APP_AUTH0_CLIENT_ID
# ENV REACT_APP_AUTH0_DOMAIN $REACT_APP_AUTH0_DOMAIN
# ENV REACT_APP_AUTH0_AUDIENCE $REACT_APP_AUTH0_AUDIENCE

COPY --from=build /app/build /usr/share/nginx/html

# new
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# ==== RUN =======
# Set the env to "production"
ENV NODE_ENV production
# Expose the port on which the app will be running (3000 is the default that `serve` uses)
EXPOSE 80
# Start the app
CMD ["nginx", "-g", "daemon off;"]
