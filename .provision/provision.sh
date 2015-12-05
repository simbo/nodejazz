export DEBIAN_FRONTEND=noninteractive

# provision vars
PROVISION_DIR="/vagrant/.provision"
PROVISION_SCRIPTS="${PROVISION_DIR}/scripts"
PROVISION_FILES="${PROVISION_DIR}/files"

# highlight step messages
function echo_c() {
  echo -e "\e[35m==> ${1}\e[0m"
}
