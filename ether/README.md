# SETUP

Initialize the ethereum blockchain using the genesis

```
geth --datadir ./data init ./genesis.json
```

Start the ethereum console

```
geth  --datadir data --networkid 1900 console 
```

In the console using two nodes execute on node 1

```
> admin.nodeInfo.enode
> admin.peers
```

Execute on node 2

```
admin.addPeer("enode://")
admin.peers
```

You should see the connected peers on both nodes
