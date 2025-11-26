import { useState } from "react";

function FormularioContacto({ onAgregar }) {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    etiqueta: "",
  });

  const [errores, setErrores] = useState({});
  const [enviando, setEnviando] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const validar = () => {
    const e = {};
    if (!form.nombre.trim()) e.nombre = "El nombre es obligatorio.";
    if (!form.telefono.trim()) e.telefono = "El teléfono es obligatorio.";
    if (!form.correo.trim()) e.correo = "El correo es obligatorio.";
    setErrores(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    if (!validar()) return;

    try {
      setEnviando(true);
      await onAgregar(form);

      setForm({ nombre: "", telefono: "", correo: "", etiqueta: "" });
      setErrores({});
    } catch (err) {
      // gestionado en App.jsx
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="relative bg-[#0f0f12]/60 border border-[#2a2130]/60 rounded-3xl p-6 shadow-[0_8px_30px_rgba(124,58,237,0.08)] backdrop-blur-sm"
    >
      <div className="absolute -top-4 left-6 px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-xs font-semibold text-white shadow-md">
        Nuevo contacto
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        
        {/* Nombre */}
        <div>
          <label className="block text-xs text-gray-300 mb-1">Nombre *</label>
          <input
            name="nombre"
            value={form.nombre}
            onChange={onChange}
            placeholder="Ej: Camila Pérez"
            className="w-full rounded-xl px-4 py-2 bg-transparent border border-[#2b2030]
                       text-gray-100 placeholder:text-gray-500 outline-none
                       focus:border-purple-400 focus:ring-2 focus:ring-purple-600/40 transition"
          />
          {errores.nombre && <p className="text-xs text-red-400 mt-1">{errores.nombre}</p>}
        </div>

        {/* Teléfono */}
        <div>
          <label className="block text-xs text-gray-300 mb-1">Teléfono *</label>
          <input
            name="telefono"
            value={form.telefono}
            onChange={onChange}
            placeholder="Ej: 3001234567"
            className="w-full rounded-xl px-4 py-2 bg-transparent border border-[#2b2030]
                       text-gray-100 placeholder:text-gray-500 outline-none
                       focus:border-purple-400 focus:ring-2 focus:ring-purple-600/40 transition"
          />
          {errores.telefono && <p className="text-xs text-red-400 mt-1">{errores.telefono}</p>}
        </div>

        {/* Correo */}
        <div>
          <label className="block text-xs text-gray-300 mb-1">Correo *</label>
          <input
            name="correo"
            value={form.correo}
            onChange={onChange}
            placeholder="ejemplo@correo.com"
            className="w-full rounded-xl px-4 py-2 bg-transparent border border-[#2b2030]
                       text-gray-100 placeholder:text-gray-500 outline-none
                       focus:border-purple-400 focus:ring-2 focus:ring-purple-600/40 transition"
          />
          {errores.correo && <p className="text-xs text-red-400 mt-1">{errores.correo}</p>}
        </div>

        {/* Etiqueta */}
        <div className="md:col-span-2">
          <label className="block text-xs text-gray-300 mb-1">Etiqueta (opcional)</label>
          <input
            name="etiqueta"
            value={form.etiqueta}
            onChange={onChange}
            placeholder="Trabajo, Familia, Amigo..."
            className="w-full rounded-xl px-4 py-2 bg-transparent border border-[#2b2030]
                       text-gray-100 placeholder:text-gray-500 outline-none
                       focus:border-purple-400 focus:ring-2 focus:ring-purple-600/40 transition"
          />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div className="text-xs text-gray-400">Pro tip: Presiona Enter para guardar</div>

        <button
          type="submit"
          disabled={enviando}
          className="relative inline-flex items-center gap-3 rounded-xl px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-500
                     text-white font-semibold shadow-lg hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-60"
        >
          <span className="w-3 h-3 rounded-full bg-white/90 shadow-[0_0_12px_rgba(255,255,255,0.08)]" />
          <span>{enviando ? "Guardando..." : "Agregar contacto"}</span>
        </button>
      </div>
    </form>
  );
}

export default FormularioContacto;
