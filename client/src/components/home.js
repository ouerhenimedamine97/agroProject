import React, { Component } from 'react';
import {BrowserRouter as Router, Routes, Route, Link, Switch} from 'react-router-dom';
export default class Home extends Component {
    navigate(path){
        this.props.history.push(path);
    }
    render() {
        return (
            <div>
                <div  className='text-center'><h2>Welcome to Agrochain !</h2></div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div onClick={()=> this.navigate('/farmer')} className="card" style={{  cursor: "pointer" }}>
                                <div className="card-body">
                                    <h5 className="card-title">Farmer</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div onClick={()=> this.navigate('/quality-testing')} className="card" style={{  cursor: "pointer" }}>
                                <div className="card-body">
                                    <h5 className="card-title">Quality Testing</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div onClick={()=> this.navigate('/customer')} className="card" style={{  cursor: "pointer" }}>
                                <div className="card-body">
                                    <h5 className="card-title">Customer</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-md-6">
                            <div onClick={()=> this.navigate('/supplier')} className="card" style={{  cursor: "pointer" }}>
                                <div className="card-body">
                                    <h5 className="card-title">Supplier</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div onClick={()=> this.navigate('/micro-finance')} className="card" style={{  cursor: "pointer" }}>
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