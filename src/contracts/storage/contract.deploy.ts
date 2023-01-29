import { beginCell, contractAddress, toNano, Address } from "ton";
import { testAddress } from "ton-emulator";
import { StorageContract , storeDeployOk} from "./output/storage_StorageContract";
import { printAddress, printDeploy, printHeader } from "../../utils/print";
import { deploy } from "../../utils/deploy";
import env from '../../env';

(async () => {
    // Parameters
    let owner = Address.parse('EQBaRG--z81an0yB5pOMmArX9c5W3iHP-KNRzuQgErNRUemx'); // my deployer address
    let addrNone = Address.parse('kQD6bYmMzHZiTbMJoeCwVKYfKO_lUwKqu9xyBepREOAs7HAQ');
    let packed = beginCell().store(storeDeployOk({ $$type: 'DeployOk', queryId: 10n })).endCell(); // Replace if you want another message used
    let init = await StorageContract.init(owner, addrNone);
    let address = contractAddress(0, init);
    let deployAmount = toNano('0.05');
    let testnet = true;

    // Print basics
    printHeader('StorageContract');
    printAddress(address);
    
    // Do deploy
    // @q: how to deploy without error
    await deploy(init, deployAmount, packed, testnet)
})();