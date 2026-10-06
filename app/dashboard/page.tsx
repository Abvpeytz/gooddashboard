import { Suspense } from "react";
import CardWrapper from "../ui/dashboard/card-wrapper";

function Loading() {
  return <h2>🌀 Loading...</h2>;
}

export default async function Page() {
  return (
    <div className='good-dashboard__dashboard grid grid-flow-row auto-rows-max grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      <section className='col-span-1 md:col-span-2 lg:col-span-4 row-span-1 bg-black text-white py-8 px-4 rounded-2xl'>
        <h1 className='font-black text-[60px]'>Hej Andreas!</h1>
        <p className='font-medium text-[20px] w-8/12'>
          <span className='font-bold'>Welcome to your onboarding experience.</span> This dashboard provides a
          structured and streamlined approach to onboarding, helping you
          navigate required tasks, monitor your progress, and access the
          information and resources you need for a successful start.
        </p>
      </section>

      <Suspense fallback={<Loading />}>
        <CardWrapper />
      </Suspense>
    </div>
  );
}
