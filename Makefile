.PHONY: build-dev run-local

REPO=horizons-orrery

build-dev:
	docker build . -f Dockerfile -t $(REPO):dev

run-local: build-dev
	docker run -rm -p 8080:8080 $(REPO):dev

