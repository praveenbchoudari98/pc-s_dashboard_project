const Limiters=(props)=>
            <div>
            <div className='entries'>
            <label htmlFor='entries'>Show <select id='entries' onChange={props.handleEntryChange}>
             <option value={20} defaultValue>20</option>
             <option value={10}>10</option>
             <option value={25}>25</option>
             <option value={50}>50</option>
             <option value={100}>100</option>
             </select> Entries(per page)
             </label>
             </div>
             <div className='optimize'>
           <input type='search' placeholder="Search" onChange={e=>props.handleSearchChange(e)}/>
             </div>
            </div>
export default Limiters;