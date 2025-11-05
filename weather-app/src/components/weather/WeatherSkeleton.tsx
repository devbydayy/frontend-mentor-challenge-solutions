
import React from 'react';

const LoadingIndicator = () => (
    <div className="flex justify-center items-center">
        <img src="/images/icon-loading.svg" alt="Loading" className="animate-spin h-8 w-8 mr-3" />
        <p className="text-lg">Loading...</p>
    </div>
);

export default function WeatherSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
            <div className="h-64 bg-neutral-800 rounded-xl flex items-center justify-center">
                <LoadingIndicator /> 
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[...Array(4)].map((_, index) => (
                    <div key={`detail-${index}`} className="h-24 bg-neutral-800 rounded-xl"></div>
                ))}
            </div>
            <div className="h-64 bg-neutral-800 rounded-xl"></div>
        </div>
        <div className="lg:col-span-1">
            <div className="h-96 bg-neutral-800 rounded-xl"></div>
        </div>
    </div>
  );
}