'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { Textarea } from './ui/textarea';
import axios from 'axios';

function QuickAdd() {
  const [content, setContent] = useState({
    content: ""
  })
  const handleSubmit = async () => {
    if (!content.content) {
      alert("Complete fields")
      return;
    }
    try {
      const {data} = await axios({
        method: "POST",
        url: "/api/kb",
        data: content
      })
    }catch (err: any) {
      console.log(err.message, 'Got an error')
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={'icon'} className=''>
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px] p-0'>
        <DialogHeader className='p-4 m-0 border-b border-accent'>
          <DialogTitle className='p-0'>Add a note</DialogTitle>
        </DialogHeader>
        <div className='p-4'>
          <Textarea onChange={(e) => setContent({...content, content: e.target.value})} />
        </div>
        <DialogFooter className='p-4 border-t border-accent'>
          <Button onClick={handleSubmit}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default QuickAdd;
