import { useQuery } from "react-query";
import { getFeaturesByProduct } from "@/utils/features.utils";
import { Button } from "@/components/ui/button";
import { AppBar } from "@/components/AppBar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { UserQuestionMetric } from "@/types/features.types";
import { useParams } from "react-router-dom";

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
  } = useQuery(`feature-requests`, fetchFeatureRequests);

  const getUsefulnessText = (usefulness: UserQuestionMetric) => {
    const totalResponses =
      usefulness.yes.count + usefulness.no.count + usefulness.maybe.count;

    if (totalResponses === 0) return "No responses yet";

    const yesPercentage = ((usefulness.yes.count / totalResponses) * 100).toFixed(1);
    const noPercentage = ((usefulness.no.count / totalResponses) * 100).toFixed(1);
    const maybePercentage = ((usefulness.maybe.count / totalResponses) * 100).toFixed(1);

    return `Yes: ${yesPercentage}%, No: ${noPercentage}%, Maybe: ${maybePercentage}%`;
  };

  return (
    <div className='flex flex-col items-center min-h-screen w-full bg-gray-100 '>
      <div className="h-16 w-full mb-4">
        <AppBar />
      </div>
      <div className="py-8 sm:py-12 w-full max-w-6xl bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6 px-6 py-4 border-b border-gray-200">
          <h1 className="font-bold text-3xl text-gray-800">Founder Insights</h1>
          <Button className='bg-primaryGreen hover:bg-primaryGreen/80 text-white rounded-full px-6 py-2 shadow-md transition duration-300 ease-in-out'>
            Add New Feature
          </Button>
        </div>
        <div className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow className="bg-gray-100 border-b border-gray-200">
                <TableHead className="py-3 px-4 text-left text-sm font-medium text-gray-700">Title</TableHead>
                <TableHead className="py-3 px-4 text-left text-sm font-medium text-gray-700">Type</TableHead>
                <TableHead className="py-3 px-4 text-left text-sm font-medium text-gray-700">Status</TableHead>
                <TableHead className="py-3 px-4 text-left text-sm font-medium text-gray-700">Upvotes</TableHead>
                <TableHead className="py-3 px-4 text-left text-sm font-medium text-gray-700">Downvotes</TableHead>
                <TableHead className="py-3 px-4 text-left text-sm font-medium text-gray-700">Usefulness</TableHead>
                <TableHead className="py-3 px-4 text-left text-sm font-medium text-gray-700">Created At</TableHead>
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
                    <TableCell className="py-3 px-4 text-gray-600">{feature.implementationStatus}</TableCell>
                    <TableCell className="py-3 px-4 text-gray-600">{feature.upvotes.count}</TableCell>
                    <TableCell className="py-3 px-4 text-gray-600">{feature.downvotes.count}</TableCell>
                    <TableCell className="py-3 px-4 text-gray-600">
                      {getUsefulnessText(feature.usefulness)}
                    </TableCell>
                    <TableCell className="py-3 px-4 text-gray-600">{String(feature.createdAt)}</TableCell>
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
