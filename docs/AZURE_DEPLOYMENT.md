# Azure Deployment Guide

Complete guide for deploying the Three Kingdoms Digital Platform to Microsoft Azure.

## Overview

This document outlines the Azure infrastructure required to complete **Phase 1 - Foundation** and deploy the application to production.

**Current Status**: Phase 1 at 95% - Azure infrastructure pending

## Prerequisites

### Azure Account Requirements

- **Azure Subscription** with appropriate permissions
- **Resource Group** creation rights
- **Billing** configured and verified
- **Service Principals** for CI/CD automation

### Local Development Tools

```bash
# Azure CLI
brew install azure-cli  # macOS
# or download from https://aka.ms/installazurecliwindows

# Login to Azure
az login

# Set subscription
az account set --subscription "<subscription-id>"
```

### GitHub Secrets Required

The following secrets must be configured in GitHub repository settings for CI/CD:

- `AZURE_CREDENTIALS` - Service principal credentials (JSON)
- `AZURE_SUBSCRIPTION_ID` - Azure subscription ID
- `AZURE_WEBAPP_NAME` - App Service name for web frontend
- `AZURE_API_NAME` - App Service name for API backend
- `AZURE_DATABASE_URL` - PostgreSQL connection string
- `AZURE_REDIS_URL` - Redis connection string (optional)
- `AZURE_STORAGE_CONNECTION_STRING` - Blob Storage connection string

---

## Azure Resources Required

### 1. Resource Group

Container for all Azure resources.

```bash
# Create resource group
az group create \
  --name three-kingdoms-rg \
  --location eastus

# Estimated cost: Free
```

### 2. Azure Database for PostgreSQL

**Recommended**: Flexible Server (cost-effective, modern)

```bash
# Create PostgreSQL Flexible Server
az postgres flexible-server create \
  --resource-group three-kingdoms-rg \
  --name three-kingdoms-db \
  --location eastus \
  --admin-user dbadmin \
  --admin-password <secure-password> \
  --sku-name Standard_B1ms \
  --tier Burstable \
  --storage-size 32 \
  --version 16 \
  --public-access 0.0.0.0 \
  --high-availability Disabled \
  --backup-retention 7

# Create database
az postgres flexible-server db create \
  --resource-group three-kingdoms-rg \
  --server-name three-kingdoms-db \
  --database-name threekingdoms

# Get connection string
az postgres flexible-server show-connection-string \
  --server-name three-kingdoms-db
```

**Configuration**:
- **SKU**: Standard_B1ms (1 vCore, 2GB RAM) - ~$12/month
- **Storage**: 32GB - included
- **Backup retention**: 7 days
- **High availability**: Disabled (enable for production)
- **Version**: PostgreSQL 16

**Connection String Format**:
```
postgresql://dbadmin:<password>@three-kingdoms-db.postgres.database.azure.com:5432/threekingdoms?sslmode=require
```

### 3. Azure Cache for Redis (Optional)

For caching GraphQL queries and session data.

```bash
# Create Redis cache
az redis create \
  --resource-group three-kingdoms-rg \
  --name three-kingdoms-cache \
  --location eastus \
  --sku Basic \
  --vm-size c0

# Get access keys
az redis list-keys \
  --resource-group three-kingdoms-rg \
  --name three-kingdoms-cache
```

**Configuration**:
- **SKU**: Basic C0 (250MB) - ~$16/month
- **Version**: Latest (6.x or 7.x)

**Connection String**:
```
redis://three-kingdoms-cache.redis.cache.windows.net:6380?password=<access-key>&ssl=true
```

### 4. Azure Blob Storage

For storing static assets, images, and media files.

```bash
# Create storage account
az storage account create \
  --name threekingdomsstorage \
  --resource-group three-kingdoms-rg \
  --location eastus \
  --sku Standard_LRS \
  --kind StorageV2

# Create containers
az storage container create \
  --name images \
  --account-name threekingdomsstorage \
  --public-access blob

az storage container create \
  --name documents \
  --account-name threekingdomsstorage \
  --public-access blob

# Get connection string
az storage account show-connection-string \
  --name threekingdomsstorage \
  --resource-group three-kingdoms-rg
```

**Configuration**:
- **Replication**: LRS (Locally Redundant Storage)
- **Performance**: Standard
- **Containers**:
  - `images` - Character portraits, maps, artwork
  - `documents` - PDF files, research papers
  - `media` - Videos, audio files (future)

**Estimated cost**: ~$2/month for 10GB

### 5. Azure CDN

For delivering static assets with low latency globally.

```bash
# Create CDN profile
az cdn profile create \
  --resource-group three-kingdoms-rg \
  --name three-kingdoms-cdn \
  --sku Standard_Microsoft

# Create CDN endpoint
az cdn endpoint create \
  --resource-group three-kingdoms-rg \
  --profile-name three-kingdoms-cdn \
  --name three-kingdoms \
  --origin threekingdomsstorage.blob.core.windows.net \
  --origin-host-header threekingdomsstorage.blob.core.windows.net
```

**Configuration**:
- **SKU**: Standard_Microsoft
- **Origin**: Azure Blob Storage
- **Caching**: Enabled
- **Compression**: Enabled (gzip)

**CDN Endpoint**: `https://three-kingdoms.azureedge.net/`

**Estimated cost**: ~$10/month (depending on traffic)

### 6. App Service Plan

Hosting plan for web and API applications.

```bash
# Create App Service Plan
az appservice plan create \
  --name three-kingdoms-plan \
  --resource-group three-kingdoms-rg \
  --location eastus \
  --is-linux \
  --sku B1

# Upgrade to production tier when ready
# az appservice plan update --name three-kingdoms-plan --resource-group three-kingdoms-rg --sku P1V2
```

**Configuration**:
- **Development**: B1 (1 Core, 1.75GB RAM) - ~$13/month
- **Production**: P1V2 (1 Core, 3.5GB RAM) - ~$75/month
- **OS**: Linux (for Docker container support)

### 7. App Service - API Backend

```bash
# Create web app for API
az webapp create \
  --resource-group three-kingdoms-rg \
  --plan three-kingdoms-plan \
  --name three-kingdoms-api \
  --deployment-container-image-name threekingdoms/api:latest \
  --docker-registry-server-url https://index.docker.io/v1/

# Configure environment variables
az webapp config appsettings set \
  --resource-group three-kingdoms-rg \
  --name three-kingdoms-api \
  --settings \
    NODE_ENV=production \
    DATABASE_URL=<postgres-connection-string> \
    REDIS_URL=<redis-connection-string> \
    PORT=8080 \
    CORS_ORIGIN=https://three-kingdoms-web.azurewebsites.net

# Enable logging
az webapp log config \
  --resource-group three-kingdoms-rg \
  --name three-kingdoms-api \
  --docker-container-logging filesystem \
  --level information
```

**URL**: `https://three-kingdoms-api.azurewebsites.net`

### 8. App Service - Web Frontend

```bash
# Create web app for frontend
az webapp create \
  --resource-group three-kingdoms-rg \
  --plan three-kingdoms-plan \
  --name three-kingdoms-web \
  --deployment-container-image-name threekingdoms/web:latest \
  --docker-registry-server-url https://index.docker.io/v1/

# Configure environment variables
az webapp config appsettings set \
  --resource-group three-kingdoms-rg \
  --name three-kingdoms-web \
  --settings \
    VITE_API_URL=https://three-kingdoms-api.azurewebsites.net/graphql \
    VITE_CDN_URL=https://three-kingdoms.azureedge.net

# Enable logging
az webapp log config \
  --resource-group three-kingdoms-rg \
  --name three-kingdoms-web \
  --docker-container-logging filesystem \
  --level information
```

**URL**: `https://three-kingdoms-web.azurewebsites.net`

### 9. Azure Cognitive Search (Optional - Phase 4)

For advanced full-text search capabilities.

```bash
# Create search service
az search service create \
  --name three-kingdoms-search \
  --resource-group three-kingdoms-rg \
  --sku basic \
  --location eastus
```

**Configuration**:
- **SKU**: Basic - ~$75/month
- **Features**: Full-text search, faceting, autocomplete
- **Defer until**: Phase 4 (Multi-Source System)

---

## Cost Estimation

### Development Environment

| Service | SKU | Monthly Cost (USD) |
|---------|-----|-------------------|
| PostgreSQL Flexible Server | B1ms | $12 |
| Redis Cache | Basic C0 | $16 |
| Blob Storage | Standard LRS | $2 |
| CDN | Standard | $10 |
| App Service Plan | B1 | $13 |
| **Total** | | **~$53/month** |

### Production Environment (Recommended)

| Service | SKU | Monthly Cost (USD) |
|---------|-----|-------------------|
| PostgreSQL Flexible Server | D2s_v3 | $150 |
| Redis Cache | Standard C1 | $75 |
| Blob Storage | Standard GRS | $5 |
| CDN | Standard | $50 |
| App Service Plan | P1V2 x2 | $150 |
| Cognitive Search | Basic | $75 |
| **Total** | | **~$505/month** |

---

## GitHub Actions CI/CD Pipeline

### Workflow File

Create `.github/workflows/deploy-azure.yml`:

```yaml
name: Deploy to Azure

on:
  push:
    branches: [main]
  workflow_dispatch:

env:
  AZURE_WEBAPP_NAME_API: three-kingdoms-api
  AZURE_WEBAPP_NAME_WEB: three-kingdoms-web

jobs:
  build-and-deploy-api:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Log in to Azure
        uses: azure/login@v1
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS }}

      - name: Build API Docker image
        run: |
          docker build -t ${{ secrets.AZURE_CONTAINER_REGISTRY }}/api:${{ github.sha }} -f apps/api/Dockerfile .
          docker tag ${{ secrets.AZURE_CONTAINER_REGISTRY }}/api:${{ github.sha }} ${{ secrets.AZURE_CONTAINER_REGISTRY }}/api:latest

      - name: Push to Azure Container Registry
        run: |
          az acr login --name ${{ secrets.AZURE_CONTAINER_REGISTRY }}
          docker push ${{ secrets.AZURE_CONTAINER_REGISTRY }}/api:${{ github.sha }}
          docker push ${{ secrets.AZURE_CONTAINER_REGISTRY }}/api:latest

      - name: Deploy to Azure Web App
        uses: azure/webapps-deploy@v2
        with:
          app-name: ${{ env.AZURE_WEBAPP_NAME_API }}
          images: ${{ secrets.AZURE_CONTAINER_REGISTRY }}/api:${{ github.sha }}

      - name: Run database migrations
        run: |
          az webapp ssh --name ${{ env.AZURE_WEBAPP_NAME_API }} --resource-group three-kingdoms-rg --command "npx prisma migrate deploy"

  build-and-deploy-web:
    runs-on: ubuntu-latest
    needs: build-and-deploy-api
    steps:
      - uses: actions/checkout@v3

      - name: Log in to Azure
        uses: azure/login@v1
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS }}

      - name: Build Web Docker image
        run: |
          docker build -t ${{ secrets.AZURE_CONTAINER_REGISTRY }}/web:${{ github.sha }} -f apps/web/Dockerfile .
          docker tag ${{ secrets.AZURE_CONTAINER_REGISTRY }}/web:${{ github.sha }} ${{ secrets.AZURE_CONTAINER_REGISTRY }}/web:latest

      - name: Push to Azure Container Registry
        run: |
          az acr login --name ${{ secrets.AZURE_CONTAINER_REGISTRY }}
          docker push ${{ secrets.AZURE_CONTAINER_REGISTRY }}/web:${{ github.sha }}
          docker push ${{ secrets.AZURE_CONTAINER_REGISTRY }}/web:latest

      - name: Deploy to Azure Web App
        uses: azure/webapps-deploy@v2
        with:
          app-name: ${{ env.AZURE_WEBAPP_NAME_WEB }}
          images: ${{ secrets.AZURE_CONTAINER_REGISTRY }}/web:${{ github.sha }}
```

### Service Principal Setup

```bash
# Create service principal for GitHub Actions
az ad sp create-for-rbac \
  --name "three-kingdoms-github" \
  --role contributor \
  --scopes /subscriptions/<subscription-id>/resourceGroups/three-kingdoms-rg \
  --sdk-auth

# Copy JSON output to GitHub secret AZURE_CREDENTIALS
```

---

## Deployment Checklist

### Phase 1: Infrastructure Setup

- [ ] Create Azure subscription and billing
- [ ] Install Azure CLI locally
- [ ] Create resource group
- [ ] Provision PostgreSQL database
- [ ] Provision Redis cache (optional)
- [ ] Create Blob Storage account
- [ ] Set up CDN
- [ ] Create App Service Plan
- [ ] Create API App Service
- [ ] Create Web App Service
- [ ] Configure networking and firewall rules

### Phase 2: Configuration

- [ ] Set environment variables for API
- [ ] Set environment variables for Web
- [ ] Configure database firewall rules
- [ ] Enable CORS on API
- [ ] Configure SSL certificates (auto via App Service)
- [ ] Set up custom domain (optional)
- [ ] Configure blob storage CORS
- [ ] Set up CDN caching rules

### Phase 3: Database Setup

- [ ] Run Prisma migrations on Azure database
- [ ] Seed database with initial data
- [ ] Import all 120 chapters
- [ ] Verify database connectivity
- [ ] Set up automated backups
- [ ] Configure read replicas (production only)

### Phase 4: CI/CD Pipeline

- [ ] Create service principal
- [ ] Configure GitHub secrets
- [ ] Create deploy-azure.yml workflow
- [ ] Test deployment from feature branch
- [ ] Deploy to main branch
- [ ] Verify deployment success
- [ ] Set up deployment slots (staging/production)

### Phase 5: Monitoring & Logging

- [ ] Enable Application Insights
- [ ] Configure log analytics workspace
- [ ] Set up alerts for errors
- [ ] Configure performance monitoring
- [ ] Set up uptime monitoring
- [ ] Configure cost alerts

### Phase 6: Security

- [ ] Enable Azure Defender
- [ ] Configure Web Application Firewall (WAF)
- [ ] Set up DDoS protection
- [ ] Enable managed identities
- [ ] Rotate access keys regularly
- [ ] Configure Azure Key Vault for secrets
- [ ] Enable audit logging

---

## Post-Deployment Tasks

### Verify Deployment

```bash
# Check API health
curl https://three-kingdoms-api.azurewebsites.net/health

# Check web app
curl https://three-kingdoms-web.azurewebsites.net

# Test GraphQL endpoint
curl -X POST https://three-kingdoms-api.azurewebsites.net/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ chapters { id chapterNumber title } }"}'
```

### Performance Testing

```bash
# Run load tests
npm run test:load

# Monitor performance
az monitor metrics list \
  --resource /subscriptions/<subscription-id>/resourceGroups/three-kingdoms-rg/providers/Microsoft.Web/sites/three-kingdoms-api \
  --metric-names CpuPercentage,MemoryPercentage,HttpResponseTime
```

### Database Backup

```bash
# Create manual backup
az postgres flexible-server backup create \
  --resource-group three-kingdoms-rg \
  --name three-kingdoms-db \
  --backup-name manual-backup-$(date +%Y%m%d)
```

---

## Troubleshooting

### Common Issues

**Issue**: Database connection timeout
```bash
# Solution: Add your IP to firewall rules
az postgres flexible-server firewall-rule create \
  --resource-group three-kingdoms-rg \
  --name three-kingdoms-db \
  --rule-name AllowMyIP \
  --start-ip-address <your-ip> \
  --end-ip-address <your-ip>
```

**Issue**: App Service container not starting
```bash
# Solution: Check logs
az webapp log tail \
  --resource-group three-kingdoms-rg \
  --name three-kingdoms-api
```

**Issue**: Out of memory errors
```bash
# Solution: Scale up App Service Plan
az appservice plan update \
  --name three-kingdoms-plan \
  --resource-group three-kingdoms-rg \
  --sku P1V2
```

---

## Custom Domain Setup (Optional)

### Configure Custom Domain

```bash
# Add custom domain
az webapp config hostname add \
  --webapp-name three-kingdoms-web \
  --resource-group three-kingdoms-rg \
  --hostname www.threekingdoms.example.com

# Enable SSL
az webapp config ssl bind \
  --certificate-thumbprint <thumbprint> \
  --ssl-type SNI \
  --name three-kingdoms-web \
  --resource-group three-kingdoms-rg
```

### DNS Configuration

Add these DNS records:

```
A Record:
@ -> <app-service-ip>

CNAME Record:
www -> three-kingdoms-web.azurewebsites.net
api -> three-kingdoms-api.azurewebsites.net
```

---

## Scaling Strategies

### Horizontal Scaling (Auto-scale)

```bash
# Configure auto-scale rules
az monitor autoscale create \
  --resource-group three-kingdoms-rg \
  --resource three-kingdoms-plan \
  --resource-type Microsoft.Web/serverfarms \
  --name autoscale-settings \
  --min-count 1 \
  --max-count 5 \
  --count 2

# Add scale-out rule
az monitor autoscale rule create \
  --resource-group three-kingdoms-rg \
  --autoscale-name autoscale-settings \
  --condition "Percentage CPU > 70 avg 5m" \
  --scale out 1
```

### Vertical Scaling

Upgrade to higher tiers as traffic grows:
- **B1** → **S1** (100 instances)
- **S1** → **P1V2** (better performance)
- **P1V2** → **P2V2** (2x resources)

---

## Maintenance Windows

### Recommended Schedule

- **Database maintenance**: Sundays 2-4 AM UTC
- **App updates**: Rolling deployment (no downtime)
- **Backup verification**: Weekly
- **Security patches**: As needed (automated)

---

## Support & Resources

- **Azure Documentation**: https://docs.microsoft.com/azure
- **Azure Status**: https://status.azure.com
- **Pricing Calculator**: https://azure.microsoft.com/pricing/calculator
- **Azure Support**: https://azure.microsoft.com/support

---

**Last Updated**: 2026-01-13
**Document Owner**: Three Kingdoms Platform Team
**Phase**: 1 - Foundation (95% → 100% upon completion)
