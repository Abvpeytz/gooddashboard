import Image from "next/image";

export default function Home() {
  return (
    <div className='dashboard-container min-h-full h-full grid grid-cols-[max-content_1fr] grid-rows-2 gap-4'>
      <header className='dashboard-header grid-cols-1 row-span-2 flex flex-row flex-no-wrap justify-between items-center p-4'>
        <Image
          src='/logo.svg'
          alt='Next.js logo'
          width={150}
          height={100}
          priority
        />
      </header>
      <section className='dashboard-hero-banner p-4'>
        <h1>Hej, Andreas - God at se dig!</h1>
      </section>
      <main className='p-4'>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
        </ul>
      </main>
    </div>
  );
}
