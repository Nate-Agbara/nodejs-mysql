# FROM node:18-alpine

# COPY package-lock.json package.json ./
# RUN npm install

# CMD ["npm", "run", "dev"]

FROM node:18.14.0 as base-image

# RUN apt-get -y update
# RUN apt-get -y upgrade
# RUN npm install -g npm@7

# RUN apt-get -y install qpdf ghostscript

# # Dependecies to build imagemin-mozjpeg package
# RUN apt-get -y install libpng-dev gcc autoconf automake make g++ libtool nasm

USER node

RUN mkdir -p /home/node/src/app/
RUN mkdir -p /home/node/src/app/node_modules
RUN mkdir -p /home/node/src/app/dist

WORKDIR /home/node/src/app/

COPY --chown=node:node package.json package-lock.json ./

RUN npm install --no-audit --quiet

COPY --chown=node:node . .

FROM base-image as builder

RUN npm run

VOLUME /home/node/src/app/node_modules
VOLUME /home/node/src/app/dist

EXPOSE 3000
# EXPOSE 9092
# EXPOSE 3310

CMD ["sh", "start.sh"]
