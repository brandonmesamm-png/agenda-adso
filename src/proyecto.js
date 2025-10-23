
const nombre = "Carolina";
const ficha = 3169901;
const notas = [3.5, 2.0, 2.8];

const promedio = notas.reduce((a, b) => a + b, 0) / notas.length;
const estado = promedio >= 3.5 ? "Aprobado" : "No Aprobado";

console.log("==================");
console.log("SISTEMA DE NOTAS SENA");
console.log("==================");
console.log(`Aprendiz: ${nombre}`);
console.log(`Ficha: ${ficha}`);
console.log(`Notas: ${notas.join(", ")}`);
console.log("==================");
console.log(`Promedio: ${promedio.toFixed(2)}`);
console.log(`Estado: ${estado}`);
