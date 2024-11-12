Link Shortener 
To start 
set in /etc/host 
127.0.0.1  center.ai
(or use 127.0.0.1 as address, in this case docker-compose.yml positions REACT_APP_API_URL and DOMAIN_NAME should be changed )
pull branch and execute:
docker-compose up --build
works on port 80, with backend on 8000 and postgre on 5432