# Current Deployment Configuration

## Google Cloud VM Details

This document tracks the current deployment configuration of the Litemind webapp.

### VM Configuration

- **Instance Type**: e2-micro (free tier)
- **Region**: [Your VM's region]
- **OS**: [Your OS, e.g., Ubuntu 20.04]
- **External IP**: [Your VM's IP - keep this private in the actual file]
- **Domain**: [If applicable]

### Application Setup

- **Node.js Version**: [Your Node.js version]
- **Process Manager**: PM2
- **Nginx**: Configured as reverse proxy on port 80
- **Application Port**: 3000

### Deployment Commands

Quick reference for common deployment tasks:

```bash
# SSH into the VM
gcloud compute ssh [instance-name] --zone=[zone]

# Pull latest changes
git pull origin main

# Install dependencies if needed
pnpm install

# Build the application
pnpm build

# Restart the application
pm2 restart [app-name]

# View logs
pm2 logs [app-name]

# Monitor application
pm2 monit
```

### SSL Configuration

- [If configured] Let's Encrypt certificate, auto-renewal via Certbot

### Monitoring

- PM2 for application monitoring
- [Any additional monitoring tools]

### Backup Strategy

- [Your backup strategy, if implemented]

## Maintenance Notes

- Last deployment: [Date]
- Last system update: [Date]
- Scheduled maintenance: [Date, if applicable]

## Known Issues and TODOs

- [List any known issues]
- [List any planned improvements]
