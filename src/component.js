import { useContext } from 'react';
import { StoreContext } from 'redux-react-hook';

function Component() {
  const store = useContext(StoreContext);
  const onClick = useCallback(() => {
    const value = selectExpensiveValue(store.getState());
    alert(`Value: ${value}`);
  });
  return <div onClick={onClick} />;
}

export default Component;
