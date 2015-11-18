#!/usr/bin/env zsh

source "/vagrant/.provision/provision.sh"

cd /vagrant

echo_c "Install local npm packages..."
npm i

echo_c "Launch and dump app processes..."
pm2 delete /vagrant/pm2.json &> /dev/null
pm2 start /vagrant/pm2.json &> /dev/null
pm2 save
pm2 status
