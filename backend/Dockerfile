FROM node:12-alpine3.9 as base
WORKDIR /app
COPY package.json .

# ---- Dependencies ----
FROM base AS dependencies
# install ALL node_modules, including 'devDependencies'
RUN yarn install
COPY . .
RUN yarn build

# ---- Test ----
FROM dependencies AS test
# Run unit tests
RUN yarn test

# ---- Release ----
FROM base AS release
# copy production node_modules
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/dist ./dist
COPY . .
EXPOSE $PORT
CMD node dist/main