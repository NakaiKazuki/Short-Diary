FROM nginx:1.23.4-alpine
RUN rm -f /etc/nginx/conf.d/*
COPY ./nginx.conf /etc/nginx/conf.d/Short-Diary.conf
CMD /usr/sbin/nginx -g 'daemon off;' -c /etc/nginx/nginx.conf

EXPOSE 80