FROM node:16.9.1-alpine
# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV NODE_ENV development

EXPOSE 9004

CMD ["node", "dist/index.js"]
