import { beginCell, contractAddress, toNano, Address } from "ton";
import { testAddress } from "ton-emulator";
import { StorageContract , storeDeployOk} from "./output/storage_StorageContract";
import { printAddress, printDeploy, printHeader } from "../../utils/print";
import { deploy } from "../../utils/deploy";
import env from '../../env';
import client from '../../client';
import getSender from '../../sender';

(async () => {
  let contract = StorageContract.fromAddress(Address.parse('kQCgTH4LRC_WBgF82JpIpP9jeyDu-AFwIcjhKiSX5-c2M9Ro'));
  let provider = client.provider(contract.address, contract.init ?? null);
  let sender = await getSender(client)

  // await contract.send(provider, sender, {
  //   value: toNano('0.05'),
  //   bounce: true
  // }, {
  //   $$type: 'SetAddress',
  //   query_id: 10n,
  //   address: Address.parse('kQCgTH4LRC_WBgF82JpIpP9jeyDu-AFwIcjhKiSX5-c2M9Ro')
  // })

  await contract.send(provider, sender, {
    value: toNano('0.05'),
    bounce: true
  }, {
    $$type: 'RequestInfo',
    query_id: 10n,
  })


  let owner = await contract.getOwner(provider);
  let address = await contract.getAddress(provider);
 
  // Print basics
  printHeader('StorageContract');
  printAddress(owner);  
  printAddress(address);  
})();