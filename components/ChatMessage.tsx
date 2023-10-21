// Inspired by Chatbot-UI and modified to fit the needs of this project
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Chat/ChatMessage.tsx

import { Message } from 'ai';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

import { cn } from '@/lib/utils';
import { CodeBlock } from '@/components/ui/codeblock';
import { MemoizedReactMarkdown } from '@/components/markdown';
import { IconOpenAI, IconUser } from '@/components/ui/icons';
// import { ChatMessageActions } from '@/components/chat-message-actions'

export interface ChatMessageProps {
  message: Message;
}

// TODO: Fix error "TypeError: Cannot assign to read only property '0' of string 'git"

export function ChatMessage({ message, ...props }: ChatMessageProps) {
  return (
    <div
      className={cn(
        `border-contrast group relative mb-4 flex items-start md:-ml-12`
      )}
      {...props}
    >
      <div
        className={cn(
          'flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow',
          message.role === 'user'
            ? 'bg-background'
            : 'bg-primary text-primary-foreground'
        )}
      >
        {message.role === 'user' ? <IconUser /> : <IconOpenAI />}
      </div>
      <div
        className={`ml-4 flex-1 space-y-2 overflow-hidden rounded-md border p-4  ${
          message.role === 'user' ? 'bg-accent' : 'bg-secondary'
        }`}
      >
        <MemoizedReactMarkdown
          className='prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 break-words'
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            p({ children }) {
              return <p className='mb-2 last:mb-0'>{children}</p>;
            },
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');

              if (inline) {
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }

              return (
                <CodeBlock
                  key={Math.random()}
                  language={(match && match[1]) || ''}
                  value={String(children).replace(/\n$/, '')}
                  {...props}
                />
              );
            },
          }}
        >
          {message.content}
        </MemoizedReactMarkdown>
        {/* <ChatMessageActions message={message} /> */}
      </div>
    </div>
  );
}
