import { AppBar } from "@/components/AppBar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type TabState = 'founder' | 'user';

export const UserLogin = () => {
  const navigate = useNavigate();
  const [ tabState, setTabState ] = useState<TabState>('founder');

  const [ walletAddress, setWalletAddress ] = useState<string | null>(null);
  const [walletStatus, setWalletStatus] = useState<'Disconnected' | 'Connected' | 'Signed'>('Disconnected');


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
   
    if (walletStatus === 'Signed') {
      navigate('/founder');
    } else {
      await connectWallet();
      await signMessage();
      navigate('/founder');
    }
  }


  return (
    <div className="h-screen flex-col flex justify-between items-center bg-gray-100">
      <div className="h-14 w-full">
        <AppBar/>
      </div>
      <div className="w-full px-4 sm:px-10 lg:w-[1000px] h-full flex flex-col gap-4 justify-center ">
        <h1 className="font-black hidden sm:flex text-xl sm:text-3xl">FeatLink</h1>

        <Tabs defaultValue={tabState} onValueChange={(value) => setTabState(value as TabState)}>
          <TabsList>
            <TabsTrigger value="founder">Founder</TabsTrigger>
            <TabsTrigger value="user">User</TabsTrigger>
          </TabsList>
        </Tabs>

        { tabState == 'founder' ? 
        <>
          <div className="flex text-4xl sm:text-6xl font-black flex-col gap-2 sm:gap-3 text-primaryGreen">
            <h2>Interact with Your Users.</h2>
            <h2>Reward brand loyalty and input.</h2>
          </div>
          <div className="flex flex-col text-md gap-3 sm:text-lg">
            <div>FeatLink is a platform that allows you to productively interact with your users in a way that makes your product better for them and everyone else.</div>
            <div>Increase customer satisfaction, increase sales and profit.</div>
          </div>
          <Button className="w-32 mt-4 bg-primaryGreen hover:bg-primaryGreen/70" onClick={onClick}>
            { walletStatus == 'Disconnected' ? 'Get Started' : walletStatus == 'Signed' ? "Dashboard" : '...'}
          </Button>
        </>
        :
        <>
          <div className="flex text-4xl sm:text-6xl font-black flex-col gap-2 sm:gap-3 text-primaryGreen">
            <h2>Make Your Favorite Products Better.</h2>
            <h2>Earn rewards for your input.</h2>
          </div>
          <div className="flex flex-col text-md gap-3 sm:text-lg">
            <div>FeatLink allows you to share your ideas and feedback to improve the products you use.</div>
            <div>Help shape the future of your favorite products and get rewarded for your contributions.</div>
          </div>
          <Button className="w-32 mt-4 bg-primaryGreen hover:bg-primaryGreen/70" onClick={onClick}>
            { walletStatus == 'Disconnected' ? 'Get Started' : walletStatus == 'Signed' ? "Dashboard" : '...'}
          </Button>
        </> }

        <div className="h-10"></div>
      </div>
    </div>
  );
}