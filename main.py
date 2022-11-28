import socket

import uvicorn

if __name__ == '__main__':
    hostname = socket.gethostname()
    uvicorn.run(app="app:app", host=hostname, reload=True, workers=4)
