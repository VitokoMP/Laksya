import React, { useState } from 'react';
import axios from 'axios';

function WhatsAppForm() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cityCode, setCityCode] = useState('');
  const [name, setName] = useState('');

  const handleChangePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleChangeCityCode = (event) => {
    setCityCode(event.target.value);
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!phoneNumber || !cityCode || !name) {
        throw new Error('Por favor, complete todos los campos.');
      }

      // Enviar el número de WhatsApp al servidor
      await axios.post('/api/send-whatsapp', { phoneNumber, cityCode, name });
      // Aquí puedes realizar alguna acción adicional después de enviar el número, como mostrar un mensaje de éxito
      console.log('Número de WhatsApp enviado correctamente:', phoneNumber);
    } catch (error) {
      console.error('Error al enviar el número de WhatsApp:', error.message);
      // Aquí puedes manejar errores, como mostrar un mensaje de error al usuario
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input
          type="text"
          value={name}
          onChange={handleChangeName}
          placeholder="Ingrese su nombre"
          required
        />
      </label>
      <label>
        Código de ciudad:
        <input
          type="text"
          value={cityCode}
          onChange={handleChangeCityCode}
          placeholder="Ingrese el código de ciudad"
          required
        />
      </label>
      <label>
        Número de WhatsApp:
        <input
          type="text"
          value={phoneNumber}
          onChange={handleChangePhoneNumber}
          placeholder="Ingrese su número de WhatsApp"
          required
        />
      </label>
      <button type="submit">Enviar mensaje</button>
    </form>
  );
}

export default WhatsAppForm;
