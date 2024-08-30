import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { AceButton } from "./MovingBorder";

export const AppBar = () => {
  const [ walletAddress, setWalletAddress ] = useState<string | null>(null);

  useEffect(() => {
    const address = localStorage.getItem('walletAddress');
    if (address) {
      setWalletAddress(address);
    }
  });

  return (
    <div className="w-full h-16 bg-white items-end flex px-4 sm:px-8 md:px-16 lg:px-20 justify-between">
                
        <div className="flex h-full">
        <h1 className="text-primaryGreen font-bold text-xl w-full flex items-center">FeatLink</h1>
        
        <div className="sm:flex h-full hidden ml-10">
          <NavBarItem pathname={location.pathname} link="/explore" title="Explore" />
          <NavBarItem pathname={location.pathname} link="/my-requests" title="My Feat Requests" />
        </div>
        </div>
        <div className="h-full flex items-center gap-3">
          <AceButton
              borderRadius="1.75rem"
              className="bg-white h-9 text-sm dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
            >
              Claim free <img src="/fire.png" alt="Fire" className="ml-2 h-5 w-5"/>
          </AceButton>
          <div className="h-9 gap-1 items-center flex border-2 rounded-full px-5 border-primaryGreen/50">
            <p className="font-bold text-lg">21</p>
            <img src="/fire.png" alt="Fire" className="h-5 w-5"/>
          </div>

          <Button variant={'outline'} size={'appBar'} className="bg-primaryGreen/10 border-primaryGreen/50 border-2 rounded-full">
                { walletAddress == null 
                  ? 'Connect Wallet' 
                  : `${walletAddress.slice(0, 10)}..`
                }
              </Button>
        </div>
          

    </div>
  );
}

interface NavBarItemProps {
  pathname: string;
  link: string;
  title: string;
}

export const NavBarItem = (args: NavBarItemProps) => {
  return (
      <Link to={args.link} className="h-full flex flex-col justify-between">
          <div></div> <div></div> <div></div>
          
          <Button className={`rounded-lg bg-white hover:bg-gray-100 font-semibold ${args.pathname == args.link ? ' text-black' : 'text-gray-500' } `}>{args.title}</Button>
          
          <div className={`h-0.5 ${args.pathname == args.link ? 'bg-black' : ''}`}></div>
      </Link>
  )
}