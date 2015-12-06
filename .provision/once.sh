#!/usr/bin/env zsh

source "/vagrant/.provision/provision-env.sh"

# update sources, upgrade packages
echo_c "Updating apt sources..."

apt-get -y -qq update

# install apt packages
echo_c "Installing apt packages..."

apt-get -y -qq install couchdb nginx

# configure nginx
echo_c "Configuring nginx..."

apt-get -y -qq install nginx

cp -R $PROVISION_FILES/etc/nginx/* /etc/nginx
rm -f /etc/nginx/sites-enabled/default
ln -sf /etc/nginx/sites-available/vagrant /etc/nginx/sites-enabled/vagrant

service nginx restart

# set env
echo_c "Configuring environment..."

export NODE_PATH="/vagrant/app"

NVM_PATH_SCRIPT=$(cat <<EOL

# node require path
export NODE_PATH="${NODE_PATH}"
EOL
)

if ! grep -q "# node require path" /etc/profile; then
  echo "$NVM_PATH_SCRIPT" >>/etc/profile
fi

if ! grep -q "# node require path" /home/vagrant/.zshenv; then
  echo "$NVM_PATH_SCRIPT" >>/home/vagrant/.zshenv
fi

# install global npm packages
echo_c "Installing global npm packages..."

su vagrant -c "npm i -g pm2@0.15.10 gulp@3.9.0 npm-check-updates"

# setup pm2 autostart
echo_c "Configuring pm2..."

env PATH=/home/vagrant/.nvm/versions/node/current/bin:$PATH pm2 startup ubuntu -u vagrant --hp /home/vagrant

# customize .zshrc
echo_c "Customizing .zshrc..."

if ! grep -q "cd /vagrant" /home/vagrant/.zshrc; then
  cat >>/home/vagrant/.zshrc <<EOL

cd /vagrant
EOL
fi
