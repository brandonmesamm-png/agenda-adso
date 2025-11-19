const API_URL = "http://localhost:3002/contactos";

export async function listarContactos() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al listar contactos");
  return await res.json();
}

export async function crearContacto(contacto) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contacto),
  });
  if (!res.ok) throw new Error("Error al crear contacto");
  return await res.json();
}

export async function eliminarContactoPorId(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar contacto");
  return true;
}
