FROM node:12.2.0-alpine

ENV PATH /app/node_modules/.bin:$PATH
ENV PORT 80


COPY backend/package.json /app/package.json
WORKDIR /app
RUN npm install --silent  --production
RUN npm install react-scripts@3.0.1 -g --silent

# Copy the backend
COPY backend/* /app/

# Build the frontend
WORKDIR /frontend
COPY frontend/package.json /frontend/package.json
RUN npm install --silent --production

COPY frontend/ /frontend/

RUN npm run build
RUN mv /frontend/build /app/

WORKDIR /app
RUN rm -rf /frontend

# production environment
EXPOSE ${PORT}
CMD ["node", "index.js"]
