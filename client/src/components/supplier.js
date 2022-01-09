import React, { useState, useEffect } from 'react';
import StructStorageContract from '../contracts/StructStorage.json';
import getWeb3 from '../getWeb3';
import 'bootstrap/dist/css/bootstrap.min.css';


function Supplier(props) {
    const [web3, setWeb3] = useState(undefined);
    const [accounts, setAccounts] = useState(undefined);
    const [contract, setContract] = useState(undefined);
    const [fid, setFid] = useState(undefined);
    const [fname, setFname] = useState(undefined);
    const [loc, setLoc] = useState(undefined);
    const [crop, setCrop] = useState(undefined);
    const [contact, setContact] = useState(undefined);
    const [quantity, setQuantity] = useState(undefined);
    const [exprice, setExprice] = useState(undefined);
    const [lotNb, setLotNb] = useState(undefined);
    const [grade, setGrade] = useState(undefined);
    const [mrp, setMrp] = useState(undefined);
    const [testd, setTestD] = useState(undefined);
    const [expD, setExpD] = useState(undefined);
    const [prodId, setProdId] = useState(undefined);
    const [pidHex, setPidHex] = useState(undefined);
    const [prov, setProv] = useState(undefined);
    const [provided, setProvided] = useState(undefined);
    const setStatus = (message) => {
        console.log(message);
    }
    const navigate = () => {
        props.history.push('/product');
    }
    const showProv = () => {
        setProv(true);
    }
    const provLot = (event) => {
        event.preventDefault();
        var lt = document.getElementById("lotNum").value;
        var suppId = document.getElementById("suppId").value;
        var suppName = document.getElementById("suppName").value;
        var pr = document.getElementById("pr").value;
        var strdate = document.getElementById("strdate").value;
        var ltBytes = web3.utils.toHex(lt);
        var suppIdBytes = web3.utils.toHex(suppId);
        var suppNameBytes = web3.utils.toHex(suppName);
        var strdateBytes = web3.utils.toHex(strdate);
        var p;
        contract.methods.getquality(ltBytes).call().then((value) => {
            p = value[6];
            console.log(p);
            if (p === true) {
                alert("This lot is already provided by an other supplier !")
            }
            else {
                contract.methods.provideLot(ltBytes, suppIdBytes, suppNameBytes, pr, strdateBytes).send({ from: accounts[0] }).then(() => {
                    setStatus("Transaction complete!");
                }).catch((e) => {
                    setStatus("Error : ");
                    console.log(e);
                });
                contract.methods.lotProvideChange(ltBytes).send({ from: accounts[0] }).then(() => {
                    setStatus("Transaction complete!");
                }).catch((e) => {
                    setStatus("Error : ");
                    console.log(e);
                });
            }
        })
        console.log(p);

    }
    const cgetQ = (lotNumBytes) => {
        setStatus("Initiating transaction... (please wait)");
        var prId;
        contract.methods.getquality(lotNumBytes).call().then((value) => {
            var ltNum = web3.utils.hexToAscii(value[0]);
            ltNum = ltNum.replaceAll("\x00", "");
            setLotNb(ltNum)

            prId = web3.utils.hexToAscii(value[1]);

            setProdId(prId);
            var pid = web3.utils.asciiToHex(prId)
            contract.methods.getproduce(pid).call().then((value) => {
                var farmerId = web3.utils.hexToAscii(value[0]);
                farmerId = farmerId.replaceAll("\x00", "");
                setFid(farmerId);
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
            var gd = web3.utils.hexToAscii(value[2]);
            gd = gd.replaceAll("\x00", "");
            setGrade(gd);
            var m = value[3];
            setMrp(m);
            var tDate = web3.utils.hexToAscii(value[4]);
            tDate = tDate.replaceAll("\x00", "");
            setTestD(tDate);
            var epd = web3.utils.hexToAscii(value[5]);
            epd = epd.replaceAll("\x00", "");
            setExpD(epd);
            var prv = value[6];
            if (prv === true) {
                setProvided("Yes");
            }
            else {
                setProvided("No");
            }
        }).catch(function (e) {
            console.log(e);
            setStatus("Error getting value.");
        });
    }
    const sb = (event) => {
        event.preventDefault();
        var lotNum = document.getElementById("lotNumber").value;
        var lotNumBytes = web3.utils.asciiToHex(lotNum);

        cgetQ(lotNumBytes);

        console.log(pidHex);
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
                setFid("")
                setLotNb("");
                setGrade("");
                setMrp("");
                setTestD("");
                setExpD("");

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
                    <a onClick={back} className='btn btn-danger'>Leave Supplier space</a>
                </div>
                <div className='col-6'><h3>Supplier space</h3></div>
                <div className='col-3'></div>
            </div>
            <div>
                <span class="badge bg-secondary">Public ID : {accounts} </span>
            </div>
            <form onSubmit={e => { sb(e) }}>
               
                <div className='row' style={{ marginTop: '10px' }}>
                    <div className='col-3'></div>
                    <div className='col-6'>
                        <input type='text' placeholder='Enter lot number' className='form-control' required id='lotNumber' />
                    </div>

                    <div className='col-3'></div>
                </div>
                <table className="table">
                    <tbody>
                        <tr className='row'>
                            <div className='col-3'></div>
                            <th style={{ textAlign: 'left' }} scope="row" className='col-3'>Product ID</th>
                            <td style={{ textAlign: 'left' }} className='col-3'>{prodId}</td>
                            <div className='col-3'></div>
                        </tr>
                        <tr className='row'>
                            <div className='col-3'></div>
                            <th style={{ textAlign: 'left' }} scope="row" className='col-3'>Farmer ID</th>
                            <td style={{ textAlign: 'left' }} className='col-3'>{fid}</td>
                            <div className='col-3'></div>
                        </tr>
                        <tr className='row'>
                            <div className='col-3'></div>
                            <th style={{ textAlign: 'left' }} scope="row" className='col-3'>Lot number</th>
                            <td style={{ textAlign: 'left' }} className='col-3'>{lotNb}</td>
                            <div className='col-3'></div>
                        </tr>
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
                        <tr className='row'>
                            <div className='col-3'></div>
                            <th style={{ textAlign: 'left' }} scope="row" className='col-3'>Grade</th>
                            <td style={{ textAlign: 'left' }} className='col-3'>{grade}</td>
                            <div className='col-3'></div>
                        </tr>
                        <tr className='row'>
                            <div className='col-3'></div>
                            <th style={{ textAlign: 'left' }} scope="row" className='col-3'>MRP</th>
                            <td style={{ textAlign: 'left' }} className='col-3'>{mrp}</td>
                            <div className='col-3'></div>
                        </tr>
                        <tr className='row'>
                            <div className='col-3'></div>
                            <th style={{ textAlign: 'left' }} scope="row" className='col-3'>Test date</th>
                            <td style={{ textAlign: 'left' }} className='col-3'>{testd}</td>
                            <div className='col-3'></div>
                        </tr>
                        <tr className='row'>
                            <div className='col-3'></div>
                            <th style={{ textAlign: 'left' }} scope="row" className='col-3'>Expiry date</th>
                            <td style={{ textAlign: 'left' }} className='col-3'>{expD}</td>
                            <div className='col-3'></div>
                        </tr>
                        <tr className='row'>
                            <div className='col-3'></div>
                            <th style={{ textAlign: 'left' }} scope="row" className='col-3'>Provided</th>
                            <td style={{ textAlign: 'left' }} className='col-3'>{provided}</td>
                            <div className='col-3'></div>
                        </tr>
                    </tbody>
                </table>
                <div className='row' style={{ marginTop: '15px' }}>
                    <div className='col-4'></div>
                    <div className='col-4'>
                        <button style={{ width: '100%' }} type='submit' className='btn btn-success'>Get Value</button>
                    </div>
                    <div className='col-4'></div>
                </div>
            </form>
            <div className='row' style={{ marginTop: '15px' }}>
                <div className='col-4'></div>
                <div className='col-4'>
                    <button onClick={showProv} style={{ width: '100%' }} type='submit' className='btn btn-success'>Provide a lot</button>
                </div>
                <div className='col-4'></div>
            </div>
            <div className='row'>
                {prov ?
                    <form onSubmit={provLot}>
                        <div className='row' style={{ marginTop: '10px' }}>
                            <div className='col-3'></div>
                            <div className='col-6'>
                                <input type='text' placeholder='Enter lot number' className='form-control' required id='lotNum' />
                            </div>
                            <div className='col-3'></div>
                        </div>
                        <div className='row' style={{ marginTop: '10px' }}>
                            <div className='col-3'></div>
                            <div className='col-6'>
                                <input type='text' placeholder='Enter supplier ID' className='form-control' required id='suppId' />
                            </div>
                            <div className='col-3'></div>
                        </div>
                        <div className='row' style={{ marginTop: '10px' }}>
                            <div className='col-3'></div>
                            <div className='col-6'>
                                <input type='text' placeholder='Enter supplier name' className='form-control' required id='suppName' />
                            </div>
                            <div className='col-3'></div>
                        </div>
                        <div className='row' style={{ marginTop: '10px' }}>
                            <div className='col-3'></div>
                            <div className='col-6'>
                                <input type='text' placeholder='Enter price' className='form-control' required id='pr' />
                            </div>
                            <div className='col-3'></div>
                        </div>
                        <div className='row' style={{ marginTop: '10px' }}>
                            <div className='col-3'></div>
                            <div className='col-6'>
                                <input type='text' placeholder='Enter storage date' className='form-control' required id='strdate' />
                            </div>
                            <div className='col-3'></div>
                        </div>
                        <div className='row' style={{ marginTop: '15px' }}>
                            <div className='col-4'></div>
                            <div className='col-4'>
                                <button style={{ width: '100%' }} type='submit' className='btn btn-success'>Provide</button>
                            </div>
                            <div className='col-4'></div>
                        </div>
                    </form> : null}
            </div>
        </div>
    )
}
export default Supplier;
