FROM node:12.2.0-alpine
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
ENV PORT 80


COPY phonebook_backend/package.json /app/package.json
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent

COPY phonebook_backend/* /app/
#RUN npm run build

# production environment
EXPOSE ${PORT}
CMD ["node", "index.js"]