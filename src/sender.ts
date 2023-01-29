import { WalletContractV4, TonClient } from 'ton';
import { mnemonicToPrivateKey } from 'ton-crypto';

import env from "./env"

export default async function getSender(client: TonClient) {
  const keyPair = await mnemonicToPrivateKey(env.deployer.mnemonic);
  const wallet = WalletContractV4.create({ workchain: 0, publicKey: keyPair.publicKey });
  const walletContract = client.open(wallet);

  return walletContract.sender(keyPair.secretKey);
}