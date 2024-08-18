import "dotenv/config.js";
import { Keypair } from "@solana/web3.js";
// import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import bs58 from "bs58";

const secretKeyString = process.env.SECRET_KEY;
if (!secretKeyString) {
    throw new Error('SECRET_KEY is not defined in the environment variables.');
}

const decodedSecretKey = bs58.decode(secretKeyString);

const secretKey = Uint8Array.from(decodedSecretKey);
const keypair = Keypair.fromSecretKey(secretKey);

// console.log(`Public key: ${keypair.publicKey.toBase58()}`);
// console.log(`Private key: ${keypair.secretKey}`);

export { keypair };
