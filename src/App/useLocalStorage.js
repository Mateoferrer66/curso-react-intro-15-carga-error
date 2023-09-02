import React from 'react';

function useLocalStorage(itemName, initialValue) { //cuenta con 3 estados para el item,carga y error.
  const [item, setItem] = React.useState(initialValue);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  
  React.useEffect(() => { //en un try catch por si llega a fallara no rompa la aplicacion 
    setTimeout(() => {
      try {
        const localStorageItem = localStorage.getItem(itemName);
    
        let parsedItem;
  
        if (!localStorageItem) {
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItem = initialValue;
        } else {
          parsedItem = JSON.parse(localStorageItem);
          setItem(parsedItem);
        }
  
        setLoading(false);//actualizadores y activadores de estado
      } catch(error) {
        setLoading(false);
        setError(true);
      }
    }, 2000);
  });

  const saveItem = (newItem) => {
    localStorage.setItem(itemName, JSON.stringify(newItem));
    setItem(newItem);
  };

  return { //retornar como objeto para no tener conflictos con la posision como si fuera array 
    item,
    saveItem,
    loading,
    error,
  };
}

export { useLocalStorage };
