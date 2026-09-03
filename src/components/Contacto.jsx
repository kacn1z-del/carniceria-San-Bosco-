import { useState } from 'react'
import './Contacto.css'

const WHATSAPP_NUMBER = '50683443461'

export default function Contacto() {
  const [form, setForm] = useState({ nombre: '', telefono: '', mensaje: '' })

  const actualizar = (campo) => (e) =>
    setForm((f) => ({ ...f, [campo]: e.target.value }))

  const enviarPorWhatsapp = (e) => {
    e.preventDefault()
    const texto = `Hola San Bosco, mi nombre es ${form.nombre || '(nombre)'}.\nTeléfono: ${
      form.telefono || '(teléfono)'
    }\nMensaje: ${form.mensaje || '(mensaje)'}`
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`,
      '_blank'
    )
  }

  return (
    <section id="contacto" className="contacto">
      <div className="wrap contacto__grid">
        <div>
          <p className="eyebrow">Escríbenos</p>
          <h2>Contacto</h2>
          <p className="contacto__texto">
            ¿Tienes alguna consulta sobre nuestros productos o quieres hacer un
            pedido especial? Completa el formulario o escríbenos directo por
            WhatsApp.
          </p>

          <div className="contacto__datos">
            <div>
              <span className="contacto__label">WhatsApp</span>
             <span>+506 8344-3461</span>

            </div>
            <div>
              <span className="contacto__label">Teléfono</span>
              <span>2410-0133</span>
            </div>
            <div>
              <span className="contacto__label">Correo</span>
              <span>carniceriasanboscoa@gmail.com</span>
            </div>
            <div>
              <span className="contacto__label">Horario</span>
              <span>Lun – Sáb: 6:00 a.m. – 5:00 p.m.</span>
            </div>
            <div>
              <span className="contacto__label">Facebook</span>
              <a
                href="https://www.facebook.com/share/1BWK8rexQW/?mibextid=wwXIfr"
                target="_blank"
                rel="noreferrer"
              >
                Carnicería San Bosco
              </a>
            </div>
          </div>
        </div>

        <form className="contacto__form" onSubmit={enviarPorWhatsapp}>
          <label>
            Nombre
            <input
              type="text"
              value={form.nombre}
              onChange={actualizar('nombre')}
              placeholder="Tu nombre"
              required
            />
          </label>
          <label>
            Teléfono
            <input
              type="tel"
              value={form.telefono}
              onChange={actualizar('telefono')}
              placeholder="Tu número de contacto"
              required
            />
          </label>
          <label>
            Mensaje
            <textarea
              rows={4}
              value={form.mensaje}
              onChange={actualizar('mensaje')}
              placeholder="¿En qué te podemos ayudar?"
              required
            />
          </label>
          <button type="submit" className="btn btn--terracotta">
            Enviar por WhatsApp
          </button>
        </form>
      </div>
    </section>
  )
}
