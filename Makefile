TESTS = $(shell find test -type f -name "*test.js")

test:
	./node_modules/.bin/mocha 	$(TESTS)
publish:
	npm publish

.PHONY:  test  publish 

