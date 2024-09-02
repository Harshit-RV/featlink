import { useQuery } from "react-query";
import { getFeaturesByProduct, updateFeatureStatus } from "@/utils/features.utils";
import { AppBar } from "@/components/AppBar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { FeatureDoc, FeatureImplementationStatus, UserQuestionMetric } from "@/types/features.types";
import {  BiSolidDownvote, BiSolidUpvote } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { updateUserFeatCoinBalance } from "@/utils/user.utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { useState } from "react";
import { Pie, PieChart} from "recharts"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { ScrollArea } from "@/components/ui/scroll-area"


export const description = "A pie chart with no separator"

const getChartData = (props: UserQuestionMetric) => {
  return [
    { response: "Yes", count: props.yes.count, fill: "var(--color-yes)" },
    { response: "No", count: props.no.count, fill: "var(--color-no)" },
    { response: "Maybe", count: props.maybe.count, fill: "var(--color-maybe)" }
  ]
}

const isEverythingZero = (props: UserQuestionMetric) => {
  return props.yes.count === 0 && props.no.count === 0 && props.maybe.count === 0;
}

const chartConfig = {
  responses: {
    label: "Responses",
  },
  yes: {
    label: "Yes",
    color: "#0F717E",
  },
  no: {
    label: "No",
    color: "#f8333c",
  },
  maybe: {
    label: "Maybe",
    color: "#fcab10",
  },
} satisfies ChartConfig

export const FounderView = () => {
  const { productId } = useParams();

  const [ activeFeature, setActiveFeature ] = useState<FeatureDoc | null>(null);
  const [ setOpenSheet, setSheetOpen ] = useState(false);

  const fetchFeatureRequests = async () => {
    if (productId === undefined) return;
    const data = await getFeaturesByProduct(productId);
    return data;
  };

  const {
    data: featureRequests,
    isLoading: featureRequestLoading,
    refetch: refetchFeatureRequests,
  } = useQuery(`founder-feature-requests`, fetchFeatureRequests);

  const handleStatusChange = async (featureId: string, newStatus: string) => {
    await updateFeatureStatus(featureId, newStatus as FeatureImplementationStatus);
    refetchFeatureRequests();
  };

  const sendReward = async (userId: string) => {
    await updateUserFeatCoinBalance(userId, 20);
    alert('20 FeatCoin sent to Publisher');
  }

  return (
    <div className='flex flex-col items-center min-h-screen w-full bg-gray-100 '>
      <div className="h-16 w-full mb-4">
        <AppBar />
      </div>
      <div className="py-8 sm:py-12 w-full max-w-6xl bg-white rounded-lg px-2 sm:px-10">
        <div className="flex justify-between items-center mb-6 py-4 border-b border-gray-200">
          <h1 className="font-bold text-3xl text-gray-800">Founder Insights</h1>
        </div>
        <Sheet open={setOpenSheet} onOpenChange={setSheetOpen}>
          
            {activeFeature && <SheetContent>
              <ScrollArea className="h-full w-full">
              <SheetHeader className="gap-2">
                <SheetTitle className="text-xl">{activeFeature.title}</SheetTitle>
                <div className="flex gap-2 ">
                  <p className="bg-red-200 w-min px-3 text-sm">{activeFeature.type}</p>
                  <p className="bg-green-200 text-sm px-3 ">{activeFeature.implementationStatus}</p>
                </div>
                <SheetDescription className="text-lg">
                  {activeFeature.description}
                </SheetDescription>
              </SheetHeader>
              <div>
                  <div className="my-3 py-2 flex gap-1 text-sm rounded-full font-bold">
                    <BiSolidUpvote size={25} className="text-green-500"/>
                    <p className="text-lg mr-2">{activeFeature.upvotes.count}</p>
                    <BiSolidDownvote size={25} className="text-red-500"/>
                    <p className="text-lg">{activeFeature.downvotes.count}</p>
                  </div>

                  <Card className="flex flex-col">
                    <CardHeader className="items-center pb-0">
                      <CardTitle className="text-lg">Responses on Usefulness</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 pb-0">
                      {isEverythingZero(activeFeature.usefulness)
                      ? <div className="text-center my-5 text-2xl font-bold text-gray-400/70">No responses yet</div>
                      : <ChartContainer
                          config={chartConfig}
                          className="mx-auto aspect-square max-h-[250px]"
                        >
                          <PieChart>
                            <ChartTooltip
                              content={<ChartTooltipContent nameKey="response" hideLabel />}
                            />
                            <Pie data={getChartData(activeFeature.usefulness)} dataKey="count" innerRadius={0} outerRadius={100}>
                            </Pie>
                          </PieChart>
                        </ChartContainer> }
                    </CardContent>
                    <CardFooter className="flex justify-around mt-2 gap-2 text-sm">
                      <div className="flex gap-1 text-md font-semibold items-center"><p className="h-4 w-5 bg-[#0F717E] rounded-md"></p>Yes</div>
                      <div className="flex gap-1 text-md font-semibold items-center"><p className="h-4 w-5 bg-[#fcab10] rounded-md"></p>Maybe</div>
                      <div className="flex gap-1 text-md font-semibold items-center"><p className="h-4 w-5 bg-[#f8333c] rounded-md"></p>No</div>
                    </CardFooter>
                  </Card>

                  <p className="my-5 flex items-baseline gap-1"><p className="text-sm">Published On:</p> {new Date(activeFeature.createdAt).toLocaleDateString()}</p>
                  <Button onClick={() => sendReward(String(activeFeature.publisher))} className='text-primaryGreen bg-white border-2 border-primaryGreen hover:bg-gray-200 rounded-full text-md w-full h-10'>Reward with FeatCoin</Button>
                  <Button onClick={() => sendReward(String(activeFeature.publisher))} className='bg-primaryGreen mt-2 hover:bg-primaryGreen/80 rounded-full text-md w-full h-10'>Reward with Feat Legend NFT</Button>

              </div>
              </ScrollArea>
            </SheetContent>}
        </Sheet>
        <div className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow className="bg-gray-100 border-b border-gray-200">
                <TableHead className="py-3 px-4 text-left text-sm font-medium text-gray-700">Title</TableHead>
                <TableHead className="py-3 px-4 text-left text-sm font-medium text-gray-700">Type</TableHead>
                <TableHead className="py-3 px-4 text-left text-sm font-medium text-gray-700">Status</TableHead>
                <TableHead className="text-left text-sm font-medium text-green-500"><BiSolidUpvote size={20}/></TableHead>
                <TableHead className="text-left text-sm font-medium text-red-500"><BiSolidDownvote  size={20}/></TableHead>
                {/* <TableHead className="py-3 px-4 text-left text-sm font-medium text-gray-700">Usefulness</TableHead> */}
                <TableHead className="py-3 px-4 text-left text-sm font-medium text-gray-700">Published On</TableHead>
                {/* <TableHead className="py-3 pr-4 text-left text-sm font-medium text-gray-700"></TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {featureRequestLoading || featureRequests === undefined ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-4 text-center text-gray-600">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : (
                
                featureRequests.map((feature) => (
                  <TableRow 
                    onClick={() => {
                      setActiveFeature(feature);
                      setSheetOpen(true);
                    }}
                    key={String(feature._id)} 
                    className="cursor-pointer border-b border-gray-200 hover:bg-gray-50"
                  >
                    <TableCell className="py-3 px-4 text-gray-800 text-md font-semibold">{feature.title}</TableCell>
                    <TableCell className="py-3 px-4 text-gray-800"><p className="bg-red-200 w-min px-3 text-sm mt-3">{feature.type}</p></TableCell>
                    <TableCell className="py-3 px-4 text-gray-600 text-sm">
                      <select
                        value={feature.implementationStatus}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => handleStatusChange(String(feature._id), e.target.value)}
                        className="border rounded px-2 py-1"
                      >
                        <option value="Not Reviewed">Not Reviewed</option>
                        <option value="Not Considering">Not Considering</option>
                        <option value="Considering">Considering</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </TableCell>
                    <TableCell className="py-3 px-5 text-gray-600">{feature.upvotes.count}</TableCell>
                    <TableCell className="py-3 px-5 text-gray-600">{feature.downvotes.count}</TableCell>
                    <TableCell className="py-3 px-4 text-gray-600">{new Date(feature.createdAt).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};