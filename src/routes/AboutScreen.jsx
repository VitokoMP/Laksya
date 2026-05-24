export const AboutScreen = () => {
  return (
<div>
    <footer className="bg-dark text-light">
    <div className="container py-4">
      <div className="row">
          <div className="col-md-4 text-center">
        <h5>Certificaciones 2024</h5>
        <br></br>
        <img src="../img/28b5ab9353df421e833bf7a000151726.png" alt="Certificado HubSpot" className="img-fluid mb-3" />
      </div>
        <div className="col-md-4 text-center">
          <h5>Contacto</h5>
          <br></br>
          <ul className="list-unstyled text-center">
              <li><i className="fas fa-envelope"></i> Email: victor19.mp@gmail.com</li>
          </ul>
          <br></br>
          <ul className="list-unstyled text-center">
             <li><a href="https://www.instagram.com/alekhart.codes/"><i className="fab fa-instagram"></i> Instagram</a></li>
          </ul>
        </div>

        <div className="col-md-4 text-center">
          <h5>Asesoría gratuita</h5>
          <br></br>
          <p>"La clave del éxito es empezar antes de estar listo" M.Forteo </p>
          <img src="../img/La clave del éxito.png" alt="Asesoria-gratuita" className="img-fluid mb-3" />
     
        </div>
      </div>
    </div>
    <div className="text-center py-3 bg-secondary">
      <p>&copy; 2026 Alekhart.Codes | Todos los derechos reservados.</p>
    </div>
  </footer>
  
        </div>
  )
}
export default AboutScreen;
