export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <img src="/images/icon-loading.svg" alt="Loading" className="animate-spin h-12 w-12 mx-auto mb-4" />
        <p className="text-lg text-neutral-300">Fetching weather data...</p>
      </div>
    </div>
  );
}
