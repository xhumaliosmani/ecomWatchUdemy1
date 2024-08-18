import React from "react";
import { Loader2, AlertCircle } from "lucide-react";

const LoadingErrorComponent = ({ loading, error }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-500 mx-auto" />
          <p className="mt-4 text-gray-700 font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
          <p className="mt-4 text-red-600 font-semibold">Error: {error}</p>
        </div>
      </div>
    );
  }

  return null;
};

export default LoadingErrorComponent;
