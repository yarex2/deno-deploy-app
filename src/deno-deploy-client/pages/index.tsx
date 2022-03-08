import { useDeno } from 'aleph/react'
import React from 'react'
import Links from '../components/Links.tsx'
import TodoList from '../components/TodoList.tsx'

export default function Home() {
  const version = useDeno(() => Deno.version.deno)

  return (
    <div className="page">
      <head>
        <title>Deno Deploy Client</title>
        <link rel="stylesheet" href="../style/index.css" />
        <link rel="stylesheet" href="../style/todos.css" />
      </head>
      <Links />
      <p className="copyinfo">Built by Aleph.js in Deno {version}</p>
      <TodoList />
    </div>
  )
}
