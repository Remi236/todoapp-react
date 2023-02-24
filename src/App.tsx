import './App.css';
import { TodoList } from './components/TodoList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo App</h1>
      </header>
      <main>
        <TodoList />
      </main>
      <footer>
        <p className="copyright">
          © 2023 by Remi Kykoyubi. All rights reversed
        </p>
      </footer>
    </div>
  );
}

export default App;
