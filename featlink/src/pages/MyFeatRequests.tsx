import { AppBar } from "@/components/AppBar";
import { getFeaturesByPublisher } from "@/utils/features.utils";
import { useQuery } from "react-query";
import { getUserByAddress } from "@/utils/user.utils";
import { ExpandableCardDemo } from "@/components/ExpandableCard";

export const MyFeatRequests = () => {
    
    const fetchFeatureRequests = async () => {
        const address = await localStorage.getItem('walletAddress');

        const user = await getUserByAddress(address!);
        if (user?._id == undefined) return;

        const data = await getFeaturesByPublisher(String(user?._id));
        return data;
      }

      
    const { data: featureRequests, isLoading: featureRequestLoading, refetch: refetchFeatureRequests } = useQuery(`feature-requests` , fetchFeatureRequests);
    

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
          featureRequestLoading || featureRequests == undefined ? <div>Loading...</div> : <ExpandableCardDemo refetchFeatures={refetchFeatureRequests} walletAddress={localStorage.getItem('walletAddress')!} cards={featureRequests}/>
        }
     
        
      </div>
     
    </div>
  );
};