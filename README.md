# PET-SOCIETY

Una aplicación web moderna para explorar y registrar perros, construida con Next.js 16, Tailwind CSS v4, Drizzle ORM y Supabase.

## Tecnologías

- **Framework:** Next.js 16 (App Router)
- **Estilos:** Tailwind CSS v4 con diseño inspirado en Fidely
- **Base de datos:** Supabase (PostgreSQL)
- **ORM:** Drizzle ORM
- **Validación:** Zod + React Hook Form
- **Tipado:** TypeScript

## Características

- Explorar galería de perros desde la API de Dog CEO
- Registrar perros con formulario validado
- Generación automática de tags únicos
- Diseño premium con bordes redondeados y sombras suaves
- Componente `DogCard` polimórfico (gallery/profile)
- Server Actions para operaciones de base de datos

## Estructura del Proyecto

```
src/
├── app/
│   ├── globals.css          # Estilos globales Tailwind
│   ├── layout.tsx           # Layout principal
│   ├── page.tsx             # Vista: Explorar doggos
│   ├── register/page.tsx    # Vista: Formulario de registro
│   └── my-dogs/page.tsx     # Vista: Mis perros
├── components/
│   ├── DogCard.tsx          # Componente polimórfico
│   ├── DogGrid.tsx          # Grid reutilizable
│   └── Header.tsx           # Header con navegación
├── db/
│   ├── schema.ts            # Esquema Drizzle
│   └── index.ts             # Cliente de BD
├── actions/
│   └── dogs.ts              # Server Actions
└── lib/
    └── validations.ts       # Esquemas Zod
```

## Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone <repo-url>
   cd dog
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   ```bash
   cp .env.example .env
   ```

   Editar `.env` con tus credenciales de Supabase:
   ```
   DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres
   ```

4. **Crear tabla en Supabase:**
   ```bash
   npm run db:push
   ```

5. **Iniciar servidor de desarrollo:**
   ```bash
   npm run dev
   ```

6. **Abrir en el navegador:**
   ```
   http://localhost:3000
   ```

## Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Compila para producción |
| `npm run start` | Inicia servidor de producción |
| `npm run db:push` | Sincroniza esquema con Supabase |
| `npm run db:generate` | Genera migraciones |
| `npm run db:studio` | Abre Drizzle Studio |

## Esquema de Base de Datos

```typescript
dogs {
  id: uuid (PK, auto-generated)
  imageUrl: text
  name: text
  gender: text ('male' | 'female')
  comment: text (nullable)
  tag: text (auto-generated)
  lastSeenDate: text
  lastSeenTime: text
}
```

## Paleta de Colores

| Color | Hex | Uso |
|-------|-----|-----|
| Cream | `#F9F7F2` | Fondo principal |
| Purple | `#9C8CF0` | Botones primarios, acentos |
| Mint | `#D2EBD8` | Badges, acentos secundarios |

## API Externa

La aplicación consume la API gratuita de [Dog CEO](https://dog.ceo/dog-api/) para obtener imágenes aleatorias de perros.

```
GET https://dog.ceo/api/breeds/image/random/30
```

## Licencia

MIT
