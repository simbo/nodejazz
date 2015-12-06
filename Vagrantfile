# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
  config.vm.box = "simbo/trusty64"
  config.vm.box_version = "0.6.12"
  config.vm.network "forwarded_port", guest: 80, host: 8080
  config.vm.network "forwarded_port", guest: 443, host: 4443
  config.vm.network "private_network", ip: "10.0.0.5"
  # config.vm.synced_folder ".", "/vagrant", nfs: true, mount_options: ["actimeo=2"]
  config.vm.provision "shell", path: ".provision/once.sh", privileged: true
  config.vm.provision "shell", path: ".provision/always.sh", privileged: false, run: "always"
end
