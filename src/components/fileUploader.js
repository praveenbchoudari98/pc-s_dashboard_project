
const Uploader=(props)=> 
                <div>
                <input type="file" onChange={e=>props.handleImageChange(e)} id='inputFile' />
                <button style={{position:'relative',left:'-20%',top:'10%'}} onClick={(e)=>props.handleUpload(e)} >Upload</button>
              <progress value={props.progress}/><label>{props.progress}%</label>
                  </div>

            export default Uploader