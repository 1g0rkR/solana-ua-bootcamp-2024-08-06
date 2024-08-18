import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import { keypair } from "../practice-2/load-keypair";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import { getExplorerLink } from "@solana-developers/helpers";

let sender = keypair;
const connection = new Connection(clusterApiUrl("devnet"));
console.log(`Our public key is: ${keypair.publicKey.toBase58()}`);

const tokenMintAccount = new PublicKey("EJsjipktkcwatQy4FJ1tJmfP96vxWMjHrTkG59tvS2h1");

// Oleksandr Pelykh
const recipient = new PublicKey("3UdMnyJDAUh1mbJGAbENJwLzvqcdp8nziCCwuv11DZk2");

const tokenAccount = await getOrCreateAssociatedTokenAccount(connection, sender, tokenMintAccount, recipient);

console.log(`Token Account: ${tokenAccount.address.toBase58()}`);

const link = getExplorerLink("address", tokenAccount.address.toBase58(), "devnet");

console.log(`Created token account: ${link}`);