import "dotenv/config";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, clusterApiUrl, Connection, sendAndConfirmTransaction, TransactionInstruction } from "@solana/web3.js";
import { keypair } from "../practice-2/load-keypair";

const sender = keypair;

const connection = new Connection(clusterApiUrl("devnet"));

console.log(`Our public key is: ${keypair.publicKey.toBase58()}`);

// Oleksandr Pelykh
const recipient = new PublicKey("3UdMnyJDAUh1mbJGAbENJwLzvqcdp8nziCCwuv11DZk2");
console.log(`Attempting to send 0.01 SOL to ${recipient.toBase58()}...`);

const transaction = new Transaction();

const sendSolInstruction = SystemProgram.transfer({ fromPubkey: sender.publicKey, toPubkey: recipient, lamports: 0.01 * LAMPORTS_PER_SOL });

transaction.add(sendSolInstruction);

const memoProgram = new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr");

const memoText = "Hello from Ihor Kr!";

const addMemoInstruction = new TransactionInstruction({ keys: [{ pubkey: sender.publicKey, isSigner: true, isWritable: true }], data: Buffer.from(memoText, "utf-8"), programId: memoProgram });

transaction.add(addMemoInstruction);
console.log(`memo is: ${memoText}`);

const signature = await sendAndConfirmTransaction(connection, transaction, [sender]);

console.log(`Transaction confirmed, signature: ${signature}!`);