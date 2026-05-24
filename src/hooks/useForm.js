import { useState } from "react";

export const useForm = (initialForm = {}) => {
  const [formState, setformState] = useState(initialForm); //aqui muestra el Use State, donde me indica que variable debo comparar en el Action
  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setformState({
      ...formState,
      [name]: value
    });
  };  

  return {
    ...formState,
    formState,
    onInputChange //determina cabios en el formilario.
  };
};
