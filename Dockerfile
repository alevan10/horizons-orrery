FROM node:17

COPY tsconfig.json /orrery/
COPY webpack.config.js /orrery/
COPY package.json /orrery/
COPY package-lock.json /orrery/
COPY index.html /orrery/
COPY src/* /orrery/src/

WORKDIR /orrery
RUN npm install
RUN npm run build

CMD ["npm", "run", "start"]