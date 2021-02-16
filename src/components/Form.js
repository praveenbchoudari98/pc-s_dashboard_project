import React from 'react';
import './../css/Form.css';
import Uploader from './fileUploader'

class Form extends React.Component{
  notUploaded=(e)=>{
    alert("Your Image is not Uploaded")
    e.preventDefault();
  }
render(){
  
return(
      <div>
      <div className='formInput'>
      <form >
      <div className='row'>
      <div className='col-25'>
      <label htmlFor='fullName'>Full Name:</label>
      </div>
      <div className='col-75'>
      <input name='fullName' onChange={e =>this.props.handleChange(e)} placeholder='Full Name' id='field' type='text'  value={this.props.fullName} /><br/>
      </div>
      </div>
      <div className='row'>
      <div className='col-25'>
      <label htmlFor='email'>Email:</label>
      </div>
      <div className='col-75'>
      <input name='email' onChange={e => this.props.handleChange(e)} placeholder='Email' type='email'   value={this.props.email} /><br/>
      </div>
      </div>
    <div className="row">
    <div className="col-25">
      <label htmlFor="mobilenumber">Mobile No:</label>
    </div>
    <div className="col-75">
      <input  name='mobileNumber' onChange={e => this.props.handleChange(e)} placeholder='Mobile Number' type='text'   value={this.props.mobileNumber} />
    </div>
  </div>
    <div className="row">
    <div className="col-25">
      <label htmlFor="Image" >Upload Your Image:</label>
    </div>
    <div className="col-75">
      <Uploader 
       userName={this.props.fullName}  
       handleImageChange={this.props.handleImageChange}
       handleUpload={this.props.handleUpload}
       progress={this.props.progress}
      
      
      />
    </div>
  </div>
  <br/>
      <div className='row'>
      <input type='submit' value={this.props.buttonVal?('Submit'):('Update')}  onClick={(e) =>{this.props.uploaded||this.props.buttonVal===false? this.props.onSubmit(e):this.notUploaded(e)}}/>
      </div>
      </form>
      </div>
      </div>
  )
}
}
export default Form;