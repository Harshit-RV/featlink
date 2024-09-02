

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { FeatureDoc } from "@/types/features.types";
import { BiUpvote, BiDownvote, BiSolidDownvote, BiSolidUpvote } from "react-icons/bi";
import { addVoteToFeature, updateUsefulnessMetric } from "@/utils/features.utils";
import { getUserByAddress, updateUserFeatCoinBalance } from "@/utils/user.utils";
// Function to generate a random color
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Function to generate a random gradient
const getRandomGradient = () => {
  const color1 = getRandomColor();
  const color2 = getRandomColor();
  return `linear-gradient(135deg, ${color1}, ${color2})`;
};

export function ExpandableCardDemo({ cards, walletAddress, refetchFeatures }: { cards: FeatureDoc[], walletAddress: string, refetchFeatures: () => void }) {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const [ userId, setUserId ] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  const getUserId = async () => {
    const user = await getUserByAddress(walletAddress)
    if (user == null) return;
    setUserId(String(user._id))
  }


  useEffect(() => {
    getUserId();
  }, [])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  const upvote = async (featureId : string) => {
    console.log("upvoting")
    await addVoteToFeature(featureId, true);
    setActive(null);
    refetchFeatures();
    if (userId == null) return;
    await updateUserFeatCoinBalance(userId, 15);
  };


  const downvote = async (featureId: string) => {
    console.log("down")
    await addVoteToFeature(featureId, false);
    setActive(null);
    refetchFeatures();
    if (userId == null) return;
    await updateUserFeatCoinBalance(userId, 15);
  };

  const handleFeedback = async (featureId: string, feedback: 'yes' | 'no' | 'maybe') => {
    console.log("feedback")
    await updateUsefulnessMetric(featureId, feedback);
    setActive(null);
    refetchFeatures();
    if (userId == null) return;
    await updateUserFeatCoinBalance(userId, 30);
  }

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div
                layoutId={`img-${active.title}-${id}`}
                style={{ background: getRandomGradient(), height: "80px" }}
                className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg"
              />
              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-bold text-neutral-700 dark:text-neutral-200"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400"
                    >
                      {String(active.type)}
                    </motion.p>
                  </div>

                  <motion.a
                    layoutId={`button-${active.title}-${id}`}
                    href={active.imageUrl}
                    target="_blank"
                    className="px-4 flex gap-1 py-3 text-sm rounded-full font-bold"
                  >
                    {
                      active.upvotes.list.includes(String(userId))  
                      ? <BiSolidUpvote size={25} className="text-green-500"/> 
                      : <BiUpvote size={25} className="text-green-500" onClick={() => upvote(String(active._id))}/>
                    }
                    <p className="text-lg mr-2">{active.upvotes.count}</p>
                    {
                      active.downvotes.list.includes(String(userId)) 
                      ? <BiSolidDownvote size={25} className="text-red-500"/> 
                      : <BiDownvote size={25} className="text-red-500" onClick={() => downvote(String(active._id))}/>
                    }
                    <p className="text-lg">{active.downvotes.count}</p>
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    <p> {String(active.description)}</p>
                  </motion.div>
                </div>

                <div className="p-4">
                    <p className="font-semibold">This feature will enhance my experience working with the app:</p>
                    <div className="flex gap-4 mt-2 text-sm">
                      <button
                        className={`px-4 py-2 rounded-full ${active.usefulness.yes.list.includes(userId ?? '') ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                        onClick={() => handleFeedback(String(active._id), 'yes')}
                      >
                        Yes
                      </button>
                      <button
                        className={`px-4 py-2 rounded-full ${active.usefulness.maybe.list.includes(userId ?? '') ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                        onClick={() => handleFeedback(String(active._id), 'maybe')}
                      >
                        Maybe
                      </button>
                      <button
                          className={`px-4 py-2 rounded-full ${active.usefulness.no.list.includes(userId ?? '') ? 'bg-green-500 text-white' : 'bg-gray-200'}`}

                        onClick={() => handleFeedback(String(active._id), 'no')}
                      >
                        No
                      </button>
                    </div>
                    </div>

              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-2xl mx-auto w-full gap-4">
        {cards.map((card) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-col md:flex-row ">
              <motion.div
                layoutId={`img-${card.title}-${id}`}
                style={{ background: getRandomGradient(), width: "56px", height: "56px" }}
                className="h-40 w-40 md:h-14 md:w-14 rounded-lg"
              />
              <div className="">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-neutral-600 mt-2 flex dark:text-neutral-400 text-center md:text-left items-center"
                >
                  <p className="bg-red-100 px-1 mr-2 text-sm">{String(card.type)}</p> <p className="bg-green-100 px-1 mr-2 text-sm">{String(card.implementationStatus)}</p> {card.description.slice(0, 30)}
                </motion.p>
              </div>
            </div>
            <motion.button
              layoutId={`button-${card.title}-${id}`}
              className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black mt-4 md:mt-0"
            >
              View
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};