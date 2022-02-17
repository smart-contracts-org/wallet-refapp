SDK_VERSION := $(shell grep 'sdk-version' daml.yaml | cut -d ' ' -f 2)
MODELS_DAR=target/bond-issuance.dar

.PHONY: build
build: build-dars

#Dars

.PHONY: build-dars
build-dars:
	daml build

.PHONY: test-dars
test-dars: build-dars
	daml test 