FROM node:12 as react-build
WORKDIR /usr/app
COPY . ./
RUN yarn
RUN yarn build
FROM nginx:alpine
COPY docker.nginx.conf /etc/nginx/nginx.conf
COPY --from=react-build /usr/app/build /usr/share/nginx/html
EXPOSE 5100
CMD ["nginx", "-g", "daemon off;"]