#!/bin/sh

rm -Rf testing

mkdir -p testing/1
mkdir -p testing/2
mkdir -p testing/3

geth --datadir testing/1/data init ./genesis.json
geth --datadir testing/2/data init ./genesis.json
geth --datadir testing/3/data init ./genesis.json

cp keys/*.json testing/1/data/keystore
cp keys/*.json testing/2/data/keystore
cp keys/*.json testing/3/data/keystore
cp history testing/3/data/ testing/2/data/ testing/1/data/
tilix -a session-add-right -e "bootnode --nodekey=./keys/boot.key -verbosity 9 -nat any"

tilix -a session-add-down -e "geth --datadir testing/2/data --networkid 1900 --bootnodes enode://dcb403ce5241b7454a5fa2ba52c7def7df7759b720f74036ead066ac56e3aa4e3be40f678347a5a9c1bd1b4d3a26b9a0823111392f87e5606c125126916b9a6d@127.0.0.1:30301 --port 30304 console"
tilix -a session-add-down -e "geth --datadir testing/3/data --networkid 1900 --bootnodes enode://dcb403ce5241b7454a5fa2ba52c7def7df7759b720f74036ead066ac56e3aa4e3be40f678347a5a9c1bd1b4d3a26b9a0823111392f87e5606c125126916b9a6d@127.0.0.1:30301 --port 30305 console"
geth --datadir testing/1/data --networkid 1900 --bootnodes enode://dcb403ce5241b7454a5fa2ba52c7def7df7759b720f74036ead066ac56e3aa4e3be40f678347a5a9c1bd1b4d3a26b9a0823111392f87e5606c125126916b9a6d@127.0.0.1:30301 --port 30303 console --rpc --rpcaddr 0.0.0.0 --rpcapi "db,eth,net,web3,personal" --rpccorsdomain "*"
