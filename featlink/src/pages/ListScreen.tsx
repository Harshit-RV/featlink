import { AppBar } from "@/components/AppBar";
import { ExpandableCardDemo } from "@/components/ExpandableCard";
import { Button } from "@/components/ui/button";


export const ListScreen = () => {
  return (
    <div className="h-screen flex-col flex items-center bg-gray-50">
      
      <div className="h-14 w-full">
        <AppBar/>
      </div>

      <div className=" mt-9 w-full max-w-[640px]">
        <div className="flex justify-between px-4">
          <h1 className="font-bold text-2xl">Explore</h1>
          <Button className='bg-primaryGreen hover:bg-primaryGreen/80 rounded-full px-6'>Add New</Button>
        </div>
       
        <div className="bg-gray-200 my-3 h-0.5 rounded-full w-full"></div>

        <ExpandableCardDemo />
        <ExpandableCardDemo />
        <ExpandableCardDemo />
     
        
      </div>
     
    </div>
  );
}