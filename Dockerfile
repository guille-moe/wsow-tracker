FROM node:19-alpine

RUN apk add --no-cache git

RUN mkdir -p /web/
WORKDIR /web

COPY custom-entrypoint.sh /usr/local/bin/
ENTRYPOINT ["custom-entrypoint.sh"]

CMD sh
