FROM nginx:latest
COPY ./default-dev.conf /etc/nginx/conf.d/default.conf
# COPY ./proxy/default-prd.conf /etc/nginx/conf.d/default.conf
