var CONTRACT_ADDRESS = '0xF4F5F2D52150b71Fe4Ba0821AC334E0261A63B68';
var RPC_ENDPOINT = 'https://dev.ether.ai/api/rpc'
var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(RPC_ENDPOINT));

var tcvc = web3.eth.contract([{"constant":false,"inputs":[{"name":"documentHash","type":"uint256"}],"name":"storeCredential","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"documentHash","type":"uint256"}],"name":"validateCredential","outputs":[{"name":"valid","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"documentHash","type":"uint256"}],"name":"invalidateCredential","outputs":[],"payable":false,"type":"function"},{"payable":false,"type":"fallback"}]).at(CONTRACT_ADDRESS);

(function() {

	var data = {};	
	var signButton = document.getElementById("sign-button");
	var fileInput = document.getElementById("file-input");
	var redx = document.getElementById("redx");
	var error = document.getElementById("error");
	var greenCheck = document.getElementById("greencheck");
	var success = document.getElementById("success");
	var loading = document.getElementById("loading");
	var sending = document.getElementById("sending");
	var password = document.getElementById("password");

	function pollForTx(txId) {
		var filter = web3.eth.filter('latest', function(err, blockId) {
			if (err){
				alert('an error occored');
			}
			console.log("Got Block: " + blockId);
			web3.eth.getTransactionReceipt(txId, function(err, tx){
				if (tx != null) {
					filter.stopWatching();
					greencheck.style.display = "inline";
					success.style.display = "block";
					loading.style.display = "none";
					sending.style.display = "none";
					fileInput.style.display = "inline";
				}
			});
		});
	}

	function verifyButtonClicked(e) {
		alert(data.hash);
	}

	function signButtonClicked(e) {
		loading.style.display = "inline";
		sending.style.display = "block";
		redx.style.display = "none";
		error.style.display = "none";
		fileInput.style.display = "none";
		signButton.style.display = "none";
		password.style.display = "none";
		
		web3.personal.unlockAccount(web3.eth.accounts[0], password.value,
		function(err){
			if(err){
				alert("Incorrect passphrase");
				loading.style.display = "none";
				sending.style.display = "none";
				redx.style.display = "inline";
				error.style.display = "block";
				signButton.style.display = "inline";
				password.style.display = "inline";
				password.value = "";
				return;
			}	
			var txId = tcvc.storeCredential("0x"+data.hash, {from:web3.eth.accounts[0]});
			setTimeout(function() {
				window.open('https://testnet.etherscan.io/tx/'+txId);
			}, 5000);

			pollForTx(txId);
		});
	}

	function isAuthentic(hash) {
		var promise = new Promise(function(resolve, reject) {
			resolve(tcvc.validateCredential("0x"+hash).toNumber());
		});
		return promise;
	}
	function fileInputChanged(e) {
		redx.style.display = "none";
		error.style.display = "none";
		greencheck.style.display = "none";
		success.style.display = "none";
		signButton.style.display = "none";
		var file = e.target.files[0];
		hashFile(file).then(function(hash){
			console.log("Document Hash: "+ hash);
			data.hash = hash;
			isAuthentic(hash).then(function(valid){
				if (valid) {
					greencheck.style.display = "inline";
					success.style.display = "block";
					
				}
				else {
					redx.style.display = "inline";
					error.style.display = "block";
					signButton.style.display = "inline";
					password.style.display = "inline";
				}	
			});
		});
	}

	signButton.addEventListener('click', signButtonClicked, false);
	fileInput.addEventListener('change', fileInputChanged, false);
	
})();
