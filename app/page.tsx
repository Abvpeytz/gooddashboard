import Link from "next/link";

export default function Home() {
  return (
    <div className='good-dashboard__home-wrap flex items-center justify-center h-svh'>
      <div className='good-dashboard__home-inner p-10 max-w-3xl rounded-2xl bg-amber-400'>
        <h1 className='mb-4 font-extrabold text-6xl'>Welcome to the Good Dashboard</h1>
        <Link
          className='inline-block rounded-md p-4 text-white font-bold'
          href='/dashboard'
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
