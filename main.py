import socket

import uvicorn
"""
 * DOCKER_BUILDKIT=0 docker build -t hi-docker . // força o docker a ler o primeiro comando do dockerfile
 * docker image prune -a -f // remove todas as imagens sem necessidade de confirmar e de forma forçada
 * docker ps -a // lista todas as imagens que há no pc
 * docker pull MINHAIMAGEM // baixa a imagem do docker hub
 * docker run -it MINHAIMAHEM // executa a imagem apenas para execução. não baixa permanentemente a imagem.
 * whoami // retorna em qual usuário você está na imagem-so
 * echo // comando que realiza retornos no cmd. ex: echo $0, que retorna onde estou
 * apt list // listar o que está instalado na mimha imagem
 * apt update // sempre que baixar uma imagme, é uma boa prática.
 * docker-compose up --build -d

 *********************VOLUMES****************************
 * docker volume create nome-volume
 * docker volume inspect nome-volume
 * docker run -d -p 3000:3000 --name nome-container -v -nome-volume:/app/dados
 * docker exec -it nome-container sh
 * 
"""
if __name__ == '__main__':
    hostname = socket.gethostname()
    uvicorn.run(app="app:app", host='0.0.0.0', reload=True, workers=4)
