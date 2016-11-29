import Web3  from 'web3';
import { hashFile } from 'utils/hashfile';

const CONTRACT_ADDRESS = '0xF4F5F2D52150b71Fe4Ba0821AC334E0261A63B68',
      RPC_ENDPOINT     = 'https://dev.ether.ai/api/rpc',
      web3             = new Web3();

web3.setProvider(new web3.providers.HttpProvider(RPC_ENDPOINT));

const tcvc = web3.eth.contract([{'constant':false,'inputs':[{'name':'documentHash','type':'uint256'}],'name':'storeCredential','outputs':[],'payable':false,'type':'function'},{'constant':true,'inputs':[{'name':'documentHash','type':'uint256'}],'name':'validateCredential','outputs':[{'name':'valid','type':'uint256'}],'payable':false,'type':'function'},{'constant':false,'inputs':[{'name':'documentHash','type':'uint256'}],'name':'invalidateCredential','outputs':[],'payable':false,'type':'function'},{'payable':false,'type':'fallback'}]).at(CONTRACT_ADDRESS);

function isAuthentic(hash) {
  return new Promise(function(resolve, reject) {
    resolve(tcvc.validateCredential('0x'+hash).toNumber());
  });
}

export default function uploadFile (file) {
  return hashFile(file).then(function(hash){
    
    console.log('Document Hash: '+ hash);
    // data.hash = hash;
    return isAuthentic(hash);
  });
}
