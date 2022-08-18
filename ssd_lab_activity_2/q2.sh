cat /etc/shells |grep '^/usr'|awk -F/ '{print $NF}'
