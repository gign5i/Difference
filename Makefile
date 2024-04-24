install:
	npm ci

gindiff:
	node bin/gindiff.js

lint:
	npx eslint .

test:
	NODE_OPTIONS=--experimental-vm-modules npx jest

test-coverage:
	npm test -- --coverage