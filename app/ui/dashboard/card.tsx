"use client";

import { motion, animate } from "motion/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import ResetButton from "./reset-button";
import { Progress } from "./progress";

interface CardProps {
  progressStatus?: number;
  index: number;
  title?: string;
  slug?: string;
  description?: string;
  textColor?: string;
  bgColor?: string;
}

export default function Card({
  progressStatus = 0,
  index = 0,
  title,
  slug,
  description,
  bgColor,
  textColor,
}: CardProps) {
  return (
    <motion.div
      className={`good-dashboard__card flex flex-col items-start gap-3 p-4 rounded-2xl min-h-75 bg-gray ${bgColor ? bgColor : ""} ${textColor ? textColor : ""}`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
    >
      {title && (
        <h2 className='font-medium text-3xl' lang='en'>
          {title}
        </h2>
      )}
      {description && <p className='font-medium'>{description}</p>}

      <Progress index={index} progressStatus={progressStatus} />

      <Link
        className='inline-block rounded-3xl py-2 px-4 font-bold bg-black text-white transition-all hover:transition-all hover:bg-black/75 cursor-pointer'
        href={`/dashboard/course/${slug}`}
      >
        {progressStatus > 0 ? "Continue" : "Start"}
      </Link>

      {slug && <ResetButton slug={slug} />}
    </motion.div>
  );
}
