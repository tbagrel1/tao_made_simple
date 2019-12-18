all: build_frontend run_backend

drm:
	docker rm -f $$(docker ps -aq)

drmi:
	docker rmi -f $$(docker images -aq)

setup_frontend:
	cd ./frontend; grep -v 'url_for' ../backend/src/templates/index.html > src/index.html; npm i && npm update; cd ..

hot_frontend:
	cd ./frontend; grep -v 'url_for' ../backend/src/templates/index.html > src/index.html; npm run hot; cd ..

build_frontend:
	cd ./frontend; npm run build; cd ..

run_backend:
	docker-compose build && docker-compose up -d

