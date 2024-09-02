import { AppBar } from "@/components/AppBar";
import { getFeaturesByPublisher } from "@/utils/features.utils";
import { useQuery } from "react-query";
import { getUserByAddress } from "@/utils/user.utils";
import { ExpandableCardDemo } from "@/components/ExpandableCard";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const MyFeatRequests = () => {
  const navigate  = useNavigate();
    
    const fetchFeatureRequests = async () => {
        const address = await localStorage.getItem('walletAddress');

        const user = await getUserByAddress(address!);
        if (user?._id == undefined) return;

        const data = await getFeaturesByPublisher(String(user?._id));
        return data;
      }

      
    const { data: featureRequests, isLoading: featureRequestLoading, refetch: refetchFeatureRequests } = useQuery(`my-feature-requests` , fetchFeatureRequests);
    
    useEffect(() => {
      const address = localStorage.getItem('walletAddress');
      if (!address) {
        toast.error('Please connect your wallet');
        navigate('/');
      }
    },[]);

  return (
    <div className="h-screen flex-col flex items-center bg-gray-50">
      
      <div className="h-14 w-full">
        <AppBar/>
      </div>
      <div className=" mt-9 w-full max-w-[640px]">
        <div className="flex justify-between px-4">
          <h1 className="font-bold text-2xl">Your Feature Requests</h1>
        </div>
       
        <div className="bg-gray-200 my-3 h-0.5 rounded-full w-full"></div>

        {
          featureRequests != undefined && featureRequests.length == 0 ? <div className="text-center mt-10 text-2xl font-bold text-gray-400/70">You have not created any feature requests</div> : null
        }
        
        {
          featureRequestLoading || featureRequests == undefined 
            ? <div className="text-center mt-10 text-2xl font-bold text-gray-400/70">Loading...</div> 
            : <ExpandableCardDemo refetchFeatures={refetchFeatureRequests} walletAddress={localStorage.getItem('walletAddress')!} cards={featureRequests}/>
        }
     
        
      </div>
     
    </div>
  );
};