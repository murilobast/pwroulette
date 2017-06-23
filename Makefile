DEPLOY_ENVIROMENT ?= staging
APP_NAME ?= www.iq360.com.br
PORT ?= 3000

clean:
	rm -rf node_modules
	rm -rf dist
	rm -rf yarn.lock
 
build-pkg-docker: clean 
	mkdir -p dist
	rsync -av --exclude="release.sh" --exclude=".git" --exclude="README.md" --exclude="deploy" --exclude=".gitignore" --exclude="yarn.lock" --exclude=".vscode" --exclude='dist' --exclude='Makefile' --exclude='Dockerfile' --exclude='Dockerrun.aws.json' . ./dist/

build-local-docker: build-pkg-docker
	docker build -t ${APP_NAME}:latest --force-rm .
	make clean

run-docker-local: build-local-docker
	docker run -p ${PORT}:8080 -d --rm --name ${APP_NAME} ${APP_NAME}
	echo 'Application running on the port ${PORT}'

stop-docker-local:
	docker stop ${APP_NAME}