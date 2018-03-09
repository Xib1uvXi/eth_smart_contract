#!/usr/bin/env bash

if [ ! $1 ];then
    echo "plz tall me your os env, linux = 1 or oxs = 2"
    exit 2
fi

root=`pwd`

cp ./../test_pn.sh ./

chmod +x test_pn.sh

./test_pn.sh $1 start

echo "start contract test........"

truffle test --network=test

./test_pn.sh $1 stop

rm -rf test_pn.sh

