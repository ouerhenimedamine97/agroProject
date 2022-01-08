import React, { useState, useEffect } from 'react';
import StructStorageContract from '../contracts/StructStorage.json';
import getWeb3 from '../getWeb3';
import 'bootstrap/dist/css/bootstrap.min.css';


function MicroFinance(props) {
    const [storageValue, setStorageValue] = useState(undefined);
    const [web3, setWeb3] = useState(undefined);
    const [accounts, setAccounts] = useState(undefined);
    const [contract, setContract] = useState(undefined);
    const [balance, setBalance] = useState(undefined);
    const setStatus = (message) => {
        console.log(message);
    }

    const sb = (event) => {
        event.preventDefault();
        var fident = document.getElementById("fid").value;
        var fidBytes = web3.utils.asciiToHex(fident);
        var lotNum = document.getElementById("lotNumber").value;
        var lotNumBytes = web3.utils.asciiToHex(lotNum);
        var amt = document.getElementById("fundAmount").value;
        var rc;
        contract.methods.getproduce(fidBytes).call().then((value) => {  
            rc = value[7];
        }).catch(function (e) {
            console.log(e);
            setStatus("Error getting value; see log.");
        });
        console.log(rc);
        contract.methods.sendCoin(rc, amt, accounts[0]).send({ from: accounts[0] }).then((value) => {
            console.log("Transaction complete!");
        }).catch((e) => {
            console.log(e);

        });
        contract.methods.getBalance(accounts[0]).call().then((value) => {
            setBalance(value);
            console.log("Balance Updated!");
        }).catch((e) => {
            setStatus("Error setting value.");
            console.log(e);
        });

    }
    const back = () => {
        props.history.push('/home');
    }
    useEffect(() => {
        const init = async () => {
            try {
                // Get network provider and web3 instance.
                const web3 = await getWeb3();

                // Use web3 to get the user's accounts.
                const accounts = await web3.eth.getAccounts();

                // Get the contract instance.
                const networkId = await web3.eth.net.getId();
                const deployedNetwork = StructStorageContract.networks[networkId];
                const contract = new web3.eth.Contract(
                    StructStorageContract.abi,
                    deployedNetwork && deployedNetwork.address,
                );
                // Set web3, accounts, and contract to the state
                setWeb3(web3);
                setAccounts(accounts);
                setContract(contract);
                console.log(typeof(accounts[0]));
                contract.methods.getBalance(accounts[0]).call().then((value) => {
                    setBalance(value);
                    console.log("Balance Updated!");
                }).catch((e) => {
                    setStatus("Error setting value.");
                    console.log(e);
                });

            } catch (error) {
                // Catch any errors for any of the above operations.
                alert(
                    `Failed to load web3, accounts, or contract. Check console for details.`,
                );
                console.error(error);
            }
        }
        init();
    }, []);
    if (typeof web3 === 'undefined') {
        return <div className='alert alert-warning'>Loading Web3, accounts, and contract...</div>;
    }
    return (
        <div className='container'>

            <div className='row ' style={{ marginTop: '5px' }}>
                <div className='col-3'>
                    <a onClick={back} className='btn btn-danger'>Leave Micro-Finance space</a>
                </div>
                <div className='col-6'><h3>Miro-Finance space</h3></div>
                <div className='col-3'></div>
            </div>
            <div>
                <span class="badge bg-secondary">Public ID : {accounts} </span>
            </div>
            <form onSubmit={e => { sb(e) }}>
                <div className='row' style={{ marginTop: '15px' }}>
                    <div className='col-3'></div>
                    <div className='col-6'>
                        <input type='text' placeholder='Enter farmer ID' className='form-control' required id='fid' />
                    </div>

                    <div className='col-3'></div>
                </div>
                <div className='row' style={{ marginTop: '10px' }}>
                    <div className='col-3'></div>
                    <div className='col-6'>
                        <input type='text' placeholder='Enter lot number' className='form-control' required id='lotNumber' />
                    </div>

                    <div className='col-3'></div>
                </div>
                <div className='row' style={{ marginTop: '10px' }}>
                    <div className='col-3'></div>
                    <div className='col-6'>
                        <input type='text' placeholder='Enter fund amount' className='form-control' required id='fundAmount' />
                    </div>

                    <div className='col-3'></div>
                </div>
                <table className="table">
                    <tbody>
                        <tr className='row'>
                            <div className='col-3'></div>
                            <th style={{ textAlign: 'left' }} scope="row" className='col-3'>Balance</th>
                            <td style={{ textAlign: 'left' }} className='col-3'>{balance}</td>
                            <div className='col-3'></div>
                        </tr>

                    </tbody>
                </table>
                <div className='row' style={{ marginTop: '15px' }}>
                    <div className='col-4'></div>
                    <div className='col-4'>
                        <button style={{ width: '100%' }} type='submit' className='btn btn-success'>Fund</button>
                    </div>
                    <div className='col-4'></div>
                </div>
            </form>

        </div>
    )
}
export default MicroFinance;
