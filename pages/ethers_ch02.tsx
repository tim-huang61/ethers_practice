import {ethers, formatEther, formatUnits, JsonRpcProvider} from "ethers";
import {useState} from "react";

const EthersCh01 = () => {

    const [mETH, setMETH] = useState<any>({});
    const [gETH, setGETH] = useState<any>({});

    const getBalance = async () => {
        try {
            const providerMainNet = ethers.getDefaultProvider('homestead');
            const mainEth = await providerMainNet.getBalance(`0x8bade563F26F6D6f134CFAC47563A953475156Cb`);
            const mainGasPrice = (await providerMainNet.getFeeData()).gasPrice;
            setMETH({
                balance: `${formatEther(mainEth)} ETH`,
                network: (await providerMainNet.getNetwork()).name,
                blockNumber: (await providerMainNet.getBlockNumber()),
                gasPrice: formatUnits(mainGasPrice ?? 0, 'gwei')
            });

            const apiKey = '4fe63c6beab842719be60b558bc032a3'
            const providerTestNet = new JsonRpcProvider(`https://goerli.infura.io/v3/${apiKey}`);
            const testEth = await providerTestNet.getBalance('0x8bade563F26F6D6f134CFAC47563A953475156Cb');
            const gasPrice = (await providerTestNet.getFeeData()).gasPrice;
            setGETH({
                balance: `${formatEther(testEth)} ETH`,
                network: (await providerTestNet.getNetwork()).name,
                blockNumber: (await providerTestNet.getBlockNumber()),
                gasPrice: formatUnits(gasPrice ?? 0, 'gwei')
            })
        } catch (error) {
            console.log(error);
        }
    }

    return <>
        <h1>EthersCh02</h1>
        <div>
            <button onClick={getBalance}>Query</button>
        </div>
        <div>
            <h3>ETH</h3>
            <p>Tim's Eth: {mETH?.balance}</p>
            <p>Network: {mETH?.network}</p>
            <p>BlockNumber: {mETH?.blockNumber}</p>
            <p>GasPrice: {mETH?.gasPrice}</p>
        </div>
        <div>
            <h3>GETH</h3>
            <p>Tim's Eth: {gETH?.balance}</p>
            <p>Network: {gETH?.network}</p>
            <p>BlockNumber: {gETH?.blockNumber}</p>
            <p>GasPrice: {gETH?.gasPrice}</p>
        </div>

    </>
}

export default EthersCh01;