#!/bin/bash

set -ex

cd "$(dirname "$0")"/../judgels-backends/jophiel/jophiel-dist

../../gradlew clean distTar
tar -xf build/distributions/jophiel-* --strip-components=1 -C build/distributions
rm build/distributions/*.tgz

cd ../../../deployment/ansible

ansible --version
ansible-playbook -e @../../deployment-repo/conf/global.yml playbooks/build-jophiel.yml
ansible-playbook -e @../../deployment-repo/conf/global.yml playbooks/deploy-jophiel.yml