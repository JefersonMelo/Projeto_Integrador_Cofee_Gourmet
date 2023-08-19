FROM python:3.11
WORKDIR /app
RUN apt clean
ENV DEBIAN_FRONTEND noninteractive
ENV ACCEPT_EULA=Y

RUN apt-get update
RUN DEBIAN_FRONTEND="noninteractive" apt-get -y install tzdata
ENV TZ=BRAZIL/East
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN apt-get autoremove && apt-get clean && apt-get autoclean

RUN apt-get update --fix-missing -y && apt-get update && apt-get install -y --no-install-recommends curl gcc g++ gnupg

RUN apt-get install --reinstall build-essential -y

RUN apt-get install -y apt-transport-https

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

RUN apt-get -y clean

COPY . .

#CMD ["uvicorn", "app:app", "--worker-class", "uvicorn.workers.UvicornWorker", "--host", "0.0.0.0", "--port", "8999", "--workers", "4", "--timeout", "700"]
CMD ["gunicorn", "app:app", "--worker-class", "uvicorn.workers.UvicornWorker", "--host", "0.0.0.0", "--port", "8999", "--workers", "4", "--timeout", "700"]