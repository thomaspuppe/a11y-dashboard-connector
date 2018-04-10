FROM node:8-stretch

RUN apt-get update && apt-get -y install libatk-bridge2.0-0 libgtk-3-0

RUN mkdir -p /home/pa11y/app
RUN groupadd -r pa11y && useradd -r -g pa11y -G audio,video pa11y \
    && chown -R pa11y:pa11y /home/pa11y

USER pa11y

WORKDIR /home/pa11y/app
COPY package.json ./
	
RUN npm install --production
COPY index.js ./
RUN mkdir reports
RUN mkdir src
COPY src/reporter.js src
COPY src/main.js src

USER root
RUN apt-get -y install libnss3 curl xvfb chromium
USER pa11y

CMD [ "npm", "start" ]
