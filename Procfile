web: gunicorn -w 4 -k uvicorn.workers.UvicornWorker app:app
web1: node app/server.js
heroku ps:scale web=1