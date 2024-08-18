import { mintTo } from "@solana/spl-token";
import { keypair } from "../practice-2/load-keypair";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { getExplorerLink } from "@solana-developers/helpers";

const sender = keypair;
const connection = new Connection(clusterApiUrl("devnet"));
console.log(`Our public key is: ${keypair.publicKey.toBase58()}`);

const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);

const tokenMintAccount = new PublicKey("EJsjipktkcwatQy4FJ1tJmfP96vxWMjHrTkG59tvS2h1");

const recipientAssociatedTokenAccount = new PublicKey("Dk1LCgDqSheVivK8ZtamYt75PfPTEpSFemU79Sg4SZqv");

const transactionSignature = await mintTo(connection, sender, tokenMintAccount, recipientAssociatedTokenAccount, sender, 10 * MINOR_UNITS_PER_MAJOR_UNITS);

const link = getExplorerLink("transaction", transactionSignature, "devnet");

console.log(`Success! Ming Token Transaction: ${link}`);