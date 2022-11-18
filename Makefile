deno := docker run -it --rm --init -v $$PWD:/app -w /app denoland/deno:1.10.3
data_dir := data

.PHONY: start
start:
	docker run --rm -d -p 8080:8080 --name presto ahanaio/prestodb-sandbox

.PHONY: import
import: $(data_dir)/import.sql
	docker run --rm -it \
		-v "$(abspath $<):/root/$(<F)" \
		--entrypoint presto-cli \
		ahanaio/prestodb-sandbox \
			--file "/root/$(<F)" --server host.docker.internal:8080 --catalog memory --schema default

$(data_dir)/import.sql: $(data_dir)/output.json
	$(deno) run --allow-read to-sql.ts $< > $@

.PHONY: start-cli
start-cli:
	docker exec -it presto presto-cli --catalog memory --schema default

.PHONY: test
test:
	$(deno) test --allow-read
