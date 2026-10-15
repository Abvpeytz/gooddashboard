"use client";

import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { useActionState } from "react";
import { authenticate } from "@/app/lib/actions";
import { useSearchParams } from "next/navigation";
import { jakarta } from "./fonts";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <form action={formAction} className='space-y-3'>
      <div className='flex flex-col rounded-lg bg-green px-6 pb-4 pt-8'>
        <h1 className={`${jakarta.className} mb-3 text-2xl text-white`}>
          Please log in to continue.
        </h1>
        <div className='w-full'>
          <div>
            <label
              className='mb-3 mt-5 block text-xs font-medium text-white'
              htmlFor='email'
            >
              Email
            </label>
            <div className='relative'>
              <input
                className='peer block w-full rounded-md border border-green py-2.25 pl-10 text-sm outline-2 placeholder:text-white'
                id='email'
                type='email'
                name='email'
                placeholder='Enter your email address'
                required
              />
              <AtSymbolIcon className='pointer-events-none absolute left-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-white peer-focus:text-white/75' />
            </div>
          </div>
          <div className='mt-4'>
            <label
              className='mb-3 mt-5 block text-xs font-medium text-white'
              htmlFor='password'
            >
              Password
            </label>
            <div className='relative'>
              <input
                className='peer block w-full rounded-md border border-green py-2.25 pl-10 text-sm outline-2 placeholder:text-white'
                id='password'
                type='password'
                name='password'
                placeholder='Enter password'
                required
                minLength={6}
              />
              <KeyIcon className='pointer-events-none absolute left-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-white peer-focus:text-white/75' />
            </div>
          </div>
        </div>
        <input type='hidden' name='redirectTo' value={callbackUrl} />
        <button className='flex gap-2 items-center self-end rounded-3xl py-2 px-4 mt-4 font-bold bg-black text-white transition-all hover:transition-all hover:bg-black/75 cursor-pointer' aria-disabled={isPending}>
          Log in <ArrowRightIcon className='ml-auto h-5 w-5 text-white' />
        </button>
        <div
          className='flex h-8 items-end space-x-1'
          aria-live='polite'
          aria-atomic='true'
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className='h-5 w-5 text-red-500' />
              <p className='text-sm text-red-500'>{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}
