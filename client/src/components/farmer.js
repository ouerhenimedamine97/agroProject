import React, { useState, useEffect } from 'react';
import StructStorageContract from '../contracts/StructStorage.json';
import getWeb3 from '../getWeb3';
import 'bootstrap/dist/css/bootstrap.min.css';



function Farmer(props) {
    const [storageValue, setStorageValue] = useState(undefined);
    const [web3, setWeb3] = useState(undefined);
    const [accounts, setAccounts] = useState(undefined);
    const [contract, setContract] = useState(undefined);
    const setStatus = (message) => {
        console.log(message);
    }
    const sb = (event) => {
        event.preventDefault();
        var fid = document.getElementById("fid").value;
        var fname = document.getElementById("fname").value;
        var loc = document.getElementById("loc").value;
        var crop = document.getElementById("crop").value;
        var contact = parseInt(document.getElementById("contact").value);
        var quantity = parseInt(document.getElementById("quantity").value);
        var exprice = parseInt(document.getElementById("exprice").value);
        var fidBytes = web3.utils.toHex(fid);
        var fnameBytes32 = web3.utils.toHex(fname);
        var locBytes32 = web3.utils.toHex(loc);
        var cropBytes32 = web3.utils.toHex(crop);
        var add = accounts[0];
        contract.methods.produce(fidBytes, fnameBytes32, locBytes32, cropBytes32, contact, quantity, exprice).send({ from: accounts[0] }).then(()=>{
            setStatus("Transaction complete!");
        }).catch((e)=>{
            setStatus("Error : ");
            console.log(e);
        });
        contract.methods.fundaddr(accounts[0]).send({ from: accounts[0]}).then(()=>{
            setStatus("Account Funded!");
        }).catch((e)=>{
            setStatus("Error setting value");
            console.log(e);
        });
        //console.log({ fidBytes, fnameBytes32, locBytes32, cropBytes32 });
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
                <div className='col-6'><h3>Farmer Space</h3></div>
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
                        <label style={{ textAlign: 'left', width: '100%' }} htmlFor='fid' className='form-label'>Farmer ID</label>
                    </div>
                    <div className='col-6'>
                        <input type='text' className='form-control' required id='fid' />
                    </div>

                    <div className='col-3'></div>
                </div>
                <div className='row' style={{ marginTop: '15px' }}>
                    <div className='col-1'></div>
                    <div className='col-2'>
                        <label style={{ textAlign: 'left', width: '100%' }} htmlFor='fname' className='form-label'>Farmer name</label>
                    </div>
                    <div className='col-6'>
                        <input type='text' className='form-control' id='fname' required />
                    </div>

                    <div className='col-3'></div>
                </div>
                <div className='row' style={{ marginTop: '15px' }}>
                    <div className='col-1'></div>
                    <div className='col-2'>
                        <label style={{ textAlign: 'left', width: '100%' }} required className='form-label' htmlFor='loc'>Loaction</label>
                    </div>
                    <div className='col-6'>
                        <input type='text' className='form-control' id='loc' />
                    </div>

                    <div className='col-3'></div>
                </div>
                <div className='row' style={{ marginTop: '15px' }}>
                    <div className='col-1'></div>
                    <div className='col-2'>
                        <label style={{ textAlign: 'left', width: '100%' }} className='form-label' htmlFor='crop'>Crop name</label>
                    </div>
                    <div className='col-6'>
                        <input type='text' className='form-control' id='crop' />
                    </div>

                    <div className='col-3'></div>
                </div>
                <div className='row' style={{ marginTop: '15px' }}>
                    <div className='col-1'></div>
                    <div className='col-2'>
                        <label style={{ textAlign: 'left', width: '100%' }} className='form-label' htmlFor='contact'>Phone</label>
                    </div>
                    <div className='col-6'>
                        <input type='text' className='form-control' id='contact' />
                    </div>

                    <div className='col-3'></div>
                </div>
                <div className='row' style={{ marginTop: '15px' }}>
                    <div className='col-1'></div>
                    <div className='col-2'>
                        <label style={{ textAlign: 'left', width: '100%' }} className='form-label' htmlFor='quantity'>Quantity</label>
                    </div>
                    <div className='col-6'>
                        <input type='text' className='form-control' id='quantity' />
                    </div>

                    <div className='col-3'></div>
                </div>
                <div className='row' style={{ marginTop: '15px' }}>
                    <div className='col-1'></div>
                    <div className='col-2'>
                        <label style={{ textAlign: 'left', width: '100%' }} className='form-label' htmlFor='exprice'>Expected price</label>
                    </div>
                    <div className='col-6'>
                        <input type='text' className='form-control' id='exprice' />
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
export default Farmer;