'use client';

import { useRef } from 'react';
import { useChat } from 'ai/react';
import clsx from 'clsx';
import { LoadingCircle, SendIcon } from './icons';
import Textarea from 'react-textarea-autosize';
import { renderMessages } from '@/components/MainPage';
import { ChatScrollAnchor } from '@/components/chat-scroll-anchor';

export default function Chat() {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { messages, input, setInput, handleSubmit, isLoading } = useChat({
    onResponse: (response) => {
      if (response.status === 429) {
        window.alert('You have reached your request limit for the day.');
        return;
      }
    },
  });

  const disabled = isLoading || input.length === 0;

  return (
    <main className='flex flex-col items-center justify-between'>
      <div className='mb-20 w-full max-w-screen-md pt-20'>
        {renderMessages({
          messages,
          setInput,
          inputRef,
          isLoading,
        })}
      </div>
      <div className='fixed bottom-0 flex w-full flex-col items-center space-y-3 bg-background p-5 pb-3 sm:px-0'>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='relative w-full max-w-screen-md rounded-xl border border-accent bg-secondary px-4 pb-2 pt-3 shadow-lg sm:pb-3 sm:pt-4'
        >
          <Textarea
            ref={inputRef}
            tabIndex={0}
            required
            rows={1}
            autoFocus
            placeholder='Send a message'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                formRef.current?.requestSubmit();
                e.preventDefault();
              }
            }}
            spellCheck={false}
            className='w-full bg-secondary pr-10 text-primary focus:outline-none'
          />
          <button
            className={clsx(
              'absolute inset-y-0 right-3 my-auto flex h-8 w-8 items-center justify-center rounded-md transition-all',
              disabled
                ? 'bg-contrast cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600'
            )}
            disabled={disabled}
          >
            {isLoading ? (
              <LoadingCircle />
            ) : (
              <SendIcon
                className={clsx(
                  'h-4 w-4',
                  input.length === 0 ? 'text-gray-300' : 'text-white'
                )}
              />
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
