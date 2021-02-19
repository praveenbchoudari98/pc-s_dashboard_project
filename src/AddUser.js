import React from 'react';
import {firebaseDB,fireStorage,firebaseLooper} from './firebase'
import PaginationComponent from './components/Pagination';
import Navbar from './components/Navbar';
import Form from  './components/Form'
import './css/table.css';
import { jsPDF } from "jspdf";

class AddUser extends React.Component 
{
constructor() {
  super();
  this.state = {
    dataList: [],
    values: {
      fullName: '',
      email: '',
      mobileNumber: '',
      imageURL:''
    },
    image:null,
    uploaded:false,
    progress:0,
    filteredData:[],
    act: 0,
    index: '',
    active:1,
    pages:0,
    slNo:0
  }
}
componentDidMount() {
  let reference = firebaseDB.ref('data');
  let entries = parseInt(document.getElementById('entries').value);
  // fetch('https://fakerapi.it/api/v1/persons?_quantity=1&_gender=male&_birthday_start=2005-01-01').then((response) => response.json())
  //   .then(json => reference.push({
    //     fullName: json.data[0].firstname + ' ' + json.data[0].lastname,
    //     email: json.data[0].email,
  //     mobileNumber: json.data[0].phone,
  //     imageURL:json.data[0].image
  //   }))
  reference.on("value", snapshot => {
    let dataList=firebaseLooper(snapshot)
    this.setState({
      dataList,
      filteredData:dataList.filter((data,i)=>i<entries)
    },()=>{
      this.assignPage(this.state.dataList);
    });
  });
}
handleChange = (e) => {
  
  let input = e.target;
  this.setState(prevState => ({
    values: {
      ...prevState.values,
      [input.name]: input.value
    }
  }))
}
handleImageChange = e => {
  if (e.target.files[0]) {
    const image = e.target.files[0];
      this.setState({image});
  }
}
handleUpload = (e) => {
  e.preventDefault();
  const {image} = this.state;
  const uploadTask = fireStorage.ref(`images/${image.name}`).put(image);
  uploadTask.on('state_changed', (snapshot) => {
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      this.setState({progress});
    },
    (error)=>{
      console.log(error);
    },
    ()=>{fireStorage.ref('images').child(image.name).getDownloadURL().then(url => {
      this.setState(prevState=>({
        values:{
          ...prevState.values,
          imageURL:url
        },
        uploaded:true
      }) 
      ) 
    });
  })
}

onSubmit = e => {
  
  e.preventDefault();
  const input=document.getElementById('inputFile').files[0]
  document.getElementById('inputFile').value='';
  let reference = firebaseDB.ref('data');
  let {filteredData,index,values,active,pages} = this.state;
  if (this.state.act === 0) {
    reference.push(values);
    this.resetPage(pages);
  }
   else {
    if(input===undefined)
    {
      let url= filteredData[index].imageURL;
      let val = filteredData[index].email;
    reference.orderByChild('email').equalTo(val).on('value',snapshot=>{
      snapshot.forEach(snap=>{
      reference.child(snap.key).update({
      fullName: values.fullName,
      email: values.email,
      mobileNumber: values.mobileNumber,
      imageURL:url
    })
  })
    this.resetPage(active);
  })
  } 
  else
      {
        
      let val = filteredData[index].email;
      reference.orderByChild('email').equalTo(val).on('value',snapshot=>{
        snapshot.forEach(snap=>{
          reference.child(snap.key).update({
        fullName: values.fullName,
        email: values.email,
        mobileNumber: values.mobileNumber,
        imageURL:values.imageURL
      })
    })
    this.resetPage(active);
  })
  
}

}
}
resetPage=(active)=>{
  this.setState({
    values: {
      fullName: '',
      email: '',
      mobileNumber: '',
      imageURL:''
    },
    image:'',
    uploaded:false,
    progress:0,
    active:active,
    act: 0,
    index: '',
  },()=>{
    this.activePage(active);
  })
}
startEditing = (i) => {
  document.getElementById('field').focus();
  let entries = parseInt(document.getElementById('entries').value);
  let {filteredData}=this.state;
  const currentlyEditing = i;
  if (currentlyEditing > -1) {
    filteredData.forEach((data,id)=>{
      if (currentlyEditing === id)
      {
         
        this.setState({
          values: {
            fullName: data.fullName,
            email: data.email,
            mobileNumber: data.mobileNumber,
          },
          uploaded:true,
          act: 1,
          index: i,
          currentPage:i/entries
        })
      }
    })
  }      
}
assignPage=(dataList)=>{
  console.log(dataList);
  let entries=parseInt(document.getElementById('entries').value);
  this.setState({pages:Math.ceil(dataList.length/entries),
    filteredData:dataList.filter((data,i)=>i<entries)})
}

handleEntryChange = () => {
this.assignPage(this.state.dataList);
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
removeData = (i) => {
  let index = i;
  let reference = firebaseDB.ref('data');
  let {filteredData,active}=this.state;
  console.log(active);
  let val=filteredData[index].email;
    reference.orderByChild('email').equalTo(val).on('value',snapshot=>{
      snapshot.forEach(snap=>{
        reference.child(snap.key).remove();
      })
       this.resetPage(active);
    })
  }
   getDataUri=(url,cb)=>
{
  return new Promise(resolve => {
    var image = new Image();
    image.setAttribute('crossOrigin', 'anonymous');
    image.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = this.naturalWidth;
        canvas.height = this.naturalHeight; 

      
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        canvas.getContext('2d').drawImage(this, 0, 0);

        resolve(canvas.toDataURL('image/jpeg'));
    };

    image.src = url;
  });
}
createPDF=async (i)=>{
  const doc=new jsPDF('l','mm',[200,100]);
  doc.rect(5,5,190,90)
  let index = i;
  let reference = firebaseDB.ref('data');
  let {filteredData}=this.state;
  let val=filteredData[index].email;
    reference.orderByChild('email').equalTo(val).once('value').then(async (snapshot)=>{
      let data=[]
      snapshot.forEach(snap=>{
         data.push(snap.val())
})
doc.text(`Full Name  :           ${data[0].fullName}`,60,22)
doc.text(`Email         :           ${data[0].email}`,60,43)
doc.text(`Mobile No. :           ${data[0].mobileNumber}`,60,65)
const img=await this.getDataUri(data[0].imageURL)
doc.addImage(img,8,14,43,53)
doc.save(`${data[0].fullName} Details`)
    })
  }
  sortDBName=()=>{
    firebaseDB.ref('data').orderByChild('fullName').once('value').then(snapshot=>{
      const dataList=firebaseLooper(snapshot)
      this.setState({dataList,active:1},()=>{this.assignPage(this.state.dataList)})

    })
    }
    sortDBEmail=()=>{
      firebaseDB.ref('data').orderByChild('email').once('value').then(snapshot=>{
        const dataList=firebaseLooper(snapshot)
        this.setState({dataList,active:1},()=>{this.assignPage(this.state.dataList)})
    }
      )
      
    }
    sortDBPhone=()=>{
  
      firebaseDB.ref('data').orderByChild('mobileNumber').once('value').then(snapshot=>{
        const dataList=firebaseLooper(snapshot)
        this.setState({dataList,active:1},()=>{this.assignPage(this.state.dataList)})
    }
      )
  }


handleSearchChange = (e) => {
 let searchField=e.target.value;
  firebaseDB.ref("data").on("value", snapshot => {
    const dataList=firebaseLooper(snapshot)
    let filteredData=dataList.filter((data) => data.fullName.toLowerCase().includes(searchField.toLowerCase())).concat(dataList.filter((data, i) => data.email.toLowerCase().includes(searchField.toLowerCase())),dataList.filter((data) => data.mobileNumber.includes(searchField.toLowerCase())))
    this.setState({filteredData,active:1},()=>{
      this.assignPage(this.state.filteredData)
    })
})
}
    render() {
      const buttonVal=this.state.act===0;
      
               return ( 
                <div>
                <Navbar />
                <Form 
                buttonVal={buttonVal}
                fullName={this.state.values.fullName}
                email={this.state.values.email}
                mobileNumber={this.state.values.mobileNumber}
                handleChange={this.handleChange}
                handleImageChange={this.handleImageChange}
                handleUpload={this.handleUpload}
                progress={this.state.progress}
                uploaded={this.state.uploaded}
                onSubmit={this.onSubmit}

                />
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
 export default AddUser;