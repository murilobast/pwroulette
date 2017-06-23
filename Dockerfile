FROM node:6.10

RUN apt-get update -y

RUN apt-get install -y openssh-server ca-certificates git-core ssh 

RUN mkdir -p /opt/app
RUN mkdir -p /var/log/rvbr/

WORKDIR /opt/app
COPY ./dist /opt/app

RUN yarn 
RUN yarn bundle
RUN yarn bundle:server

EXPOSE 8080

WORKDIR /opt/app/

CMD node server