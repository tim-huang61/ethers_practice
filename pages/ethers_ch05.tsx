import {Contract, ethers, JsonRpcProvider, Wallet, formatEther} from "ethers";
import {useState} from "react";

const EthersCh05 = () => {
    const [address, setAddress] = useState('');
    const [balance, setBalance] = useState('');
    const [wallet, setWallet] = useState<Wallet | null>(null);
    const abiWETH = [
        "function balanceOf(address) public view returns(uint)",
        "function deposit() public payable",
        "function transfer(address, uint) public returns (bool)",
        "function withdraw(uint) public",
    ];
    const addressWETH = '0xc778417e063141139fce010982780140aa0cd5ab'

    const getAddress = async () => {
        const provider = new JsonRpcProvider(`https://goerli.infura.io/v3/4fe63c6beab842719be60b558bc032a3`);
        const privateKey = '0x227dbb8586117d55284e26620bc76534dfbd2394be34cf4a09cb775d593b6f2b';
        const wallet = new Wallet(privateKey, provider);
        const contractWETH = new Contract(addressWETH, abiWETH, wallet);
        const address = await wallet.getAddress();
        setAddress(address);
        setBalance(formatEther(await provider.getBalance(address)));
    }

    return <>
        <h1>EthersCh05</h1>
        <div>
            {address ? <>
                <p>Address: {address}</p>
                <p>Balance: {balance}</p>
            </> : <button onClick={getAddress}>Get Address</button>}

        </div>
    </>
}

export default EthersCh05;