import React, { Component } from 'react';
import { getHash, isAuthentic, sign } from './uploadFile';

export default class Uploader extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isUploading       : false,
      isUploadAuthentic : false,
      hash              : null,
      password          : 'password'
    };
  }

  onFileInputChange (e) {
    const file = e.target.files[0];
    this.setState({ isUploading : true });
    getHash(file)
      .then(hash => {
        this.setState({
          hash,
          isUploading       : false,
          isUploadAuthentic : isAuthentic(hash)
        });
      });
  }

  onSignClick () {
    const { hash, password } = this.state;
    this.setState({ isUploading : true });
    sign(hash, password)
      .then(() => {
        this.setState({ 
          isUploading       : false,
          isUploadAuthentic : isAuthentic(hash)
        });
      });
  }

  render () {
    const { isUploading, isUploadAuthentic, hash } = this.state;

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
            { !isUploading && !!hash &&
              <div>
                { !isUploadAuthentic && 
                  <div>
                    <img src="assets/images/redx.png" style={{ width:190, height:180 }} />
                    <p style={{ color : 'red' }}>Could not validate the authenticity of this document</p> 
                  </div>
                }

                { isUploadAuthentic && 
                  <div>
                    <img id="greencheck" src="assets/images/greencheck.png" style={{ width : 190, height:180 }} />
                    <p style={{ color : 'green' }}>Document authenticity verified</p> 
                  </div>
                }
              </div>
            }

          </div>
        </div>

        {
          !!hash &&
          <div className="action">
            <button 
              className = "button" 
              onClick   = { this.onSignClick.bind(this) }>
              Sign Document
            </button>

            <br />

            <input 
              type        = "password" 
              style       = {{ width: 170 }} 
              placeholder = "Enter signing passphrase" 
            />

            <p style={{ clear: 'both' }}>
              Validator address: 
              <a href="https://testnet.etherscan.io/address/0xf4f5f2d52150b71fe4ba0821ac334e0261a63b68">0xf4f5f2d52150b71fe4ba0821ac334e0261a63b68</a>
            </p>

          </div>
        }
      </div>
    );
  }
}
