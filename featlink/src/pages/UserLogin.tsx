import { AppBar } from "@/components/AppBar";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserLogin = () => {
  const navigate = useNavigate();

  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletStatus, setWalletStatus] = useState<'Disconnected' | 'Connected' | 'Signed'>('Disconnected');

  useEffect(() => {});

  const signMessage = async () => {
    const { solana } = window;

    if (solana) {
      const message = "Hello, Solana!";
      const encodedMessage = new TextEncoder().encode(message);

      const signedMessage = await solana.signMessage(encodedMessage, 'utf8');

      console.log("Signed message:", signedMessage.signature.toString('base64'));
      setWalletStatus('Signed');
      return;
    }
  }
  
  const connectWallet = async () => {
    try {
      const { solana } = window;
      if (solana) {
        if (solana.isPhantom) {
          const response = await solana.connect({ onlyIfTrusted: false });

          setWalletAddress(response.publicKey.toString());
          localStorage.setItem('walletAddress', response.publicKey.toString());
          setWalletStatus('Connected');
        } else {
          alert("Please install phantom wallet");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onClick = async () => {
    await connectWallet();
    await signMessage();

    if (walletStatus === 'Signed') {
      navigate('/founder');
    }
  }


  return (
    <div className="h-full flex-col flex justify-between items-center bg-gray-50">
      <AppBar/>
      <div className="w-[1000px] h-full flex flex-col gap-5 justify-center ">
        <h1 className="font-black text-3xl">FeatLink</h1>
        <div className="flex flex-col gap-3 text-primaryGreen">
          <h2 className="text-6xl font-black">Interact with Your Users.</h2>
          <h2 className="text-6xl font-black">Reward brand loyalty and input.</h2>
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-lg">FeatLink is a platform that allows you to productively interact with your users in a way that makes your product better for them and everyone else.</div>
          <div className="text-lg">Increase customer satisfaction, increase sales and profit.</div>
        </div>
        <Button className="w-32 mt-4 bg-green-600 hover:bg-green-600/70" onClick={walletAddress =='Signed' ? () => navigate('/founder') : onClick}>
           { walletStatus == 'Disconnected' ? 'Get Started' : walletStatus == 'Signed' ? "Dashboard" : '...'}
        </Button>
        <div className="h-10"></div>
      </div>
    </div>
  );
}