<script>
  import TitanicTable from "./components/TitanicTable.svelte";
  import SurvivorsChart from "./components/SurvivorsChart.svelte";

  let apiBase = import.meta.env.VITE_API_BASE || "http://localhost:5174";
</script>

<div class="container">
  <h1>Exploración de datos • Titanic (demo)</h1>
  <div class="card">
    <p>Backend: <code>{apiBase}</code></p>
    <p>Esta demo carga un CSV en Node y muestra:</p>
    <ul>
      <li>Tabla interactiva</li>
      <li>Agregación: tasa de supervivencia por clase</li>
    </ul>
  </div>

  <div class="card">
    <h2>Tabla</h2>
    <TitanicTable {apiBase} />
  </div>

  <div class="card">
    <h2>Supervivencia por clase</h2>
    <SurvivorsChart {apiBase} />
  </div>
</div>

<style>
  h1 { margin-top: 0; }
  code { background: rgba(0,0,0,0.3); padding: 0.2rem 0.4rem; border-radius: 6px; }
</style>
