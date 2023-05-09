## SSL certificates

### Create

#### Production

Create ssl certificates on production using Certbot (replace `${DOMAIN_NAME}` with value from `.env` file):

```bash
docker compose -f docker-compose.prod.yml run --rm certbot certonly --webroot --webroot-path /var/www/certbot/ -d ${DOMAIN_NAME}
```

#### Development

Create a self-signed ssl certificate with a private key for testing purposes on your local machine (replace `${DOMAIN_NAME}` with value from `.env` file):

```bash
cd certbot/conf/live/${DOMAIN_NAME}
openssl req -newkey rsa:4096 -x509 -sha512 -days 365 -nodes -out fullchain.pem -keyout privkey.pem
```

Web browsers will show "Connection not secure" warning for self-signed certificates.

### Renew

To renew the ssl certificate run the following commands from the project root:

```bash
docker compose -f docker-compose.prod.yml run --rm certbot renew
docker compose -f docker-compose.prod.yml restart
```
