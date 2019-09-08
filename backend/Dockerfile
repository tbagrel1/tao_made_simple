FROM python:3.7

RUN apt update && apt -y upgrade
RUN apt install libpq-dev

RUN mkdir -p /usr/src/tao_made_simple
WORKDIR /usr/src/tao_made_simple

COPY requirements.txt ./
RUN pip3 install -r requirements.txt

COPY src ./src/
COPY env.env ./

ENV FLASK_APP /usr/src/tao_made_simple/src
ENV FLASK_ENV development

CMD ["python3", "-m", "flask", "run", "--host=0.0.0.0", "--port=80"]

EXPOSE 80
