import { TonClient } from "ton";
import env from "./env"

const client = new TonClient(env.toncenter);

export default client;