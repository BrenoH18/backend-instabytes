#!/bin/bash

# Este script tem como objetivo automatizar o processo de deploy de uma aplicação Node.js
# para o ambiente de produção no Google Cloud Platform. As etapas incluem:
#   1. Construir a imagem do Docker da aplicação.
#   2. Enviar a imagem para o Google Container Registry.
#   3. Atualizar o deployment no Cloud Run.

gcloud services enable run.googleapis.com # Habilita o serviço Cloud Run para executar containers sem servidor
gcloud services enable cloudbuild.googleapis.com # Habilita o serviço Cloud Build para automatizar builds
gcloud services enable artifactregistry.googleapis.com # Habilita o serviço Artifact Registry para gerenciar pacotes de software