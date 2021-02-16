import React, {Component} from 'react';

class Uploader extends Component {
 
    
    render() {
            return (
                <div>
                <input type="file" onChange={e=>this.props.handleImageChange(e)} id='inputFile' />
                <button style={{position:'relative',left:'-20%',top:'10%'}} onClick={(e)=>this.props.handleUpload(e)} >Upload</button>
              <progress value={this.props.progress}/><label>{this.props.progress}%</label>
                  </div>
              );
          }
            }
            export default Uploader