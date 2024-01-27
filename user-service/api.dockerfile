FROM python:3.11-bullseye

RUN pip install --upgrade pip

COPY ./api /opt/api
WORKDIR /opt/api
RUN pip install -r requirements.txt

WORKDIR /opt/api
CMD ["gunicorn", "-b", "0.0.0.0:8000", "--preload", "-w", "4", "wsgi:app"]

EXPOSE 8000

