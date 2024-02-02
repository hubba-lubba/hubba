FROM python:3.11-bullseye

ARG DB_HOSTNAME
ENV DB_HOSTNAME $DB_HOSTNAME

ARG DB_PASSWORD
ENV DB_PASSWORD $DB_PASSWORD

ARG DB_USER
ENV DB_USER $DB_USER

ARG DB_PORT
ENV DB_PORT 5432

ARG DB_NAME
ENV DB_NAME $DB_NAME

RUN pip install --upgrade pip

COPY . /opt/user-service
WORKDIR /opt/user-service
RUN pip install -r requirements.txt

WORKDIR /opt/user-service
CMD ["gunicorn", "-b", "0.0.0.0:8000", "--preload", "-w", "4", "wsgi:app"]

EXPOSE 8000

