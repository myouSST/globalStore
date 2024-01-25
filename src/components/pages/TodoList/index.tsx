import { useState }  from 'react';
import { observer }  from 'mobx-react-lite';
import { useStores } from '@/store/StoreContext';

const TodoList = observer(() => {
  const { todoStore } = useStores();
  const [text, setText] = useState<string>('');

  const addTodo = () => {
    todoStore.addTodo(false, text, { id: "myou" })
    setText('');
  };

  const deleteTodo = (id: number) => {
    todoStore.deleteTodo(id)
  };

  return (
    <div>
      <input type="text" value={ text } onChange={ e => setText(e.target.value) } />
      <button onClick={ addTodo }>Add</button>
      { todoStore.todos.map(todo => (
        <div key={ todo.id }>
          { todo.task }
          <button onClick={ () => deleteTodo(todo.id) }>Delete</button>
        </div>
      )) }
    </div>
  );
});

export default TodoList;