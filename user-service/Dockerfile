FROM python:3.11-bullseye

RUN --mount=type=secret,id=DB_HOSTNAME \
    export DB_HOSTNAME=$(cat /run/secrets/DB_HOSTNAME)

RUN --mount=type=secret,id=DB_PASSWORD \
    export DB_PASSWORD=$(cat /run/secrets/DB_PASSWORD)

RUN export DB_HOSTNAME="test"

RUN export DB_USER=${DB_USER}
RUN export DB_PORT=${DB_PORT}
RUN export DB_NAME=${DB_NAME}

RUN pip install --upgrade pip

COPY . /opt/user-service
WORKDIR /opt/user-service
RUN pip install -r requirements.txt

WORKDIR /opt/user-service
CMD ["gunicorn", "-b", "0.0.0.0:8000", "--preload", "-w", "4", "wsgi:app"]

EXPOSE 8000

