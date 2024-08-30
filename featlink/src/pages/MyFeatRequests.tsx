
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table"
import { Button } from "@/components/ui/button";
import { AppBar } from "@/components/AppBar";
// import { Button } from "antd"
// import { Link } from "react-router-dom"
// import { MoreOutlined } from '@ant-design/icons';
// import { useAuth } from "@clerk/clerk-react";
// import { useQuery } from 'react-query'
// import { deleteMonitor, extractDomainForDisplay, getList } from "../utils/monitor.utils";
// import { AlertCondition } from "../types/monitor";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "../components/ui/dropdown-menu"
// import toast from "react-hot-toast";
// import { MonitorSkeleton } from "../components/MonitorSkeleton";
// import { TimerComponent } from "../components/TimerComponent";

export const MyFeatRequests = () => {
  // const { getToken } = useAuth();

  // const fetchList = async () => {
  //     const token = await getToken();
  //     if (!token) return;
  //     return await getList(token);
  // }

  // const convertAlertConditionToString = (alertCondition: AlertCondition) => {
  //     switch (alertCondition) {
  //         case 'ISUNAVAILABLE':
  //             return 'When URL is unavailable';
  //         case 'IS404':
  //             return 'When URL returns 404';
  //         case 'ISNOT200':
  //             return 'When URL returns a status code other than 200';
  //         case 'IS500':
  //             return 'When URL returns 500';
  //         case 'IS501':
  //             return 'When URL returns 501';
  //         default:
  //             return '';
  //     }
  // }

  // const onDelete = async ( monitorId: string) => {
  //     const token = await getToken();
  //     if (!token) return;

  //     await toast.promise(
  //         deleteMonitor({ monitorId: monitorId, token: token }),
  //          {
  //            loading: 'Deleting...',
  //            success: <b>Monitor Deleted</b>,
  //            error: <b>Could not delete monitor.</b>,
  //          }
  //        );

  //     refetchMonitors();
  // }

  // const { data: monitors, isLoading: monitorLoading, refetch: refetchMonitors } = useQuery('events', fetchList);

  return (
      <div className='flex flex-col items-center min-h-screen bg-gray-100 px-2.5 sm:px-6 md:px-10 lg:px-0'>
          <div className="h-14 w-full">
            <AppBar/>
          </div>
          <div className="py-8 sm:py-12 w-full lg:w-[900px]">

              <div className="flex justify-between items-end">
                <h1 className="font-bold text-2xl">Your Requests</h1>
                  <Button className='bg-primaryGreen hover:bg-primaryGreen/80 rounded-full px-6'>Add New</Button>
                </div>
              {/* <TimerComponent className="sm:hidden flex h-10 items-center" refetchMonitors={refetchMonitors}/> */}
              

              <div className="mt-0 sm:mt-7 rounded-xl border drop-shadow-sm bg-white">
              <Table className='rounded-lg'>
                  <TableHeader>
                      <TableRow>
                          <TableHead className="w-[20px]"></TableHead>
                          {/* <TableHead className="w-0"></TableHead> */}
                          <TableHead>Monitors</TableHead>
                          <TableHead className="text-right">Options</TableHead>
                      </TableRow>
                  </TableHeader>
                  <TableBody>
                      
                  <TableRow>
                                      <TableCell className="">
                                          <div className="flex justify-end sm:ml-4 sm:mr-2 sm:pl-3">
                                          {
                                             true
                                              ? <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                                              : <div className="relative w-4 h-4">
                                                  <div className="w-4 h-4 rounded-full bg-red-500 absolute z-0 animate-ping"></div>
                                                  <div className="w-4 h-4 rounded-full bg-red-500 absolute z-10"></div>
                                              </div> 
                                          }
                                          </div>
                                          
                                      </TableCell>
                                      <TableCell className="flex flex-col p-4 pl-5">
                                          <span className="font-medium text-lg mb-0.5 text-gray-800">
                                            extractDomainForDisplay(monitor.monitorUrl)
                                          </span>
                                          <span className="text-gray-400 font-semibold text-sm">
                                              {/* {convertAlertConditionToString(monitor.alertCondition)}  */}
                                              {' ∘'} <span className="font-medium">monitor.contacts[0].email</span>
                                          </span>
                                      </TableCell>
                                      <TableCell className="text-right text-lg pr-4">
                                          {/* <DropdownMenu>
                                              <DropdownMenuTrigger className="text-[18px] sm:text-[20px]"><MoreOutlined/></DropdownMenuTrigger>
                                              <DropdownMenuContent>
                                                  <DropdownMenuLabel>Options</DropdownMenuLabel>
                                                  <DropdownMenuSeparator />
                                                  <DropdownMenuItem onClick={() => onDelete(String(monitor._id))}>Delete</DropdownMenuItem>
                                              </DropdownMenuContent>
                                          </DropdownMenu> */}
                                      </TableCell>
                                  </TableRow>
                       
                  </TableBody>
              </Table>

          

              </div>
          </div>
      </div>
  )
}