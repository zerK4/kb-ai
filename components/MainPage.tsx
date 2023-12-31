'use client';

import clsx from 'clsx';
import { UserIcon } from 'lucide-react';
import Image from 'next/image';
import { ChatMessage } from './ChatMessage';
import { Separator } from './ui/separator';
import { ChatScrollAnchor } from './chat-scroll-anchor';

const examples = [
  'How to add a language in AEM?',
  'How to setup an AEM project?',
];

export const renderMessages = ({
  messages,
  setInput,
  inputRef,
  isLoading,
}: {
  messages: any;
  setInput: any;
  inputRef: any;
  isLoading: any;
}) => {
  return messages.length > 0 ? (
    messages.map((message: any, i: number) => (
      <div key={i} className='w-full'>
        <ChatMessage message={message} />
        {i < messages.length - 1 && <Separator className='my-4 md:my-8' />}
        <ChatScrollAnchor trackVisibility={isLoading} />
      </div>
    ))
  ) : (
    <div className='border-gray-200sm:mx-0 mx-5 mt-20 max-w-screen-md rounded-md border bg-secondary text-foreground sm:w-full'>
      <div className='flex flex-col space-y-4 p-7 sm:p-10'>
        <Image
          src='/chat-logo.png'
          alt='John AI'
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
