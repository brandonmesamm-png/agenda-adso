// src/App.jsx

import { useEffect, useState } from "react";
import {
  listarContactos,
  crearContacto,
  eliminarContactoPorId,
} from "./api";
import { APP_INFO } from "./config";

import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";

function App() {
  // Estado principal de contactos (viene de la API)
  const [contactos, setContactos] = useState([]);

  // Estados de UI
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  // === NUEVOS ESTADOS (CLASE 10) ===
  // Término de búsqueda (input controlado)
  const [busqueda, setBusqueda] = useState("");

  // Orden: true = A-Z (ascendente), false = Z-A (descendente)
  const [ordenAsc, setOrdenAsc] = useState(true);

  // Cargar contactos desde JSON Server al montar el componente
  useEffect(() => {
    const cargarContactos = async () => {
      try {
        setCargando(true);
        setError("");
        const data = await listarContactos();
        setContactos(data || []);
      } catch (err) {
        console.error("Error al cargar contactos:", err);
        setError("No se pudieron cargar los contactos. Revisa JSON Server.");
      } finally {
        setCargando(false);
      }
    };

    cargarContactos();
  }, []);

  // Agregar contacto (POST)
  const onAgregarContacto = async (nuevoContacto) => {
    try {
      setError("");
      const creado = await crearContacto(nuevoContacto);

      // Si la API no devolviera un id fiable, recargamos la lista
      if (!creado?.id) {
        const data = await listarContactos();
        setContactos(data || []);
      } else {
        // Respetamos inmutabilidad: creamos un nuevo arreglo
        setContactos((prev) => [...prev, creado]);
      }

      return creado;
    } catch (err) {
      console.error("Error al crear contacto:", err);
      setError("No se pudo guardar el contacto.");
      throw err;
    }
  };

  // Eliminar contacto (DELETE)
  const onEliminarContacto = async (id) => {
    try {
      setError("");
      await eliminarContactoPorId(id);
      // Respetamos inmutabilidad: devolvemos un nuevo arreglo sin el eliminado
      setContactos((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Error al eliminar:", err);
      setError("No se pudo eliminar el contacto.");
    }
  };

  // === FILTRADO ===
  // Incluimos nombre, correo, etiqueta y teléfono en la búsqueda.
  // Si 'busqueda' está vacío, todos pasarán el filtro.
  const contactosFiltrados = contactos.filter((c) => {
    const termino = (busqueda || "").toLowerCase();

    const nombre = (c.nombre || "").toLowerCase();
    const correo = (c.correo || "").toLowerCase();
    const etiqueta = (c.etiqueta || "").toLowerCase();
    const telefono = (c.telefono || "").toString().toLowerCase();

    return (
      nombre.includes(termino) ||
      correo.includes(termino) ||
      etiqueta.includes(termino) ||
      telefono.includes(termino)
    );
  });

  // === ORDENAMIENTO ===
  // Creamos una copia antes de ordenar para no mutar el estado original.
  const contactosOrdenados = [...contactosFiltrados].sort((a, b) => {
    const nombreA = (a.nombre || "").toLowerCase();
    const nombreB = (b.nombre || "").toLowerCase();

    if (nombreA < nombreB) return ordenAsc ? -1 : 1;
    if (nombreA > nombreB) return ordenAsc ? 1 : -1;
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#07070a] to-[#0b0b0f] text-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-12">

        <header className="mb-10">
          <p className="text-xs tracking-widest text-gray-400 uppercase">
            Ficha {APP_INFO.ficha}
          </p>

          <h1 className="text-5xl font-extrabold text-white mt-3 drop-shadow-[0_8px_30px_rgba(124,58,237,0.18)]">
            {APP_INFO.titulo}
          </h1>

          <p className="text-gray-400 mt-2 max-w-2xl">
            {APP_INFO.subtitulo}
          </p>
        </header>

        {error && (
          <div className="mb-4 rounded-xl bg-red-900/30 border border-red-700/40 px-4 py-3 backdrop-blur-sm">
            <p className="text-sm font-medium text-red-300">{error}</p>
          </div>
        )}

        {cargando ? (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 animate-pulse" />
            <p className="text-gray-400">Cargando contactos...</p>
          </div>
        ) : (
          <>
            {/* Formulario para crear nuevos contactos */}
            <FormularioContacto onAgregar={onAgregarContacto} />

            {/* === BUSCADOR + BOTÓN DE ORDEN === */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mt-8 mb-3">
              <input
                type="text"
                placeholder="Buscar por nombre, correo, etiqueta o teléfono..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full md:flex-1 rounded-xl bg-[#111] border border-gray-700 px-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600/60"
              />

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setOrdenAsc((prev) => !prev)}
                  className="px-4 py-2 rounded-xl bg-[#16161d] border border-gray-700 text-gray-300 hover:bg-[#1e1e27] transition"
                >
                  {ordenAsc ? "Ordenar Z-A" : "Ordenar A-Z"}
                </button>

                {/* Botón para limpiar la búsqueda rápidamente */}
                <button
                  type="button"
                  onClick={() => setBusqueda("")}
                  className="px-3 py-2 rounded-xl bg-transparent border border-gray-700 text-gray-400 hover:bg-gray-800/40 transition text-sm"
                >
                  Limpiar
                </button>
              </div>
            </div>

            {/* Mensaje con la cantidad de resultados */}
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-gray-400">
                {contactosOrdenados.length} contacto{contactosOrdenados.length === 1 ? "" : "s"} encontrado{contactosOrdenados.length === 1 ? "" : "s"}
              </p>
              {/* Si quieres, aquí podríamos mostrar un orden más descriptivo */}
              <p className="text-sm text-gray-500">Orden: {ordenAsc ? "A → Z" : "Z → A"}</p>
            </div>

            {/* === LISTADO FILTRADO Y ORDENADO === */}
            <section className="space-y-5">
              {contactosOrdenados.length === 0 ? (
                <p className="text-gray-400 italic">
                  No se encontraron contactos con la búsqueda.
                </p>
              ) : (
                contactosOrdenados.map((c) => (
                  <ContactoCard
                    key={c.id}
                    id={c.id}
                    nombre={c.nombre}
                    telefono={c.telefono}
                    correo={c.correo}
                    etiqueta={c.etiqueta}
                    // La tarjeta llamará a onEliminar con su id cuando el usuario lo solicite
                    onEliminar={() => onEliminarContacto(c.id)}
                  />
                ))
              )}
            </section>
          </>
        )}

        <footer className="mt-12 text-xs text-gray-500">
          <hr className="border-gray-800 mb-4 opacity-30" />
          <p>{APP_INFO.titulo} — Ultra Dark Neon</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
