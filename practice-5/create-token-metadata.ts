import { createCreateMetadataAccountV3Instruction } from "@metaplex-foundation/mpl-token-metadata";
import { keypair } from "../practice-2/load-keypair";
import { clusterApiUrl, Connection, PublicKey, sendAndConfirmTransaction, Transaction } from "@solana/web3.js";
import { getExplorerLink } from "@solana-developers/helpers";

const sender = keypair;
const connection = new Connection(clusterApiUrl("devnet"));
console.log(`Our public key is: ${keypair.publicKey.toBase58()}`);

const TOKEN_METADATA_PROGRAM_ID = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");

const tokenMintAccount = new PublicKey("EJsjipktkcwatQy4FJ1tJmfP96vxWMjHrTkG59tvS2h1");

const metadataData = {
    name: "Solana UA Bootcamp 2024-08-06",
    symbol: "UAB-2",
    uri: "https://arweave.net/1234",
    sellerFeeBasisPoints: 0,
    creators: null,
    collection: null,
    uses: null,
};

const [metadataPDA, _metadataBump] = PublicKey.findProgramAddressSync(
    [
        Buffer.from("metadata"),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        tokenMintAccount.toBuffer(),
    ],
    TOKEN_METADATA_PROGRAM_ID
);

const transaction = new Transaction();

const createMetadataAccountInstruction = createCreateMetadataAccountV3Instruction(
    {
        metadata: metadataPDA,
        mint: tokenMintAccount,
        mintAuthority: sender.publicKey,
        payer: sender.publicKey,
        updateAuthority: sender.publicKey,
    },
    {
        createMetadataAccountArgsV3: {
            collectionDetails: null,
            data: metadataData,
            isMutable: true
        }
    }
);

transaction.add(createMetadataAccountInstruction);

await sendAndConfirmTransaction(connection, transaction, [sender]);

const tokenMintLink = getExplorerLink("address", tokenMintAccount.toString(), "devnet");
console.log(`Look at the token mint again: ${tokenMintLink}`);
