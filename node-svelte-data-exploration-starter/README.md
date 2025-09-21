# Node + Svelte • Data Exploration Starter

Monorepo mínimo para clase de Acceso a Datos con:
- **server/**: API Express que lee un CSV y expone endpoints de ejemplo.
- **client/**: dashboard Svelte (tabla + gráfico con D3).
- **data/**: `titanic_sample.csv` para arrancar.
- **docker-compose.yml**: Postgres + Mongo (opcional).

## Requisitos
- Node 18+
- Docker (opcional, para Postgres/Mongo)

---

## 1) Backend (server/)

```bash
cd server
cp .env.sample .env
npm install
npm run dev
# Servirá en http://localhost:5174
```

Endpoints:
- `GET /api/health`
- `GET /api/titanic` — devuelve columnas y datos
- `GET /api/titanic/survivors-by-class` — agregación sencilla

### Postgres opcional
Levanta servicios:
```bash
docker compose up -d postgres
```
Ajusta tu `.env` y ejecuta el seed:
```bash
npm run seed:pg
```

---

## 2) Frontend (client/)

```bash
cd client
npm install
# apúntalo a tu API si no usas el puerto por defecto:
# crea un .env con VITE_API_BASE=http://localhost:5174
npm run dev
# http://localhost:5173
```

Verás:
- Tabla filtrable con los datos
- Gráfico D3 con tasa de supervivencia por clase

---

## 3) Estructura
```
data/
  titanic_sample.csv
server/
  .env.sample
  index.js
  package.json
  scripts/
    seed_postgres.js
client/
  index.html
  package.json
  vite.config.js
  src/
    App.svelte
    main.js
    components/
      TitanicTable.svelte
      SurvivorsChart.svelte
    styles/
      global.scss
      vars.scss
docker-compose.yml
```

## 4) Próximos pasos para clase
- Añadir endpoints con filtros/paginación (`/api/titanic?sex=female&class=1`).
- Añadir Mongo y ejercicios de documentos anidados.
- Conectar Postgres desde el backend para consultas reales.
- Crear un segundo dataset (p.e. Pokémon) y un selector en el dashboard.

¡A disfrutar de los datos! 🎓📊
