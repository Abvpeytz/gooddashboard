import { Suspense } from "react";
import CardWrapper from '../ui/dashboard/card-wrapper';

function Loading() {
  return <h2>🌀 Loading...</h2>;
}

export default async function Page() {
  return (
    <div className='good-dashboard__dashboard grid grid-rows-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:grid-rows-1 gap-4'>
      <Suspense fallback={<Loading />}>
        <CardWrapper />
      </Suspense>
    </div>
  );
}
