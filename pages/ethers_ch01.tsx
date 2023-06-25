import {ethers, formatEther} from "ethers";
import {useState} from "react";

const EthersCh01 = () => {

    const [balance, setBalance] = useState('');

    const getBalance = async () => {
        try {
            const provider = ethers.getDefaultProvider('homestead');
            const eth = await provider.getBalance(`vitalik.eth`);
            setBalance(`${formatEther(eth)} ETH`);
        } catch (error) {
            console.log(error);
        }
    }

    return <>
        <h1>EthersCh01</h1>
        <div>
            <button onClick={getBalance}>Get Vitalik's Eth</button>
            <div>
                <p>Vitalik's Eth: {balance}</p>
            </div>
        </div>
    </>
}

export default EthersCh01;