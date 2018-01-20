//
//  ViewController.swift
//  GethLightWallet
//
//  Created by Nikolay Dimolarov on 19.01.18.
//  Copyright © 2018 Nikolay Dimolarov. All rights reserved.
//

import UIKit
import Geth
import Alamofire

class ViewController: UIViewController {
    
    private var importedKeyAccount = GethAccount()

    override func viewDidLoad() {
        super.viewDidLoad()
        
        let datadir = NSSearchPathForDirectoriesInDomains(.documentDirectory, .userDomainMask, true)[0]
        let ks = GethKeyStore(datadir + "/keystoredomi42", scryptN: GethLightScryptN, scryptP: GethLightScryptP)
        let key = "{\"address\":\"235b82ab7a5ada95decd149f5ca8a4aade9ca7ed\",\"crypto\":{\"cipher\":\"aes-128-ctr\",\"ciphertext\":\"e08c9a4a3ef670527c4ad629b193cbaae8683275b932ef47502606984de6a72e\",\"cipherparams\":{\"iv\":\"7a8cd240d2c6fb3d94ae19e9aa5cf892\"},\"kdf\":\"scrypt\",\"kdfparams\":{\"dklen\":32,\"n\":262144,\"p\":1,\"r\":8,\"salt\":\"4151ce186201fab040cbb2aa709eb2f14873463343e115a88a6b98158454fcfb\"},\"mac\":\"585cd96029ae9918cdc610a8f9cd802feeb977a0f98b11fcb6fbfcf6179d4072\"},\"id\":\"5a28fe9f-54d4-4a10-bac6-1656bfbadbc8\",\"version\":3}"
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
        
        /*
        let node = GethNode(datadir + "/domi42", config: config)
        do {
            try node?.start()
        } catch let error {
            print("error: \(error.localizedDescription)")
        }*/

        let parameters: Parameters = [
            "jsonrpc":"2.0",
            "method":"eth_getBalance",
            "params": [importedKeyAccount?.getAddress().getHex(), "latest"],
            "id":1
        ]
        
        Alamofire.request("http://" + remoteIP + ":8545", method: .post, parameters: parameters, encoding: JSONEncoding.default).responseJSON(completionHandler: {response in
            print(response)
        })
        
        /*
        do {
            let client = try node?.getEthereumClient()
            let context = GethNewContext()
            
            // get the latest block from Domi's test chain
            let block = try client?.getBlockByNumber(context, number: -1)
            print("Latest block: \(block!.getNumber())")
            
            // check ETH balance
            let balance = try! client?.getBalanceAt(GethNewContext(), account: importedKeyAccount!.getAddress(), number: -1)
            print("Balance: \(balance?.getInt64())")
        } catch let error {
            print("Client")
            print("error: \(error.localizedDescription)")
        }*/
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }


}

