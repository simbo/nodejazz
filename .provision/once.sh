#!/usr/bin/env zsh

source "/vagrant/.provision/provision.sh"

# update sources, upgrade packages
echo_c "Updating apt sources..."
sudo apt-get -y -qq update

# install apt packages
echo_c "Installing apt packages..."
sudo apt-get -y -qq install couchdb nginx

# configure nginx
echo_c "Configuring nginx..."
sudo apt-get -y -qq install nginx
sudo cp -R $PROVISION_FILES/etc/nginx/* /etc/nginx
sudo rm -f /etc/nginx/sites-enabled/default
sudo ln -sf /etc/nginx/sites-available/vagrant /etc/nginx/sites-enabled/vagrant
sudo service nginx restart

# set NODE_PATH
echo_c "Configuring NODE_PATH..."
export NODE_PATH="/vagrant/app"
if [ -z $(grep -q "export NODE_PATH=${NODE_PATH}" "${HOME}/.zshenv") ]; then
  cat >>${HOME}/.zshenv <<EOL

# node path for requiring modules
export NODE_PATH=${NODE_PATH}
EOL
fi

# install global npm packages
echo_c "Installing global npm packages..."
npm i -g pm2@0.15.10 gulp@3.9.0 npm-check-updates

# setup pm2 autostart
echo_c "Configuring pm2..."
sudo su -c "env PATH=$PATH:/home/vagrant/.nvm/versions/node/v5.0.0/bin pm2 startup ubuntu -u vagrant --hp /home/vagrant"

# customize .zshrc
echo_c "Customizing .zshrc..."
if [ -z $(grep -q "cd /vagrant" "${HOME}/.zshrc") ]; then
  cat >>${HOME}/.zshenv <<EOL

cd /vagrant
EOL
fi
