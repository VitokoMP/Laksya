import React from 'react';
import { Link } from 'react-router-dom';

export const Gracias = () => {
  return (
    <section className="py-5 text-center" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="display-1 mb-4">✅</div>
            <h1 className="display-4 mb-4">Recibido</h1>
            <p className="lead mb-5" style={{ fontSize: '1.3rem' }}>
              Te responderé en menos de 24h si cumples los criterios.
            </p>
            <Link to="/" className="btn btn-primary btn-lg px-5 py-3 rounded-pill">
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};