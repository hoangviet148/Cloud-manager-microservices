FROM node:14-stretch-slim as build
WORKDIR /app
COPY . /app
RUN npm install 
EXPOSE 3000
CMD [ "npm", "start" ]
# && npm run build

# FROM nginx:latest
# COPY --from=build /app/build /usr/share/nginx/html