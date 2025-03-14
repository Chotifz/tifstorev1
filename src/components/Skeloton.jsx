import { Skeleton } from "./ui/skeleton";
import { Card, CardContent, CardHeader } from "./ui/card";


export const ProductsListSkeleton = () => {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <Skeleton className="h-8 w-40 mb-2" />
            <Skeleton className="h-4 w-60" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <Skeleton className="h-10 w-64" />
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Skeleton className="h-10 w-full md:w-80" />
            <Skeleton className="h-10 w-full md:w-[180px]" />
          </div>
        </div>
        
        <div>
          <div className="rounded-md border">
            <Skeleton className="w-full h-16" />
            {Array(5).fill(null).map((_, i) => (
              <Skeleton key={i} className="w-full h-20 mt-px" />
            ))}
          </div>
        </div>
        
        <div className="flex justify-between mt-4">
          <Skeleton className="h-4 w-48" />
          <div className="flex gap-2">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-24" />
          </div>
        </div>
      </div>
    );
  }

export const AdminSkeleton  = () => {
    return ( 
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 <div className="lg:col-span-2">
   <Card className="mb-6">
     <CardHeader className="pb-2">
       <Skeleton className="h-6 w-32 mb-2" />
       <Skeleton className="h-4 w-48" />
     </CardHeader>
     <CardContent className="p-6">
       <Skeleton className="w-full h-64 rounded-lg" />
     </CardContent>
   </Card>

   <Card>
     <CardHeader className="pb-2">
       <div className="flex justify-between items-center">
         <div>
           <Skeleton className="h-6 w-40 mb-2" />
           <Skeleton className="h-4 w-56" />
         </div>
         <Skeleton className="h-9 w-24" />
       </div>
     </CardHeader>
     <CardContent>
       {Array(4).fill(null).map((_, i) => (
         <div key={i} className="flex items-center space-x-4 py-4">
           <Skeleton className="h-4 w-16" />
           <Skeleton className="h-4 w-24 flex-1" />
           <Skeleton className="h-4 w-20" />
           <Skeleton className="h-4 w-16" />
           <Skeleton className="h-6 w-16 rounded-full" />
         </div>
       ))}
     </CardContent>
   </Card>
 </div>

 <div className="space-y-6">
   <Card>
     <CardHeader className="pb-2">
       <Skeleton className="h-6 w-28 mb-2" />
       <Skeleton className="h-4 w-48" />
     </CardHeader>
     <CardContent>
       {Array(5).fill(null).map((_, i) => (
         <div key={i} className="flex items-center justify-between py-2">
           <Skeleton className="h-4 w-48" />
           <Skeleton className="h-4 w-16" />
         </div>
       ))}
     </CardContent>
   </Card>

   <Card>
     <CardHeader className="pb-2">
       <Skeleton className="h-6 w-24 mb-2" />
       <Skeleton className="h-4 w-40" />
     </CardHeader>
     <CardContent>
       {Array(3).fill(null).map((_, i) => (
         <div key={i} className="flex items-center space-x-3 py-2">
           <Skeleton className="h-9 w-9 rounded-full" />
           <div className="flex-1">
             <Skeleton className="h-4 w-24 mb-1" />
             <Skeleton className="h-3 w-32" />
           </div>
           <Skeleton className="h-5 w-12 rounded-full" />
         </div>
       ))}
     </CardContent>
   </Card>
 </div>
</div>

     );
}
