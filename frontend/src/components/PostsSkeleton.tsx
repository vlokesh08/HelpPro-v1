import { Skeleton } from "@/components/ui/skeleton"

const PostsSkeleton = () => {

  const skeletonTemplates = [];
  for (let i = 0; i < 5; i++) {
      skeletonTemplates.push(<SkeletonTemplate />);
  }
  
  return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-4">
          {skeletonTemplates}
      </div>
  )
}

const SkeletonTemplate = () => {
    return (
        <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
      </div>
    )
}


export default PostsSkeleton