FROM node:17.9

COPY . /orrery/

WORKDIR /orrery
RUN npm install
RUN npm run build

CMD ["npm", "run", "start"]