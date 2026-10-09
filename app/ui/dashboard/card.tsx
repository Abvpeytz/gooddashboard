import Link from "next/link";

interface CardProps {
  progressStatus?: number;
  title?: string;
  slug?: string;
  description?: string;
  textColor?: string;
  bgColor?: string;
}

export default function Card({
  progressStatus = 0,
  title,
  slug,
  description,
  bgColor,
  textColor,
}: CardProps) {
  return (
    <div
      className={`good-dashboard__card flex flex-col items-start gap-3 p-4 rounded-2xl min-h-75 bg-ink-100 ${bgColor ? bgColor : ""} ${textColor ? textColor : ""}`}
    >
      {title && (
        <h2 className='font-medium text-3xl' lang='en'>
          {title}
        </h2>
      )}
      {description && <p className='font-medium'>{description}</p>}
      <div className='mt-auto'>{progressStatus}%</div>
      <div className='w-full bg-ink-900 rounded-full h-2'>
        <div
          className='bg-sun-500 h-2 rounded-full'
          style={{ width: progressStatus + "%" }}
        ></div>
      </div>
      <Link
        className='inline-block rounded-3xl py-2 px-4 font-bold bg-black text-white transition-all hover:transition-all hover:bg-transparent hover:text-black'
        href={`/dashboard/course/${slug}`}
      >
        {progressStatus > 0 ? "Continue" : "Start"}
      </Link>
    </div>
  );
}
