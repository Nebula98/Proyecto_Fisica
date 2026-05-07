"use strict";

const K = 8.9875517923e9;
const EPS0 = 8.85e-12;

const storage = {
  save(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  },
  load(key, fallback = null) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  },
  clear() {
    localStorage.clear();
  }
};

const MODULOS = {
  coulomb: {
    titulo: "Ley de Coulomb",
    dificultad: "Basico",
    tiempo: "~15 min",
    formula: "F = k|q1q2|/r²",
    teoria: "Describe la interaccion electrostatica entre dos cargas puntuales. El signo de q1·q2 define atraccion (signos opuestos) o repulsion (mismo signo). La fuerza actua a lo largo de la linea que une las dos cargas.",
    descripcion: [
      "La Ley de Coulomb es el pilar del electromagnetismo clasico. Fue formulada en 1785 por Charles-Augustin de Coulomb.",
      "La fuerza es proporcional al producto de las cargas e inversamente proporcional al cuadrado de la distancia.",
      "Constante de Coulomb: k = 1/(4πε₀) = 8.99×10⁹ N·m²/C²",
      "Principio de superposicion: la fuerza total sobre una carga es la suma vectorial de todas las fuerzas individuales."
    ],
    ejemplo: "q1=3×10⁻⁶ C, q2=−2×10⁻⁶ C, r=0.20 m → |F|=K|q1q2|/r²=1.35 N, direccion atractiva.",
    videos: [
      { titulo: "Ley de Coulomb – Khan Academy", url: "https://www.youtube.com/results?search_query=ley+de+coulomb+khan+academy+espanol" },
      { titulo: "Ley de Coulomb explicada – Fisiquimicamente", url: "https://www.youtube.com/results?search_query=ley+de+coulomb+fisiquimicamente" },
      { titulo: "Problemas resueltos Coulomb", url: "https://www.youtube.com/results?search_query=ley+de+coulomb+problemas+resueltos+fisica+2" }
    ],
    inputs: [
      { id: "q1", label: "q1 (C)", value: 3e-6 },
      { id: "q2", label: "q2 (C)", value: -2e-6 },
      { id: "r", label: "r (m)", value: 0.2 }
    ]
  },
  campo: {
    titulo: "Campo Electrico",
    dificultad: "Intermedio",
    tiempo: "~15 min",
    formula: "E = kQ/r²",
    teoria: "Es un campo vectorial que indica la fuerza por unidad de carga de prueba. Su direccion sale de cargas positivas y entra en negativas. Se mide en N/C o equivalentemente en V/m.",
    descripcion: [
      "El campo electrico E describe la influencia de una carga fuente en el espacio que la rodea.",
      "Una carga de prueba q₀ experimenta una fuerza F = q₀E en ese punto.",
      "Las lineas de campo van de cargas positivas a negativas y nunca se cruzan entre si.",
      "Para distribuciones continuas se integra: E = k∫(dq/r²)r̂"
    ],
    ejemplo: "Q=5×10⁻⁶ C, r=0.30 m → E=kQ/r²=4.99×10⁵ N/C (apunta radialmente hacia afuera).",
    videos: [
      { titulo: "Campo electrico – explicacion completa", url: "https://www.youtube.com/results?search_query=campo+electrico+fisica+universitaria+espanol" },
      { titulo: "Lineas de campo electrico", url: "https://www.youtube.com/results?search_query=lineas+de+campo+electrico+explicacion" },
      { titulo: "Campo electrico problemas resueltos", url: "https://www.youtube.com/results?search_query=campo+electrico+problemas+resueltos+fisica+2" }
    ],
    inputs: [
      { id: "Q", label: "Q (C)", value: 5e-6 },
      { id: "r", label: "r (m)", value: 0.3 }
    ]
  },
  potencial: {
    titulo: "Potencial Electrico",
    dificultad: "Intermedio",
    tiempo: "~15 min",
    formula: "V = kQ/r   U = qV",
    teoria: "El potencial electrico V es energia potencial por unidad de carga. Es una magnitud escalar. Un gradiente de potencial produce campo electrico: E = −∇V.",
    descripcion: [
      "El potencial V(r) = kQ/r es la energia que tiene una carga unitaria positiva en ese punto.",
      "Las superficies equipotenciales son perpendiculares a las lineas de campo en todo punto.",
      "El trabajo realizado al mover una carga de A a B: W = q(VA − VB) = −ΔU.",
      "Para multiples cargas: V_total = Σ kQᵢ/rᵢ  (suma algebraica, no vectorial)."
    ],
    ejemplo: "Q=2×10⁻⁶ C, r=0.50 m → V=3.59×10⁴ V. Con q=1×10⁻⁹ C: U=qV=3.59×10⁻⁵ J.",
    videos: [
      { titulo: "Potencial electrico desde cero", url: "https://www.youtube.com/results?search_query=potencial+electrico+fisica+universidad+espanol" },
      { titulo: "Diferencia de potencial y trabajo", url: "https://www.youtube.com/results?search_query=diferencia+de+potencial+electrico+trabajo+fisica" },
      { titulo: "Superficies equipotenciales", url: "https://www.youtube.com/results?search_query=superficies+equipotenciales+campo+electrico" }
    ],
    inputs: [
      { id: "Q", label: "Q (C)", value: 2e-6 },
      { id: "r", label: "r (m)", value: 0.5 },
      { id: "q", label: "q prueba (C)", value: 1e-9 }
    ]
  },
  gauss: {
    titulo: "Ley de Gauss",
    dificultad: "Avanzado",
    tiempo: "~17 min",
    formula: "∮E·dA = Qenc/ε₀",
    teoria: "Relaciona el flujo electrico total a traves de una superficie cerrada con la carga encerrada. Es equivalente a la Ley de Coulomb pero enormemente mas util en configuraciones con simetria.",
    descripcion: [
      "La Ley de Gauss es una de las cuatro ecuaciones de Maxwell del electromagnetismo.",
      "Se aplica eligiendo una superficie gaussiana donde E sea constante o perpendicular al area.",
      "Simetria esferica: E = Q/(4πε₀r²). Simetria cilindrica: E = λ/(2πε₀r). Plano infinito: E = σ/(2ε₀).",
      "Dentro de un conductor en equilibrio electrostatico el campo electrico es cero."
    ],
    ejemplo: "Esfera conductora: Qenc=10⁻⁶ C, r=0.2 m → E=Qenc/(4πε₀r²)=2.25×10⁵ N/C.",
    videos: [
      { titulo: "Ley de Gauss explicacion completa", url: "https://www.youtube.com/results?search_query=ley+de+gauss+fisica+universitaria+espanol" },
      { titulo: "Aplicaciones de la Ley de Gauss", url: "https://www.youtube.com/results?search_query=aplicaciones+ley+de+gauss+esfera+cilindro+plano" },
      { titulo: "Ley de Gauss problemas paso a paso", url: "https://www.youtube.com/results?search_query=ley+de+gauss+problemas+resueltos+paso+a+paso" }
    ],
    inputs: [
      { id: "Qenc", label: "Q encerrada (C)", value: 1e-6 },
      { id: "r", label: "Radio o distancia (m)", value: 0.2 }
    ]
  },
  energia: {
    titulo: "Energia y Trabajo",
    dificultad: "Avanzado",
    tiempo: "~18 min",
    formula: "U = kq1q2/r   W = ΔU",
    teoria: "La energia potencial electrica del sistema depende de la configuracion de cargas. Para ensamblar un sistema hay que realizar trabajo contra las fuerzas electrostaticas.",
    descripcion: [
      "La energia de un par de cargas: U = kq1q2/r (positiva si se repelen, negativa si se atraen).",
      "Para un sistema de N cargas: U_total = Σ(i<j) kqᵢqⱼ/rᵢⱼ  (suma sobre todos los pares).",
      "El trabajo realizado por la fuerza electrica al mover q de A a B: W_elec = −ΔU = q(VA−VB).",
      "Conservacion de energia: U_inicial + K_inicial = U_final + K_final (sistema aislado)."
    ],
    ejemplo: "q1=2×10⁻⁶ C, q2=−3×10⁻⁶ C, r=0.4 m → U=kq1q2/r=−0.135 J (energia de enlace).",
    videos: [
      { titulo: "Energia potencial electrica explicada", url: "https://www.youtube.com/results?search_query=energia+potencial+electrica+fisica+2+espanol" },
      { titulo: "Trabajo y energia en campo electrico", url: "https://www.youtube.com/results?search_query=trabajo+campo+electrico+energia+potencial" },
      { titulo: "Energia de sistemas de cargas", url: "https://www.youtube.com/results?search_query=energia+sistema+cargas+puntuales+fisica" }
    ],
    inputs: [
      { id: "q1", label: "q1 (C)", value: 2e-6 },
      { id: "q2", label: "q2 (C)", value: -3e-6 },
      { id: "r", label: "r (m)", value: 0.4 }
    ]
  }
};

function observeAndAnimate(selector, animClass) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(animClass);
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll(selector).forEach((el) => observer.observe(el));
}

class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.particles = [];
    this.resize();
    this.init(90);
    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  init(n) {
    this.particles = Array.from({ length: n }, () => ({
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      r: 1 + Math.random() * 1.8
    }));
  }

  update() {
    this.particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;
    });
  }

  draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.fillStyle = "rgba(0,200,255,0.9)";
    for (const p of this.particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const a = this.particles[i];
        const b = this.particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d = Math.hypot(dx, dy);
        if (d < 110) {
          const alpha = (1 - d / 110) * 0.28;
          ctx.strokeStyle = `rgba(0,200,255,${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
  }

  animate() {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.animate());
  }
}

const masterCalcTypes = {
  coulomb: {
    label: "Fuerza de Coulomb (F)",
    fields: ["q1", "q2", "r"]
  },
  campo: {
    label: "Campo electrico (E)",
    fields: ["Q", "r"]
  },
  potencial: {
    label: "Potencial electrico (V)",
    fields: ["Q", "r"]
  },
  energiaPot: {
    label: "Energia potencial (U)",
    fields: ["q1", "q2", "r"]
  },
  trabajoDV: {
    label: "Trabajo electrico (W=q*DeltaV)",
    fields: ["q", "dV"]
  },
  multiF1D: {
    label: "Fuerza con multiples cargas 1D",
    fields: ["q0", "q1", "x1", "q2", "x2"]
  },
  gaussEsfera: {
    label: "Campo en superficie gaussiana esferica",
    fields: ["Qenc", "r"]
  },
  capacitor: {
    label: "Capacitancia de condensador plano",
    fields: ["A", "d"]
  }
};

function scientific(v) {
  if (v === 0) return "0";
  if (Math.abs(v) > 1e4 || Math.abs(v) < 1e-3) return v.toExponential(4);
  return v.toFixed(6).replace(/\.0+$/, "").replace(/(\.\d*?)0+$/, "$1");
}

function parseField(form, name) {
  return Number(form.querySelector(`[name='${name}']`)?.value || 0);
}

function calcularFormula(tipo, params) {
  switch (tipo) {
    case "coulomb": {
      const F = (K * params.q1 * params.q2) / (params.r * params.r);
      return {
        value: F,
        unit: "N",
        eq: `F = K*q1*q2/r2 = ${scientific(F)}`
      };
    }
    case "campo": {
      const E = (K * params.Q) / (params.r * params.r);
      return { value: E, unit: "N/C", eq: `E = K*Q/r2 = ${scientific(E)}` };
    }
    case "potencial": {
      const V = (K * params.Q) / params.r;
      return { value: V, unit: "V", eq: `V = K*Q/r = ${scientific(V)}` };
    }
    case "energiaPot": {
      const U = (K * params.q1 * params.q2) / params.r;
      return { value: U, unit: "J", eq: `U = K*q1*q2/r = ${scientific(U)}` };
    }
    case "trabajoDV": {
      const W = params.q * params.dV;
      return { value: W, unit: "J", eq: `W = q*DeltaV = ${scientific(W)}` };
    }
    case "multiF1D": {
      const f1 = (K * params.q0 * params.q1) / (params.x1 * params.x1) * Math.sign(params.x1);
      const f2 = (K * params.q0 * params.q2) / (params.x2 * params.x2) * Math.sign(params.x2);
      const sum = f1 + f2;
      return {
        value: sum,
        unit: "N",
        eq: `Fnet = F1 + F2 = ${scientific(f1)} + ${scientific(f2)} = ${scientific(sum)}`
      };
    }
    case "gaussEsfera": {
      const E = params.Qenc / (4 * Math.PI * EPS0 * params.r * params.r);
      return { value: E, unit: "N/C", eq: `E = Q/(4*pi*eps0*r2) = ${scientific(E)}` };
    }
    case "capacitor": {
      const C = (EPS0 * params.A) / params.d;
      return { value: C, unit: "F", eq: `C = eps0*A/d = ${scientific(C)}` };
    }
    default:
      return { value: 0, unit: "", eq: "" };
  }
}

const quizState = {
  preguntas: [],
  indice: 0,
  puntaje: 0,
  racha: 0,
  historial: [],
  modo: "practice",
  xp: storage.load("xp", 0),
  wrong: storage.load("wrong", []),
  wrongFreq: storage.load("wrongFreq", {}),
  catStats: storage.load("catStats", {
    conceptual: { ok: 0, total: 0 },
    calculo: { ok: 0, total: 0 },
    analisis: { ok: 0, total: 0 },
    avanzado: { ok: 0, total: 0 }
  }),
  examSeconds: 1800,
  timerId: null,
  adaptiveInfo: "pendiente"
};

const PREGUNTAS = [];

function buildQuestions() {
  const conceptual = [
    ["Si duplicas r en Coulomb, la fuerza...", ["se duplica", "se reduce a 1/4", "se reduce a 1/2", "no cambia"], 1],
    ["Signos iguales entre cargas implican...", ["atraccion", "repulsion", "fuerza cero", "campo nulo"], 1],
    ["El campo electrico tiene unidades de...", ["V/m", "N/C", "ambas", "kg/s"], 2],
    ["La direccion de E para carga positiva es...", ["hacia la carga", "radial saliente", "tangencial", "nula"], 1],
    ["El potencial es una magnitud...", ["vectorial", "tensorial", "escalar", "compleja"], 2],
    ["Gauss es mas util cuando existe...", ["simetria", "friccion", "oscilacion", "resonancia"], 0],
    ["En conductor ideal en equilibrio, E interno...", ["aumenta", "vale cero", "oscila", "depende de masa"], 1],
    ["La energia potencial de cargas opuestas es...", ["positiva", "negativa", "cero", "infinita"], 1],
    ["El trabajo del campo al mover carga en sentido de E es...", ["positivo", "negativo", "cero", "indefinido"], 0],
    ["k se relaciona con eps0 por...", ["k=4pi*eps0", "k=1/(4pi*eps0)", "k=eps0", "k=eps0/4"], 1]
  ];

  const calculo = [
    ["q1=1e-6, q2=2e-6, r=0.1. Orden de F?", ["1e-3 N", "1e0 N", "1e3 N", "1e-9 N"], 1],
    ["Q=1e-6 y r=0.2. E aprox?", ["2.2e5", "2.2e4", "2.2e3", "2.2e6"], 0],
    ["Q=3e-6 y r=0.3. V aprox?", ["9e4", "9e3", "9e5", "9e2"], 0],
    ["q=2e-9 y DeltaV=100 V. W?", ["2e-7", "2e-5", "2e-9", "2e2"], 0],
    ["A=0.01 m2, d=1e-3. C aprox?", ["8.9e-11", "8.9e-14", "8.9e-8", "8.9e-6"], 0],
    ["Qenc=1e-6, r=0.1 en esfera. E orden?", ["1e6", "1e2", "1e10", "1e-2"], 0],
    ["U de q1=1e-6, q2=-1e-6, r=0.2", ["-0.045", "0.045", "-4.5", "-4.5e-6"], 0],
    ["Si r se triplica, E de carga puntual...", ["x9", "/9", "/3", "igual"], 1],
    ["Si Q se cuadruplica, V...", ["x4", "x2", "/4", "igual"], 0],
    ["F neta 1D suma correcta", ["escalar con signo", "vector 3D", "tensor", "matriz"], 0],
    ["Trabajo y energia potencial cumplen", ["W=DeltaU", "W=-DeltaU campo", "W=q/U", "W=U/2"], 1],
    ["Campo de plano infinito depende de r", ["si", "no", "solo en vacio", "solo en conductor"], 1],
    ["Unidad de flujo electrico", ["N m2/C", "N/C", "V", "J/C"], 0],
    ["Si q de prueba cambia, E cambia", ["si", "no", "a veces", "solo en metal"], 1],
    ["En capacitor plano, si d aumenta C", ["aumenta", "disminuye", "igual", "oscila"], 1]
  ];

  const analisis = [
    ["Curva F vs r para Coulomb", ["lineal", "1/r2", "exponencial", "constante"], 1],
    ["Curva V vs r", ["1/r", "1/r2", "r", "ln(r)"], 0],
    ["Si grafica U(r) para cargas opuestas", ["positiva", "negativa y sube a 0", "constante", "parabolica"], 1],
    ["Equipotenciales y lineas de campo son", ["paralelas", "perpendiculares", "iguales", "aleatorias"], 1],
    ["Area bajo F(x) vs x representa", ["campo", "trabajo", "carga", "potencial"], 1],
    ["Mayor pendiente en V(r) implica", ["E menor", "E mayor", "q menor", "sin relacion"], 1],
    ["Superposicion de campos implica", ["sumar vectorialmente", "promediar", "multiplicar", "restar modulos"], 0],
    ["Si E total = 0 entre cargas iguales", ["siempre centro", "nunca", "depende signos", "solo en conductor"], 2],
    ["Flujo neto nulo implica", ["Qenc=0", "E=0 en todos lados", "potencial cero", "sin lineas"], 0],
    ["Grafica C vs d en capacitor", ["lineal creciente", "inversa", "constante", "cuadratica"], 1]
  ];

  const avanzado = [
    [
      "Una linea infinita con densidad lambda produce campo E(r)=?",
      ["lambda/(2*pi*eps0*r)", "lambda/(4*pi*eps0*r2)", "2*lambda/(eps0*r2)", "constante"],
      0
    ],
    [
      "En un cascaron conductor esferico cargado, para r menor que R, E vale",
      ["Q/(4*pi*eps0*r2)", "0", "Q/(4*pi*eps0*R2)", "depende de theta"],
      1
    ],
    [
      "Dos cargas +Q separadas por 2a. En el punto medio el campo total es",
      ["2kQ/a2", "kQ/a2", "0", "infinito"],
      2
    ],
    [
      "Para tres cargas puntuales, la energia potencial total del sistema es",
      ["suma de Uij por cada par", "k*q1*q2*q3", "suma de modulos de campo", "integral temporal de flujo"],
      0
    ],
    [
      "Un capacitor plano con dielctrico de constante relativa kr cumple",
      ["C = kr*eps0*A/d", "C = eps0*A/(kr*d)", "C = kr*d/(eps0*A)", "C no cambia"],
      0
    ]
  ];

  const pushSet = (arr, cat) => {
    arr.forEach((q, i) => {
      PREGUNTAS.push({
        id: `${cat}-${i + 1}`,
        categoria: cat,
        pregunta: q[0],
        opciones: q[1],
        correcta: q[2],
        explicacion: `Razonamiento: ${q[1][q[2]]}.`
      });
    });
  };

  pushSet(conceptual, "conceptual");
  pushSet(calculo, "calculo");
  pushSet(analisis, "analisis");
  pushSet(avanzado, "avanzado");
}

function shuffle(arr) {
  const clone = [...arr];
  for (let i = clone.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [clone[i], clone[j]] = [clone[j], clone[i]];
  }
  return clone;
}

function updateBadge() {
  let b = "Aprendiz";
  if (quizState.xp > 150) b = "Einstein";
  else if (quizState.xp > 80) b = "Fisico";
  else if (quizState.xp > 30) b = "Estudiante";
  document.getElementById("badge-read").textContent = b;
  document.getElementById("xp-read").textContent = quizState.xp;
  document.getElementById("streak-read").textContent = quizState.racha;
  document.getElementById("fire").classList.toggle("on", quizState.racha >= 3);
}

function renderCategoryProgress() {
  ["conceptual", "calculo", "analisis", "avanzado"].forEach((cat) => {
    const s = quizState.catStats[cat];
    const pct = s.total ? Math.round((s.ok / s.total) * 100) : 0;
    document.getElementById(`prog-${cat}`).style.width = `${pct}%`;
  });
}

function getAdaptivePool(pool) {
  const withScore = pool.map((q) => {
    const freq = quizState.wrongFreq[q.id] || 0;
    const cat = quizState.catStats[q.categoria];
    const catWeak = cat.total ? 1 - cat.ok / cat.total : 0.35;
    const score = freq * 2 + catWeak;
    return { q, score, freq, catWeak };
  });

  const sorted = withScore.sort((a, b) => b.score - a.score);
  const top = sorted.slice(0, 18).map((x) => x.q);
  const weakCats = ["conceptual", "calculo", "analisis", "avanzado"]
    .map((cat) => {
      const s = quizState.catStats[cat];
      const weak = s.total ? 1 - s.ok / s.total : 0.4;
      return { cat, weak };
    })
    .sort((a, b) => b.weak - a.weak)
    .slice(0, 2)
    .map((x) => x.cat);

  const weakPool = pool.filter((q) => weakCats.includes(q.categoria));
  const merged = shuffle([...top, ...shuffle(weakPool).slice(0, 8)]);
  const unique = [];
  const seen = new Set();
  merged.forEach((q) => {
    if (!seen.has(q.id)) {
      seen.add(q.id);
      unique.push(q);
    }
  });

  const out = unique.slice(0, 20);
  quizState.adaptiveInfo = `frecuencias altas + debilidad en ${weakCats.join(" y ")}`;
  return out.length ? out : shuffle(pool).slice(0, 20);
}

function startQuiz() {
  const mode = document.getElementById("quiz-mode").value;
  const cat = document.getElementById("quiz-category").value;
  quizState.modo = mode;
  quizState.indice = 0;
  quizState.puntaje = 0;
  quizState.historial = [];

  let pool = PREGUNTAS;
  if (mode === "review") {
    pool = PREGUNTAS.filter((p) => quizState.wrong.includes(p.id));
    if (pool.length === 0) {
      document.getElementById("quiz-stage").innerHTML = "<p>No hay errores guardados. Excelente.</p>";
      return;
    }
  } else if (mode === "adaptive") {
    pool = getAdaptivePool(PREGUNTAS);
  } else if (cat !== "all") {
    pool = PREGUNTAS.filter((p) => p.categoria === cat);
  }

  if (mode === "exam") {
    quizState.preguntas = shuffle(pool).slice(0, 20);
    quizState.examSeconds = 1800;
    beginExamTimer();
  } else {
    clearExamTimer();
    quizState.preguntas = mode === "adaptive" ? pool : shuffle(pool);
  }

  const focus = document.getElementById("adaptive-focus");
  if (mode === "adaptive") {
    focus.textContent = `Foco adaptativo: ${quizState.adaptiveInfo}`;
  } else if (mode === "review") {
    focus.textContent = "Foco adaptativo: repaso de errores previos";
  } else {
    focus.textContent = "Foco adaptativo: exploracion general";
  }

  renderQuizQuestion();
}

function beginExamTimer() {
  const wrap = document.getElementById("timer-wrap");
  const ring = document.getElementById("timer-ring");
  const text = document.getElementById("timer-text");
  wrap.hidden = false;
  clearExamTimer();
  quizState.timerId = setInterval(() => {
    quizState.examSeconds--;
    const m = Math.floor(quizState.examSeconds / 60);
    const s = quizState.examSeconds % 60;
    text.textContent = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    const pct = quizState.examSeconds / 1800;
    ring.style.strokeDashoffset = `${163.36 * (1 - pct)}`;
    if (quizState.examSeconds <= 0) {
      clearExamTimer();
      finalizeQuiz();
    }
  }, 1000);
}

function clearExamTimer() {
  if (quizState.timerId) {
    clearInterval(quizState.timerId);
    quizState.timerId = null;
  }
  document.getElementById("timer-wrap").hidden = true;
}

function renderQuizQuestion() {
  const box = document.getElementById("quiz-stage");
  if (quizState.indice >= quizState.preguntas.length) {
    finalizeQuiz();
    return;
  }
  const q = quizState.preguntas[quizState.indice];
  const total = quizState.preguntas.length;
  const progPct = Math.round((quizState.indice / total) * 100);

  box.innerHTML = `
    <div class='quiz-card'>
      <div class='quiz-progress-bar'><div class='quiz-progress-fill' style='width:${progPct}%'></div></div>
      <p class='quiz-counter'>${quizState.indice + 1} / ${total} &nbsp;—&nbsp; <span class='quiz-cat-label'>${q.categoria.toUpperCase()}</span></p>
      <h4 class='quiz-question'>${q.pregunta}</h4>
      <div class='quiz-options'>
        ${q.opciones.map((op, i) => `<button class='quiz-opt' data-i='${i}'>${op}</button>`).join("")}
      </div>
      <div class='quiz-explain-box' id='q-explain' hidden>
        <p class='explain-label'>Explicacion</p>
        <p>${q.explicacion}</p>
        <button class='btn btn-primary quiz-next-btn' id='quiz-next' type='button'>Siguiente pregunta →</button>
      </div>
    </div>`;

  box.querySelectorAll(".quiz-opt").forEach((btn) => {
    btn.addEventListener("click", () => submitAnswer(Number(btn.dataset.i)));
  });
}

function submitAnswer(index) {
  const q = quizState.preguntas[quizState.indice];
  const correct = index === q.correcta;
  const opts = [...document.querySelectorAll(".quiz-opt")];

  opts.forEach((o, i) => {
    o.disabled = true;
    if (i === q.correcta) o.classList.add("correct");
    if (i === index && i !== q.correcta) o.classList.add("wrong");
  });

  if (correct) {
    quizState.puntaje++;
    quizState.racha++;
    quizState.xp += 5 + Math.min(quizState.racha, 5);
    if (quizState.wrongFreq[q.id]) {
      quizState.wrongFreq[q.id] = Math.max(0, quizState.wrongFreq[q.id] - 1);
    }
  } else {
    quizState.racha = 0;
    if (!quizState.wrong.includes(q.id)) quizState.wrong.push(q.id);
    quizState.wrongFreq[q.id] = (quizState.wrongFreq[q.id] || 0) + 1;
  }

  quizState.catStats[q.categoria].total++;
  if (correct) quizState.catStats[q.categoria].ok++;

  storage.save("xp", quizState.xp);
  storage.save("wrong", quizState.wrong);
  storage.save("wrongFreq", quizState.wrongFreq);
  storage.save("catStats", quizState.catStats);
  updateBadge();
  renderCategoryProgress();

  // Mostrar explicacion automaticamente
  const explainBox = document.getElementById("q-explain");
  if (explainBox) explainBox.hidden = false;

  const nextBtn = document.getElementById("quiz-next");
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      quizState.indice++;
      if (quizState.indice >= quizState.preguntas.length) {
        finalizeQuiz();
      } else {
        renderQuizQuestion();
      }
    });
    // En modo examen auto-avanzar despues de 2s si no hay interaccion
    if (quizState.modo === "exam") {
      nextBtn.textContent = "Siguiente →  (auto en 4s)";
      setTimeout(() => {
        if (document.getElementById("quiz-next")) nextBtn.click();
      }, 4000);
    }
  }
}

function finalizeQuiz() {
  clearExamTimer();
  const total = quizState.preguntas.length;
  const pct = total ? Math.round((quizState.puntaje / total) * 100) : 0;
  const grade = pct >= 90 ? "A" : pct >= 75 ? "B" : pct >= 60 ? "C" : pct >= 50 ? "D" : "F";
  const gradeColor = pct >= 75 ? "#7fff6e" : pct >= 50 ? "#ff6b35" : "#ff4444";

  const catRows = Object.entries(quizState.catStats)
    .map(([cat, s]) => {
      const catPct = s.total ? Math.round((s.ok / s.total) * 100) : 0;
      return `<tr><td>${cat}</td><td>${s.ok}/${s.total}</td><td style='color:${catPct>=60?"#7fff6e":"#ff6b35"}'>${catPct}%</td></tr>`;
    })
    .join("");

  document.getElementById("quiz-stage").innerHTML = `
    <div class='quiz-result'>
      <h4>Resultado final</h4>
      <div class='result-grade' style='color:${gradeColor}'>${grade}</div>
      <p class='result-score'>${quizState.puntaje} / ${total} correctas &nbsp;(${pct}%)</p>
      <p>XP total acumulado: <strong>${quizState.xp}</strong></p>
      <table class='result-table'>
        <thead><tr><th>Categoria</th><th>Correctas</th><th>Porcentaje</th></tr></thead>
        <tbody>${catRows}</tbody>
      </table>
      <button class='btn btn-primary' id='quiz-restart' style='margin-top:1.2rem'>Reiniciar</button>
    </div>`;
  document.getElementById("quiz-restart").addEventListener("click", startQuiz);
}

function renderModules() {
  const grid = document.getElementById("modules-grid");
  const keys = Object.keys(MODULOS);
  grid.innerHTML = keys
    .map((key, idx) => {
      const m = MODULOS[key];
      const grad = [
        "linear-gradient(#00c8ff,#7fff6e)",
        "linear-gradient(#ff6b35,#00c8ff)",
        "linear-gradient(#7fff6e,#ff6b35)",
        "linear-gradient(#00c8ff,#ff6b35)",
        "linear-gradient(#7fff6e,#00c8ff)"
      ][idx % 5];

      const fields = m.inputs
        .map(
          (f) => `
        <div class='float-wrap'>
          <input type='number' step='any' placeholder=' ' name='${key}-${f.id}' value='${f.value}'>
          <label>${f.label}</label>
          <span class='semaphore'></span>
        </div>`
        )
        .join("");

      const descripcionHTML = (m.descripcion || [])
        .map((p) => `<li>${p}</li>`)
        .join("");

      const videosHTML = (m.videos || [])
        .map((v) => `<a class='video-btn' href='${v.url}' target='_blank' rel='noopener noreferrer'>▶ ${v.titulo}</a>`)
        .join("");

      return `
      <article class='module-card' style='--module-grad:${grad}'>
        <div class='module-watermark'>${idx + 1}</div>
        <div class='module-head'>
          <h4>${m.titulo}</h4>
          <div>
            <span class='chip'>${m.dificultad}</span>
            <span class='chip'>${m.tiempo}</span>
          </div>
        </div>
        <p class='formula-preview'>${m.formula}</p>
        <p>${m.teoria}</p>
        <div class='svg-box'>${renderMiniDiagram(key)}</div>
        <details open>
          <summary>Contenido detallado</summary>
          <ul class='module-desc-list'>${descripcionHTML}</ul>
        </details>
        <details>
          <summary>Ejemplo resuelto</summary>
          <p class='module-example'>${m.ejemplo}</p>
        </details>
        <div class='video-links'>
          <p class='video-links-title'>📺 Videos recomendados</p>
          ${videosHTML}
        </div>
        <form class='module-calc' data-module='${key}'>
          ${fields}
          <button class='btn btn-ghost' type='button' data-calc='${key}'>Calcular modulo</button>
          <div class='calc-output' id='out-${key}'>--</div>
          <details>
            <summary>Como se calculo</summary>
            <div id='steps-${key}' class='steps'>Pendiente</div>
          </details>
        </form>
      </article>`;
    })
    .join("");

  attachModuleValidation();
}

function renderMiniDiagram(key) {
  if (key === "coulomb") {
    return "<svg viewBox='0 0 240 80'><circle cx='40' cy='40' r='14' fill='#ff6b35'/><circle cx='200' cy='40' r='14' fill='#00c8ff'/><line x1='58' y1='40' x2='182' y2='40' stroke='#7fff6e' stroke-dasharray='6 4'/><polygon points='182,40 170,34 170,46' fill='#7fff6e'/></svg>";
  }
  if (key === "campo") {
    return "<svg viewBox='0 0 240 80'><circle cx='120' cy='40' r='10' fill='#ff6b35'/><path d='M120 15 L120 65 M95 40 L145 40 M103 23 L137 57 M103 57 L137 23' stroke='#00c8ff'/></svg>";
  }
  if (key === "potencial") {
    return "<svg viewBox='0 0 240 80'><rect x='20' y='15' width='200' height='50' fill='none' stroke='#00c8ff'/><path d='M25 60 C60 20,95 70,130 30 S190 15,215 45' stroke='#7fff6e' fill='none'/></svg>";
  }
  if (key === "gauss") {
    return "<svg viewBox='0 0 240 80'><circle cx='120' cy='40' r='24' fill='none' stroke='#7fff6e'/><circle cx='120' cy='40' r='8' fill='#ff6b35'/><path d='M120 16 L120 4 M144 40 L156 40 M120 64 L120 76 M96 40 L84 40' stroke='#00c8ff'/></svg>";
  }
  return "<svg viewBox='0 0 240 80'><circle cx='60' cy='40' r='10' fill='#ff6b35'/><circle cx='180' cy='40' r='10' fill='#00c8ff'/><path d='M70 40 Q120 5 170 40' stroke='#7fff6e' fill='none'/></svg>";
}

function attachModuleValidation() {
  document.querySelectorAll(".float-wrap input").forEach((input) => {
    const sem = input.parentElement.querySelector(".semaphore");
    const validate = () => {
      const v = Number(input.value);
      sem.classList.remove("invalid", "valid");
      if (!input.value || Number.isNaN(v)) {
        sem.classList.add("invalid");
      } else if (Math.abs(v) < 1e-12) {
        sem.classList.add("invalid");
      } else if (Math.abs(v) < 1e-5) {
        sem.classList.add("valid");
      } else {
        sem.classList.add("valid");
      }
    };
    input.addEventListener("input", validate);
    validate();
  });

  document.querySelectorAll("button[data-calc]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const mod = btn.dataset.calc;
      const m = MODULOS[mod];
      const values = {};
      m.inputs.forEach((f) => {
        const name = `${mod}-${f.id}`;
        values[f.id] = Number(document.querySelector(`[name='${name}']`).value);
      });
      const result = solveModule(mod, values);
      animateNumber(`out-${mod}`, result.value, result.unit);
      document.getElementById(`steps-${mod}`).textContent = result.steps;
    });
  });
}

function solveModule(mod, v) {
  if (mod === "coulomb") {
    const F = (K * v.q1 * v.q2) / (v.r * v.r);
    const dir = v.q1 * v.q2 >= 0 ? "repulsiva" : "atractiva";
    return {
      value: F,
      unit: "N",
      steps: `1) F = K*q1*q2/r2\n2) F = ${scientific(F)} N\n3) Direccion ${dir}.`
    };
  }
  if (mod === "campo") {
    const E = (K * v.Q) / (v.r * v.r);
    return { value: E, unit: "N/C", steps: `E = K*Q/r2 = ${scientific(E)} N/C` };
  }
  if (mod === "potencial") {
    const V = (K * v.Q) / v.r;
    const U = v.q * V;
    return { value: V, unit: "V", steps: `V = ${scientific(V)} V\nU = qV = ${scientific(U)} J` };
  }
  if (mod === "gauss") {
    const E = v.Qenc / (4 * Math.PI * EPS0 * v.r * v.r);
    return { value: E, unit: "N/C", steps: `E = Qenc/(4*pi*eps0*r2) = ${scientific(E)} N/C` };
  }
  const U = (K * v.q1 * v.q2) / v.r;
  return { value: U, unit: "J", steps: `U = K*q1*q2/r = ${scientific(U)} J` };
}

function animateNumber(targetId, value, unit) {
  const el = document.getElementById(targetId);
  const duration = 500;
  const start = performance.now();
  const from = 0;
  function frame(now) {
    const t = Math.min(1, (now - start) / duration);
    const cur = from + (value - from) * t;
    el.textContent = `${scientific(cur)} ${unit}`;
    if (t < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function initMasterCalculator() {
  const select = document.getElementById("calc-type");
  const form = document.getElementById("dynamic-form");
  const solveBtn = document.getElementById("solve-master");

  select.innerHTML = Object.entries(masterCalcTypes)
    .map(([k, v]) => `<option value='${k}'>${v.label}</option>`)
    .join("");

  const makeField = (name) => `
    <div class='float-wrap'>
      <input type='number' step='any' placeholder=' ' name='${name}' value='1'>
      <label>${name}</label>
      <span class='semaphore'></span>
    </div>`;

  function renderForm() {
    const cfg = masterCalcTypes[select.value];
    form.innerHTML = cfg.fields.map(makeField).join("");
    attachModuleValidation();
  }

  select.addEventListener("change", renderForm);
  renderForm();

  solveBtn.addEventListener("click", () => {
    const cfg = masterCalcTypes[select.value];
    const params = {};
    cfg.fields.forEach((f) => {
      params[f] = parseField(form, f);
    });
    const res = calcularFormula(select.value, params);
    animateNumber("master-result", res.value, res.unit);
    document.getElementById("master-result-meta").textContent = `Notacion cientifica: ${scientific(res.value)} ${res.unit}`;
    const steps = document.getElementById("master-steps");
    steps.hidden = false;
    steps.textContent = `${res.eq}`;
    pushHistory({ type: masterCalcTypes[select.value].label, value: `${scientific(res.value)} ${res.unit}` });
  });

  document.getElementById("copy-result").addEventListener("click", async () => {
    const text = document.getElementById("master-result").textContent;
    await navigator.clipboard.writeText(text);
  });

  document.getElementById("export-result").addEventListener("click", () => {
    const c = document.createElement("canvas");
    c.width = 900;
    c.height = 280;
    const ctx = c.getContext("2d");
    ctx.fillStyle = "#04060f";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.strokeStyle = "#00c8ff";
    ctx.strokeRect(20, 20, c.width - 40, c.height - 40);
    ctx.fillStyle = "#e8f0ff";
    ctx.font = "22px IBM Plex Mono";
    ctx.fillText("PhysicsLab - Resultado", 42, 86);
    ctx.fillStyle = "#00c8ff";
    ctx.font = "700 38px IBM Plex Mono";
    ctx.fillText(document.getElementById("master-result").textContent, 42, 154);
    const a = document.createElement("a");
    a.href = c.toDataURL("image/png");
    a.download = "resultado_physicslab.png";
    a.click();
  });

  renderHistory();
}

function pushHistory(item) {
  const list = storage.load("calcHistory", []);
  list.unshift({ ...item, at: new Date().toLocaleString() });
  storage.save("calcHistory", list.slice(0, 5));
  renderHistory();
}

function renderHistory() {
  const list = storage.load("calcHistory", []);
  const el = document.getElementById("history-list");
  el.innerHTML = list.map((i) => `<li>${i.type}: ${i.value}</li>`).join("");
}

let chartRefs = [];

// ── Visualizador interactivo ──────────────────────────────────────────────────
const vizState = {
  charges: [],
  dragIdx: -1,
  animId: null
};

function initFieldViz() {
  const canvas = document.getElementById("field-lines-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  vizState.charges = [
    { x: canvas.width * 0.30, y: canvas.height * 0.50, q: 1 },
    { x: canvas.width * 0.70, y: canvas.height * 0.50, q: -1 }
  ];

  function drawFieldFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Grid
    ctx.strokeStyle = "rgba(0,200,255,0.07)";
    ctx.lineWidth = 1;
    for (let x = 0; x <= canvas.width; x += 40) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    for (let y = 0; y <= canvas.height; y += 40) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }

    // Lineas de campo desde cargas positivas
    const posCharges = vizState.charges.filter((c) => c.q > 0);
    posCharges.forEach((src) => {
      const nLines = 16;
      for (let i = 0; i < nLines; i++) {
        const angle = (i / nLines) * 2 * Math.PI;
        let x = src.x + 20 * Math.cos(angle);
        let y = src.y + 20 * Math.sin(angle);
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.strokeStyle = "rgba(127,255,110,0.7)";
        ctx.lineWidth = 1.5;
        for (let step = 0; step < 160; step++) {
          let ex = 0; let ey = 0;
          vizState.charges.forEach((ch) => {
            const dx = x - ch.x; const dy = y - ch.y;
            const r2 = Math.max(80, dx * dx + dy * dy);
            const inv = ch.q / Math.pow(r2, 1.5);
            ex += dx * inv; ey += dy * inv;
          });
          const mag = Math.hypot(ex, ey) || 1;
          x += (ex / mag) * 3;
          y += (ey / mag) * 3;
          ctx.lineTo(x, y);
          if (x < 0 || x > canvas.width || y < 0 || y > canvas.height) break;
          if (vizState.charges.some((ch) => ch.q < 0 && Math.hypot(x - ch.x, y - ch.y) < 20)) break;
        }
        ctx.stroke();
      }
    });

    // Dibujar cargas
    vizState.charges.forEach((ch) => {
      const grd = ctx.createRadialGradient(ch.x, ch.y, 2, ch.x, ch.y, 24);
      if (ch.q > 0) {
        grd.addColorStop(0, "#ffcc88");
        grd.addColorStop(1, "rgba(255,107,53,0)");
      } else {
        grd.addColorStop(0, "#88eeff");
        grd.addColorStop(1, "rgba(0,200,255,0)");
      }
      ctx.fillStyle = grd;
      ctx.beginPath(); ctx.arc(ch.x, ch.y, 24, 0, Math.PI * 2); ctx.fill();

      ctx.fillStyle = ch.q > 0 ? "#ff6b35" : "#00c8ff";
      ctx.beginPath(); ctx.arc(ch.x, ch.y, 14, 0, Math.PI * 2); ctx.fill();

      ctx.fillStyle = "#fff";
      ctx.font = "bold 16px IBM Plex Mono";
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText(ch.q > 0 ? "+" : "\u2212", ch.x, ch.y);
    });

    // HUD con fuerza
    if (vizState.charges.length >= 2) {
      const a = vizState.charges[0]; const b = vizState.charges[1];
      const rPx = Math.hypot(a.x - b.x, a.y - b.y);
      const rM = Math.max(0.01, rPx / 100);
      const F = Math.abs(K * 1e-6 * 1e-6 / (rM * rM));
      ctx.fillStyle = "rgba(4,6,15,0.75)";
      ctx.fillRect(6, 4, 390, 34);
      ctx.fillStyle = "#7fff6e";
      ctx.font = "12px IBM Plex Mono";
      ctx.textAlign = "left"; ctx.textBaseline = "top";
      ctx.fillText(`F = ${F.toExponential(2)} N   r = ${rM.toFixed(2)} m   \u2190 arrastra las cargas con el mouse`, 12, 11);
    }
  }

  // Controles de carga
  const addPos = document.getElementById("viz-add-pos");
  const addNeg = document.getElementById("viz-add-neg");
  const resetBtn = document.getElementById("viz-reset");

  if (addPos) addPos.addEventListener("click", () => {
    vizState.charges.push({ x: 60 + Math.random() * (canvas.width - 120), y: 40 + Math.random() * (canvas.height - 80), q: 1 });
    drawFieldFrame(); redrawPotentialMap();
  });
  if (addNeg) addNeg.addEventListener("click", () => {
    vizState.charges.push({ x: 60 + Math.random() * (canvas.width - 120), y: 40 + Math.random() * (canvas.height - 80), q: -1 });
    drawFieldFrame(); redrawPotentialMap();
  });
  if (resetBtn) resetBtn.addEventListener("click", () => {
    vizState.charges = [
      { x: canvas.width * 0.30, y: canvas.height * 0.50, q: 1 },
      { x: canvas.width * 0.70, y: canvas.height * 0.50, q: -1 }
    ];
    drawFieldFrame(); redrawPotentialMap();
  });

  // Drag con soporte de escala CSS
  canvas.style.cursor = "grab";
  canvas.addEventListener("mousedown", (e) => {
    const r = canvas.getBoundingClientRect();
    const sx = canvas.width / r.width; const sy = canvas.height / r.height;
    const mx = (e.clientX - r.left) * sx; const my = (e.clientY - r.top) * sy;
    vizState.dragIdx = vizState.charges.findIndex((ch) => Math.hypot(ch.x - mx, ch.y - my) < 26);
    if (vizState.dragIdx >= 0) canvas.style.cursor = "grabbing";
  });
  window.addEventListener("mousemove", (e) => {
    if (vizState.dragIdx < 0) return;
    const r = canvas.getBoundingClientRect();
    const sx = canvas.width / r.width; const sy = canvas.height / r.height;
    vizState.charges[vizState.dragIdx].x = Math.max(20, Math.min(canvas.width - 20, (e.clientX - r.left) * sx));
    vizState.charges[vizState.dragIdx].y = Math.max(20, Math.min(canvas.height - 20, (e.clientY - r.top) * sy));
    drawFieldFrame();
  });
  window.addEventListener("mouseup", () => {
    if (vizState.dragIdx >= 0) {
      vizState.dragIdx = -1;
      canvas.style.cursor = "grab";
      redrawPotentialMap();
    }
  });

  drawFieldFrame();
  redrawPotentialMap();
}

function redrawPotentialMap() {
  const c = document.getElementById("potential-map-canvas");
  if (!c) return;
  const ctx = c.getContext("2d");
  const W = c.width; const H = c.height;
  const scale = 2; // muestrear cada 2px para rendimiento
  const img = ctx.createImageData(W, H);

  for (let row = 0; row < H; row += scale) {
    for (let col = 0; col < W; col += scale) {
      let v = 0;
      vizState.charges.forEach((ch) => {
        const r = Math.max(8, Math.hypot(col - ch.x, row - ch.y));
        v += (K * ch.q * 2e-6) / r;
      });
      const norm = Math.max(-1, Math.min(1, v / 6e4));
      const rr = norm > 0 ? Math.round(255 * norm) : 0;
      const gg = Math.round(80 * (1 - Math.abs(norm)));
      const bb = norm < 0 ? Math.round(255 * -norm) : 0;
      for (let dy = 0; dy < scale && row + dy < H; dy++) {
        for (let dx = 0; dx < scale && col + dx < W; dx++) {
          const idx = ((row + dy) * W + (col + dx)) * 4;
          img.data[idx] = rr; img.data[idx + 1] = gg;
          img.data[idx + 2] = bb; img.data[idx + 3] = 210;
        }
      }
    }
  }
  ctx.putImageData(img, 0, 0);

  // Marcar posicion de cargas sobre el mapa
  vizState.charges.forEach((ch) => {
    ctx.strokeStyle = ch.q > 0 ? "#ff6b35" : "#00c8ff";
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(ch.x, ch.y, 14, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = "#fff";
    ctx.font = "bold 13px IBM Plex Mono";
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText(ch.q > 0 ? "+" : "\u2212", ch.x, ch.y);
  });
}

function initTypewriter() {
  const words = ["Ley de Coulomb", "Campo Electrico", "Potencial Electrico", "Ley de Gauss"];
  const el = document.getElementById("typewriter");
  let wi = 0;
  let ci = 0;
  let deleting = false;
  function tick() {
    const w = words[wi];
    if (!deleting) {
      ci++;
      el.textContent = w.slice(0, ci);
      if (ci === w.length) {
        deleting = true;
        setTimeout(tick, 900);
        return;
      }
    } else {
      ci--;
      el.textContent = w.slice(0, ci);
      if (ci === 0) {
        deleting = false;
        wi = (wi + 1) % words.length;
      }
    }
    setTimeout(tick, deleting ? 40 : 65);
  }
  tick();
}

function initCounters() {
  const targets = document.querySelectorAll("[data-counter]");
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const max = Number(el.dataset.counter);
      const start = performance.now();
      const duration = 900;
      function anim(now) {
        const t = Math.min(1, (now - start) / duration);
        el.textContent = String(Math.floor(max * t));
        if (t < 1) requestAnimationFrame(anim);
        else el.textContent = String(max);
      }
      requestAnimationFrame(anim);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  targets.forEach((el) => obs.observe(el));
}

function initScrollProgress() {
  const bar = document.getElementById("scroll-progress");
  const onScroll = () => {
    const doc = document.documentElement;
    const pct = (doc.scrollTop / (doc.scrollHeight - doc.clientHeight)) * 100;
    bar.style.width = `${pct}%`;
  };
  document.addEventListener("scroll", onScroll);
  onScroll();
}

function initCursor() {
  const cur = document.getElementById("custom-cursor");
  document.addEventListener("mousemove", (e) => {
    cur.style.left = `${e.clientX}px`;
    cur.style.top = `${e.clientY}px`;
  });
}

function initDrawer() {
  const btn = document.getElementById("drawer-toggle");
  const drawer = document.getElementById("module-drawer");
  btn.addEventListener("click", () => drawer.classList.toggle("open"));
  drawer.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => drawer.classList.remove("open")));
}

function renderFacts() {
  const facts = [
    {
      data: "La fuerza electrica puede ser 10^39 veces mayor que la gravitacional entre particulas.",
      contexto: "A escala microscopica domina totalmente sobre gravedad.",
      magnitud: "Compara proton-proton"
    },
    {
      data: "Un rayo puede alcanzar potenciales del orden de 10^9 voltios.",
      contexto: "La ruptura dielectrica del aire ocurre cerca de 3e6 V/m.",
      magnitud: "Millones de veces bateria domestica"
    },
    {
      data: "k = 1/(4*pi*eps0)",
      contexto: "Conecta ley de Coulomb y permitividad del vacio.",
      magnitud: "Base del SI electromagnetico"
    },
    {
      data: "Coulomb midio fuerzas con balanza de torsion en 1785.",
      contexto: "Experimentos de precision previos a electronica moderna.",
      magnitud: "Fuerzas pequenas detectadas mecanicamente"
    },
    {
      data: "La carga elemental tiene modulo 1.602e-19 C.",
      contexto: "Toda carga libre es multiplo de esta unidad.",
      magnitud: "Cuantizacion de carga"
    }
  ];
  document.getElementById("facts-grid").innerHTML = facts
    .map(
      (f) => `
      <details class='fact-card'>
        <summary><h4>${f.data}</h4></summary>
        <p><strong>Contexto:</strong> ${f.contexto}</p>
        <p><strong>Orden de magnitud:</strong> ${f.magnitud}</p>
      </details>`
    )
    .join("");
}

function bootstrap() {
  // Animaciones de scroll primero para que las secciones sean visibles
  try { observeAndAnimate(".reveal", "show"); } catch (e) { console.warn("reveal:", e); }

  try { renderModules(); } catch (e) { console.warn("renderModules:", e); }
  try { initMasterCalculator(); } catch (e) { console.warn("initMasterCalculator:", e); }
  try { initFieldViz(); } catch (e) { console.warn("initFieldViz:", e); }

  try {
    buildQuestions();
    document.getElementById("start-quiz").addEventListener("click", startQuiz);
    updateBadge();
    renderCategoryProgress();
  } catch (e) { console.warn("quiz init:", e); }

  try { renderFacts(); } catch (e) { console.warn("renderFacts:", e); }
  try { initTypewriter(); } catch (e) { console.warn("initTypewriter:", e); }
  try { initCounters(); } catch (e) { console.warn("initCounters:", e); }
  try { initScrollProgress(); } catch (e) { console.warn("initScrollProgress:", e); }
  try { initCursor(); } catch (e) { console.warn("initCursor:", e); }
  try { initDrawer(); } catch (e) { console.warn("initDrawer:", e); }

  try {
    const ps = new ParticleSystem(document.getElementById("particle-bg"));
    ps.animate();
  } catch (e) { console.warn("ParticleSystem:", e); }
}

document.addEventListener("DOMContentLoaded", bootstrap);