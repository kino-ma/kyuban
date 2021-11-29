FROM python:3.10.0-alpine3.14

WORKDIR /api

COPY ./requirements.txt .
RUN pip3 install -r requirements.txt

CMD [ "python3", "api.py" ]