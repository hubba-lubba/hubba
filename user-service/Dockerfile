FROM python:3.11-bullseye

RUN --mount=type=secret,id=DB_HOSTNAME \
    cat /run/secrets/DB_HOSTNAME

RUN --mount=type=secret,id=DB_PASSWORD \
    cat /run/secrets/DB_PASSWORD

ENV DB_USER=${DB_USER}
ENV DB_PORT=${DB_PORT}
ENV DB_NAME=${DB_NAME}
ENV DB_HOSTNAME=$(cat /run/secrets/DB_HOSTNAME)
ENV DB_PASSWORD=$(cat /run/secrets/DB_PASSWORD)

RUN pip install --upgrade pip

COPY . /opt/user-service
WORKDIR /opt/user-service
RUN pip install -r requirements.txt

WORKDIR /opt/user-service
CMD ["gunicorn", "-b", "0.0.0.0:8000", "--preload", "-w", "4", "wsgi:app"]

EXPOSE 8000

