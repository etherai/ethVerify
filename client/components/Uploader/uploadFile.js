import Web3 from 'web3';
import { hashFile } from 'utils/hashfile';

const CONTRACT_ADDRESS = '0x70498427d3a8f47fc128dc2aefe86c4deab751c2',
      RPC_ENDPOINT     = 'https://dev.ether.ai/api/rpc',
      web3             = new Web3();

web3.setProvider(new web3.providers.HttpProvider(RPC_ENDPOINT));

const tcvc =  web3.eth.contract([{"constant":false,"inputs":[{"name":"hash","type":"uint256"}],"name":"addCredential","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"credentials","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"}]).at(CONTRACT_ADDRESS);

export function getHash (file) {
  return hashFile(file);
}

export function sign (hash, password) {
  return new Promise((resolve, reject) => {
    web3.personal.unlockAccount(web3.eth.accounts[0], password, err => {
      if (err) {
        reject(err);
      }

      var txId = tcvc.addCredential('0x' + hash, { from : web3.eth.accounts[0] });
      setTimeout(function() {
        window.open('https://testnet.etherscan.io/tx/' + txId);
      }, 5000);

      pollForTx(txId, resolve, reject);
    });
  });
}

export function isAuthentic(hash) {
  return tcvc.credentials.call('0x' + hash);
}

function pollForTx (txId, resolve, reject) {
  var filter = web3.eth.filter('latest', function(err, blockId) {
    if (err){
      reject();
      alert('an error occored');
    }

    console.log('Got Block: ' + blockId);
    web3.eth.getTransactionReceipt(txId, function(err, tx){
      if (tx != null) {
        filter.stopWatching();
        resolve();
      }
    });
  });
}
