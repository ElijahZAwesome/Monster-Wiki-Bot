#!/bin/sh
HOST='ftpupload.net'
USER='epiz_21976851'
PASSWD='P3P3lord'

ftp -n $HOST <<END_SCRIPT
quote USER $USER
quote PASS $PASSWD
MPUT *
quit
END_SCRIPT
exit 0