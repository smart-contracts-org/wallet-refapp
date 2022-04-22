SDK_VERSION := $(shell grep 'sdk-version' daml.yaml | cut -d ' ' -f 2)

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

.PHONY: sandbox
sandbox:
	daml sandbox --ledgerid wallet-refapp-sandbox main/Asset/asset.dar main/User/user.dar main/Account/account.dar

.PHONY: server
server:
	daml json-api --ledger-host localhost --ledger-port 6865 --http-port 7575

.PHONY: everything
everything:
	make build
	make codegen



