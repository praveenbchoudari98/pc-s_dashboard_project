import React,{Component} from 'react';
class Limiters extends Component {
    render() {
        return (
            <div>
            <div className='entries'>
            <label htmlFor='entries'>Show <select id='entries' onChange={this.props.handleEntryChange}>
             <option value={20} selected>--Limit Entries--</option>
             <option value={10}>10</option>
             <option value={25}>25</option>
             <option value={50}>50</option>
             <option value={100}>100</option>
             </select> Entries
             </label>
             </div>
             <div className='optimize'>
           <input type='search' placeholder="Search" onChange={e=>this.props.handleSearchChange(e)}/>
             </div>
            </div>
        );
    }
}
export default Limiters;