// app.js
document.getElementById("formulario").addEventListener("submit", function(e) {
  const metodo = document.querySelector('input[name="metodo"]:checked').value;
  e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
  if (metodo === "trapezoidal") {
      calcularTrapezoidal(e);
  } else if (metodo === "jorgeBoole") {
      calcularJorgeBoole(e);
  } else if (metodo === "simpson13") {
      calcularSimpson13(e);
  } else if (metodo === "simpson38") {
      calcularSimpson38(e);
  } else if (metodo === "simpsonAbierto") {
      calcularSimpsonAbierto(e);
  }
});

// Método Trapezoidal
function calcularTrapezoidal(e) {
  const funcion = document.getElementById('funcion').value;
  const a = math.evaluate(document.getElementById('a').value);
  const b = math.evaluate(document.getElementById('b').value);
  const n = parseInt(document.getElementById('n').value);
  
  // Verificar que n sea un número válido
  if (isNaN(n) || n <= 0) {
      alert('Por favor, introduce un número válido de subintervalos (n).');
      return;
  }

  const h = (b - a) / n;
  let suma = 0;

  const f = math.compile(funcion);
  let pasos = `<h2>Proceso del Método Trapezoidal</h2>`;
  pasos += `<p><strong>Función:</strong> f(x) = ${funcion}</p>`;
  pasos += `<p><strong>Intervalo:</strong> [${a}, ${b}]</p>`;
  pasos += `<p><strong>Número de subintervalos (n):</strong> ${n}</p>`;
  pasos += `<p><strong>Valor de h:</strong> h = (${b} - ${a}) / ${n} = ${h}</p>`;
  pasos += `<p><strong>Puntos evaluados:</strong></p><ul>`;

  const puntosX = [];
  const puntosY = [];

  for (let i = 0; i <= n; i++) {
      const x = a + i * h;
      const fx = f.evaluate({ x });
      puntosX.push(x);
      puntosY.push(fx);
      suma += (i === 0 || i === n) ? fx : 2 * fx;
      pasos += `<li>f(${x}) = ${fx} (${(i === 0 || i === n) ? 'extremos' : 'interior'})</li>`;
  }

  pasos += `</ul>`;
  const resultado = (h / 2) * suma;
  pasos += `<p><strong>Resultado aproximado:</strong> ${resultado.toFixed(10)}</p>`; // 10 decimales

  document.getElementById('resultado').innerHTML = pasos;

  // Generar la gráfica
  mostrarGrafica(puntosX, puntosY, funcion, 'Gráfica del Método Trapezoidal');
}

// Método Jorge Boole
function calcularJorgeBoole(e) {
  const funcion = document.getElementById('funcion').value;
  const a = math.evaluate(document.getElementById('a').value);
  const b = math.evaluate(document.getElementById('b').value);
  const n = parseInt(document.getElementById('n').value);

  if (isNaN(n) || n <= 0) {
      alert('Por favor, introduce un número válido de subintervalos (n).');
      return;
  }

  const f = math.compile(funcion);
  const h = (b - a) / n;
  let suma = 0;
  let pasos = `<h2>Proceso del Método Jorge Boole</h2>`;
  pasos += `<p><strong>Función:</strong> f(x) = ${funcion}</p>`;
  pasos += `<p><strong>Intervalo:</strong> [${a}, ${b}]</p>`;
  pasos += `<p><strong>Número de subintervalos (n):</strong> ${n}</p>`;
  pasos += `<p><strong>Valor de h:</strong> h = (${b} - ${a}) / ${n} = ${h}</p>`;
  pasos += `<p><strong>Puntos evaluados:</strong></p><ul>`;

  const puntosX = [];
  const puntosY = [];

  for (let i = 0; i <= n; i++) {
      const x = a + i * h;
      const fx = f.evaluate({ x });
      puntosX.push(x);
      puntosY.push(fx);
      suma += (i === 0 || i === n) ? fx : (i % 2 === 0 ? 2 * fx : 4 * fx);
      pasos += `<li>f(${x}) = ${fx} (${(i === 0 || i === n) ? 'extremos' : (i % 2 === 0 ? 'multiplicado por 2' : 'multiplicado por 4')})</li>`;
  }

  pasos += `</ul>`;
  const resultado = (h / 3) * suma;
  pasos += `<p><strong>Resultado aproximado:</strong> ${resultado.toFixed(10)}</p>`; // 10 decimales

  document.getElementById('resultado').innerHTML = pasos;

  // Generar la gráfica
  mostrarGrafica(puntosX, puntosY, funcion, 'Gráfica del Método Jorge Boole');
}

// Método Simpson 1/3
function calcularSimpson13(e) {
  const funcion = document.getElementById('funcion').value;
  const a = math.evaluate(document.getElementById('a').value);
  const b = math.evaluate(document.getElementById('b').value);
  const n = parseInt(document.getElementById('n').value);

  if (n % 2 !== 0) {
      alert('El número de subintervalos (n) debe ser par para Simpson 1/3.');
      return;
  }

  if (isNaN(n) || n <= 0) {
      alert('Por favor, introduce un número válido de subintervalos (n).');
      return;
  }

  const f = math.compile(funcion);
  const h = (b - a) / n;
  let suma = 0;
  let pasos = `<h2>Proceso del Método Simpson 1/3</h2>`;
  pasos += `<p><strong>Función:</strong> f(x) = ${funcion}</p>`;
  pasos += `<p><strong>Intervalo:</strong> [${a}, ${b}]</p>`;
  pasos += `<p><strong>Número de subintervalos (n):</strong> ${n}</p>`;
  pasos += `<p><strong>Valor de h:</strong> h = (${b} - ${a}) / ${n} = ${h}</p>`;
  pasos += `<p><strong>Puntos evaluados:</strong></p><ul>`;

  const puntosX = [];
  const puntosY = [];

  for (let i = 0; i <= n; i++) {
      const x = a + i * h;
      const fx = f.evaluate({ x });
      puntosX.push(x);
      puntosY.push(fx);
      suma += (i === 0 || i === n) ? fx : (i % 2 === 0 ? 2 * fx : 4 * fx);
      pasos += `<li>f(${x}) = ${fx} (${(i === 0 || i === n) ? 'extremos' : (i % 2 === 0 ? 'multiplicado por 2' : 'multiplicado por 4')})</li>`;
  }

  pasos += `</ul>`;
  const resultado = (h / 3) * suma;
  pasos += `<p><strong>Resultado aproximado:</strong> ${resultado.toFixed(10)}</p>`; // 10 decimales

  document.getElementById('resultado').innerHTML = pasos;

  // Generar la gráfica
  mostrarGrafica(puntosX, puntosY, funcion, 'Gráfica del Método Simpson 1/3');
}

// Método Simpson 3/8
function calcularSimpson38(e) {
  const funcion = document.getElementById('funcion').value;
  const a = math.evaluate(document.getElementById('a').value);
  const b = math.evaluate(document.getElementById('b').value);
  const n = parseInt(document.getElementById('n').value);

  if (n % 3 !== 0) {
      alert('El número de subintervalos (n) debe ser múltiplo de 3 para Simpson 3/8.');
      return;
  }

  if (isNaN(n) || n <= 0) {
      alert('Por favor, introduce un número válido de subintervalos (n).');
      return;
  }

  const f = math.compile(funcion);
  const h = (b - a) / n;
  let suma = 0;
  let pasos = `<h2>Proceso del Método Simpson 3/8</h2>`;
  pasos += `<p><strong>Función:</strong> f(x) = ${funcion}</p>`;
  pasos += `<p><strong>Intervalo:</strong> [${a}, ${b}]</p>`;
  pasos += `<p><strong>Número de subintervalos (n):</strong> ${n}</p>`;
  pasos += `<p><strong>Valor de h:</strong> h = (${b} - ${a}) / ${n} = ${h}</p>`;
  pasos += `<p><strong>Puntos evaluados:</strong></p><ul>`;

  const puntosX = [];
  const puntosY = [];

  for (let i = 0; i <= n; i++) {
      const x = a + i * h;
      const fx = f.evaluate({ x });
      puntosX.push(x);
      puntosY.push(fx);
      suma += (i === 0 || i === n) ? fx : (i % 3 === 0 ? 2 * fx : 3 * fx);
      pasos += `<li>f(${x}) = ${fx} (${(i === 0 || i === n) ? 'extremos' : (i % 3 === 0 ? 'multiplicado por 2' : 'multiplicado por 3')})</li>`;
  }

  pasos += `</ul>`;
  const resultado = (3 * h / 8) * suma;
  pasos += `<p><strong>Resultado aproximado:</strong> ${resultado.toFixed(10)}</p>`; // 10 decimales

  document.getElementById('resultado').innerHTML = pasos;

  // Generar la gráfica
  mostrarGrafica(puntosX, puntosY, funcion, 'Gráfica del Método Simpson 3/8');
}

// Método Simpson Abierto
function calcularSimpsonAbierto(e) {
  const funcion = document.getElementById('funcion').value;
  const a = math.evaluate(document.getElementById('a').value);
  const b = math.evaluate(document.getElementById('b').value);
  const n = parseInt(document.getElementById('n').value);

  if (n <= 1) {
      alert('El número de subintervalos (n) debe ser mayor que 1 para Simpson Abierto.');
      return;
  }

  if (isNaN(n) || n <= 0) {
      alert('Por favor, introduce un número válido de subintervalos (n).');
      return;
  }

  const f = math.compile(funcion);
  const h = (b - a) / n;
  let suma = 0;
  let pasos = `<h2>Proceso del Método Simpson Abierto</h2>`;
  pasos += `<p><strong>Función:</strong> f(x) = ${funcion}</p>`;
  pasos += `<p><strong>Intervalo:</strong> [${a}, ${b}]</p>`;
  pasos += `<p><strong>Número de subintervalos (n):</strong> ${n}</p>`;
  pasos += `<p><strong>Valor de h:</strong> h = (${b} - ${a}) / ${n} = ${h}</p>`;
  pasos += `<p><strong>Puntos evaluados:</strong></p><ul>`;
  
  // Definir arrays para almacenar los puntos
  const puntosX = [];
  const puntosY = [];

  // Evaluar los puntos extremos
  const fx_a = f.evaluate({ x: a });
  const fx_b = f.evaluate({ x: b });
  pasos += `<li>f(${a}) = ${fx_a} (extremo)</li>`;
  pasos += `<li>f(${b}) = ${fx_b} (extremo)</li>`;

  // Evaluar puntos intermedios
  for (let i = 1; i < n; i++) {
      const x = a + i * h;
      const fx = f.evaluate({ x });

      // Guardar puntos para la gráfica
      puntosX.push(x);
      puntosY.push(fx);

      if (i % 2 === 0) {
          suma += 2 * fx; // puntos pares multiplicados por 2
          pasos += `<li>f(${x}) = ${fx} (multiplicado por 2)</li>`;
      } else {
          suma += 4 * fx; // puntos impares multiplicados por 4
          pasos += `<li>f(${x}) = ${fx} (multiplicado por 4)</li>`;
      }
  }

  // Calcular el resultado final
  suma = fx_a + fx_b + suma; // Sumar los extremos
  const resultado = (h / 3) * suma;
  pasos += `</ul>`;
  pasos += `<p><strong>Resultado aproximado:</strong> ${resultado.toFixed(10)}</p>`; // 10 decimales

  document.getElementById('resultado').innerHTML = pasos;

  // Generar la gráfica
  mostrarGrafica(puntosX, puntosY, funcion, 'Gráfica del Método Simpson Abierto');
}

function insertarSimbolo(simbolo) {
  const funcionInput = document.getElementById('funcion');
  funcionInput.value += simbolo;
  funcionInput.focus(); // Para asegurarte de que el cursor se mantenga en el campo
}


// Función para mostrar la gráfica
function mostrarGrafica(puntosX, puntosY, funcion, titulo) {
  const ctx = document.getElementById('grafica').getContext('2d');
  const grafica = new Chart(ctx, {
      type: 'line',
      data: {
          labels: puntosX,
          datasets: [{
              label: 'f(x)',
              data: puntosY,
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              fill: false,
          }]
      },
      options: {
          responsive: true,
          scales: {
              x: {
                  title: {
                      display: true,
                      text: 'x'
                  }
              },
              y: {
                  title: {
                      display: true,
                      text: 'f(x)'
                  }
              }
          },
          plugins: {
              title: {
                  display: true,
                  text: titulo
              }
          }
      }
  });
}
