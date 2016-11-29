import React, { Component } from 'react';

export default class Uploader extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isUploading : false
    }
  }

  render () {
    return (
      <div className="container">
        <h1>Trustless Credential Verification</h1>

        <div className="col">
          <h3>How does this work?</h3>
          <p>This application computes and stores the sha256 hash of the provided document on the Ethereum blockchain. You can provide a previously signed document to verify its authenticity.</p>
        </div>

        <div className="col">
          <div className="file-drop">
            <input id="file-input" type="file" name="file" />
            <img id="loading" src="assets/images/yellow-loading-wheel.gif" style={{ display: 'none' }} />
            <p id="sending" style={{ color: 'orange', display: 'none' }}>Sending to secure Blockchain...</p>
            <img id="redx" src="assets/images/redx.png" style={{ width:190, height:180 }} />
            <p id="error" style={{ color: 'red', display:'none'}}>Could not validate the authenticity of this document</p>
            <img id="greencheck" src="assets/images/greencheck.png" style={{ width : 190, height:180 }} />
            <p id="success" style={{ color: 'green', display:'none' }}>Document authenticity verified</p>
          </div>
        </div>
        <div className="action">
          <button id="sign-button" href="#" className="button">Sign Document</button> <br/>
          <input id="password" type="password" style={{ display:'none', width: 170 }} placeholder="Enter signing passphrase" />
          <p style={{ clear: 'both' }}>Validator address: <a href="https://testnet.etherscan.io/address/0xf4f5f2d52150b71fe4ba0821ac334e0261a63b68">0xf4f5f2d52150b71fe4ba0821ac334e0261a63b68</a></p>
        </div>
      </div>
    )
  }
}
