FROM nginx:latest
EXPOSE 8080
COPY ./default-dev.conf /etc/nginx/conf.d/default.conf
# COPY ./proxy/default-prd.conf /etc/nginx/conf.d/default.conf