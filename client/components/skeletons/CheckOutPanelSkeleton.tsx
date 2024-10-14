import { Skeleton } from "../ui/skeleton";

const CheckOutPanelSkeleton = () => {
  return (
    <div className="lg:sticky lg:top-0 pt-4 flex flex-col gap-6">
      <Skeleton className="h-[350px]"></Skeleton>
    </div>
  );
};

export default CheckOutPanelSkeleton;
