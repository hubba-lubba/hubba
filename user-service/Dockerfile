FROM python:3.11-bullseye

RUN pip install --upgrade pip

COPY ./user-service /opt/user-service
WORKDIR /opt/user-service
RUN pip install -r requirements.txt

WORKDIR /opt/user-service
CMD ["gunicorn", "-b", "0.0.0.0:8000", "--preload", "-w", "4", "wsgi:app"]

EXPOSE 8000

