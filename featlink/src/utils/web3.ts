import { PublicKey } from "@solana/web3.js";
import nacl from "tweetnacl";
import toast from 'react-hot-toast';


type VerifyMessageProps = {
  signature: string;
  publicKey: string;
  message: string;
};

export const verifyMessage = async (props: VerifyMessageProps) => {
  try {
    const signatureUint8 = Uint8Array.from(atob(props.signature), (c) => c.charCodeAt(0));

    const pubKey = new PublicKey(props.publicKey).toBytes();

    const encodedMessage = new TextEncoder().encode(props.message);

    const isValid = nacl.sign.detached.verify(encodedMessage, signatureUint8, pubKey);

    console.log("Is the signature valid?: ", isValid);
  return isValid;
  } catch (error) {
    console.error("Error verifying message:", error);
    return false;
  }
};

export const signMessage = async (walletAddress: string): Promise<boolean> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const solana = (window as any).solana;

  if (solana) {
    try {
      const message = "Hello, Solana!";
      const encodedMessage = new TextEncoder().encode(message);

      const signedMessage = await solana.signMessage(encodedMessage, 'utf8');
      const signatureBase64 = signedMessage.signature.toString('base64');

      console.log("Signed message:", signatureBase64);

      return await verifyMessage({
        signature: signatureBase64,
        publicKey: walletAddress,
        message: message
      });
    } catch (error) {
      console.error("Error signing or verifying message:", error);
      toast.error('Could not verify your identity');
      return false;
    }
  } else {
    toast.error('Wallet not connected');
    return false;
  }
};

export const connectWallet = async () => {
  try {
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const solana = (window as any).solana;
  
    if (solana) {
      if (solana.isPhantom) {
        return await solana.connect({ onlyIfTrusted: false });
      } else {
        toast.error('Install Phantom Wallet to continue');
      }
    } else {
      toast.error('No Solana wallet found');
    }
  } catch (error) {
    console.log('Error connecting to wallet:', error);
    toast.error('Failed to connect to wallet');
  }
};