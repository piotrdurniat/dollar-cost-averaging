

## Access MongoDB Shell from a Docker Container

```bash
docker exec -it <container_name> mongosh -u <username> -p <password> --authenticationDatabase <database_name>
```
## Clear mongo database

```bash
sudo rm -rf ./mongo/data/
```

