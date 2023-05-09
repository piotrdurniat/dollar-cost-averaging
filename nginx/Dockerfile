# Base on offical NGINX Alpine image
FROM nginx:alpine

# Remove any existing config files
RUN rm /etc/nginx/conf.d/*
# RUN touch /etc/nginx/nginx.conf

# Copy template config files
COPY ./default.conf /etc/nginx/templates/default.conf.template

# Substitute variables in template with values from environment
# and launch NGINX
CMD envsubst '\$FRONTEND_HOST,\$FRONTEND_PORT_SSL' </etc/nginx/templates/default.conf.template >/etc/nginx/nginx.conf && exec nginx -g 'daemon off;'

# Expose the listening port
EXPOSE 80
EXPOSE 443
