import React, { useState, useEffect } from 'react';
import StructStorageContract from '../contracts/StructStorage.json';
import getWeb3 from '../getWeb3';
import 'bootstrap/dist/css/bootstrap.min.css';



function Product(props) {
    const [storageValue, setStorageValue] = useState(undefined);
    const [web3, setWeb3] = useState(undefined);
    const [accounts, setAccounts] = useState(undefined);
    const [contract, setContract] = useState(undefined);
    const setStatus = (message) => {
        console.log(message);
    }
    const sb = (event) => {
        event.preventDefault();
        var lotNumber = document.getElementById("lotNumber").value;
        // var lotNumberStr = lotNumber.toString();
        var grade = document.getElementById("grade").value;
        var price = document.getElementById("price").value;
        var testDate = document.getElementById("testDate").value;
        var expiryDate = document.getElementById("expiryDate").value;
        
        console.log({ lotNumber, grade, price, testDate, expiryDate});
        var lotNumberBytes = web3.utils.toHex(lotNumber);
        var gradeBytes32 = web3.utils.toHex(grade);
        var testDateBytes32 = web3.utils.toHex(testDate);
        var expiryDateBytes32 = web3.utils.toHex(expiryDate);
        // console.log("contract : ",contract.methods);
        contract.methods.quality(lotNumberBytes, gradeBytes32, price, testDateBytes32, expiryDateBytes32).send({ from: accounts[0] }).then(()=>{
            setStatus("Transaction complete!");
        }).catch((e)=>{
            setStatus("Error setting value");
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
    //useEffect(()=>{
    // const load = async()=>{

    // }
    // if(typeof web3 !== 'undefined' && typeof accounts !== 'undefined' && typeof contract !== 'undefined'){
    //     load();
    // }
    // },[web3, accounts, contract])
    if (typeof web3 === 'undefined') {
        return <div className='alert alert-warning'>Loading Web3, accounts, and contract...</div>;
    }
    return (
        <div className='container'>
            <div className='row ' style={{ marginTop: '5px' }}>
                <div className='col-3'>
                    <a onClick={back} className='btn btn-danger'>Leave Farmer space</a>
                </div>
                <div className='col-6'><h3>Product Details</h3></div>
                <div className='col-3'>
                    <div>
                        <span className="badge bg-secondary">Public ID : {accounts} </span>
                    </div>
                </div>
            </div>

            <form onSubmit={e => { sb(e) }}>
                <div className='row ' style={{ marginTop: '20px' }}>
                    <div className='col-3'></div>
                    <div className='col-6' style={{ textAlign: 'left' }}><h3>Enter Details</h3></div>
                    <div className='col-3'></div>
                </div>
                <div className='row' style={{ marginTop: '10px' }}>
                    <div className='col-1'></div>
                    <div className='col-2'>
                        <label style={{ textAlign: 'left', width: '100%' }} htmlFor='lotNumber' className='form-label'>Lot number</label>
                    </div>
                    <div className='col-6'>
                        <input type='text' className='form-control' required id='lotNumber' />
                    </div>

                    <div className='col-3'></div>
                </div>
                <div className='row' style={{ marginTop: '15px' }}>
                    <div className='col-1'></div>
                    <div className='col-2'>
                        <label style={{ textAlign: 'left', width: '100%' }} htmlFor='grade' className='form-label'>Grade</label>
                    </div>
                    <div className='col-6'>
                        <input type='text' className='form-control' id='grade' required />
                    </div>

                    <div className='col-3'></div>
                </div>
                <div className='row' style={{ marginTop: '15px' }}>
                    <div className='col-1'></div>
                    <div className='col-2'>
                        <label style={{ textAlign: 'left', width: '100%' }} required className='form-label' htmlFor='price'>Price</label>
                    </div>
                    <div className='col-6'>
                        <input type='text' className='form-control' id='price' />
                    </div>

                    <div className='col-3'></div>
                </div>
                <div className='row' style={{ marginTop: '15px' }}>
                    <div className='col-1'></div>
                    <div className='col-2'>
                        <label style={{ textAlign: 'left', width: '100%' }} className='form-label' htmlFor='testDate'>Test date</label>
                    </div>
                    <div className='col-6'>
                        <input type='text' className='form-control' id='testDate' required />
                    </div>

                    <div className='col-3'></div>
                </div>
                <div className='row' style={{ marginTop: '15px' }}>
                    <div className='col-1'></div>
                    <div className='col-2'>
                        <label style={{ textAlign: 'left', width: '100%' }} className='form-label' htmlFor='expiryDate'>Expiry date</label>
                    </div>
                    <div className='col-6'>
                        <input type='text' className='form-control' id='expiryDate' required />
                    </div>

                    <div className='col-3'></div>
                </div>
                
                <div className='row' style={{ marginTop: '15px' }}>
                    <div className='col-4'></div>
                    <div className='col-4'>
                        <button style={{ width: '100%' }} type='submit' className='btn btn-success'>Submit</button>
                    </div>
                    <div className='col-4'></div>
                </div>
            </form>

        </div>
    )
}
export default Product;