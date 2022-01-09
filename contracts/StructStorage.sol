pragma solidity ^0.5.0;

contract StructStorage {

    uint256 public s = 1; 
    uint256 public c;
    uint256 public t=1;
    mapping (address => uint) balances;
    mapping (bytes => address) addresses;

    function fundaddr(address addr) public{
        balances[addr] = 2000;
    }

        function sendCoin(address receiver, uint amount, address sender) public returns(bool sufficient){
        
        
        if (balances[sender] < amount) 
        return false;
        
        balances[sender] -= amount;
        balances[receiver] += amount;
        
                        
        return true;
        
    }

    function getBalance(address addr) view public returns(uint){
        return balances[addr];
    }
struct product {
   
    bytes prodid;
    bytes fid;
    bytes32 fname;
    bytes32 loc;
    bytes32 crop;
    uint256 contact;
    uint quantity;
    uint exprice;
}

struct lot {

    bytes lotno;
    bytes prodid;
    bytes grade;
    uint mrp;
    bytes32 testdate;
    bytes32 expdate;
    bool provided;
}
struct providedLot {
    bytes lotno;
    bytes supplierId;
    bytes32 supplierName;
    uint price;
    bytes32 storageDate;

}
address public tester;
address owner;

mapping (bytes => product) p1;
product[] public pd;

mapping (bytes => lot) l1;
lot[] public l;

mapping(bytes => providedLot) pl1;
providedLot[] public pl;



function produce(bytes memory pid, bytes memory fid, bytes32 name, bytes32 loc, bytes32 cr, uint256 con, uint q, uint pr) public{
               
        StructStorage.product memory pnew = product(pid,fid,name,loc,cr,con,q,pr);
        p1[pid] = pnew;
        pd.push(pnew);
        s++;
  
}
function saveAddress(bytes memory id, address ad) public{
        addresses[id]=ad;
}
function getAddresse(bytes memory id) public view returns(address){
    return addresses[id];
}
 function getproduce(bytes memory j) public view returns(bytes memory,bytes32,bytes32,bytes32,uint256,uint,uint) {
        return (p1[j].fid,p1[j].fname,p1[j].loc,p1[j].crop,p1[j].contact,p1[j].quantity,p1[j].exprice);
    }
 function quality(bytes memory ll, bytes memory pid, bytes memory g, uint256 p, bytes32 tt, bytes32 e) public{
    
        StructStorage.lot memory lnew=lot(ll,pid,g,p,tt,e,false);
        l1[ll]=lnew;
        l.push(lnew);
        t++;
  
 }  
 function lotProvideChange(bytes memory k) public{
     l1[k].provided=true;
 }
 function getquality(bytes memory k) public view returns(bytes memory,bytes memory,bytes memory,uint,bytes32,bytes32,bool) {
     return(l1[k].lotno,l1[k].prodid,l1[k].grade,l1[k].mrp,l1[k].testdate,l1[k].expdate,l1[k].provided);
     
 }

 function provideLot (bytes memory j,bytes memory suppid,bytes32 suppname,uint pr,bytes32 dt) public{
     StructStorage.providedLot memory plnew = providedLot(j,suppid,suppname,pr,dt);
     pl1[j]=plnew;
     pl.push(plnew);
 }
 function getprovidedlot(bytes memory m) public view returns(bytes memory,bytes memory,bytes32,uint,bytes32){
     return (pl1[m].lotno,pl1[m].supplierId,pl1[m].supplierName,pl1[m].price,pl1[m].storageDate);
 }
}
