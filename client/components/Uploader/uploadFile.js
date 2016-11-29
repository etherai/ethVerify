import Web3 from 'web3';
import { hashFile } from 'utils/hashfile';

const CONTRACT_ADDRESS = '0xF4F5F2D52150b71Fe4Ba0821AC334E0261A63B68',
      RPC_ENDPOINT     = 'https://dev.ether.ai/api/rpc',
      web3             = new Web3();

web3.setProvider(new web3.providers.HttpProvider(RPC_ENDPOINT));

const tcvc = web3.eth.contract([{'constant':false,'inputs':[{'name':'documentHash','type':'uint256'}],'name':'storeCredential','outputs':[],'payable':false,'type':'function'},{'constant':true,'inputs':[{'name':'documentHash','type':'uint256'}],'name':'validateCredential','outputs':[{'name':'valid','type':'uint256'}],'payable':false,'type':'function'},{'constant':false,'inputs':[{'name':'documentHash','type':'uint256'}],'name':'invalidateCredential','outputs':[],'payable':false,'type':'function'},{'payable':false,'type':'fallback'}]).at(CONTRACT_ADDRESS);

export function getHash (file) {
  return hashFile(file);
}

export function sign (hash, password) {
  return new Promise((resolve, reject) => {
    web3.personal.unlockAccount(web3.eth.accounts[0], password, err => {
      if (err) {
        reject(err);
      }

      var txId = tcvc.storeCredential('0x' + hash, { from : web3.eth.accounts[0] });
      setTimeout(function() {
        window.open('https://testnet.etherscan.io/tx/' + txId);
      }, 5000);

      pollForTx(txId, resolve, reject);
    });
  });
}

export function isAuthentic(hash) {
  tcvc.validateCredential('0x' + hash).toNumber();
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
