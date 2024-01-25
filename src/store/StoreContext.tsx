import { createContext, useContext } from 'react';
import TodoStore                     from '@/store/domain/todo/TodoStore.ts';

const StoreContext = createContext({
  todoStore: TodoStore,
});

export const useStores = () => useContext(StoreContext);