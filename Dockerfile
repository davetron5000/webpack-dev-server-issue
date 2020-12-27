FROM amd64/ubuntu:20.10

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update -q && apt-get install -qy \
                            autoconf\
                            bison\
                            build-essential\
                            curl \
                            g++ \
                            gcc \
                            git \
                            gnupg2 \
                            libffi-dev \
                            libgconf-2-4 \
                            libgdbm-dev \
                            libncurses5-dev \
                            libpq-dev \
                            libreadline-dev \
                            libsqlite3-dev \
                            libssl-dev \
                            libxi6 \
                            libyaml-dev \
                            make \
                            man \
                            netcat \
                            rsync \
                            software-properties-common\
                            sqlite3 \
                            tzdata \
                            wget \
                            xvfb \
                            zip \
                            zlib1g-dev

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs

RUN mkdir /usr/dependencies-cache && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && apt update && apt install -y yarn && yarn config set cache-folder /usr/dependencies-cache/yarn

RUN apt-get -y update && \
    apt-get install locales && locale -a && \
    locale-gen en_US.UTF-8 && locale -a && \
    update-locale LANG=en_US.utf8 && \
    dpkg-reconfigure locales

ENV LANG=en_US.utf8

RUN curl -sS -o - https://dl-ssl.google.com/linux/linux_signing_key.pub | \
    apt-key add - && \
    echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" | \
    tee  /etc/apt/sources.list.d/google-chrome.list && \
    apt-get -y update && \
    apt-get -y install google-chrome-stable && \
    wget https://chromedriver.storage.googleapis.com/86.0.4240.22/chromedriver_linux64.zip && \
    unzip chromedriver_linux64.zip && \
    mv chromedriver /usr/bin/chromedriver && \
    chown root:root /usr/bin/chromedriver && \
    chmod +x /usr/bin/chromedriver

VOLUME /usr/dependencies-cache

WORKDIR /root/work

COPY app app/

EXPOSE 3000
