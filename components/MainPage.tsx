'use client';

import clsx from 'clsx';
import { UserIcon } from 'lucide-react';
import Image from 'next/image';

const examples = [
  'How to add a language in AEM?',
  'How to setup an AEM project?',
];

export const renderMessages = ({
  messages,
  setInput,
  inputRef,
}: {
  messages: any;
  setInput: any;
  inputRef: any;
}) => {
  return messages.length > 0 ? (
    messages.map((message: any, i: number) => (
      <div
        key={i}
        className={clsx(
          'flex w-full items-center justify-center border-b border-gray-200 py-8',
          message.role === 'user' ? 'bg-background' : 'bg-contrast'
        )}
      >
        <div className='flex w-full max-w-screen-md items-start space-x-4 px-5 sm:px-0'>
          <div
            className={clsx(
              message.role === 'assistant'
                ? 'bg-background'
                : 'bg-contrast p-1.5 text-white'
            )}
          >
            {message.role === 'user' ? (
              <UserIcon />
            ) : (
              <Image
                src='/chat-logo.jpg'
                alt='Shakespeare'
                width={36}
                height={36}
              />
            )}
          </div>
          <div className='prose prose-p:leading-relaxed mt-1 w-full break-words'>
            {message.content}
          </div>
        </div>
      </div>
    ))
  ) : (
    <div className='border-gray-200sm:mx-0 mx-5 mt-20 max-w-screen-md rounded-md border bg-secondary text-foreground sm:w-full'>
      <div className='flex flex-col space-y-4 p-7 sm:p-10'>
        <Image
          src='/chat-logo.png'
          alt='Shooketh'
          width={40}
          height={40}
          className='h-20 w-20'
        />
        <h1 className='text-lg font-semibold'>Hi, I'm John!</h1>
        <p className='text-gray-500'>
          Ask me anything and i'll try to answer the best!
        </p>
      </div>
      <div className='border-contrast flex flex-col space-y-4 border-t bg-secondary p-7 sm:p-10'>
        {examples.map((example, i) => (
          <button
            key={i}
            className='rounded-md border border-accent bg-accent px-5 py-3 text-left text-sm text-gray-200 transition-all duration-75  hover:text-gray-400 active:bg-secondary'
            onClick={() => {
              setInput(example);
              inputRef.current?.focus();
            }}
          >
            {example}
          </button>
        ))}
      </div>
    </div>
  );
};
