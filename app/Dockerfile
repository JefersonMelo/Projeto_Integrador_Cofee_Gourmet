FROM node:14.15-alpine as react
WORKDIR /app
COPY package.json .
RUN npm install --force
RUN npm build
COPY . .

EXPOSE 3000

CMD ["npm", "start"]
