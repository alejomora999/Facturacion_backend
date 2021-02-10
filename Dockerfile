FROM node:12-slim
RUN apt update -y
RUN apt install -y libaio1
RUN apt autoremove -y
ADD . /app/
WORKDIR /app/Backend
RUN npm install
EXPOSE 8080
CMD npm run prod