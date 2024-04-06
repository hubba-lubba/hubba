FROM python:3.11-bullseye

ARG VERSION
ENV VERSION $VERSION

COPY . /opt/seeder
WORKDIR /opt/seeder

RUN pip install --upgrade pip

CMD ["python3", "-u", "seeder.py"]
