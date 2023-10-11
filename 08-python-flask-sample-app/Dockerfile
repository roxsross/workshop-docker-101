FROM python:3.11-alpine

ENV FLASK_APP=flaskr
ENV FLASK_ENV=development

WORKDIR /app
COPY . /app

RUN pip install -r requirements.txt \
    && flask init-db

EXPOSE 5000

CMD [ "flask", "run", "--host=0.0.0.0" ]