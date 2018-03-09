#!/usr/bin/env bash

root=`pwd`

if [ $2 == "start" ];then
    if [ ! $1 ];then
        echo "plz tall me your os env, linux = 1 or oxs = 2"
        exit 2
    fi

    rm -rf eth_pn

    git clone https://github.com/Xib1uvXi/eth_pn.git  ### 以后可以cp

    cd eth_pn

    ./init_pn_env.sh

    nohup ./console.sh $1 test > /dev/null 2>&1 &
    echo $! > pid

    echo "wait 5s, test network need init....."

    sleep 5

    echo "Test Private Net Start Success!"
fi

if [ $2 == "stop" ];then
    ps aux | grep geth|awk '{print $2}'|xargs kill -9
    rm -rf eth_pn
    echo "Test Private Net Stop Success!"
fi
