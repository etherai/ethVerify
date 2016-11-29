export function toHex(buffer) {
      var hexCodes = [];
      var view = new DataView(buffer);
      for (var i = 0; i < view.byteLength; i += 4) {
        // Using getUint32 reduces the number of iterations needed (we process 4 bytes each time)
        var value = view.getUint32(i)
        // toString(16) will give the hex representation of the number without padding
        var stringValue = value.toString(16)
        // We use concatenation and slice for padding
        var padding = '00000000'
        var paddedValue = (padding + stringValue).slice(-padding.length)
        hexCodes.push(paddedValue);
      }
        return hexCodes.join("");
}

export function hashFile(file){
        var arrayBuffer;
        var fileReader = new FileReader();
	var promise = new Promise(function(resolve, reject){
		fileReader.onload = function(result) {
		    arrayBuffer = result.target.result;
		    crypto.subtle.digest('SHA-256', arrayBuffer).then(function(result){
			var hash = toHex(result);
      console.log(hash);
			resolve(hash);
		    });
		}

	});
        fileReader.readAsArrayBuffer(file);
	return promise;
}
