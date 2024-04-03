FROM python:3.11-bullseye

RUN pip install --upgrade pip

COPY . /opt/file-service
WORKDIR /opt/file-service
RUN pip install -r requirements.txt

WORKDIR /opt/file-service
CMD ["gunicorn", "-b", "0.0.0.0:8010", "--preload", "-w", "4", "wsgi:app"]

EXPOSE 8010
