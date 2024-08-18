import "dotenv/config";
import { Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl, Transaction } from "@solana/web3.js";
import { keypair } from "./load-keypair";

const connection = new Connection(clusterApiUrl("devnet"));
console.log(`Connected to devnet`);

const publicKey = new PublicKey(keypair.publicKey);

const balanceInLamports = await connection.getBalance(publicKey);

const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
console.log(
    `The balance for the wallet at address ${publicKey} is: ${balanceInSOL}`
);

export { balanceInSOL };