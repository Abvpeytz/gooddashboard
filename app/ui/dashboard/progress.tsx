import { animate, motion } from "motion/react";
import { useEffect, useState } from "react";

interface ProgressProps {
  progressStatus: number;
  index: number;
}

export const Progress = ({ progressStatus, index }: ProgressProps) => {
  const [displayedProgress, setDisplayedProgress] = useState(0);

  useEffect(() => {
    const controls = animate(0, progressStatus, {
      duration: 0.7,
      delay: index * 0.08 + 0.2,
      ease: "easeOut",
      onUpdate: (v) => setDisplayedProgress(Math.round(v)),
    });
    return () => controls.stop();
  }, [progressStatus, index]);

  return (
    <>
      <div className='mt-auto font-medium text-2xl'>{displayedProgress}%</div>
      <div className='w-full bg-green-darker rounded-full h-2'>
        <motion.div
          className='bg-green h-2 rounded-full'
          initial={{ width: 0 }}
          animate={{ width: progressStatus + "%" }}
          transition={{
            duration: 0.6,
            delay: index * 0.08 + 0.2,
            ease: "easeOut",
          }}
        />
      </div>
    </>
  );
};
