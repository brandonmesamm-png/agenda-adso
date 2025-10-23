// ...existing code...
const aprendiz = {
    nombre: "Carlos Santis",
    ficha: 3169901,
};
const notas = [3.9, 4.0, 4.5, 3];
aprendiz.notas = notas;

console.log(`Nombre: ${aprendiz.nombre}`);
console.log(`Ficha: ${aprendiz.ficha}`);
console.log(`Notas: ${aprendiz.notas.join(", ")}`);

const promedio = aprendiz.notas.reduce((a, b) => a + b, 0) / aprendiz.notas.length;
console.log(`Promedio: ${promedio.toFixed(2)}`);
console.log(`Estado: ${promedio >= 3.5 ? 'Aprobado' : 'Reprobado'}`);
// ...existing code...