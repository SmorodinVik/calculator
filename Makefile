install:
	npm install
lint:
	npx eslint ./src
build:
	rm -rf dist
	NODE_ENV=production npm run build
develop:
	npx webpack serve
