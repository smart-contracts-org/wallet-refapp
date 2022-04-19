SDK_VERSION := $(shell grep 'sdk-version' daml.yaml | cut -d ' ' -f 2)
MODELS_DAR=target/bond-issuance.dar

.PHONY: build
build: build-dars

#Dars

.PHONY: build-dars
build-dars:
	./build.sh

.PHONY: test
test:
	# Remove later
	cd main/Tests && daml test
	cd ..
	cd main/Account && daml test
	cd ..
	cd main/Asset && daml test

.PHONY: clean
clean: 
	./clean.sh

.PHONY: codegen
codegen:
	./codegen.sh