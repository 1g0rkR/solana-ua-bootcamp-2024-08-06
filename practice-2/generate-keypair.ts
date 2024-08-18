import { keypairToSecretKeyJSON } from "@solana-developers/helpers";
import { Keypair } from "@solana/web3.js";

const keypair = Keypair.generate();
const secretKey_JSON = keypairToSecretKeyJSON(keypair);

console.log(`Public key: ${keypair.publicKey.toBase58()}`);
console.log(`Private key: ${secretKey_JSON}`);