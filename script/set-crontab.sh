#!/bin/sh
# cronジョブを上書きする(sudo必須)
project_root=
username=

cp ${project_root$}/crontab /var/spool/cron/crontabs/${username}
