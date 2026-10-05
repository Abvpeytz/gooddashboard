import Link from "next/link";

interface CardProps {
  progressStatus?: number;
  title: string;
  textColor?: string;
  bgColor?: string;
}

export default function Card({
  progressStatus = 0,
  title,
  bgColor,
  textColor,
}: CardProps) {
  return (
    <div
      className={`good-dashboard__card flex flex-col items-start gap-3 p-4 rounded-2xl min-h-120 ${bgColor ? bgColor : ""} ${textColor ? textColor : ""}`}
    >
      {title && (
        <h2 className='font-black text-4xl mt-4' lang='en'>
          {title}
        </h2>
      )}
      <p className='font-medium'>
        Venenatis quis sit lacinia. ut tortor bibendum vel tellus bibendum Morbi
        libero nibh dolor vel auctor quis vel ullamcorper ut dignissim Maecenas
        sit vestibulum.
      </p>
      <div>
        <ul className='list-disc pl-4'>
          <li>Set up two factor authentication</li>
          <li>Create your Harvest account</li>
          <li>Submit your first merge request</li>
        </ul>
      </div>
      <div className='mt-auto'>{progressStatus}%</div>
      <div className='w-full bg-gray-200 rounded-full h-2'>
        <div
          className='bg-black h-2 rounded-full'
          style={{ width: progressStatus + "%" }}
        ></div>
      </div>
      <Link
        className='inline-block rounded-3xl pt-2 pb-2 pl-4 pr-4 font-bold bg-black text-white transition-all hover:transition-all hover:bg-transparent hover:text-black'
        href={`/dashboard/course/${title}`}
      >
        {progressStatus !== null && progressStatus !== 0 ? "Continue" : "Start"}
      </Link>
    </div>
  );
}
