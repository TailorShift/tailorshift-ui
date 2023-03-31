# Install the application dependencies in a full UBI Node docker image
FROM registry.access.redhat.com/ubi8/nodejs-16:latest

ARG PROXY_HOST_URL=http://20.254.120.86:9090
ARG SHOP_ID=1

ENV PROXY_HOST_URL=${PROXY_HOST_URL}
ENV SHOP_ID=${SHOP_ID}

# Copy package.json and package-lock.json
COPY ./package*.json ./

# Add app
COPY . ./
USER root
RUN npm install && npm run build


#######################


# Copy the dependencies into a minimal Node.js image
FROM registry.access.redhat.com/ubi8/nodejs-16-minimal:latest

RUN npm install serve

COPY --from=0 /opt/app-root/src/dist  dist
COPY --from=0 /opt/app-root/src/package*.json  ./

ENV NODE_ENV production
ENV PORT 8080
EXPOSE 8080

CMD ["./node_modules/.bin/serve",  "dist"]

