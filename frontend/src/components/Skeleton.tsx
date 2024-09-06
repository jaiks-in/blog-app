
const Skeleton = () => {
  return (
    <div className="p-4 space-y-4 animate-pulse">
      {/* Skeleton for Title */}
      <div className="h-6 bg-gray-300 rounded-md w-3/4"></div>
      
      {/* Skeleton for Content */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded-md w-full"></div>
        <div className="h-4 bg-gray-300 rounded-md w-full"></div>
        <div className="h-4 bg-gray-300 rounded-md w-full"></div>
        <div className="h-4 bg-gray-300 rounded-md w-2/3"></div>
      </div>

      {/* Skeleton for Button */}
      <div className="h-8 bg-gray-300 rounded-md w-32"></div>
    </div>
  );
};

export default Skeleton;
