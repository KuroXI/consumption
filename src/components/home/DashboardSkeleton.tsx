import { MaxWidthWrapper } from "../ui/max-width-wrapper";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

export const DashboardSkeleton = () => {
  return (
    <div className="w-full max-w-2xl max-h-max bg-slate-700 rounded-md overflow-hidden">
      <div className="flex justify-between items-center m-5">
        <Skeleton className="w-4 h-4 rounded-full" />
        <div className="flex gap-2 items-center">
          <Skeleton className="h-4 w-14" />
          <Skeleton className="h-4 w-14" />
          <Skeleton className="h-4 w-14" />
        </div>
        <Skeleton className="h-4 w-10" />
      </div>
      <MaxWidthWrapper className="max-w-2xl py-2">
        <div className="flex flex-col gap-5">
          <div className="flex gap-2">
            <Skeleton className="h-4 w-14" />
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Separator />
          <div className="grid grid-cols-3 gap-2">
            <div className="grid grid-cols-4 col-span-3 gap-2 mb-5">
              <Skeleton className="h-14 col-span-1" />
              <Skeleton className="h-14 col-span-1" />
							<Skeleton className="h-14 col-span-1" />
              <Skeleton className="h-14 col-span-1" />
            </div>
            <Skeleton className="h-40 col-span-2" />
            <Skeleton className="h-40 col-span-1" />
						<Skeleton className="h-40 col-span-1" />
						<Skeleton className="h-40 col-span-2" />
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};
