import {useState} from "react";
import {formatEther, JsonRpcProvider, BrowserProvider, parseEther, JsonRpcSigner} from "ethers";

const EthersCh04 = () => {

    const [sendAddress, setSendAddress] = useState('');
    const [address, setAddress] = useState('');
    const [balance, setBalance] = useState('');
    const [network, setNetwork] = useState('');
    const [rpcSigner, setRpcSigner] = useState<JsonRpcSigner | undefined>(undefined);

    const connectWallet = async () => {
        try {
            // @ts-ignore
            const provider = new BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            setRpcSigner(signer);
            setAddress(await signer.getAddress());
            setNetwork((await provider.getNetwork()).name);
            const balance = await provider.getBalance(await signer.getAddress());
            setBalance(`${formatEther(balance)} ETH`);
        } catch (error) {
            console.log(error);
        }
    }

    const sendTransaction = async () => {
        if (!sendAddress) {
            alert('请输入地址');
            return;
        }

        if (rpcSigner){
            const receipt = await rpcSigner.sendTransaction({
                to: sendAddress,
                value: parseEther("0.001")
            });
            console.log('receipt: ', receipt);
            await receipt.wait();
            alert('完成交易');
        }
    }

    return <>
        <h1>Send ETH</h1>

        <div>
            <button onClick={connectWallet}>Connect Wallet</button>
            <div>
                <p>Network: {network}</p>
                <p>Wallet Address: {address}</p>
                <p>Balance: {balance}</p>
            </div>
        </div>

        <div>
            <input onBlur={({target}) => {
                setSendAddress(target.value)
            }}/>
            <br/>
            <br/>
            <button onClick={sendTransaction}>Send 0.001 GETH</button>
        </div>
    </>
}

export default EthersCh04;