// frontend/app/page.tsx

'use client'

import { useState } from 'react'

export default function Home() {

  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  async function send() {

    const res = await fetch(
      'http://localhost:8000/chat',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          question
        })
      }
    )

    const data = await res.json()

    setAnswer(data.final_answer)
  }

  return (
    <div className='p-10'>

      <textarea
        className='border p-2 w-full'
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button
        className='border p-2 mt-2'
        onClick={send}
      >
        Ask
      </button>

      <div className='mt-4'>
        {answer}
      </div>

    </div>
  )
}