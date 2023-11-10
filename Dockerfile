#node block

FROM node:alpine3.18 as nodework
WORKDIR /usr/src/app
COPY package.json package*.json ./
RUN npm install
COPY . .
RUN npm run build


#nginx block

FROM nginx:1.25-alpine
WORKDIR /usr/share/nginx/html 
COPY --from=nodework /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT [ "nginx","-g","daemon off;" ]



# create >> cmd docker build -t reactapp . // reactapp is name of image
# run >> docker run --name reactContainer -d -p 3000:80 reactapp // reactContainer name of container,reactapp name of image
