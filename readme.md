Link Shortener 
To start 
set in /etc/host 
127.0.0.1  center.ai
(or use 127.0.0.1 as address, in this case in docker-compose.yml REACT_APP_API_URL 
and in .\server\.env DOMAIN_NAME should be changed )
pull branch and execute:
docker-compose up --build
works on port 80, with backend on 8000 and postgre on 5432


###########
If the client should run on port 3000: 
the foloowing changes should be aplied in docker-compose.yml 
line 58:       - "80:80" to "3000:3000"
and .client/package-json
  "scripts": {
    "start": "PORT=80 react-scripts start",
to 
  "scripts": {
    "start": "PORT=3000 react-scripts start",

#############
Sometimes token should be regenerated. In this case client reports internal error but also removes token from local storage and regenerates it with next call 