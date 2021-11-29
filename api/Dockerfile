FROM python:3.10.0-buster

WORKDIR /api

COPY ./requirements.txt .
RUN pip3 install -r requirements.txt

CMD [ "python3", "api.py" ]