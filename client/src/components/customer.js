import React, { useState, useEffect } from 'react';
import StructStorageContract from '../contracts/StructStorage.json';
import getWeb3 from '../getWeb3';
import QRCode from 'qrcode';
import 'bootstrap/dist/css/bootstrap.min.css';


function Customer(props) {
    const [web3, setWeb3] = useState(undefined);
    const [accounts, setAccounts] = useState(undefined);
    const [contract, setContract] = useState(undefined);
    
    const [src, setSrc] = useState(undefined);
    const [qrCode, setQrCode] = useState(undefined);
    var ltNum;
    var suppName;
    var crop;
    var expiryDate;
    var price;
    var storageDate;
    var prodId;
    var grade;
    var farmerName;
    var ltNumBytes;
    var pidBytes;
    const setStatus = (message) => {
        console.log(message);
    }
    const navigate = () => {
        props.history.push('/product');
    }

    const getQRCode = () => {
        var info = "";
        info = "Lot number : " + ltNum + "\nSupplier name : " + suppName + "\nPrice : " + price + "\nExpiry date : " + expiryDate + "\nStorage date : " + storageDate + "\nCrop : " + crop + "\nGrade : " + grade + "\nProduct ID : " + prodId + "\nFarmer name : " + farmerName;
        QRCode.toDataURL(info).then((data)=>{
            setSrc(data)
            setQrCode(true)
        }) 
        
    }
   
    const getPrLot = async (lt) => {

        await contract.methods.getprovidedlot(lt).call().then((value) => {
            var lot = web3.utils.hexToAscii(value[0]);
            lot = lot.replaceAll("\x00", "");
            
            ltNum = lot;
            var spname = web3.utils.hexToAscii(value[2]);
            spname = spname.replaceAll("\x00", "");
           
            suppName = spname;
            var ltprice = value[3];
            
            price = ltprice;
            var dtstr = web3.utils.hexToAscii(value[4]);
            dtstr = dtstr.replaceAll("\x00", "");
            
            storageDate = dtstr;
            

        }).catch(function (e) {
            setStatus("Error ");
            console.log(e);
        });
        await contract.methods.getquality(ltNumBytes).call().then((value) => {
            var grd = web3.utils.hexToAscii(value[2]);
            grd = grd.replaceAll("\x00", "");
            grade = grd;
            pidBytes = value[1];
            var pid = web3.utils.hexToAscii(value[1]);
            pid = pid.replaceAll("\x00", "");
            prodId = pid;
            var expdate = web3.utils.hexToAscii(value[5]);
            expdate = expdate.replaceAll("\x00", "");
            expiryDate = expdate;

        }).catch(function (e) {
            setStatus("Error ");
            console.log(e);
        });
        await contract.methods.getproduce(pidBytes).call().then((value) => {
            var fname = web3.utils.hexToAscii(value[1]);
            fname = fname.replaceAll("\x00", "");
            farmerName = fname;
            var crp = web3.utils.hexToAscii(value[3]);
            crp = crp.replaceAll("\x00", "");
            crop = crp;
        }).catch(function (e) {
            setStatus("Error ");
            console.log(e);
        });
        getQRCode();

        
    }

    const sb = async (event) => {
        event.preventDefault();
        var lotNumber = document.getElementById("lotNumber").value;
        var lotNumberBytes = web3.utils.asciiToHex(lotNumber);
        ltNumBytes = lotNumberBytes;
        
        getPrLot(lotNumberBytes);
       
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
                
                setQrCode(false);

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
                    <a onClick={back} className='btn btn-danger'>Leave Customer space</a>
                </div>
                <div className='col-6'><h3>Customer space</h3></div>
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

                <div className='row' style={{ marginTop: '15px' }}>
                    <div className='col-4'></div>
                    <div className='col-4'>
                        <button style={{ width: '100%' }} type='submit' className='btn btn-success'>Get QR Code</button>
                    </div>
                    <div className='col-4'></div>
                </div>
            </form>
            <div>
                {qrCode ? <img src={src}></img> : null}
            </div>

        </div>
    )
}
export default Customer;
