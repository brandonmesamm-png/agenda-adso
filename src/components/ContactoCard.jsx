// src/components/ContactoCard.jsx
import { useState } from "react";

function ContactoCard({ id, nombre, telefono, correo, etiqueta, onEliminar }) {
  const [removing, setRemoving] = useState(false);
  const handleEliminar = () => {
    // animación: primero marcar como removing, luego llamar al backend
    setRemoving(true);
    setTimeout(() => {
      onEliminar(id);
    }, 320); // coincide con la transición
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-5 transition-all duration-300
                  ${removing ? "opacity-0 scale-95 h-0 py-0" : "opacity-100 scale-100"}
                 bg-gradient-to-b from-[#0f0f11] to-[#161216] border border-[#2a2030] shadow-[0_10px_30px_rgba(124,58,237,0.06)]
                 hover:shadow-[0_18px_60px_rgba(124,58,237,0.09)]`}
      style={{ transitionProperty: "opacity, transform, height, padding" }}
    >
      {/* neon accent left */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-pink-500 opacity-60 rounded-l-2xl" />

      <div className="relative flex justify-between items-start pl-4">
        <div>
          <p className="text-lg font-semibold text-white">{nombre}</p>
          <p className="text-sm text-gray-400 mt-1">{telefono}</p>
          <p className="text-sm text-gray-400">{correo}</p>

          {etiqueta && (
            <span className="inline-block mt-3 text-xs bg-[#2b1b39] text-purple-300 px-2 py-1 rounded-lg border border-purple-700/20">
              {etiqueta}
            </span>
          )}
        </div>

        <div className="flex flex-col items-end gap-3">
          <button
            onClick={handleEliminar}
            title="Eliminar"
            className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 transition transform hover:scale-105 active:scale-95"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path d="M6 7h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 11v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 11v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 7l1-2h4l1 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-sm font-medium">Eliminar</span>
          </button>

          {/* placeholder for future actions (edit, call...) */}
          <div className="text-xs text-gray-500">ID: {id}</div>
        </div>
      </div>
    </div>
  );
}

export default ContactoCard;
