
env | sort >> /usr/share/nginx/html/.env
env | sort >> /usr/share/nginx/html/.env.production

for i in $(env); do set $i; echo $i; done

