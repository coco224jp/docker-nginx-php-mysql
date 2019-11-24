#!/bin/bash

### Docker外のMySQLからデータベースをdump
### mysqldump -u ${username} -p -h ${hostname} ${dbname} > ${dbname}.dump

# ディレクトリが存在しない場合のみ、リストア用のデータを入れるディレクトリを作成
mkdir -p mysql/init.d/restore

### 上で作成した${dbname}.dumpをmysql/init.d/restore以下に移動

#dbname, username, passwordを指定
dbname=""
username=""
password=""

#データベース初期化用のsqlを作成
echo "CREATE DATABASE IF NOT EXISTS ${dbname};" >> mysql/init.d/restore/init.sql
echo "GRANT ALL ON ${dbname}.* TO ${dbname}@'%' IDENTIFIED BY '${password}';" >> mysql/init.d/restore/init.sql
echo "CREATE DATABASE IF NOT EXISTS ${dbname};" >> mysql/init.d/restore/init.sql
echo "FLUSH PRIVILEGES;" >> mysql/init.d/restore/init.sql

#${dbname}.dumpからリストアする用のシェルスクリプトを作成
echo "mysql --defaults-extra-file=/etc/mysql/conf.d/my.cnf -h mysql -uroot < /docker-entrypoint-initdb.d/restore/init.sql" >> mysql/init.d/restore/restore.sh
echo "mysql --defaults-extra-file=/etc/mysql/conf.d/my.cnf -h mysql -uroot -D ${dbname} < /docker-entrypoint-initdb.d/restore/${dbname}.dump" >> mysql/init.d/restore/restore.sh

#appコンテナにログイン
docker-compose run app bash

### appコンテナ内で /docker-entrypoint-initdb.d/restore/restore.sh　を実行