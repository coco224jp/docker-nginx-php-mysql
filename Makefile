### Makefile for install of develepment environment
#
# install command
# > make install

.PHONY: install
install:
	@make npm_install

npm_install:./package.json
	@echo "Now installing node modules. Please wait.." && \
	npm install
	@make setup_gitignore

setup_gitignore: ./.gitignore
	@sed -e "s/#.env/.env/g;" ./.gitignore > ./.gitignore.master && \
	mv .gitignore.master .gitignore
	@make git_init

git_init:
	@git init && git add -A && git commit --allow-empty -m 'Initial commit'