import React,{Component} from 'react';
import './css/table.css'
import Navbar from './components/Navbar';

class Transactions extends Component {
constructor(props) {
    super(props);
    this.state={
        Transactions:[]
    }
}


    componentDidMount() {
        fetch('https://financialmodelingprep.com/api/v3/income-statement-as-reported/AAPL?period=quarter&limit=50&apikey=demo').then((response) => response.json()).then((json) => {
            this.setState({Transactions:json});
        });
        
    }
    render() {
        return (
            <div>
            <Navbar/>
            <center>
            <h1>Income Statement as Reported</h1>
            <br/><br/>
            <table ref='myTable'>
            <thead> 
            <tr> 
            <th>Sl No.</th> 
            <th>Date of Transaction</th> 
             <th>Cost Of Goods and Services Sold</th> 
             <th>Period</th> 
             <th>Gross Profit</th>
             <th>Net Income Loss</th>
             </tr> 
             </thead> 
             <tbody>
              {this.state.Transactions.map((data,i) =>
                  <tr key={i}>
                     <td>{i+1}</td> 
                     <td>{data.date}</td> 
                       <td> {data.costofgoodsandservicessold} </td> 
                       <td>{data.period}</td> 
                       <td>{data.grossprofit}</td> 
                       <td>{data.netincomeloss}</td> 
                        </tr>      
              )}
              
                       </tbody>
                        </table> 
                        </center>
            </div>
        );
    }
}
export default Transactions;
