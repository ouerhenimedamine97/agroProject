import React, { useState, useEffect } from 'react';
import StructStorageContract from '../contracts/StructStorage.json';
import getWeb3 from '../getWeb3';
import 'bootstrap/dist/css/bootstrap.min.css';


function QualityTesting(props) {
    
    const [web3, setWeb3] = useState(undefined);
    const [accounts, setAccounts] = useState(undefined);
    const [contract, setContract] = useState(undefined);
    
    const [fname, setFname] = useState(undefined);
    const [loc, setLoc] = useState(undefined);
    const [crop, setCrop] = useState(undefined);
    const [contact, setContact] = useState(undefined);
    const [quantity, setQuantity] = useState(undefined);
    const [exprice, setExprice] = useState(undefined);
    const [blockNum, setBlockNum] = useState(undefined);
    const [bl, setBl] = useState(undefined);
    const [aprDetail, setAprDetail] = useState(undefined);
    const setStatus = (message) => {
        console.log(message);
    }
    const navigate = () => {
        setAprDetail(true);
    }
    const printTransaction = async (txHash = null) => {
        var obj;
        if (txHash === null) {
            let tHash;
            await web3.eth.getBlock("latest").then((value) => {
                tHash = value.transactions[0];
            });
            await web3.eth.getTransaction(tHash).then((v) => {
                obj = {
                    hash: v.hash,
                    nonce: v.nonce,
                    blockHash: v.blockHash,
                    blockNumber: v.blockNumber,
                    transactionIndex: v.transactionIndex,
                    from: v.from,
                    to: v.to,
                    value: v.value,
                    gas: v.gas,
                    gasPrice: v.gasPrice,
                    input: v.input,
                };
            });
        }
        else {
            await web3.eth.getTransaction(txHash).then((v) => {
                obj = {
                    hash: v.hash,
                    nonce: v.nonce,
                    blockHash: v.blockHash,
                    blockNumber: v.blockNumber,
                    transactionIndex: v.transactionIndex,
                    from: v.from,
                    to: v.to,
                    value: v.value,
                    gas: v.gas,
                    gasPrice: v.gasPrice,
                    input: v.input,
                };
            });
        }
        console.table(obj);
    }
    const printBlock = async () => {
        var block;
        await web3.eth.getBlockNumber().then((v) => {
            block = v;
        });
        var obj;
        await web3.eth.getBlock(block).then((v) => {
            if (v.transactions.length > 1) {
                obj = {
                    blockNumber: block,
                    hash: v.hash,
                    parentHash: v.parentHash,
                    nonce: v.nonce,
                    sha3Uncles: v.sha3Uncles,
                    logsBloom: v.logsBloom,
                    transactionsRoot: v.transactionsRoot,
                    stateRoot: v.stateRoot,
                    miner: v.miner,
                    difficulty: v.difficulty,
                    totalDifficulty: v.totalDifficulty,
                    extraData: v.extraData,
                    size: v.size,
                    gasLimit: v.gasLimit,
                    gasUsed: v.gasUsed,
                    timestamp: v.timestamp,
                    transactions: v.transactions,
                    uncles: v.uncles
                }
            }
            else {
                obj = {
                    blockNumber: block,
                    hash: v.hash,
                    parentHash: v.parentHash,
                    nonce: v.nonce,
                    sha3Uncles: v.sha3Uncles,
                    logsBloom: v.logsBloom,
                    transactionsRoot: v.transactionsRoot,
                    stateRoot: v.stateRoot,
                    miner: v.miner,
                    difficulty: v.difficulty,
                    totalDifficulty: v.totalDifficulty,
                    extraData: v.extraData,
                    size: v.size,
                    gasLimit: v.gasLimit,
                    gasUsed: v.gasUsed,
                    timestamp: v.timestamp,
                    transactions: v.transactions[0],
                    uncles: v.uncles
                }
            }
        });
        console.table(obj);
        var tr;
        await web3.eth.getBlock(block).then((v) => {
            tr = v.transactions;
        })
        if (tr != null) {
            console.log("--- transactions ---");
            tr.forEach((e) => {
                printTransaction(e);
            })
        }
        setBlockNum(block);
        setBl(true);
    }
    const apr = (event) => {
        event.preventDefault();
        var lotNumber = document.getElementById("lotNumber").value;
        // var lotNumberStr = lotNumber.toString();
        var prodID = document.getElementById("prodId").value;
        var grade = document.getElementById("grade").value;
        var price = document.getElementById("price").value;
        var testDate = document.getElementById("testDate").value;
        var expiryDate = document.getElementById("expiryDate").value;
        
        //console.log({ lotNumber, grade, price, testDate, expiryDate});
        var lotNumberBytes = web3.utils.toHex(lotNumber);
        var prodIDBytes = web3.utils.toHex(prodID);
        var gradeBytes32 = web3.utils.toHex(grade);
        var testDateBytes32 = web3.utils.toHex(testDate);
        var expiryDateBytes32 = web3.utils.toHex(expiryDate);
        // console.log("contract : ",contract.methods);
        contract.methods.quality(lotNumberBytes, prodIDBytes, gradeBytes32, price, testDateBytes32, expiryDateBytes32).send({ from: accounts[0] }).then(()=>{
            setStatus("Transaction complete!");
        }).catch((e)=>{
            setStatus("Error setting value");
            console.log(e);
        });
    }
    const sb = (event) => {
        event.preventDefault();
        var pident = document.getElementById("pid").value;
        var pidBytes = web3.utils.asciiToHex(pident);
        contract.methods.getproduce(pidBytes).call().then((value) => {
            console.table(value);
            var farmerName = web3.utils.hexToAscii(value[1]);
            farmerName = farmerName.replaceAll("\x00", "");
            setFname(farmerName);
            var farmerLoc = web3.utils.hexToAscii(value[2]);
            farmerLoc = farmerLoc.replaceAll("\x00", "");
            setLoc(farmerLoc);
            var fCrop = web3.utils.hexToAscii(value[3]);
            fCrop = fCrop.replaceAll("\x00", "");
            setCrop(fCrop);
            var fContact = value[4];
            setContact(fContact);
            var quant = value[5];
            setQuantity(quant);
            var price = value[6];
            setExprice(price);
        }).catch(function (e) {
            console.log(e);
            setStatus("Error getting value; see log.");
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
                setFname("");
                setLoc("");
                setCrop("");
                setContact("")
                setQuantity("");
                setExprice("");
                setBl(false);
                setAprDetail(false);

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
                    <a onClick={back} className='btn btn-danger'>Leave quality testing space</a>
                </div>
                <div className='col-6'><h3>Quality Testing</h3></div>
                <div className='col-3'></div>
            </div>
            <div>
                <span class="badge bg-secondary">Public ID : {accounts} </span>
            </div>
            <form onSubmit={e => { sb(e) }}>
                <div className='row' style={{ marginTop: '15px' }}>
                    <div className='col-3'></div>
                    <div className='col-6'>
                        <input type='text' placeholder='Enter product ID' className='form-control' required id='pid' />
                    </div>

                    <div className='col-3'></div>
                </div>
                <table className="table">
                    <tbody>
                        <tr className='row'>
                            <div className='col-3'></div>
                            <th style={{ textAlign: 'left' }} scope="row" className='col-3'>Farmer name</th>
                            <td style={{ textAlign: 'left' }} className='col-3'>{fname}</td>
                            <div className='col-3'></div>
                        </tr>
                        <tr className='row'>
                            <div className='col-3'></div>
                            <th style={{ textAlign: 'left' }} scope="row" className='col-3'>Location</th>
                            <td style={{ textAlign: 'left' }} className='col-3'>{loc}</td>
                            <div className='col-3'></div>
                        </tr>
                        <tr className='row'>
                            <div className='col-3'></div>
                            <th style={{ textAlign: 'left' }} scope="row" className='col-3'>Crop</th>
                            <td style={{ textAlign: 'left' }} className='col-3'>{crop}</td>
                            <div className='col-3'></div>
                        </tr>
                        <tr className='row'>
                            <div className='col-3'></div>
                            <th style={{ textAlign: 'left' }} scope="row" className='col-3'>Phone</th>
                            <td style={{ textAlign: 'left' }} className='col-3'>{contact}</td>
                            <div className='col-3'></div>
                        </tr>
                        <tr className='row'>
                            <div className='col-3'></div>
                            <th style={{ textAlign: 'left' }} scope="row" className='col-3'>Quantity</th>
                            <td style={{ textAlign: 'left' }} className='col-3'>{quantity}</td>
                            <div className='col-3'></div>
                        </tr>
                        <tr className='row'>
                            <div className='col-3'></div>
                            <th style={{ textAlign: 'left' }} scope="row" className='col-3'>Expected price</th>
                            <td style={{ textAlign: 'left' }} className='col-3'>{exprice}</td>
                            <div className='col-3'></div>
                        </tr>
                    </tbody>
                </table>
                <div className='row' style={{ marginTop: '15px' }}>
                    <div className='col-4'></div>
                    <div className='col-4'>
                        <button style={{ width: '100%' }} type='submit' className='btn btn-success'>Submit</button>
                    </div>
                    <div className='col-4'></div>
                </div>
            </form>
            <div className='row' style={{ marginTop: '15px' }}>
                <div className='col-3'></div>
                <div className='col-3'>
                    <button onClick={printBlock} style={{ width: '100%' }} className='btn btn-secondary'>Print block</button>
                </div>
                <div className='col-3'>
                    <button type="button" className='btn btn-secondary w-100' onClick={e => printTransaction()} >Print Transaction</button>

                </div>
                <div className='col-3'></div>
            </div>
            <div className='row' style={{ marginTop: '15px' }}>
                <div className='col-3'></div>
                <div className='col-6'>
                    {bl ? <h3>Block Number : {blockNum}</h3> : null}
                </div>
                <div className='col-3'></div>
            </div>
            <div className='row' style={{ marginTop: '15px' }}>
                <div className='col-3'></div>
                <div className='col-6'>
                    <button onClick={navigate} style={{ width: '100%' }} className='btn btn-success'>Approve Details</button>
                </div>
                <div className='col-3'></div>
            </div>
            <div className='row'>
                {aprDetail ? 
                <form onSubmit={e => { apr(e) }}>
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
                <div className='row' style={{ marginTop: '10px' }}>
                    <div className='col-1'></div>
                    <div className='col-2'>
                        <label style={{ textAlign: 'left', width: '100%' }} htmlFor='lotNumber' className='form-label'>Product ID </label>
                    </div>
                    <div className='col-6'>
                        <input type='text' className='form-control' required id='prodId' />
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
            </form> : null}
            </div>
        </div>
    )
}
export default QualityTesting;
