'use client';

import Button from "@/components/core/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-center">
        <img src="/images/icon-error.svg" alt="Error" className="h-16 w-16 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Something went wrong!</h2>
        <p className="text-neutral-300 mb-6">{error.message}</p>
        <Button onClick={() => reset()}>
            <img src="/images/icon-retry.svg" alt="Retry" className="h-5 w-5 mr-2" />
            Try again
        </Button>
    </div>
  );
}
