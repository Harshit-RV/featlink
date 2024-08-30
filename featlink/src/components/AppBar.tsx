import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export const AppBar = () => {
  const [ walletAddress, setWalletAddress ] = useState<string | null>(null);

  useEffect(() => {
    const address = localStorage.getItem('walletAddress');
    if (address) {
      setWalletAddress(address);
    }
  });

  return (
    <div className="w-full bg-primaryGreen h-16 items-center flex px-10 justify-between">
      <h1 className="text-white font-bold text-xl">FeatLink</h1>
      <Button variant={'secondary'} size={'appBar'}>
        { walletAddress == null 
          ? 'Connect Wallet' 
          : `${walletAddress.slice(0, 10)}..`
        }
      </Button>
    </div>
  );
}