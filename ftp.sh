#!/bin/bash
echo "set ssl:verify-certificate no" >> ~/workspace/ftp.sh
set ssl:verify-certificate no
lftp -c "set ftp:list-options -a;
open ftp://epiz_21976851:P3P3lord@ftpupload.net;
lcd ./site/DDLC;
cd /htdocs;
mirror --reverse --delete --use-cache --verbose --allow-chown --allow-suid --no-umask --parallel=2 --exclude-glob .svn"set ssl:verify-certificate no
