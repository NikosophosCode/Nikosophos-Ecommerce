# Plan de Deploy en Vercel y Lanzamiento Óptimo

**Fecha:** 2025-01-15  
**Estado:** Preparación para producción

---

## 📋 Índice

1. [Pre-Deploy: Limpieza y Preparación](#1-pre-deploy-limpieza-y-preparación)
2. [Configuración de Vercel](#2-configuración-de-vercel)
3. [Variables de Entorno](#3-variables-de-entorno)
4. [Optimización Pre-Deploy](#4-optimización-pre-deploy)
5. [Deploy a Vercel](#5-deploy-a-vercel)
6. [Post-Deploy: Verificación](#6-post-deploy-verificación)
7. [SEO y Meta Tags](#7-seo-y-meta-tags)
8. [Monitoreo y Analytics](#8-monitoreo-y-analytics)
9. [Checklist Final](#9-checklist-final)

---

## 1) Pre-Deploy: Limpieza y Preparación

### 1.1 Archivos a Eliminar (Proyecto Viejo)

Estos archivos/carpetas corresponden a la app vanilla JS original y ya no son necesarios:

```
❌ /index.html (raíz - versión vieja)
❌ /src/index.js (app vanilla JS)
❌ /src/styles.css (generado por Tailwind CLI viejo)
❌ /src/tailwind.css (config vieja)
❌ /package.json (raíz - dependencias viejas)
❌ /package-lock.json (raíz)
❌ /node_modules/ (raíz)
```

### 1.2 Documentación a Mover/Archivar

Mantener pero organizar:

```
✅ MIGRACION_A_REACT_VITE.md → /docs/migration/
✅ FASE_*_COMPLETADA.md → /docs/migration/phases/
✅ README.md (raíz) → Actualizar para reflejar nueva app
```

### 1.3 Estructura Final Recomendada

```
/
├── web/                      # App React (convertir en raíz eventualmente)
├── docs/                     # Documentación
│   ├── migration/
│   │   ├── MIGRACION_A_REACT_VITE.md
│   │   └── phases/
│   │       ├── FASE_4_COMPLETADA.md
│   │       ├── FASE_5_COMPLETADA.md
│   │       ├── FASE_7_COMPLETADA.md
│   │       └── FASE_8_COMPLETADA.md
│   └── deployment/
│       └── DEPLOY_LOG.md (nuevo)
├── .gitignore (actualizado)
└── README.md (actualizado para web/)
```

### 1.4 Script de Limpieza

Ejecutar desde la raíz del proyecto:

```powershell
# Eliminar archivos del proyecto viejo
Remove-Item -Path ".\index.html" -Force
Remove-Item -Path ".\src" -Recurse -Force
Remove-Item -Path ".\package.json" -Force
Remove-Item -Path ".\package-lock.json" -Force
Remove-Item -Path ".\node_modules" -Recurse -Force

# Crear estructura de docs
New-Item -Path ".\docs\migration\phases" -ItemType Directory -Force
New-Item -Path ".\docs\deployment" -ItemType Directory -Force

# Mover documentación
Move-Item -Path ".\MIGRACION_A_REACT_VITE.md" -Destination ".\docs\migration\" -Force
Move-Item -Path ".\FASE_*.md" -Destination ".\docs\migration\phases\" -Force
```

---

## 2) Configuración de Vercel

### 2.1 Archivo `vercel.json`

Crear en `/web/vercel.json`:

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ]
}
```

### 2.2 Configuración en Dashboard de Vercel

1. **Root Directory**: `web`
2. **Framework Preset**: `Vite`
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`
5. **Install Command**: `npm install`
6. **Node Version**: `20.x` (recomendado)

---

## 3) Variables de Entorno

### 3.1 Archivo `.env.example` (ya existe)

Verificar que `/web/.env.example` contenga:

```env
# Web3Forms API Key (contacto)
VITE_WEB3FORMS_KEY=your_web3forms_access_key_here
```

### 3.2 Configurar en Vercel Dashboard

**Production Environment Variables:**

| Key | Value | Environment |
|-----|-------|-------------|
| `VITE_WEB3FORMS_KEY` | `[tu-api-key]` | Production, Preview |

**Obtener Web3Forms Key:**
1. Ir a https://web3forms.com/
2. Crear cuenta gratuita
3. Generar Access Key
4. Añadir en Vercel Dashboard → Settings → Environment Variables

### 3.3 Crear `.env.local` (gitignored)

Para desarrollo local:

```env
VITE_WEB3FORMS_KEY=tu_clave_real_aqui
```

---

## 4) Optimización Pre-Deploy

### 4.1 Actualizar `.gitignore`

Añadir/verificar en `/web/.gitignore`:

```gitignore
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Dependencies
node_modules
dist
dist-ssr
*.local

# Environment variables
.env.local
.env.production.local
.env.development.local
.env.test.local

# Editor
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Vercel
.vercel
```

### 4.2 Verificar Build Local

```powershell
cd web
npm run build
npm run preview
```

**Verificaciones:**
- ✅ Build completa sin errores
- ✅ TypeCheck PASS
- ✅ Bundle size razonable (< 1MB total)
- ✅ Chunks separados correctamente
- ✅ Preview funciona en http://localhost:4173

### 4.3 Optimizar `vite.config.ts`

Actualizar `/web/vite.config.ts` para producción:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'query-vendor': ['@tanstack/react-query'],
          'form-vendor': ['react-hook-form', '@hookform/resolvers', 'zod'],
          'ui-vendor': ['@headlessui/react', 'sonner'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false, // Desactivar en producción para reducir tamaño
  },
  server: {
    port: 5174,
  },
  preview: {
    port: 4173,
  },
})
```

### 4.4 Añadir Meta Tags y SEO

Crear `/web/src/components/SEO.tsx`:

```typescript
import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
}

export function SEO({
  title = 'TechStore - Tienda de Electrónicos y Tecnología',
  description = 'Descubre los mejores productos electrónicos, smartphones, laptops y accesorios tecnológicos con envío gratis en compras mayores a $50.',
  keywords = 'tienda electrónicos, smartphones, laptops, tecnología, gadgets, accesorios',
  image = '/og-image.png',
  url = 'https://tu-dominio.vercel.app',
}: SEOProps) {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Additional */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Spanish" />
      <meta name="author" content="TechStore" />
    </Helmet>
  )
}
```

Instalar dependencia:

```powershell
npm install react-helmet-async
npm install -D @types/react-helmet-async
```

### 4.5 Añadir Favicon e Imágenes OG

1. Generar favicon: https://realfavicongenerator.net/
2. Colocar en `/web/public/`:
   - `favicon.ico`
   - `favicon-16x16.png`
   - `favicon-32x32.png`
   - `apple-touch-icon.png`
   - `og-image.png` (1200x630px)

3. Actualizar `/web/index.html`:

```html
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#8b5cf6" />
  <title>TechStore - Tienda de Electrónicos y Tecnología</title>
</head>
```

---

## 5) Deploy a Vercel

### 5.1 Opción A: Deploy via CLI (Recomendado)

```powershell
# Instalar Vercel CLI globalmente
npm install -g vercel

# Login
vercel login

# Desde /web/, ejecutar deploy
cd web
vercel

# Seguir prompts:
# - Set up and deploy? Yes
# - Which scope? [tu-cuenta]
# - Link to existing project? No
# - Project name? techstore (o nombre deseado)
# - In which directory is your code located? ./
# - Want to override settings? No

# Deploy a producción
vercel --prod
```

### 5.2 Opción B: Deploy via GitHub (Automatizado)

1. **Push a GitHub:**

```powershell
git add .
git commit -m "feat: preparación para deploy en Vercel"
git push origin main
```

2. **Conectar en Vercel Dashboard:**
   - Ir a https://vercel.com/new
   - Importar repositorio: `Nikosophos-Ecommerce`
   - Configurar:
     - **Root Directory**: `web`
     - **Framework**: Vite
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
   - Añadir Environment Variables (VITE_WEB3FORMS_KEY)
   - Click "Deploy"

### 5.3 Configurar Dominio Personalizado (Opcional)

1. En Vercel Dashboard → Settings → Domains
2. Añadir dominio custom: `www.tudominio.com`
3. Seguir instrucciones DNS (A record, CNAME)
4. Esperar propagación (5-30 min)

---

## 6) Post-Deploy: Verificación

### 6.1 Checklist de Verificación

| Item | Verificación | Status |
|------|-------------|--------|
| ✅ Build exitoso | Ver logs en Vercel Dashboard | ⏳ |
| ✅ Deploy completo | URL de producción accesible | ⏳ |
| ✅ Rutas funcionando | Probar `/`, `/cart`, `/favorites`, `/profile`, `/contact`, `/category/electronics` | ⏳ |
| ✅ Búsqueda | Buscar productos, verificar resultados | ⏳ |
| ✅ Carrito | Añadir/quitar productos, persistencia | ⏳ |
| ✅ Favoritos | Toggle favoritos, persistencia | ⏳ |
| ✅ Auth | Registro, login, logout, editar perfil | ⏳ |
| ✅ Contacto | Enviar formulario, verificar recepción email | ⏳ |
| ✅ Cupones | Aplicar WELCOME10, SAVE20, FIRST5 | ⏳ |
| ✅ Responsive | Probar móvil, tablet, desktop | ⏳ |
| ✅ Performance | Lighthouse score > 90 | ⏳ |
| ✅ PWA (opcional) | Instalable, offline ready | ⏳ |

### 6.2 Lighthouse Audit

```powershell
# Instalar Lighthouse
npm install -g lighthouse

# Ejecutar audit
lighthouse https://tu-url.vercel.app --view --output html --output-path ./lighthouse-report.html
```

**Objetivos:**
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 90
- SEO: > 95

### 6.3 Pruebas de Dispositivos Reales

- **Desktop**: Chrome, Firefox, Safari, Edge
- **Móvil**: Android (Chrome), iOS (Safari)
- **Tablet**: iPad (Safari)

### 6.4 Verificar Analytics

Si se añadió Google Analytics/Vercel Analytics:
- Eventos de conversión (añadir al carrito, checkout)
- Páginas más visitadas
- Tasa de rebote
- Tiempo en sitio

---

## 7) SEO y Meta Tags

### 7.1 Sitemap

Crear `/web/public/sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://tu-dominio.vercel.app/</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://tu-dominio.vercel.app/favorites</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://tu-dominio.vercel.app/cart</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://tu-dominio.vercel.app/profile</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://tu-dominio.vercel.app/contact</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
```

### 7.2 robots.txt

Crear `/web/public/robots.txt`:

```
User-agent: *
Allow: /
Sitemap: https://tu-dominio.vercel.app/sitemap.xml
```

---

## 8) Monitoreo y Analytics

### 8.1 Vercel Analytics (Gratis)

Activar en Dashboard → Analytics → Enable

### 8.2 Google Analytics (Opcional)

Instalar `react-ga4`:

```powershell
npm install react-ga4
```

Configurar en `/web/src/main.tsx`:

```typescript
import ReactGA from 'react-ga4'

ReactGA.initialize('G-XXXXXXXXXX') // Tu tracking ID
```

### 8.3 Error Tracking (Opcional)

**Sentry** para monitoreo de errores:

```powershell
npm install @sentry/react
```

---

## 9) Checklist Final

### Pre-Deploy
- [ ] Limpieza de archivos viejos completada
- [ ] Build local exitoso (`npm run build`)
- [ ] Preview local funcional (`npm run preview`)
- [ ] `.env.example` actualizado
- [ ] `.gitignore` actualizado
- [ ] `vercel.json` creado y configurado
- [ ] Meta tags y SEO implementados
- [ ] Favicon e imágenes OG añadidos
- [ ] Sitemap y robots.txt creados

### Deploy
- [ ] Vercel CLI instalado o GitHub conectado
- [ ] Variables de entorno configuradas en Vercel
- [ ] Deploy a producción exitoso
- [ ] URL de producción accesible

### Post-Deploy
- [ ] Todas las rutas funcionan
- [ ] Funcionalidades principales verificadas (carrito, favoritos, auth, contacto)
- [ ] Responsive probado en múltiples dispositivos
- [ ] Lighthouse audit > 90 en Performance
- [ ] Formulario de contacto envía emails correctamente
- [ ] Analytics configurado y funcionando
- [ ] Dominio personalizado configurado (si aplica)

### Documentación
- [ ] README.md actualizado con URL de producción
- [ ] DEPLOY_LOG.md creado con detalles del deploy
- [ ] Documentación de migración archivada en `/docs/`

---

## 📝 Notas Finales

- **Costos**: Vercel plan gratuito (Hobby) incluye:
  - 100 GB bandwidth/mes
  - Serverless Functions ilimitadas
  - Analytics básico
  - SSL automático
  - Previews de PR

- **Escalabilidad**: Si el tráfico crece, considerar:
  - Plan Pro ($20/mes) para 1 TB bandwidth
  - CDN personalizado
  - Base de datos real (Supabase/PlanetScale)

- **Backups**: Vercel mantiene deployments históricos (rollback fácil)

- **CI/CD**: Auto-deploy activado en GitHub push a `main`

---

**Última actualización:** 2025-01-15  
**Autor:** GitHub Copilot  
**Estado:** ✅ LISTO PARA DEPLOY
