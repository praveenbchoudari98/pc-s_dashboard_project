import React,{Component} from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

class Table extends Component {
    render() {
        const style={
            textAlign:'center'
        }
        return (
            <div>
            
            <center>
            <table>
            <thead> 
            <tr> 
            <th>Sl No.</th> 
            <th>Image</th>
            <th>Full Name <i className="fas fa-sort" onClick={this.props.sortDBName} /></th>
            <th>Email<i className="fas fa-sort" onClick={this.props.sortDBEmail} /></th> 
            <th>Mobile No.<i className="fas fa-sort" onClick={this.props.sortDBPhone}/> </th> 
             <th>Edit</th>
             <th>Download</th>
             <th>Delete</th>
             </tr> 
             </thead>
             <tbody>
              {this.props.dataList.map((data,i) =>
                  <tr key={i}>
                     <td>{this.props.slNo+i+1}</td> 
                     <td><img style={{width:'100px',height:'100px'}} src={data.imageURL} alt='profile' /></td>
                     <td>{data.fullName}</td> 
                       <td> {data.email} </td> 
                       <td>{data.mobileNumber}</td> 
                       <td>
                       <EditIcon  style={style} className='icon' onClick={()=>{this.props.startEditing(i)}}/></td>
                       <td style={style}><i className='fa fa-download icon' onClick={()=>{this.props.createPDF(i)}} /></td>
                       <td  style={style}><DeleteIcon  className='icon' onClick={()=>{if(window.confirm('this data will be deleted')){this.props.removeData(i)};}} /> </td> 
                       </tr>      )}
                       </tbody>
                        </table> 
                        </center>
                       
                       
            </div>
        );
    }
}
export default Table;