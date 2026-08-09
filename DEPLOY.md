# Deploy (safe, non-disruptive)

This project is a Next.js app configured with `output: "standalone"`. For deployment we **upload only the packaged standalone output** (no full `node_modules`, no source, no `.next` from your workstation).

## Build + package on your Windows PC

From `c:\Users\Administrator\Downloads\murcielago`:

```powershell
npm ci
npm run lint
npm run build
npm run package:standalone
```

Result folder: `dist/murcielago-standalone/`

## Upload to server

Pick a target folder on the server (example): `/var/www/murcielago`

### Option A: scp (Windows OpenSSH)

```powershell
scp -r .\dist\murcielago-standalone root@185.184.122.156:/var/www/murcielago
```

After upload, fix ownership on the server:

```bash
mkdir -p /var/www/murcielago
chown -R murcielago:murcielago /var/www/murcielago
```

## Server: check ports (do not break existing sites)

SSH into server and check what is already listening:

```bash
ss -tulpn | sort -k5
nginx -t
```

If 80/443 are already used by other sites/panels, we will **not touch them**. We'll use a **separate nginx port** (example `8081`) and a separate internal Node port (example `3001`).

## Server: create systemd service for the app

Make sure Node.js is installed on the server:

```bash
node -v
which node
```

Create a dedicated user (recommended):

```bash
useradd --system --home /var/www/murcielago --shell /usr/sbin/nologin murcielago || true
chown -R murcielago:murcielago /var/www/murcielago
```

Create `/etc/systemd/system/murcielago.service`:

```ini
[Unit]
Description=murcielago (Next.js standalone)
After=network.target

[Service]
Type=simple
User=murcielago
WorkingDirectory=/var/www/murcielago/murcielago-standalone
Environment=NODE_ENV=production
Environment=HOSTNAME=127.0.0.1
Environment=PORT=3001
ExecStart=/usr/bin/node server.js
Restart=always
RestartSec=2

[Install]
WantedBy=multi-user.target
```

Enable + start:

```bash
systemctl daemon-reload
systemctl enable --now murcielago.service
systemctl status murcielago.service --no-pager
```

Confirm it responds locally:

```bash
curl -I http://127.0.0.1:3001/
```

## Server: nginx reverse proxy on a safe port

Create nginx site config (example `/etc/nginx/conf.d/murcielago_8081.conf`):

```nginx
server {
    listen 8081;
    server_name _;

    client_max_body_size 50m;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

Test + reload nginx safely:

```bash
nginx -t
systemctl reload nginx
```

Now the site should be available at: `http://185.184.122.156:8081/`

## Logs / troubleshooting

```bash
journalctl -u murcielago.service -f
```

