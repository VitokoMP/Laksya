import React, { useState } from 'react';
import WhatsAppForm from "./WhatsappForm"

function Popup() {
    const [showPopup, setShowPopup] = useState(false);
  
    const togglePopup = () => {
      setShowPopup(!showPopup);
      if (!showPopup) {
        document.body.classList.add('no-scroll');
      } else {
        document.body.classList.remove('no-scroll');
      }
    };
  
    return (
      <div>
        <button onClick={togglePopup} className ="btn btn-primary">Contáctame</button>
        {showPopup && (
          <div className="popup-container">
            <div className="popup">
              <div className="popup_inner">
                <h2>Bienvenidos</h2>
                <p>Dejame enviarte informacion relevante sobre estrategias de marketing en redes sociales, y mostrarte una informacion específica para trabajar el posicionamiento de tu Marca Personal, respaldado por Hubspot. Al cerrar la ventana recibiré tu mensaje de whatsapp, para enviarte la info.</p>
      
        {/* Botón para cerrar el formulario emergente */}
                <a target="_blank" onClick={togglePopup} className ="btn btn-primary" href="https://wa.link/wxk4ia">Enviame Whatsap</a>


 

              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  
export default Popup;
