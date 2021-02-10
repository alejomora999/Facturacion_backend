FROM node:12-slim
RUN apt update -y
RUN apt install -y libaio1
RUN apt-get install sendemail -y
RUN apt autoremove -y
RUN apt-get install libnet-ssleay-perl -y
RUN apt-get install libio-socket-ssl-perl -y
ADD . /app/
WORKDIR /app/Backend
RUN npm install
EXPOSE 8080
EXPOSE 587
EXPOSE 25
CMD npm run prod