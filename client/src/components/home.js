import React, { Component } from 'react';

export default class Home extends Component {
    navigate(path){
        this.props.history.push(path);
    }
    render() {
        var cl = {
            height:" 150px",
    width: "150px",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "10px"
        }
        return (
            <div>
                <div  className='text-center' style={{marginTop : "20px"}}><h2>Welcome to Agrochain !</h2></div>
                <div className="container" style={{marginTop : "50px"}}>
                    <div className="row">
                        <div className="col-md-4">
                            <div onClick={()=> this.navigate('/farmer')} className="card" style={{  cursor: "pointer" }}>
                                <img style={cl} src='farmer.png'/>
                                <div className="card-body">
                                    <h5 className="card-title">Farmer</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div onClick={()=> this.navigate('/quality-testing')} className="card" style={{  cursor: "pointer" }}>
                            <img style={cl} src='quality.png'/>
                                <div className="card-body">
                                    <h5 className="card-title">Quality Testing</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div onClick={()=> this.navigate('/customer')} className="card" style={{  cursor: "pointer" }}>
                            <img style={cl} src='customer.png'/>
                                <div className="card-body">
                                    <h5 className="card-title">Customer</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-md-6">
                            <div onClick={()=> this.navigate('/supplier')} className="card" style={{  cursor: "pointer" }}>
                            <img style={cl} src='supplier.png'/>
                                <div className="card-body">
                                    <h5 className="card-title">Supplier</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div onClick={()=> this.navigate('/micro-finance')} className="card" style={{  cursor: "pointer" }}>
                            <img style={cl} src='micro-finance.png'/>
                                <div className="card-body">
                                    <h5 className="card-title">Micro-Finance</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}