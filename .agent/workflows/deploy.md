---
description: Deploy the SVG Visualizer to jvibeschool.org/DATASVG/
---

This workflow deploys the project to the Bitnami Apache server.

## Deployment Info
- **Domain**: https://jvibeschool.org
- **Path**: /DATASVG/
- **Server IP**: 15.164.161.165
- **SSH User**: bitnami
- **SSH Key**: ~/.ssh/jvibeschool_org.pem
- **Remote Root**: /opt/bitnami/apache/htdocs/DATASVG/

## Steps

1. Create the remote directory and set permissions
// turbo
ssh -i ~/.ssh/jvibeschool_org.pem bitnami@15.164.161.165 "sudo mkdir -p /opt/bitnami/apache/htdocs/DATASVG && sudo chown bitnami:bitnami /opt/bitnami/apache/htdocs/DATASVG"

2. Upload the files
// turbo
scp -i ~/.ssh/jvibeschool_org.pem index.html styles.css app.js bitnami@15.164.161.165:/opt/bitnami/apache/htdocs/DATASVG/
