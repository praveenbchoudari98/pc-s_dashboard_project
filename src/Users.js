import React,{Component} from 'react';
import {firebaseDB,firebaseLooper} from './firebase'
import PaginationComponent from './components/Pagination';
import Navbar from './components/Navbar';
import './css/table.css';

class Users extends Component {
constructor(props) {
    super(props);
    this.state={
        dataList:[],
        dataLength:'',
        filteredData:[],
        act: 0,
        index: '',
        count:0,
        active:1,
        pages:0,
        slNo:0
}

}
    componentDidMount() {    
      let reference = firebaseDB.ref('data');
      let entries = parseInt(document.getElementById('entries').value);
     
      reference.on("value", snapshot => {
       let dataList=firebaseLooper(snapshot)
        this.setState({
          dataList,
          filteredData:dataList.filter((data,i)=>i<entries)
        },()=>{
          this.assignPage();
        });
      });
        }
        assignPage=()=>{
          let entries=parseInt(document.getElementById('entries').value);
          this.setState({pages:Math.ceil(this.state.dataList.length/entries),
            filteredData:this.state.dataList.filter((data,i)=>i<entries)})
        }
        
        handleEntryChange = () => {
        this.assignPage();
        }
        activePage=(i)=>{
        let entries=parseInt(document.getElementById('entries').value);
        let {pages}=this.state;
        if(i>pages)i=pages;
        if(i<1)i=1;
        let {filteredData}=this.state;
         filteredData=this.state.dataList.filter((data,num)=>{
                return num>=(entries*(i-1))&&num<(entries*i)
             }
        )
        this.setState({active:i,filteredData,slNo:entries*(i-1)})
        }
        
  sortDBName=()=>{
    firebaseDB.ref('data').orderByChild('fullName').once('value').then(snapshot=>{
      const dataList=firebaseLooper(snapshot)
          this.setState({dataList},()=>{this.assignPage()})

    })
    }
    sortDBEmail=()=>{
      firebaseDB.ref('data').orderByChild('email').once('value').then(snapshot=>{
        const dataList=firebaseLooper(snapshot)
          this.setState({dataList},()=>{this.assignPage()})
    }
      )
      
    }
    sortDBPhone=()=>{
  
      firebaseDB.ref('data').orderByChild('mobileNumber').once('value').then(snapshot=>{
        const dataList=firebaseLooper(snapshot)
        this.setState({dataList},()=>{this.assignPage()})
    }
      )
  }


handleSearchChange = (e) => {
 let searchField=e.target.value;
  firebaseDB.ref("data").on("value", snapshot => {
    const dataList=firebaseLooper(snapshot)
    let filteredData=dataList.filter((data) => data.fullName.toLowerCase().includes(searchField.toLowerCase())).concat(dataList.filter((data, i) => data.email.toLowerCase().includes(searchField.toLowerCase())),dataList.filter((data) => data.mobileNumber.includes(searchField.toLowerCase())))
    this.setState({filteredData});
  });
}
    render() {
      
               return ( 
                <div className='Users'>
                <Navbar />              
                <hr style={{border:'1px solid black'}} />
                <PaginationComponent 
               
                handleSearchChange={this.handleSearchChange}
                filteredData={this.state.filteredData}
                sortDBName={this.sortDBName}
                sortDBEmail={this.sortDBEmail}
                sortDBPhone={this.sortDBPhone}
                removeData={this.removeData}
                startEditing={this.startEditing}
                slNo={this.state.slNo}
                activePage={this.activePage}
                pages={this.state.pages}
                active={this.state.active}
                createPDF={this.createPDF}
                handleEntryChange={this.handleEntryChange}
                 dataList={this.state.filteredData}
            />
            </div>
        );
    }
}
export default Users;
