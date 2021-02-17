import React,{Component} from 'react';
import Pagination from 'react-bootstrap/Pagination';
import Table from './Table';
import Limiters from './Limiters';

class PaginationComponent extends Component {
  
render() {
         
        let items=[]
        for (let i=1;i<=this.props.pages;i++){
            items.push(
            <Pagination.Item onClick={()=>{this.props.activePage(i)}} active={i===this.props.active}  key={i}>{i}</Pagination.Item>)
        }
       
        return (
            <div>
            <Limiters
            handleEntryChange={this.props.handleEntryChange}
            handleSearchChange={this.props.handleSearchChange}
            />
            <Table
               sortDBName={this.props.sortDBName}
                sortDBEmail={this.props.sortDBEmail}
                sortDBPhone={this.props.sortDBPhone}
                dataList={this.props.filteredData}
                removeData={this.props.removeData}
                startEditing={this.props.startEditing}
                createPDF={this.props.createPDF}
                slNo={this.props.slNo}
              />
                <Pagination style={{width:'100%'}}>
                <Pagination.First onClick={()=>this.props.activePage(1)}/>
                <Pagination.Prev onClick={()=>this.props.activePage(this.props.active-1)}/>
                {items}
                <Pagination.Next onClick={()=>this.props.activePage(this.props.active+1)}/>
                <Pagination.Last onClick={()=>this.props.activePage(this.props.pages)}/>
                </Pagination>
            
            </div>
        );
    }
}
export default PaginationComponent;