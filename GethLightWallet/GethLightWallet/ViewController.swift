//
//  ViewController.swift
//  GethLightWallet
//
//  Created by Nikolay Dimolarov on 19.01.18.
//  Copyright © 2018 Nikolay Dimolarov. All rights reserved.
//

import UIKit
import Geth


class ViewController: UIViewController {
    
    private var importedKeyAccount = GethAccount()

    override func viewDidLoad() {
        super.viewDidLoad()
        
        let datadir = NSSearchPathForDirectoriesInDomains(.documentDirectory, .userDomainMask, true)[0]
        let ks = GethKeyStore(datadir + "/keystoredomi2", scryptN: GethLightScryptN, scryptP: GethLightScryptP)
        let key = "{\"address\":\"411ea80e2b8141c433f7b9a820605d4e454e7bef\",\"crypto\":{\"cipher\":\"aes-128-ctr\",\"ciphertext\":\"b81b50b2efd6cd86f9cce29ad5f08ddd03d7e305c51067ac784c936e08f8fd31\",\"cipherparams\":{\"iv\":\"960639e666f18a1c1eea295809b8f666\"},\"kdf\":\"scrypt\",\"kdfparams\":{\"dklen\":32,\"n\":262144,\"p\":1,\"r\":8,\"salt\":\"191ec8a1928932f1d2e59056f611d0184f74b2e774f0232c793aed11ed14b59a\"},\"mac\":\"6f77bdb0c522b1035f6449cbfd48db2cbc93cf989b50ea76bffe6a4cb3cc5f34\"},\"id\":\"38aeb65e-4923-4eca-8d1f-993d8b6000b8\",\"version\":3}"
        let parsedKey = key.data(using: String.Encoding.utf8)
        
        do {
            let account = try ks?.importKey(parsedKey, passphrase: "nikolay", newPassphrase: "nikolay")
            importedKeyAccount = account
        } catch let error {
            print("Account")
            print("error: \(error.localizedDescription)")
        }
        
            
        var error: NSError?
        let bootnodes = GethNewEnodesEmpty()
        let remoteIP = "192.168.1.113"
        let remotePort = "30301"
        let remoteEnode = "enode://dcb403ce5241b7454a5fa2ba52c7def7df7759b720f74036ead066ac56e3aa4e3be40f678347a5a9c1bd1b4d3a26b9a0823111392f87e5606c125126916b9a6d"
        bootnodes?.append(GethNewEnode("\(remoteEnode)@\(remoteIP):\(remotePort)", &error))
            
        let genesisBlock = "{\"config\": {\"chainId\": 1900,\"homesteadBlock\": 0,\"eip155Block\": 0,\"eip158Block\": 0,\"byzantiumBlock\": 0},\"nonce\": \"0x0000000000000042\",\"mixHash\": \"0x0000000000000000000000000000000000000000000000000000000000000000\",\"difficulty\": \"0x20000\",\"author\": \"0x0000000000000000000000000000000000000000\",\"timestamp\": \"0x00\",\"parentHash\": \"0x0000000000000000000000000000000000000000000000000000000000000000\",\"extraData\": \"0x\",\"gasLimit\": \"0x2fefd8\",\"alloc\": { }}"
            
        let config = GethNewNodeConfig()
        config?.setBootstrapNodes(bootnodes)
        config?.setEthereumNetworkID(1900)
        config?.setEthereumGenesis(genesisBlock)
        config?.setWhisperEnabled(true)
        config?.setEthereumEnabled(true)
        
            
        let node = GethNode(datadir + "/domi2", config: config)
        do {
            try node?.start()
        } catch let error {
            print("error: \(error.localizedDescription)")
        }
        
        sleep(10)
        
        do {
            let client = try node?.getEthereumClient()
            let context = GethNewContext()
            
            print(try client?.getHeaderByNumber(context, number: -1).getHash().getHex())
            
            
            //print(try client?.getBlockByHash(context, hash: GethHash(fromHex: "0x5a60f476974652dca90f8e106258a22b8728a16aaa78b7899f36cc11135f4c44")))
            //let ethBalance : GethBigInt = (try client?.getBalanceAt(context, account: importedKeyAccount?.getAddress(), number: -1))!
            
            //print(ethBalance.string())
        } catch let error {
            print("Client")
            print("error: \(error.localizedDescription)")
        }
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }


}

