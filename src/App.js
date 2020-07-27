import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './styles/app.css'
import Message from './components/Message'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import Footer from './components/Footer'

function App() {
  return (
    <div className="wrapper">
      <Router>
        <div className="todo-app">
          <Message />
          <TodoForm />
          <Route
            path='/:filter?'
            render={({match}) => (
              <TodoList filter={match.params.filter} />
            )}
          />
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
