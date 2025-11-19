function ContactoCard({ nombre, telefono, correo, etiqueta, onEliminar }) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm flex justify-between items-center">
      <div>
        <p className="text-lg font-semibold">{nombre}</p>
        <p className="text-sm text-gray-600">{telefono}</p>
        <p className="text-sm text-gray-600">{correo}</p>
        {etiqueta && <p className="text-xs text-purple-600">{etiqueta}</p>}
      </div>

      <button
        className="text-red-500 font-semibold hover:text-red-700"
        onClick={onEliminar}
      >
        Eliminar
      </button>
    </div>
  );
}

export default ContactoCard;
