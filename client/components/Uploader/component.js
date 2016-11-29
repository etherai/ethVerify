import React, { Component } from 'react';
import uploadFile from './uploadFile';

export default class Uploader extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isUploading   : false,
      hasError      : false,
      isUploadValid : false,
      hash          : null
    };
  }

  onFileInputChange (e) {
    const file = e.target.files[0];
    this.setState({ isUploading : true });
    uploadFile(file)
      .then(hash => {
        this.setState({
          hash,
          isUploading : false,
          isUploadValid : true
        });
      })
      .catch((...args) => {
        this.setState({
          isUploading : false,
          hasError    : true
        });
        console.log('catch --> ', ...args);
      });
  }

  render () {
    const { isUploading, hasError, isUploadValid } = this.state;

    return (
      <div className="container">
        <h1>Trustless Credential Verification</h1>

        <div className="col">
          <h3>How does this work?</h3>
          <p>This application computes and stores the sha256 hash of the provided document on the Ethereum blockchain. You can provide a previously signed document to verify its authenticity.</p>
        </div>

        <div className="col">
          <div className="file-drop">
            <input id="file-input" type="file" name="file" onChange={ this.onFileInputChange.bind(this) } />
            
            { 
              isUploading && 
              <div>
                <img src = "assets/images/yellow-loading-wheel.gif" /> 
                <p style = {{ color: 'orange' }}>Sending to secure Blockchain...</p>
              </div>
            }

            { hasError && 
              <div>
                <img src="assets/images/redx.png" style={{ width:190, height:180 }} />
                <p style={{ color   : 'red' }}>Could not validate the authenticity of this document</p> 
              </div>
            }

            { isUploadValid && 
              <div>
                <img id="greencheck" src="assets/images/greencheck.png" style={{ width : 190, height:180 }} />
                <p style={{ color: 'green' }}>Document authenticity verified</p> 
              </div>
            }

          </div>
        </div>

        <div className="action">
          <button id="sign-button" href="#" className="button">Sign Document</button> <br/>
          
          <input id="password" type="password" style={{ display:'none', width: 170 }} placeholder="Enter signing passphrase" />
          
          <p style={{ clear: 'both' }}>Validator address: <a href="https://testnet.etherscan.io/address/0xf4f5f2d52150b71fe4ba0821ac334e0261a63b68">0xf4f5f2d52150b71fe4ba0821ac334e0261a63b68</a></p>
        </div>
      </div>
    );
  }
}
