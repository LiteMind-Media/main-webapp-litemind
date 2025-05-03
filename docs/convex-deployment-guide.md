# Self-Hosted Convex Deployment Guide for Google Cloud VM

This guide will help you deploy the self-hosted Convex database to your Google Cloud VM.

## Prerequisites

- SSH access to your Google Cloud VM
- Docker and Docker Compose installed on your VM
- Your LiteMind Media application code already deployed to the VM

## Deployment Steps

### 1. SSH into your Google Cloud VM

```bash
ssh your-username@your-vm-ip
```

### 2. Navigate to your application directory

```bash
cd /path/to/litemind-webapp
```

### 3. Create necessary directories

```bash
mkdir -p convex-data
mkdir -p convex-backups
```

### 4. Update environment variables

Create or update the `.env` file in your application directory:

```bash
cat > .env << EOL
# Self-Hosted Convex Configuration
CONVEX_ADMIN_PASSWORD=your_secure_password_here
CONVEX_HOST_DOMAIN=your_domain_or_vm_ip
EOL
```

### 5. Start the Convex container

```bash
docker-compose -f docker-compose.convex.yml up -d
```

### 6. Deploy your schema to the Convex instance

```bash
CONVEX_URL=http://localhost:8000 CONVEX_ADMIN_URL=http://localhost:8001 npx convex deploy
```

### 7. Update your application's environment variables

Edit your application's `.env.local` file to point to your self-hosted Convex instance:

```bash
# For local development (within the VM)
cat > .env.local << EOL
NEXT_PUBLIC_CONVEX_URL=http://localhost:8000
CONVEX_ADMIN_URL=http://localhost:8001
CONVEX_ADMIN_PASSWORD=your_secure_password_here
EOL
```

### 8. Configure Nginx (if not already done)

Create an Nginx configuration file to proxy requests to your Convex server:

```bash
sudo cat > /etc/nginx/sites-available/convex << EOL
server {
    listen 80;
    server_name convex.yourdomain.com;  # Replace with your domain or subdomain

    location / {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }

    location /admin/ {
        proxy_pass http://localhost:8001/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOL

sudo ln -sf /etc/nginx/sites-available/convex /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

### 9. Setup SSL with Certbot (Recommended)

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d convex.yourdomain.com
```

## Managing your Convex Instance

### Viewing logs

```bash
docker logs -f convex-server
```

### Backing up data

```bash
BACKUP_DIR="/home/$(whoami)/convex-backups"
DATA_DIR="/home/$(whoami)/litemind-webapp/convex-data"
DATE=$(date +%Y%m%d-%H%M%S)
BACKUP_FILE="convex-backup-$DATE.tar.gz"

tar -czf "$BACKUP_DIR/$BACKUP_FILE" -C $(dirname "$DATA_DIR") $(basename "$DATA_DIR")
```

### Setting up automated backups

Add to crontab to run daily at 2 AM:

```bash
(crontab -l 2>/dev/null; echo "0 2 * * * /home/$(whoami)/litemind-webapp/scripts/backup-convex.sh >> /home/$(whoami)/litemind-webapp/logs/backup.log 2>&1") | crontab -
```

## Updating your application to use the production Convex instance

For production deployment, update your `.env.local` to use the domain name:

```bash
NEXT_PUBLIC_CONVEX_URL=https://convex.yourdomain.com
CONVEX_ADMIN_URL=https://convex.yourdomain.com/admin
CONVEX_ADMIN_PASSWORD=your_secure_password_here
```

## Troubleshooting

### 1. Check if the Convex container is running:

```bash
docker ps | grep convex-server
```

### 2. Check the container logs:

```bash
docker logs convex-server
```

### 3. Verify the Convex API is responding:

```bash
curl http://localhost:8000/health
```

### 4. Restart the Convex container:

```bash
docker restart convex-server
```

### 5. Check Nginx configuration:

```bash
sudo nginx -t
```
