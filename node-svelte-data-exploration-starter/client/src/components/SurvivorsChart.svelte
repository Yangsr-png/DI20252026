<script>
  import * as d3 from "d3";
  export let apiBase;

  let container;
  let data = [];

  async function load() {
    const res = await fetch(`${apiBase}/api/titanic/survivors-by-class`);
    data = await res.json();
    draw();
  }

  function draw() {
    if (!container || !data.length) return;
    container.innerHTML = "";
    const width = container.clientWidth;
    const height = 320;
    const margin = { top: 20, right: 20, bottom: 40, left: 50 };

    const svg = d3.select(container)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const x = d3.scaleBand()
      .domain(data.map(d => d.pclass))
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.rate) || 1])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).tickFormat(d3.format(".0%")));

    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", d => x(d.pclass))
      .attr("y", d => y(d.rate))
      .attr("width", x.bandwidth())
      .attr("height", d => y(0) - y(d.rate));

    svg.append("text")
      .attr("x", width/2)
      .attr("y", 16)
      .attr("text-anchor", "middle")
      .text("Tasa de supervivencia por clase");
  }

  function handleResize() { draw(); }

  load();
  window.addEventListener("resize", handleResize);
</script>

<div bind:this={container} />
