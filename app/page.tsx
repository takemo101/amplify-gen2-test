'use client';

import type { Schema } from '@/amplify/data/resource';
import { generateClient } from 'aws-amplify/data';
import { useEffect, useState } from 'react';
import './../app/app.css';
import outputs from '@/amplify_outputs.json';
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import { Authenticator } from '@aws-amplify/ui-react';

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  const [todos, setTodos] = useState<Array<Schema['Todo']['type']>>([]);

  function listTodos() {
    const sub = client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });

    return () => sub.unsubscribe();
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const unsub = listTodos();

    return () => unsub();
  }, []);

  function createTodo() {
    client.models.Todo.create({
      content: window.prompt('Todo content'),
    });
  }

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id });
  }

  return (
    <main>
      <h1>My todos</h1>
      <Authenticator>
        {({ signOut, user }) => (
          <>
            <button type="button" onClick={createTodo}>
              + new
            </button>
            <ul>
              {todos.map((todo) => (
                <li onClick={() => deleteTodo(todo.id)} key={todo.id}>
                  {todo.content}
                </li>
              ))}
            </ul>
            <button type="button" onClick={signOut}>
              Sign out
            </button>
            <div>{user?.username}</div>
          </>
        )}
      </Authenticator>
    </main>
  );
}
