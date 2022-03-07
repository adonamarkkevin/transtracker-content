docker stop content-management
docker rm content-management
docker rmi transtracker

docker build -t transtracker .
docker run -d -p 9004:9004 --name content-management transtracker
docker image prune -f