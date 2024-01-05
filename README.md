# BDSM

## Installation

### System Requirements (Recommanded)

#### Local

- MacBook Pro 16 2023 (M2 Pro, 32GB)
- macOS 13.3
- Node.js 20.9
- Docker 20.10
- PostgreSQL 15

#### Cloud

- Oracle Cloud Instance
- Ubuntu 22.04
- [Docker](https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository) 24.0
- PostgreSQL 16

### PostgreSQL

#### Local

PostgreSQL 서버에 접속해서 아래와 같이 사용자와 데이터베이스를 생성합니다.
PostgreSQL 기본 관리자 이름은 `postgres` 입니다.

```sql
CREATE USER DB계정이름 WITH PASSWORD 'DB계정암호';
CREATE DATABASE DB이름 OWNER DB계정이름 TEMPLATE template0 LC_COLLATE "C" LC_CTYPE "ko_KR.UTF-8";

\c DB이름 DB관리자이름
ALTER SCHEMA public OWNER TO DB계정이름;
```

#### Cloud

```bash
# set variables
POSTGRES_HOST=DB서버주소
POSTGRES_USER=DB계정이름
POSTGRES_PASSWORD=DB계정암호
POSTGRES_DB=DB이름
POSTGRES_DOCKER_VOLUME_NAME=DB도커볼륨이름

# https://www.postgresql.org/docs/14/ssl-tcp.html
openssl req -new -nodes -text -out root.csr \
  -keyout root.key -subj "/CN=$POSTGRES_USER"

chmod og-rwx root.key

openssl x509 -req -in root.csr -text -days 3650 \
  -extfile /etc/ssl/openssl.cnf -extensions v3_ca \
  -signkey root.key -out root.crt

openssl req -new -nodes -text -out server.csr \
  -keyout server.key -subj "/CN=$POSTGRES_HOST"

openssl x509 -req -in server.csr -text -days 365 \
  -CA root.crt -CAkey root.key -CAcreateserial \
  -out server.crt

# https://stackoverflow.com/questions/55072221/deploying-postgresql-docker-with-ssl-certificate-and-key-with-volumes
sudo chown 0:70 server.key
sudo chmod 640 server.key

# https://www.postgresql.org/docs/14/auth-pg-hba-conf.html
echo "
# TYPE  DATABASE        USER            ADDRESS                 METHOD

# 'local' is for Unix domain socket connections only
local   all             all                                     trust
# IPv4 local connections:
host    all             all             127.0.0.1/32            trust
# IPv6 local connections:
host    all             all             ::1/128                 trust
# Allow replication connections from localhost, by a user with the
# replication privilege.
local   replication     all                                     trust
host    replication     all             127.0.0.1/32            trust
host    replication     all             ::1/128                 trust

hostssl all all all scram-sha-256
" > pg_hba.conf

# start a postgres docker container, mapping the .key and .crt into the image.
sudo docker volume create $POSTGRES_DOCKER_VOLUME_NAME
sudo docker container create --name dummy-container --volume $POSTGRES_DOCKER_VOLUME_NAME:/root hello-world
sudo docker cp ./root.crt dummy-container:/root
sudo docker cp ./server.crt dummy-container:/root
sudo docker cp ./server.key dummy-container:/root
sudo docker cp ./pg_hba.conf dummy-container:/root
sudo docker rm dummy-container

# https://www.postgresql.kr/blog/collate_for_pg.html
sudo docker run \
  -d \
  -e POSTGRES_USER=$POSTGRES_USER \
  -e POSTGRES_PASSWORD=$POSTGRES_PASSWORD \
  -e POSTGRES_DB=$POSTGRES_DB \
  -e LANG=ko_KR.UTF8 \
  -e LC_COLLATE=C \
  -e POSTGRES_INITDB_ARGS=--data-checksums \
  --name postgres \
  -p 5432:5432 \
  --restart=on-failure \
  --shm-size=256MB \
  --volume $POSTGRES_DOCKER_VOLUME_NAME:/var/lib/postgresql \
  --memory=1g \
  --cpus=1 \
  postgres:16-alpine \
  -c ssl=on \
  -c ssl_ca_file=/var/lib/postgresql/root.crt \
  -c ssl_cert_file=/var/lib/postgresql/server.crt \
  -c ssl_key_file=/var/lib/postgresql/server.key \
  -c hba_file=/var/lib/postgresql/pg_hba.conf
  # -c config_file=/var/lib/postgresql/postgresql.conf
```
