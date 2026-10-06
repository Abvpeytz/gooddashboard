import Link from "next/link";

export default function Home() {
  return (
    <div className='good-dashboard__home-wrap flex items-center justify-center h-svh'>
      <div className='good-dashboard__home-inner p-10 max-w-3xl rounded-2xl bg-brand-400'>
        <h1 className='mb-4 font-extrabold text-6xl text-white'>Welcome to the Good Dashboard</h1>
        <Link
          className='inline-block rounded-3xl py-2 px-4 bg-black text-white font-bold transition-all hover:transition-all hover:bg-transparent hover:text-black'
          href='/login'
        >
          Login
        </Link>
      </div>
    </div>
  );
}
