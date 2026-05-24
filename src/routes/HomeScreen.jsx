import React, { useState, useEffect, useRef, useContext } from "react";
import { UsuarioContext } from "../context/UsuarioContext";

export const HomeScreen = () => {
  const { 
    carrito, 
    setCarrito, 
    mostrarCarrito, 
    setMostrarCarrito 
  } = useContext(UsuarioContext);
  
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [formatoSeleccionado, setFormatoSeleccionado] = useState("standard");
  const [notificacion, setNotificacion] = useState(null);
  const fadeRefs = useRef([]);

  const WHATSAPP_NUMBER = "569XXXXXXXX";

  // Productos con colores chakra asignados
  const productos = [
    {
      id: 1,
      nombre: "Cordyceps Energía Vital",
      categoria: "Hongos · Raíz",
      imagen: "/img/ayurveda/cordyceps.jpg",
      descripcion: "Hongo medicinal para energía y resistencia natural",
      beneficios: ["⚡ Energía sostenida", "🏃 Resistencia física", "✨ Vitalidad"],
      chakra: "🔴 Raíz · Energía base",
      chakraColor: "#ff4d4d",
      glowIntensity: "0.35",
      formatos: {
        standard: { precio: 45000, disponible: true, descripcion: "60 cápsulas · 30 días", cantidad: "500mg" },
        premium: { precio: 89000, disponible: true, descripcion: "120 cápsulas · 60 días", cantidad: "500mg" },
        polvo: { precio: 65000, disponible: true, descripcion: "100g polvo puro", cantidad: "100% orgánico" }
      },
      origen: "Tibet · Cosecha silvestre"
    },
    {
      id: 2,
      nombre: "Ashwagandha Equilibrio",
      categoria: "Adaptógenos · Corazón",
      imagen: "/img/ayurveda/ashwagandha.jpg",
      descripcion: "Adaptógeno ancestral para manejo del estrés",
      beneficios: ["🧘 Reduce estrés", "😴 Mejora sueño", "🎯 Enfoque mental"],
      chakra: "💚 Corazón · Amor propio",
      chakraColor: "#4dff88",
      glowIntensity: "0.3",
      formatos: {
        standard: { precio: 38000, disponible: true, descripcion: "60 cápsulas · 30 días", cantidad: "600mg" },
        premium: { precio: 72000, disponible: true, descripcion: "120 cápsulas · 60 días", cantidad: "600mg" },
        infusion: { precio: 35000, disponible: true, descripcion: "20 sobres", cantidad: "3g por sobre" }
      },
      origen: "India · Cosecha orgánica"
    },
    {
      id: 3,
      nombre: "Golden Milk Ritual",
      categoria: "Bebidas · Corona",
      imagen: "/img/ayurveda/golden-milk.jpg",
      descripcion: "Leche dorada tradicional con cúrcuma y especias",
      beneficios: ["🔥 Antiinflamatorio", "🍽️ Digestión", "🦵 Articulaciones"],
      chakra: "👑 Corona · Conexión divina",
      chakraColor: "#ffd966",
      glowIntensity: "0.4",
      formatos: {
        polvo: { precio: 32000, disponible: true, descripcion: "200g · 40 tazas", cantidad: "Mezcla lista" },
        premium: { precio: 55000, disponible: true, descripcion: "500g premium", cantidad: "Con añadidos selectos" },
        listo: { precio: 18000, disponible: false, descripcion: "Bebida lista", cantidad: "400ml" }
      },
      origen: "Kerala, India · Receta ancestral"
    },
    {
      id: 4,
      nombre: "Reishi Sueño Profundo",
      categoria: "Hongos · Tercer Ojo",
      imagen: "/img/ayurveda/reishi.jpg",
      descripcion: "Hongo de la inmortalidad para descanso reparador",
      beneficios: ["🌙 Sueño profundo", "🔄 Recuperación", "🛡️ Inmunidad"],
      chakra: "🟣 Tercer Ojo · Intuición",
      chakraColor: "#b84dff",
      glowIntensity: "0.35",
      formatos: {
        standard: { precio: 42000, disponible: true, descripcion: "60 cápsulas", cantidad: "450mg" },
        premium: { precio: 78000, disponible: true, descripcion: "120 cápsulas", cantidad: "450mg" },
        extracto: { precio: 95000, disponible: true, descripcion: "Extracto concentrado", cantidad: "10:1 ratio" }
      },
      origen: "China · Cultivo tradicional"
    },
    {
      id: 5,
      nombre: "Colágeno Vital",
      categoria: "Belleza · Sacro",
      imagen: "/img/ayurveda/colageno.jpg",
      descripcion: "Colágeno marino + adaptógenos para piel radiante",
      beneficios: ["✨ Piel radiante", "🦴 Articulaciones", "💇 Cabello fuerte"],
      chakra: "🧡 Sacro · Creatividad",
      chakraColor: "#ffa64d",
      glowIntensity: "0.3",
      formatos: {
        polvo: { precio: 52000, disponible: true, descripcion: "300g", cantidad: "10g por porción" },
        premium: { precio: 89000, disponible: true, descripcion: "500g", cantidad: "Con vitamina C" }
      },
      origen: "Océanos limpios · Sostenible"
    },
    {
      id: 6,
      nombre: "Té Chakra 7",
      categoria: "Bebidas · Todos los chakras",
      imagen: "/img/ayurveda/chakra-tea.jpg",
      descripcion: "Mezcla de 7 hierbas para equilibrio completo",
      beneficios: ["⚖️ Balance energético", "🍃 Digestión", "🧠 Claridad mental"],
      chakra: "🌈 7 Chakras · Armonía total",
      chakraColor: "var(--chakra-gradient)",
      glowIntensity: "0.45",
      formatos: {
        estandar: { precio: 28000, disponible: true, descripcion: "20 sobres", cantidad: "2g por sobre" },
        bulk: { precio: 45000, disponible: true, descripcion: "200g a granel", cantidad: "100% orgánico" }
      },
      origen: "Himalaya · Cosecha manual"
    }
  ];

  const terapias = [
    { nombre: "Consulta Ayurvédica", icono: "📜", descripcion: "Análisis de doshas personalizado · 60 min", precio: 120000, chakra: "🔮" },
    { nombre: "Masaje Abhyanga", icono: "💆", descripcion: "Masaje con aceites herbales · 90 min", precio: 180000, chakra: "💚" },
    { nombre: "Ceremonia Temazcal", icono: "🔥", descripcion: "Sauna de vapor ancestral · 120 min", precio: 250000, chakra: "⚡" },
    { nombre: "Respiración Pranayama", icono: "🧘", descripcion: "Técnicas de respiración consciente · 45 min", precio: 90000, chakra: "👑" }
  ];

  const beneficios = [
    { emoji: "🌿", titulo: "100% Orgánico", desc: "Certificado y sin químicos", color: "#6f7d5c" },
    { emoji: "🔮", titulo: "Alineación Chakras", desc: "Equilibrio energético", color: "#9d6bff" },
    { emoji: "🌍", titulo: "Sostenible", desc: "Cosecha responsable", color: "#6bd0ff" },
    { emoji: "✨", titulo: "Holístico", desc: "Cuerpo, mente y espíritu", color: "#ff6bd6" }
  ];

  const testimonios = [
    {
      texto: "El Cordyceps transformó mi energía. Trabajo en marketing digital y necesitaba resistencia mental. Esto es increíble.",
      autor: "Marta, Santiago",
      rol: "Emprendedora"
    },
    {
      texto: "La Ashwagandha me salvó durante estrés laboral. Dormía mejor, estaba más centrada. Definitivamente recomendado.",
      autor: "Carlos, Valparaíso",
      rol: "Ingeniero"
    },
    {
      texto: "El Temazcal fue una experiencia transformadora. Mano Antigua maneja una energía muy cuidada.",
      autor: "Sofía, Pucón",
      rol: "Terapeuta"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    fadeRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !fadeRefs.current.includes(el)) {
      fadeRefs.current.push(el);
    }
  };

  const formatearPrecio = (precio) => `$${precio.toLocaleString("es-CL")}`;

  const mostrarNotificacion = (mensaje, tipo = "success") => {
    setNotificacion({ mensaje, tipo });
    setTimeout(() => setNotificacion(null), 2500);
  };

  const abrirProducto = (producto) => {
    setProductoSeleccionado(producto);
    const primerDisponible = Object.entries(producto.formatos).find(([_, formato]) => formato.disponible);
    setFormatoSeleccionado(primerDisponible?.[0] || "standard");
  };

  const cerrarModalProducto = () => {
    setProductoSeleccionado(null);
  };

  const agregarAlCarrito = () => {
    if (!productoSeleccionado) return;
    
    const formato = productoSeleccionado.formatos[formatoSeleccionado];
    
    const itemCarrito = {
      id: `${productoSeleccionado.id}-${formatoSeleccionado}`,
      productoId: productoSeleccionado.id,
      nombre: productoSeleccionado.nombre,
      formato: formatoSeleccionado,
      precio: formato.precio,
      imagen: productoSeleccionado.imagen,
      cantidad: 1
    };

    setCarrito(prev => {
      const existe = prev.find(item => 
        item.productoId === productoSeleccionado.id && 
        item.formato === formatoSeleccionado
      );
      
      if (existe) {
        return prev.map(item => 
          item.productoId === productoSeleccionado.id && item.formato === formatoSeleccionado
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prev, itemCarrito];
    });

    mostrarNotificacion(`${productoSeleccionado.nombre} añadido al carrito ✨`);
    cerrarModalProducto();
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(prev => prev.filter(item => item.id !== id));
    mostrarNotificacion('Producto eliminado');
  };

  const actualizarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad < 1) {
      eliminarDelCarrito(id);
      return;
    }

    setCarrito(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, cantidad: nuevaCantidad }
          : item
      )
    );
  };

  const calcularTotal = () => {
    return carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  };

  const vaciarCarrito = () => {
    if (window.confirm('¿Eliminar todos los productos del carrito?')) {
      setCarrito([]);
      mostrarNotificacion('Carrito vaciado');
    }
  };

  const enviarWhatsApp = () => {
    if (carrito.length === 0) {
      mostrarNotificacion('El carrito está vacío', 'error');
      return;
    }

    const itemsTexto = carrito.map(item => 
      `• ${item.nombre} (${item.formato}) — ${formatearPrecio(item.precio)}${item.cantidad > 1 ? ` x${item.cantidad}` : ''}`
    ).join('%0A');

    const total = calcularTotal();
    
    const mensaje = `Hola! Quiero confirmar este pedido:%0A%0A${itemsTexto}%0A%0ATotal: *${formatearPrecio(total)}*%0A%0AQuedo atento a los datos de pago 🙌`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${mensaje}`, "_blank");
  };

  return (
    <div className="ayurveda-fusion">
      {/* HERO CON AURORA + NOISE */}
      <section className="hero-section">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
          src="/mixkit-fungus-growing-on-a-tree-15447-hd-ready.mp4"
          type="video/mp4"
          />
        </video>
        <div className="hero-aurora"></div>
        <div className="hero-aurora-layer"></div>
        <div className="noise-overlay"></div>
        
        <div className="hero-content">
          <div className="hero-icon">𑁍 ✧ ☾</div>
          <h1 className="hero-titulo">
            Ayurveda
            <span className="hero-subtitle"> Vital</span>
          </h1>
          <p className="hero-tagline">Cordyceps · Adaptógenos · Terapias Ayurvédicas</p>
          <p className="hero-frase">"Equilibrio natural para cuerpo y espíritu"</p>
          <div className="hero-badges">
            <span className="badge">🌿 100% Natural</span>
            <span className="badge">🔮 Medicina Ancestral</span>
            <span className="badge">🌈 Equilibrio Chakras</span>
            <span className="badge">✨ Origen Orgánico</span>
          </div>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => document.querySelector(".productos-section").scrollIntoView({ behavior: "smooth" })}>
              Explorar Productos ✨
            </button>
            <button className="btn-secondary" onClick={() => document.querySelector(".terapias-section").scrollIntoView({ behavior: "smooth" })}>
              Ver Terapias 🔮
            </button>
          </div>
        </div>
        
        <div className="floating-particles">
          <span>✦</span><span>☾</span><span>✺</span><span>ॐ</span><span>𑁍</span><span>🌀</span><span>⚡</span>
        </div>
      </section>

      {/* PRODUCTOS CON GLOW POR CHAKRA */}
      <section className="productos-section" ref={addToRefs}>
        <h2 className="section-titulo">Productos <span className="rainbow-text">Premium</span></h2>
        <p className="section-subtitulo">Selecciona tu camino hacia el bienestar integral</p>
        <div className="productos-grid">
          {productos.map((producto) => (
            <div 
              key={producto.id} 
              className="producto-card fade-in" 
              ref={addToRefs} 
              onClick={() => abrirProducto(producto)}
              style={{ 
                '--chakra-glow': producto.chakraColor,
                '--glow-intensity': producto.glowIntensity
              }}
            >
              <div className="producto-imagen">
                <img src={producto.imagen} alt={producto.nombre} />
                <div className="producto-overlay" style={{ background: `linear-gradient(135deg, ${producto.chakraColor}40, transparent)` }}>
                  <button className="btn-ver-mas">Ver Detalles 🔮</button>
                </div>
              </div>
              <div className="producto-info">
                <p className="producto-categoria">{producto.categoria}</p>
                <h3 className="producto-nombre">{producto.nombre}</h3>
                <p className="producto-descripcion">{producto.descripcion}</p>
                <div className="producto-chakra" style={{ background: `${producto.chakraColor}20`, color: producto.chakraColor }}>
                  <span>{producto.chakra}</span>
                </div>
                <div className="producto-beneficios">
                  {producto.beneficios.map((beneficio, idx) => (
                    <span key={idx} className="beneficio-tag">{beneficio}</span>
                  ))}
                </div>
                <p className="producto-origen">✨ {producto.origen}</p>
                <div className="producto-precios">
                  {Object.entries(producto.formatos).map(([key, formato]) => formato.disponible && (
                    <span key={key} className="precio-minimo">desde {formatearPrecio(formato.precio)}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TERAPIAS */}
      <section className="terapias-section" ref={addToRefs}>
        <h2 className="section-titulo">Terapias & <span className="rainbow-text">Experiencias</span></h2>
        <p className="section-subtitulo">Conecta profundamente con tu esencia</p>
        <div className="terapias-grid">
          {terapias.map((terapia, idx) => (
            <div key={idx} className="terapia-card fade-in" ref={addToRefs}>
              <div className="terapia-icono">{terapia.icono} {terapia.chakra}</div>
              <h3>{terapia.nombre}</h3>
              <p>{terapia.descripcion}</p>
              <p className="terapia-precio">{formatearPrecio(terapia.precio)}</p>
              <button className="btn-terapia" onClick={() => {
                const mensaje = encodeURIComponent(`Hola! Me interesa agendar: ${terapia.nombre} - ${formatearPrecio(terapia.precio)}`);
                window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${mensaje}`, "_blank");
              }}>Agendar ✨</button>
            </div>
          ))}
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="beneficios-section" ref={addToRefs}>
        <h2 className="section-titulo">Por qué <span className="rainbow-text">Ayurveda Vital</span></h2>
        <div className="beneficios-cards">
          {beneficios.map((item, idx) => (
            <div key={idx} className="beneficio-card fade-in" ref={addToRefs} style={{ '--chakra-color': item.color }}>
              <div className="beneficio-emoji">{item.emoji}</div>
              <h4>{item.titulo}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SOBRE */}
      <section className="sobre-section fade-in" ref={addToRefs}>
        <div className="container">
          <div className="sobre-grid">
            <div className="sobre-imagen">
              <div className="sobre-placeholder">🌿</div>
            </div>
            <div className="sobre-contenido">
              <h2 className="section-titulo">Medicina del <span className="rainbow-text">Alma</span></h2>
              <div className="sobre-linea"></div>
              <p className="sobre-texto-grande">
                Cada planta es un maestro. Cada ritual, una conversación con lo sagrado.
              </p>
              <p className="sobre-texto">
                Ayurveda Vital nace de la creencia de que la salud verdadera es un viaje hacia adentro. No vendemos productos: ofrecemos puentes entre tu cuerpo y la sabiduría ancestral.
              </p>
              <p className="sobre-texto">
                Cada formula está seleccionada con intención. Cada terapia, diseñada para activar tu propia capacidad de sanación.
              </p>
              <div className="sobre-firma">Medicina para el nuevo tiempo</div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="testimonios-section fade-in" ref={addToRefs}>
        <div className="container">
          <h2 className="section-titulo text-center">Lo que dicen nuestros <span className="rainbow-text">guardianes</span></h2>
          <div className="testimonios-grid">
            {testimonios.map((testim, idx) => (
              <div key={idx} className="testimonio-card">
                <div className="testimonio-icono">✦</div>
                <p className="testimonio-texto">"{testim.texto}"</p>
                <p className="testimonio-autor">— {testim.autor}</p>
                <p className="testimonio-rol">{testim.rol}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section className="contacto-section fade-in" ref={addToRefs}>
        <div className="container">
          <div className="contacto-contenido">
            <h2 className="section-titulo">¿Preguntas sobre tu camino?</h2>
            <p>Escribimos respuestas personalizadas. Creemos en la conversación.</p>
            <a href="mailto:hola@ayurveda-vital.com" className="contacto-boton">
              hola@ayurveda-vital.com
            </a>
            <div className="contacto-redes">
              <a href="#" aria-label="Instagram">Instagram</a>
              <a href="#" aria-label="WhatsApp">WhatsApp</a>
              <a href="#" aria-label="TikTok">TikTok</a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2026 Ayurveda Vital · Medicina para el nuevo tiempo</p>
      </footer>

      {/* MODAL DE DETALLES DEL PRODUCTO */}
      {productoSeleccionado && (
        <div className="modal-overlay" onClick={cerrarModalProducto}>
          <div className="modal-contenido modal-producto" onClick={(e) => e.stopPropagation()}>
            <button className="modal-cerrar" onClick={cerrarModalProducto}>×</button>
            
            <div className="modal-producto-grid">
              <div className="modal-producto-imagen">
                <img src={productoSeleccionado.imagen} alt={productoSeleccionado.nombre} />
              </div>
              
              <div className="modal-producto-info">
                <h2>{productoSeleccionado.nombre}</h2>
                <p className="modal-categoria">{productoSeleccionado.categoria}</p>
                <p className="modal-descripcion">{productoSeleccionado.descripcion}</p>
                
                <div className="modal-beneficios">
                  <h3>Beneficios</h3>
                  {productoSeleccionado.beneficios.map((ben, idx) => (
                    <p key={idx}>{ben}</p>
                  ))}
                </div>

                <div className="modal-chakra" style={{ background: `${productoSeleccionado.chakraColor}20` }}>
                  <span style={{ color: productoSeleccionado.chakraColor }}>
                    {productoSeleccionado.chakra}
                  </span>
                </div>

                <p className="modal-origen">✨ {productoSeleccionado.origen}</p>
                
                <div className="formatos-selector">
                  <h3>Elige un formato:</h3>
                  
                  {Object.entries(productoSeleccionado.formatos).map(([key, formato]) => (
                    formato.disponible && (
                      <label 
                        key={key} 
                        className={`formato-opcion ${formatoSeleccionado === key ? 'seleccionado' : ''}`}
                      >
                        <input
                          type="radio"
                          name="formato"
                          value={key}
                          checked={formatoSeleccionado === key}
                          onChange={() => setFormatoSeleccionado(key)}
                        />
                        <div className="formato-info">
                          <span className="formato-nombre">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                          <span className="formato-precio">{formatearPrecio(formato.precio)}</span>
                          <span className="formato-descripcion">{formato.descripcion} · {formato.cantidad}</span>
                        </div>
                      </label>
                    )
                  ))}
                </div>
                
                <button className="modal-agregar-btn" onClick={agregarAlCarrito}>
                  Agregar al carrito ✨
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE CARRITO */}
      {mostrarCarrito && (
        <div className="carrito-overlay" onClick={() => setMostrarCarrito(false)}>
          <div className="carrito-modal" onClick={(e) => e.stopPropagation()}>
            <div className="carrito-header">
              <h2>Tu carrito sagrado</h2>
              <button className="carrito-cerrar" onClick={() => setMostrarCarrito(false)}>×</button>
            </div>
            
            {carrito.length === 0 ? (
              <div className="carrito-vacio">
                <p>No hay productos en el carrito</p>
                <button 
                  className="carrito-seguir-comprando"
                  onClick={() => setMostrarCarrito(false)}
                >
                  Seguir comprando
                </button>
              </div>
            ) : (
              <>
                <div className="carrito-items">
                  {carrito.map(item => (
                    <div key={item.id} className="carrito-item">
                      <img src={item.imagen} alt={item.nombre} />
                      
                      <div className="carrito-item-info">
                        <h4>{item.nombre}</h4>
                        <p className="carrito-item-formato">Formato: {item.formato}</p>
                        <p className="carrito-item-precio">{formatearPrecio(item.precio)}</p>
                        
                        <div className="carrito-item-cantidad">
                          <button 
                            onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                            className="cantidad-btn"
                          >−</button>
                          <span>{item.cantidad}</span>
                          <button 
                            onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                            className="cantidad-btn"
                          >+</button>
                        </div>
                      </div>
                      
                      <button 
                        className="carrito-eliminar-item"
                        onClick={() => eliminarDelCarrito(item.id)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="carrito-footer">
                  <div className="carrito-total">
                    <span>Total:</span>
                    <strong>{formatearPrecio(calcularTotal())}</strong>
                  </div>
                  
                  <div className="carrito-acciones">
                    <button 
                      className="carrito-vaciar"
                      onClick={vaciarCarrito}
                    >
                      Vaciar
                    </button>
                    
                    <button 
                      className="carrito-whatsapp"
                      onClick={enviarWhatsApp}
                    >
                      Confirmar por WhatsApp
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* NOTIFICACIÓN */}
      {notificacion && (
        <div className={`notificacion ${notificacion.tipo}`}>
          {notificacion.mensaje}
        </div>
      )}

      <style jsx>{`
        /* VARIABLES */
        :root {
          --bg-main: #f5f1e8;
          --bg-soft: #ede6d6;
          --verde-salvia: #6f7d5c;
          --verde-profundo: #3f4b3b;
          --ocre: #b38b59;
          --arena: #d8c3a5;
          --texto: #2f2a24;
          --texto-soft: #6e6257;
          --oro-suave: #c6a56b;
          --violeta-mistico: #9d6bff;
          --rosa-energia: #ff6bd6;
          --azul-alma: #6bd0ff;
          --chakra-gradient: linear-gradient(90deg, #ff6b6b, #ffb86b, #ffe66d, #6bff95, #6bd0ff, #9d6bff, #ff6bd6);
        }

        * { box-sizing: border-box; }

        .ayurveda-fusion {
          font-family: "Inter", "Manrope", system-ui, sans-serif;
          color: var(--texto);
          background: linear-gradient(135deg, var(--bg-main) 0%, var(--bg-soft) 100%);
          min-height: 100vh;
          position: relative;
        }

        h1, h2, h3, .hero-titulo, .section-titulo {
          font-family: "Cormorant Garamond", "Times New Roman", serif;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        /* HERO */
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 20% 30%, rgba(157, 107, 255, 0.12) 0%, transparent 30%),
                      radial-gradient(circle at 80% 70%, rgba(111, 125, 92, 0.08) 0%, transparent 40%);
        }

        .hero-aurora {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 40% 50%, rgba(107, 208, 255, 0.15) 0%, transparent 50%);
          filter: blur(80px);
          mix-blend-mode: screen;
          animation: auroraMove 12s ease-in-out infinite alternate;
        }

        .hero-aurora-layer {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 60% 40%, rgba(255, 107, 214, 0.12) 0%, transparent 60%);
          filter: blur(100px);
          mix-blend-mode: screen;
          animation: auroraMove 15s ease-in-out infinite alternate-reverse;
        }

        @keyframes auroraMove {
          0% { transform: translateX(-30px) translateY(0px) scale(1); }
          100% { transform: translateX(30px) translateY(-40px) scale(1.05); }
        }

        .noise-overlay {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 1;
        }

        .floating-particles {
          position: absolute;
          bottom: 2rem;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          font-size: 1.2rem;
          color: var(--violeta-mistico);
          opacity: 0.4;
          animation: floatParticles 6s ease-in-out infinite;
          z-index: 2;
        }

        @keyframes floatParticles {
          0%, 100% { transform: translateY(0); opacity: 0.3; }
          50% { transform: translateY(-10px); opacity: 0.6; }
        }

        .hero-content {
          position: relative;
          text-align: center;
          z-index: 3;
          padding: 2rem;
          max-width: 900px;
        }

        .hero-icon {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: var(--violeta-mistico);
          animation: spin 20s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .hero-titulo {
          font-size: 4.5rem;
          font-weight: 500;
          color: var(--verde-profundo);
          margin-bottom: 0.5rem;
        }

        .hero-subtitle {
          background: var(--chakra-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-tagline {
          font-size: 1rem;
          letter-spacing: 3px;
          color: var(--texto-soft);
          margin-bottom: 0.8rem;
          text-transform: uppercase;
        }

        .hero-frase {
          font-size: 1.2rem;
          font-style: italic;
          color: var(--verde-salvia);
          margin-bottom: 2rem;
        }

        .hero-badges {
          display: flex;
          justify-content: center;
          gap: 0.8rem;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }

        .badge {
          background: rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(8px);
          padding: 0.4rem 1.2rem;
          border-radius: 40px;
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--verde-profundo);
          border: 1px solid rgba(157, 107, 255, 0.3);
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-primary {
          background: linear-gradient(135deg, var(--verde-salvia), var(--violeta-mistico));
          color: white;
          border: none;
          padding: 0.9rem 2.2rem;
          border-radius: 50px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 20px rgba(157, 107, 255, 0.25);
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(157, 107, 255, 0.4);
        }

        .btn-secondary {
          background: transparent;
          color: var(--verde-profundo);
          border: 2px solid var(--violeta-mistico);
          padding: 0.8rem 2rem;
          border-radius: 50px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-secondary:hover {
          background: rgba(157, 107, 255, 0.1);
          transform: translateY(-3px);
        }

        /* SECCIONES */
        .section-titulo {
          font-size: 2.8rem;
          text-align: center;
          color: var(--verde-profundo);
          margin-bottom: 0.5rem;
        }

        .text-center {
          text-align: center;
        }

        .rainbow-text {
          background: var(--chakra-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .section-subtitulo {
          text-align: center;
          color: var(--texto-soft);
          font-size: 1rem;
          margin-bottom: 3rem;
        }

        /* PRODUCTOS */
        .productos-section {
          padding: 5rem 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .productos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }

        .producto-card {
          background: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 24px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.4s ease;
        }

        .producto-card:hover {
          transform: translateY(-10px);
          border-color: transparent;
          background: linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.3)) padding-box,
                      var(--chakra-gradient) border-box;
          box-shadow: 0 20px 40px rgba(63, 75, 59, 0.12), 0 0 40px var(--chakra-glow);
        }

        .producto-imagen {
          position: relative;
          overflow: hidden;
          height: 280px;
        }

        .producto-imagen img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .producto-card:hover .producto-imagen img {
          transform: scale(1.08);
        }

        .producto-overlay {
          position: absolute;
          inset: 0;
          backdrop-filter: blur(2px);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .producto-card:hover .producto-overlay {
          opacity: 1;
        }

        .btn-ver-mas {
          background: linear-gradient(135deg, var(--violeta-mistico), var(--rosa-energia));
          color: white;
          border: none;
          padding: 0.7rem 1.8rem;
          border-radius: 40px;
          font-weight: 600;
          cursor: pointer;
        }

        .producto-info {
          padding: 1.5rem;
        }

        .producto-categoria {
          font-size: 0.7rem;
          color: var(--violeta-mistico);
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 0.5rem;
        }

        .producto-nombre {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: var(--verde-profundo);
        }

        .producto-descripcion {
          font-size: 0.9rem;
          color: var(--texto-soft);
          margin-bottom: 0.8rem;
        }

        .producto-chakra {
          display: inline-block;
          padding: 0.2rem 0.7rem;
          border-radius: 20px;
          font-size: 0.7rem;
          margin-bottom: 0.8rem;
        }

        .producto-beneficios {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 0.8rem;
        }

        .beneficio-tag {
          background: rgba(111, 125, 92, 0.15);
          color: var(--verde-salvia);
          padding: 0.2rem 0.7rem;
          border-radius: 20px;
          font-size: 0.7rem;
        }

        .producto-origen {
          font-size: 0.7rem;
          color: var(--oro-suave);
          margin-bottom: 0.8rem;
        }

        .producto-precios {
          display: flex;
          gap: 0.5rem;
        }

        .precio-minimo {
          background: rgba(198, 165, 107, 0.15);
          color: var(--ocre);
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        /* TERAPIAS */
        .terapias-section {
          padding: 5rem 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .terapias-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 2rem;
        }

        .terapia-card {
          background: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(157, 107, 255, 0.2);
          border-radius: 24px;
          padding: 2rem;
          text-align: center;
          transition: all 0.3s ease;
        }

        .terapia-card:hover {
          transform: translateY(-8px);
          border-color: var(--violeta-mistico);
          box-shadow: 0 20px 40px rgba(157, 107, 255, 0.15);
        }

        .terapia-icono {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .terapia-card h3 {
          font-size: 1.3rem;
          margin-bottom: 0.5rem;
          color: var(--verde-profundo);
        }

        .terapia-card p {
          color: var(--texto-soft);
          font-size: 0.85rem;
          margin-bottom: 1rem;
        }

        .terapia-precio {
          font-size: 1.2rem;
          font-weight: 600;
          color: var(--violeta-mistico);
          margin-bottom: 1.2rem;
        }

        .btn-terapia {
          background: linear-gradient(135deg, var(--verde-salvia), var(--violeta-mistico));
          color: white;
          border: none;
          padding: 0.6rem 1.5rem;
          border-radius: 40px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s;
        }

        .btn-terapia:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(157, 107, 255, 0.3);
        }

        /* BENEFICIOS */
        .beneficios-section {
          padding: 5rem 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .beneficios-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 2rem;
        }

        .beneficio-card {
          background: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(157, 107, 255, 0.15);
          border-radius: 20px;
          padding: 2rem;
          text-align: center;
          transition: all 0.3s ease;
        }

        .beneficio-card:hover {
          transform: translateY(-5px);
          border-color: var(--chakra-color);
          box-shadow: 0 0 20px rgba(157, 107, 255, 0.15);
        }

        .beneficio-emoji {
          font-size: 2.2rem;
          margin-bottom: 1rem;
        }

        .beneficio-card h4 {
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
          color: var(--verde-profundo);
        }

        .beneficio-card p {
          color: var(--texto-soft);
          font-size: 0.85rem;
        }

        /* SOBRE */
        .sobre-section {
          padding: 5rem 0;
        }

        .sobre-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .sobre-imagen {
          position: relative;
          border-radius: 30px;
          overflow: hidden;
          height: 400px;
          background: linear-gradient(135deg, rgba(157, 107, 255, 0.2), rgba(107, 208, 255, 0.2));
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 25px 45px rgba(0,0,0,0.1);
        }

        .sobre-placeholder {
          font-size: 8rem;
          opacity: 0.3;
        }

        .sobre-linea {
          width: 60px;
          height: 2px;
          background: var(--violeta-mistico);
          margin-bottom: 1.5rem;
        }

        .sobre-texto-grande {
          font-size: 1.4rem;
          font-style: italic;
          color: var(--verde-profundo);
          margin-bottom: 1.2rem;
        }

        .sobre-texto {
          color: var(--texto-soft);
          margin-bottom: 1.2rem;
        }

        .sobre-firma {
          font-size: 1.8rem;
          background: var(--chakra-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-top: 1.5rem;
        }

        /* TESTIMONIOS */
        .testimonios-section {
          padding: 5rem 0;
        }

        .testimonios-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .testimonio-card {
          background: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(157, 107, 255, 0.2);
          border-radius: 24px;
          padding: 2rem;
          text-align: center;
          transition: all 0.3s ease;
        }

        .testimonio-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(157, 107, 255, 0.1);
        }

        .testimonio-icono {
          font-size: 2rem;
          color: var(--violeta-mistico);
          opacity: 0.5;
          margin-bottom: 1rem;
        }

        .testimonio-texto {
          font-size: 1rem;
          font-style: italic;
          color: var(--verde-profundo);
          margin-bottom: 1rem;
        }

        .testimonio-autor {
          color: var(--violeta-mistico);
          font-weight: 600;
        }

        .testimonio-rol {
          color: var(--texto-soft);
          font-size: 0.85rem;
        }

        /* CONTACTO */
        .contacto-section {
          padding: 5rem 0;
        }

        .contacto-contenido {
          text-align: center;
          max-width: 600px;
          margin: 0 auto;
        }

        .contacto-contenido p {
          font-size: 1.1rem;
          color: var(--texto-soft);
          margin-bottom: 2rem;
        }

        .contacto-boton {
          display: inline-block;
          padding: 1rem 2.5rem;
          background: linear-gradient(135deg, var(--verde-salvia), var(--violeta-mistico));
          color: white;
          text-decoration: none;
          border-radius: 50px;
          margin-bottom: 2rem;
          transition: all 0.3s ease;
        }

        .contacto-boton:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(157, 107, 255, 0.3);
        }

        .contacto-redes {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
        }

        .contacto-redes a {
          color: var(--violeta-mistico);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .contacto-redes a:hover {
          color: var(--rosa-energia);
        }

        /* FOOTER */
        .footer {
          text-align: center;
          padding: 2rem;
          border-top: 1px solid rgba(157, 107, 255, 0.1);
          color: var(--texto-soft);
          font-size: 0.9rem;
        }

        /* FADE */
        .fade-in {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .fade-in.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* MODALES */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.95);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          padding: 1rem;
          overflow-y: auto;
        }

        .modal-contenido {
          background: #f5f1e8;
          border-radius: 30px;
          max-width: 95vw;
          max-height: 90vh;
          overflow: auto;
          position: relative;
          padding: 2rem;
        }

        .modal-producto {
          max-width: 1000px;
        }

        .modal-cerrar {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--violeta-mistico);
          color: white;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .modal-cerrar:hover {
          transform: scale(1.1);
        }

        .modal-producto-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .modal-producto-imagen img {
          width: 100%;
          height: auto;
          border-radius: 20px;
        }

        .modal-producto-info h2 {
          font-size: 2rem;
          color: var(--verde-profundo);
          margin-bottom: 0.5rem;
        }

        .modal-categoria {
          color: var(--violeta-mistico);
          margin-bottom: 0.5rem;
        }

        .modal-descripcion {
          color: var(--texto-soft);
          margin-bottom: 1.5rem;
        }

        .modal-beneficios {
          margin: 1.5rem 0;
        }

        .modal-beneficios h3 {
          font-size: 1.1rem;
          color: var(--verde-profundo);
          margin-bottom: 0.5rem;
        }

        .modal-beneficios p {
          color: var(--texto-soft);
          font-size: 0.9rem;
          margin: 0.3rem 0;
        }

        .modal-chakra {
          padding: 1rem;
          border-radius: 15px;
          margin: 1.5rem 0;
          text-align: center;
        }

        .modal-origen {
          color: var(--oro-suave);
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
        }

        .formatos-selector {
          margin: 2rem 0;
        }

        .formatos-selector h3 {
          font-size: 1.1rem;
          color: var(--verde-profundo);
          margin-bottom: 1rem;
        }

        .formato-opcion {
          display: flex;
          align-items: center;
          padding: 1rem;
          margin-bottom: 0.8rem;
          border: 1px solid rgba(157, 107, 255, 0.3);
          border-radius: 15px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .formato-opcion.seleccionado {
          border-color: var(--violeta-mistico);
          background: rgba(157, 107, 255, 0.05);
          box-shadow: 0 5px 15px rgba(157, 107, 255, 0.1);
        }

        .formato-opcion input[type="radio"] {
          margin-right: 1rem;
          accent-color: var(--violeta-mistico);
          width: 18px;
          height: 18px;
        }

        .formato-info {
          flex: 1;
        }

        .formato-nombre {
          font-weight: 600;
          color: var(--verde-profundo);
          display: block;
          margin-bottom: 0.2rem;
        }

        .formato-precio {
          font-size: 1.1rem;
          color: var(--violeta-mistico);
          font-weight: 600;
          display: block;
          margin-bottom: 0.2rem;
        }

        .formato-descripcion {
          color: var(--texto-soft);
          font-size: 0.85rem;
        }

        .modal-agregar-btn {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(135deg, var(--verde-salvia), var(--violeta-mistico));
          color: white;
          border: none;
          border-radius: 50px;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.3s;
          margin-top: 1rem;
        }

        .modal-agregar-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(157, 107, 255, 0.3);
        }

        /* CARRITO */
        .carrito-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          justify-content: flex-end;
          z-index: 2000;
        }

        .carrito-modal {
          width: 100%;
          max-width: 450px;
          background: #f5f1e8;
          height: 100%;
          overflow-y: auto;
          padding: 2rem;
          animation: slideLeft 0.3s;
        }

        @keyframes slideLeft {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        .carrito-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .carrito-header h2 {
          font-size: 1.8rem;
          color: var(--verde-profundo);
        }

        .carrito-cerrar {
          background: none;
          border: none;
          font-size: 2rem;
          cursor: pointer;
          color: var(--texto-soft);
        }

        .carrito-vacio {
          text-align: center;
          padding: 3rem 0;
        }

        .carrito-vacio p {
          color: var(--texto-soft);
          margin-bottom: 1.5rem;
        }

        .carrito-seguir-comprando {
          padding: 0.8rem 2rem;
          background: linear-gradient(135deg, var(--verde-salvia), var(--violeta-mistico));
          color: white;
          border: none;
          border-radius: 50px;
          cursor: pointer;
        }

        .carrito-items {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .carrito-item {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          background: white;
          border-radius: 15px;
          position: relative;
        }

        .carrito-item img {
          width: 80px;
          height: 80px;
          border-radius: 10px;
          object-fit: cover;
        }

        .carrito-item-info {
          flex: 1;
        }

        .carrito-item-info h4 {
          font-size: 1rem;
          margin-bottom: 0.2rem;
          color: var(--verde-profundo);
        }

        .carrito-item-formato {
          color: var(--texto-soft);
          font-size: 0.8rem;
          margin-bottom: 0.2rem;
        }

        .carrito-item-precio {
          color: var(--violeta-mistico);
          font-weight: 500;
          margin-bottom: 0.5rem;
        }

        .carrito-item-cantidad {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .cantidad-btn {
          width: 25px;
          height: 25px;
          border-radius: 50%;
          border: 1px solid rgba(157, 107, 255, 0.3);
          background: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cantidad-btn:hover {
          background: rgba(157, 107, 255, 0.1);
        }

        .carrito-eliminar-item {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          background: none;
          border: none;
          font-size: 1.2rem;
          color: var(--texto-soft);
          cursor: pointer;
        }

        .carrito-footer {
          border-top: 1px solid rgba(157, 107, 255, 0.2);
          padding-top: 1.5rem;
        }

        .carrito-total {
          display: flex;
          justify-content: space-between;
          font-size: 1.2rem;
          margin-bottom: 1.5rem;
        }

        .carrito-total strong {
          color: var(--violeta-mistico);
        }

        .carrito-acciones {
          display: flex;
          gap: 1rem;
        }

        .carrito-vaciar {
          flex: 1;
          padding: 0.8rem;
          background: none;
          border: 1px solid var(--violeta-mistico);
          border-radius: 50px;
          color: var(--violeta-mistico);
          cursor: pointer;
          transition: all 0.3s;
        }

        .carrito-vaciar:hover {
          background: rgba(157, 107, 255, 0.1);
        }

        .carrito-whatsapp {
          flex: 2;
          padding: 0.8rem;
          background: #25D366;
          color: white;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .carrito-whatsapp:hover {
          background: #128C7E;
        }

        /* NOTIFICACIONES */
        .notificacion {
          position: fixed;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          padding: 1rem 2rem;
          border-radius: 50px;
          color: white;
          font-size: 0.9rem;
          z-index: 3000;
          animation: slideUp 0.3s;
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }

        .notificacion.success {
          background: linear-gradient(135deg, var(--verde-salvia), var(--violeta-mistico));
        }

        .notificacion.error {
          background: linear-gradient(135deg, var(--ocre), #ff6b6b);
        }

        @keyframes slideUp {
          from { transform: translate(-50%, 100%); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .hero-titulo { font-size: 2.8rem; }
          .section-titulo { font-size: 2rem; }
          .hero-buttons { flex-direction: column; align-items: center; }
          .productos-grid { grid-template-columns: 1fr; }
          .terapias-grid { grid-template-columns: 1fr; }
          .beneficios-cards { grid-template-columns: 1fr; }
          .sobre-grid { grid-template-columns: 1fr; gap: 2rem; }
          .modal-producto-grid { grid-template-columns: 1fr; }
          .floating-particles { gap: 0.8rem; font-size: 0.9rem; }
          .testimonios-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 480px) {
          .hero-titulo { font-size: 2rem; }
          .section-titulo { font-size: 1.6rem; }
          .carrito-modal { max-width: 100%; }
        }

        .hero-video {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: 0;
        opacity: 0.35;
        filter: brightness(0.6) contrast(1.1) saturate(0.9);
      }
      `}</style>
    </div>
  );
};

export default HomeScreen;