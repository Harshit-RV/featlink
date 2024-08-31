import { AppBar } from "@/components/AppBar";
import { ExpandableCardDemo } from "@/components/ExpandableCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea";
import { FeatureType } from "@/types/features.types";
import { createFeature, getFeaturesByProduct } from "@/utils/features.utils";
import { fetchUserId } from "@/utils/user.utils";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

export const FeatureList = () => {

  const { productId } = useParams();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<FeatureType>('Feature');

  const handleSubmit = async () => {
    const userId = await fetchUserId();
    if (userId == null) return;
    await createFeature({
      title: title,
      description: description,
      type: type,
      implementationStatus: 'Not Reviewed',
      upvotes: { count: 0, list: [] },
      downvotes: { count: 0, list: [] },
      usefulness: { yes: { count: 0, list: [] }, no: { count: 0, list: [] }, maybe: { count: 0, list: [] } },
      productId: productId!,
      publisher: userId,
    });
    refetchFeatures();
  }



  const fetchFeatures = async () => {
    console.log('Fetching features for product:', productId);
    const data = await getFeaturesByProduct(productId!);
    console.log('Features:', data);
    return data;
  }
  
  const { data: features, isLoading: featureLoading, refetch: refetchFeatures } = useQuery(`features-${productId}` , fetchFeatures);

  return (
    <div className="h-screen flex-col flex items-center bg-gray-50">
      
      <div className="h-14 w-full">
        <AppBar/>
      </div>
      <div className=" mt-9 w-full max-w-[640px]">
        <div className="flex justify-between px-4">
          <h1 className="font-bold text-2xl">Explore</h1>
          <Sheet>
      <SheetTrigger>
        <Button className='bg-primaryGreen hover:bg-primaryGreen/80 rounded-full px-6'>Add New</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create a New Feature</SheetTitle>
          <SheetDescription>
            Please fill in the details below to create a new feature request.
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-4 p-4">
          <Input 
            placeholder="Title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />

          <Textarea 
            placeholder="Enter feature description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
          />

          <Select
            onValueChange={(value) => setType(value as FeatureType)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Error">Error</SelectItem>
              <SelectItem value="Improvement">Improvement</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="Feature">Feature</SelectItem>
            </SelectContent>
          </Select>


          <Button 
            className='bg-primaryGreen hover:bg-primaryGreen/80 rounded-full w-full mt-4' 
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </SheetContent>
    </Sheet>
        </div>
       
        <div className="bg-gray-200 my-3 h-0.5 rounded-full w-full"></div>
        {
          featureLoading || features == undefined ? <div>Loading...</div> : <ExpandableCardDemo refetchFeatures={refetchFeatures} walletAddress={localStorage.getItem('walletAddress')!} cards={features}/>
        }
     
        
      </div>
     
    </div>
  );
}