# Step 1: Build the Angular app
FROM node:18-alpine AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# Step 2: Serve with nginx
FROM nginx:alpine
COPY --from=build /app/dist/login-page-app /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
