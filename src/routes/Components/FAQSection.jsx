import React, { useState } from 'react';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
  {
    question: "¿Esto reemplaza contratar un desarrollador interno?",
    answer: "No necesariamente. Muchas agencias trabajan conmigo antes de contratar equipo técnico interno. Me integro como partner estratégico cuando necesitan resolver sistemas complejos sin asumir el costo fijo de un equipo full-time."
  },
  {
    question: "¿Cómo funciona la colaboración con mi equipo?",
    answer: "Trabajo directamente con tu dirección o equipo de proyectos. Definimos alcance técnico, arquitectura y entregables. Tu agencia mantiene la relación con el cliente final. Yo opero como infraestructura técnica detrás."
  },
  {
    question: "¿Quién es dueño del código y los desarrollos?",
    answer: "Tu agencia. Siempre. Mi rol es construir la infraestructura, no retener propiedad. El código queda bajo tu control y puede escalarse internamente si decides formar equipo técnico propio."
  },
  {
    question: "¿Qué tipo de proyectos desarrollas?",
    answer: "Sistemas internos, automatizaciones complejas, dashboards, cotizadores avanzados, integraciones personalizadas y productos comerciales dentro de WordPress que no existen como plugin."
  },
  {
    question: "¿Cómo sé si mi agencia califica?",
    answer: "Si ya vendes proyectos de alto valor, tienes clientes con necesidades complejas y sientes que el límite técnico está frenando tu crecimiento, probablemente encajamos."
  }
];


  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container my-5" id="faq-section">
      {faqs.map((faq, index) => (
        <div key={index} className="mb-3">
          <div 
            className="card" 
            onClick={() => toggleAnswer(index)}
            style={{ cursor: 'pointer' }}
          >
            <div className="card-header">
              {faq.question}
            </div>
            {openIndex === index && (
              <div className="card-body">
                <p className="card-text">{faq.answer}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQSection;
