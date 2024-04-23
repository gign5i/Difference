install:
	npm ci

gindiff:
	node bin/gindiff.js

make lint:
	npx eslint .

make test:
	NODE_OPTIONS=--experimental-vm-modules npx jest