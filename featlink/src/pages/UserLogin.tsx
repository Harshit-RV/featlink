import { AppBar } from "@/components/AppBar";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { connectWallet, signMessage } from "@/utils/web3";
import { createUser } from "@/utils/user.utils";


type TabState = 'founder' | 'user';

export const UserLogin = () => {
  const navigate = useNavigate();
  const [ tabState, setTabState ] = useState<TabState>('founder');

  const [ walletAddress, setWalletAddress ] = useState<string | null>(null);
  const [walletStatus, setWalletStatus] = useState<'Disconnected' | 'Connected' | 'Signed'>('Disconnected');
  
  useEffect(() => {
    if (walletAddress && walletStatus === 'Connected') {
      verifyWalletAndSetStatus(walletAddress);
    }
  }, [walletAddress, walletStatus]);

  useEffect(() => {
    if (localStorage.getItem('walletAddress')) {
      setWalletAddress(localStorage.getItem('walletAddress'));
      setWalletStatus('Signed');
    }
  }, []);

  const verifyWalletAndSetStatus = async (walletAddress : string ) => {
    const isValid =  await signMessage(walletAddress);
    if (isValid) {
      setWalletStatus('Signed');
      await createUser({ address: walletAddress });
      localStorage.setItem('walletAddress', walletAddress!);
      navigate(tabState === 'founder' ? '/founder' : '/explore');
    }
  }

  const onClick = async () => {
    if (walletStatus == 'Signed') {
      navigate(tabState === 'founder' ? '/founder' : '/explore');
      return;
    }
    const response = await connectWallet();
    await setWalletAddress(response.publicKey.toString());
    setWalletStatus('Connected');
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
          
        </> }
        <div className="flex gap-2">
            <Button className="w-32 mt-4 bg-primaryGreen hover:bg-primaryGreen/70" onClick={onClick}>
              { walletStatus == 'Disconnected' ? 'Get Started' : walletStatus == 'Signed' ? "Dashboard" : '...'}
            </Button>
            {walletAddress && <Button className="w-32 mt-4 text-primaryGreen bg-white hover:bg-gray-200 border-2 border-primaryGreen/80" 
              onClick={() => {
                localStorage.removeItem('walletAddress');
                window.location.reload();
              }}
              >
              Disconnect
            </Button>}
          </div>

        <div className="h-10"></div>
      </div>
    </div>
  );
}