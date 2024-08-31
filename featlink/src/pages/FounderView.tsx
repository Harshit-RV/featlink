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
import { FeatureImplementationStatus, UserQuestionMetric } from "@/types/features.types";
import { BiSolidDownvote, BiSolidUpvote } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { updateUserFeatCoinBalance } from "@/utils/user.utils";

export const FounderView = () => {
  const { productId } = useParams();

  const fetchFeatureRequests = async () => {
    if (productId === undefined) return;
    const data = await getFeaturesByProduct(productId);
    return data;
  };

  const {
    data: featureRequests,
    isLoading: featureRequestLoading,
    refetch: refetchFeatureRequests,
  } = useQuery(`feature-requests`, fetchFeatureRequests);


  const getUsefulnessText = (usefulness: UserQuestionMetric) : string[] => {
    const totalResponses =
      usefulness.yes.count + usefulness.no.count + usefulness.maybe.count;

    if (totalResponses === 0) return [];

    const yesPercentage = ((usefulness.yes.count / totalResponses) * 100).toFixed(1);
    const noPercentage = ((usefulness.no.count / totalResponses) * 100).toFixed(1);
    const maybePercentage = ((usefulness.maybe.count / totalResponses) * 100).toFixed(1);

    return [`Yes: ${yesPercentage}%`, `No: ${noPercentage}%`, `Maybe: ${maybePercentage}%`];
  };

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
      <div className="py-8 sm:py-12 w-full max-w-6xl bg-white rounded-lg px-10">
        <div className="flex justify-between items-center mb-6 py-4 border-b border-gray-200">
          <h1 className="font-bold text-3xl text-gray-800">Founder Insights</h1>
        </div>
        <div className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow className="bg-gray-100 border-b border-gray-200">
                <TableHead className="py-3 px-4 text-left text-sm font-medium text-gray-700">Title</TableHead>
                <TableHead className="py-3 px-4 text-left text-sm font-medium text-gray-700">Type</TableHead>
                <TableHead className="py-3 px-4 text-left text-sm font-medium text-gray-700">Status</TableHead>
                <TableHead className="text-left text-sm font-medium text-green-500"><BiSolidUpvote size={20}/></TableHead>
                <TableHead className="text-left text-sm font-medium text-red-500"><BiSolidDownvote  size={20}/></TableHead>
                <TableHead className="py-3 px-4 text-left text-sm font-medium text-gray-700">Usefulness</TableHead>
                <TableHead className="py-3 px-4 text-left text-sm font-medium text-gray-700">Created At</TableHead>
                <TableHead className="py-3 px-4 text-left text-sm font-medium text-gray-700">Reward</TableHead>
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
                  <TableRow key={String(feature._id)} className="border-b border-gray-200 hover:bg-gray-50">
                <TableCell className="py-3 px-4 text-gray-800">{feature.title}</TableCell>
                <TableCell className="py-3 px-4 text-gray-600">{feature.type}</TableCell>
                <TableCell className="py-3 px-4 text-gray-600">
                  <select
                    value={feature.implementationStatus}
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
                <TableCell className="py-3 px-4 text-gray-600">
                  {getUsefulnessText(feature.usefulness).map((text, index) => <p key={index}>{text}</p>)}
                </TableCell>
                <TableCell className="py-3 px-4 text-gray-600">{new Date(feature.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="py-3 px-4 text-gray-600">
                  <Button onClick={() => sendReward(String(feature.publisher))} className='bg-primaryGreen hover:bg-primaryGreen/80 rounded-full  h-6'>Reward</Button>
                </TableCell>
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
