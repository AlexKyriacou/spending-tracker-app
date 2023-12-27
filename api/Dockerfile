FROM python:3.12

ARG DB_NAME
ARG DB_USER
ARG DB_PASSWORD
ARG DB_PORT
ARG DB_HOST
ARG DJANGO_KEY

# Set environment variables for Python
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Environment variables for Postgres
ENV DB_NAME=${DB_NAME} \
    DB_USER=${DB_USER} \
    DB_PASSWORD=${DB_PASSWORD} \
    DB_PORT=${DB_PORT} \
    DB_HOST=${DB_HOST} \
    DJANGO_KEY=${DJANGO_KEY}

WORKDIR /usr/src/app

COPY requirements.txt .

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000
