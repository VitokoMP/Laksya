import React, { createContext, useState, useEffect } from 'react';

export const UsuarioContext = createContext();

export const UsuarioProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const [carrito, setCarrito] = useState([]);
    const [mostrarCarrito, setMostrarCarrito] = useState(false);

    // Cargar carrito desde localStorage al iniciar
    useEffect(() => {
        const carritoGuardado = localStorage.getItem('carritoAlekhArt');
        if (carritoGuardado) {
            setCarrito(JSON.parse(carritoGuardado));
        }
    }, []);

    // Guardar carrito en localStorage cuando cambie
    useEffect(() => {
        localStorage.setItem('carritoAlekhArt', JSON.stringify(carrito));
    }, [carrito]);

    // Calcular total de items para el contador
    const totalItems = carrito.reduce((sum, item) => sum + (item.cantidad || 1), 0);

    return (
        <UsuarioContext.Provider value={{
            usuario,
            setUsuario,
            carrito,
            setCarrito,
            mostrarCarrito,
            setMostrarCarrito,
            totalItems
        }}>
            {children}
        </UsuarioContext.Provider>
    );
};
