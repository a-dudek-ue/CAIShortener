# server/Dockerfile

FROM python:3.10.2

WORKDIR /app

# Copy the requirements file into the container
COPY ./requirements.txt .

# Install dependencies
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy the current directory contents into the container
COPY . .

# Set environment variable for Django
# ENV DJANGO_SETTINGS_MODULE=myproject.settings
ENV SHORT_LINK_LENGTH=8

ENV DJANGO_SUPERUSER_USERNAME=andrzej
ENV DJANGO_SUPERUSER_EMAIL=alphablondy2007@gmail.com
ENV DJANGO_SUPERUSER_PASSWORD=(admin123)

COPY wait-for-db.sh /wait-for-db.sh
RUN chmod +x /wait-for-db.sh

# Run migrations and create superuser
#RUN python manage.py makemigrations --noinput && \
#    python manage.py migrate --noinput && \
#    python manage.py createsuperuser --noinput
#CMD ["sh", "-c", "python manage.py migrate --noinput"]
#CMD ["sh", "-c", "python manage.py createsuperuser --noinput"]

# Run migrations and start Django server
EXPOSE 8000
CMD ["sh", "-c", "python manage.py makemigrations --noinput && python manage.py migrate  --noinput && (python manage.py createsuperuser --noinput || echo 'superuser exists')&& python manage.py runserver 0.0.0.0:8000"]
