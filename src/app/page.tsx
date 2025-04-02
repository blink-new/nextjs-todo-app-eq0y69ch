
'use client'

import { useState, useEffect } from 'react'
import { Plus, Check, Trash2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Todo {
  id: string
  text: string
  completed: boolean
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos))
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('todos', JSON.stringify(todos))
    }
  }, [todos, isLoading])

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTodo.trim()) return

    const todo = {
      id: crypto.randomUUID(),
      text: newTodo.trim(),
      completed: false
    }

    setTodos(prev => [todo, ...prev])
    setNewTodo('')
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-2xl">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-gray-800 mb-8 text-center"
      >
        Todo List
      </motion.h1>
      
      <motion.form 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onSubmit={addTodo} 
        className="mb-8"
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!newTodo.trim()}
          >
            <Plus size={20} />
            Add
          </button>
        </div>
      </motion.form>

      <AnimatePresence>
        {todos.map((todo, index) => (
          <motion.div
            key={todo.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ delay: index * 0.1 }}
            className={`group flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 mb-3 ${
              todo.completed ? 'bg-gray-50' : ''
            }`}
          >
            <button
              onClick={() => toggleTodo(todo.id)}
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                todo.completed
                  ? 'bg-green-500 border-green-500'
                  : 'border-gray-300 hover:border-purple-500'
              }`}
            >
              {todo.completed && <Check size={14} className="text-white" />}
            </button>
            
            <span
              className={`flex-1 text-gray-800 transition-all duration-200 ${
                todo.completed ? 'line-through text-gray-400' : ''
              }`}
            >
              {todo.text}
            </span>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => deleteTodo(todo.id)}
              className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-all duration-200"
            >
              <Trash2 size={18} />
            </motion.button>
          </motion.div>
        ))}
      </AnimatePresence>
      
      {todos.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 text-gray-500"
        >
          No todos yet. Add one above!
        </motion.div>
      )}
    </main>
  )
}