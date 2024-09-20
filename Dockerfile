# Step 1: Build the Angular app
FROM node:16-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --prod

# Step 2: Create a lightweight Nginx server for the production build
FROM nginx:alpine

COPY --from=build /app/dist/lil-gallery-frontend /usr/share/nginx/html

# Copy custom Nginx configuration (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to serve the Angular app
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
