import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { AceButton } from "./MovingBorder";
import { getUserByAddress, updateUserDailyClaimDate, updateUserFeatCoinBalance } from "@/utils/user.utils";
import { UserDoc } from "@/types/user.types";

export const AppBar = () => {
  const [ walletAddress, setWalletAddress ] = useState<string | null>(null);
  const [ userData, setUserData ] = useState<UserDoc | null>(null);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     const address = localStorage.getItem('walletAddress');
  //     console.log(address);
  //     if (address) {
  //       setWalletAddress(address);
  //     }
  //     fetchUser();
  //   }, 10000);

  //   // Cleanup function to clear the interval
  //   return () => clearInterval(intervalId);
  // });

  useEffect(() => {
      const address = localStorage.getItem('walletAddress');
      console.log(address);
      if (address) {
        setWalletAddress(address);
      }
      fetchUser();
  });

  const fetchUser = async () => {
    if (walletAddress == null) return;
    const data = await getUserByAddress(walletAddress);
    console.log(data);
    setUserData(data);
  }

  function isToday(mongoDateUTC: Date | undefined): boolean {
    if (mongoDateUTC === null || mongoDateUTC == undefined) return false;
    const localDate = new Date(mongoDateUTC);
  
    const today = new Date();
  
    return (
      localDate.getFullYear() === today.getFullYear() &&
      localDate.getMonth() === today.getMonth() &&
      localDate.getDate() === today.getDate()
    );
  }

  const claimDailyFeatCoin = async () => {
    if (walletAddress == null) return;
    await updateUserDailyClaimDate(String(userData?._id));
    await updateUserFeatCoinBalance(String(userData?._id), 10);
    fetchUser();
  }
  

  return (
    <div className="w-full h-16 bg-white items-end flex px-4 sm:px-8 md:px-16 lg:px-20 justify-between">
                
        <div className="flex h-full">
        <h1 className="text-primaryGreen font-bold text-xl w-full flex items-center">FeatLink</h1>
        
        <div className="sm:flex h-full hidden ml-10">
          <NavBarItem pathname={location.pathname} link="/explore" title="Explore" />
          <NavBarItem pathname={location.pathname} link="/my-requests" title="My Feat Requests" />
          <NavBarItem2 pathname={location.pathname} link="/founder" title="Founders' View" />
        </div>
        </div>
        <div className="h-full flex items-center gap-3">
          {isToday(userData?.latestDailyClaimDate) == false && <AceButton
              borderRadius="1.75rem"
              className="bg-white h-9 text-sm dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
              onClick={claimDailyFeatCoin}
            >
              Claim free <img src="/fire.png" alt="Fire" className="ml-2 h-5 w-5"/>
          </AceButton>}
          <div className="h-9 gap-1 items-center flex border-2 rounded-full px-5 border-primaryGreen/50">
            
            {userData == undefined || userData == null  
              ? <p className="font-bold text-lg w-4 bg-gray-100"></p> 
              : <p className="font-bold text-lg text-black">{userData.featCoinBalance}</p>
            }
            
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

export const NavBarItem2 = (args: NavBarItemProps) => {
  return (
      <Link to={args.link} className="h-full flex ml-3 flex-col justify-between">
          <div></div> <div></div> <div></div>
          
          <Button className={`rounded-lg bg-white hover:bg-gray-100  border-2 border-primaryGreen/50 font-semibold ${args.pathname == args.link ? ' text-black' : 'text-gray-500' } `}>{args.title}</Button>
          
          <div className={`h-0.5 ${args.pathname == args.link ? 'bg-black' : ''}`}></div>
      </Link>
  )
}