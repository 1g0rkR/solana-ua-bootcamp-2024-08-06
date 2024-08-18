import "dotenv/config";
import { getExplorerLink } from "@solana-developers/helpers";
import { Keypair, clusterApiUrl, Connection } from "@solana/web3.js";
import { keypair } from "../practice-2/load-keypair";
import { createMint } from "@solana/spl-token";

const sender = keypair;

const connection = new Connection(clusterApiUrl("devnet"));

console.log(`Our public key is: ${keypair.publicKey.toBase58()}`);

const tokenMint = await createMint(connection, sender, sender.publicKey, null, 2);

const link = getExplorerLink("address", tokenMint.toString(), "devnet");

console.log(`Token Mint: ${link}`);