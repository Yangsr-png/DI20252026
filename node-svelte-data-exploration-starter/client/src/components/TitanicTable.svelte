<script>
  export let apiBase;

  let data = [];
  let columns = [];
  let q = "";

  async function load() {
    const res = await fetch(`${apiBase}/api/titanic`);
    const json = await res.json();
    data = json.data;
    columns = json.columns;
  }

  $: filtered = q
    ? data.filter(row =>
        Object.values(row).some(v => String(v).toLowerCase().includes(q.toLowerCase()))
      )
    : data;

  load();
</script>

<div>
  <input placeholder="Filtrar…" bind:value={q} />
  <div style="overflow:auto;">
    <table>
      <thead>
        <tr>
          {#each columns as c}<th>{c}</th>{/each}
        </tr>
      </thead>
      <tbody>
        {#each filtered as row}
          <tr>
            {#each columns as c}<td>{row[c]}</td>{/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>
  input {
    width: 100%;
    padding: .6rem .8rem;
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.14);
    background: rgba(255,255,255,0.06);
    color: inherit;
    margin-bottom: .8rem;
  }
  table { width: 100%; border-collapse: collapse; }
  th, td { padding: .5rem; border-bottom: 1px solid rgba(255,255,255,0.1); text-align: left; }
  thead th { position: sticky; top: 0; background: rgba(0,0,0,0.3); }
</style>
