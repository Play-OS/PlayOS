ARG VARIANT=18
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:${VARIANT}
RUN apt-get update
RUN apt-get -y install --no-install-recommends zsh
RUN apt-get -y install binaryen
RUN apt-get -y install python3 python-is-python3
