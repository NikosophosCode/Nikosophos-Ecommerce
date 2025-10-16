# 🚀 Comandos Rápidos - Deploy TechStore

Una referencia rápida de todos los comandos necesarios para el deploy.

---

## 📦 Pre-Deploy

### Limpieza
```powershell
# Ejecutar script de limpieza (desde raíz)
.\SCRIPT_LIMPIEZA.ps1
```

### Variables de Entorno
```powershell
# Ir a web/
cd web

# Crear .env.local
echo "VITE_WEB3FORMS_KEY=tu_clave_aqui" > .env.local

# Editar con notepad
notepad .env.local
```

### Build Local
```powershell
# Build de producción
npm run build

# Preview
npm run preview
# Abre: http://localhost:4173

# Lint (opcional)
npm run lint
```

---

## 🚀 Deploy

### Opción A: GitHub → Vercel

```powershell
# Commit cambios
git add .
git commit -m "feat: preparación para deploy en Vercel"
git push origin main

# Luego ir a: https://vercel.com/new
# Importar: Nikosophos-Ecommerce
# Root Directory: web
# Framework: Vite
# Añadir env var: VITE_WEB3FORMS_KEY
```

### Opción B: Vercel CLI

```powershell
# Instalar CLI (una sola vez)
npm install -g vercel

# Login
vercel login

# Deploy (desde web/)
cd web
vercel

# Deploy a producción
vercel --prod
```

---

## 🔧 Gestión de Vercel

### Variables de Entorno
```powershell
# Listar variables
vercel env ls

# Añadir variable (producción)
vercel env add VITE_WEB3FORMS_KEY production

# Añadir variable (preview)
vercel env add VITE_WEB3FORMS_KEY preview

# Eliminar variable
vercel env rm VITE_WEB3FORMS_KEY
```

### Deployments
```powershell
# Listar deployments
vercel list

# Ver logs del último deploy
vercel logs

# Ver logs de URL específica
vercel logs [deployment-url]

# Rollback a deploy anterior
vercel rollback [deployment-url]

# Cancelar deployment en progreso
vercel cancel [deployment-url]
```

### Dominios
```powershell
# Listar dominios
vercel domains ls

# Añadir dominio
vercel domains add tudominio.com

# Remover dominio
vercel domains rm tudominio.com
```

### Proyectos
```powershell
# Listar proyectos
vercel projects ls

# Ver info del proyecto actual
vercel inspect

# Remover proyecto
vercel remove [project-name]
```

---

## 🔍 Verificación

### Lighthouse Audit
```powershell
# Instalar Lighthouse (una sola vez)
npm install -g lighthouse

# Ejecutar audit
lighthouse https://tu-url.vercel.app --view

# Guardar reporte
lighthouse https://tu-url.vercel.app --output html --output-path ./lighthouse-report.html

# Audit completo con todas las métricas
lighthouse https://tu-url.vercel.app --output json --output-path ./lighthouse-report.json
```

### Bundle Analysis
```powershell
# Analizar bundle (desde web/)
npm run build

# Ver tamaño de chunks en output
# dist/assets/*.js

# Alternativa: Instalar bundle analyzer
npm install -D rollup-plugin-visualizer

# Añadir a vite.config.ts:
# import { visualizer } from 'rollup-plugin-visualizer'
# plugins: [visualizer({ open: true })]
```

---

## 🐛 Debugging

### Logs
```powershell
# Ver logs en tiempo real
vercel logs --follow

# Ver logs con filtro
vercel logs --since 1h
vercel logs --until 30m

# Ver solo errores
vercel logs | Select-String "error"
```

### Build Local con Debugging
```powershell
# Build con logs verbosos
npm run build -- --debug

# Build sin optimización
npm run build -- --mode development

# Limpiar cache de Vite
Remove-Item -Recurse -Force node_modules/.vite
npm run build
```

### Verificar Variables de Entorno
```powershell
# En local (desde web/)
Get-Content .env.local

# En Vercel
vercel env pull .env.vercel

# Ver variables sin valores (seguridad)
vercel env ls
```

---

## 📊 Monitoreo

### Vercel Analytics
```powershell
# Ver analytics desde CLI
vercel inspect

# O ir a: https://vercel.com/[tu-usuario]/[proyecto]/analytics
```

### Performance Testing
```powershell
# WebPageTest
# Ir a: https://www.webpagetest.org/
# URL: tu-url.vercel.app

# GTmetrix
# Ir a: https://gtmetrix.com/
# URL: tu-url.vercel.app
```

---

## 🔄 Actualizaciones

### Deploy Cambios
```powershell
# Cambios menores (auto-deploy en push)
git add .
git commit -m "fix: corrección menor"
git push origin main

# Deploy manual desde CLI
cd web
vercel --prod
```

### Rollback
```powershell
# Listar deployments
vercel list

# Rollback a deploy anterior
vercel rollback [deployment-url]

# Alternativa: Promover preview a producción
vercel promote [preview-url]
```

---

## 🧹 Limpieza

### Caché Local
```powershell
# Limpiar node_modules
Remove-Item -Recurse -Force node_modules
npm install

# Limpiar build
Remove-Item -Recurse -Force dist

# Limpiar cache de Vite
Remove-Item -Recurse -Force node_modules/.vite
Remove-Item -Recurse -Force .vite
```

### Vercel
```powershell
# Remover deployments antiguos (manual en dashboard)
# Ir a: Deployments → [...] → Delete

# Remover proyecto completo
vercel remove [project-name] --yes
```

---

## 📝 Git Útiles

### Commits Semánticos
```powershell
# Feature
git commit -m "feat: nueva funcionalidad X"

# Fix
git commit -m "fix: corregir bug en Y"

# Chore
git commit -m "chore: actualizar dependencias"

# Docs
git commit -m "docs: actualizar README"

# Style
git commit -m "style: formatear código"

# Refactor
git commit -m "refactor: mejorar estructura de Z"

# Test
git commit -m "test: añadir tests para W"

# Perf
git commit -m "perf: optimizar rendimiento de V"
```

### Tags y Releases
```powershell
# Crear tag
git tag -a v1.0.0 -m "Primera versión en producción"
git push origin v1.0.0

# Listar tags
git tag -l

# Eliminar tag
git tag -d v1.0.0
git push origin :refs/tags/v1.0.0
```

---

## 🆘 Troubleshooting

### Build Falla
```powershell
# 1. Limpiar e reinstalar
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install

# 2. Verificar versión de Node
node --version  # Debe ser 20.x

# 3. Build con logs
npm run build 2>&1 | Tee-Object build.log

# 4. Revisar TypeScript
npx tsc --noEmit
```

### Variables de Entorno No Funcionan
```powershell
# 1. Verificar que empiecen con VITE_
Get-Content .env.local

# 2. Redeploy después de añadirlas
vercel --prod

# 3. Verificar en código
# console.log(import.meta.env.VITE_WEB3FORMS_KEY)
```

### 404 en Rutas
```powershell
# 1. Verificar vercel.json existe
Get-Content web/vercel.json

# 2. Verificar rewrites
# Debe tener: "source": "/(.*)", "destination": "/index.html"

# 3. Redeploy
vercel --prod
```

---

## 📚 Referencias Rápidas

### URLs Importantes
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Web3Forms:** https://web3forms.com/
- **Lighthouse:** https://developers.google.com/web/tools/lighthouse
- **Vite Docs:** https://vitejs.dev/
- **React Router:** https://reactrouter.com/

### Documentación Local
```powershell
# Abrir documentación
notepad PLAN_DEPLOY_VERCEL.md
notepad GUIA_RAPIDA_DEPLOY.md
notepad CHECKLIST_DEPLOY.md
```

---

## ⚡ One-Liners

```powershell
# Build, test y deploy en un comando
cd web; npm run build; npm run preview; vercel --prod

# Commit y push rápido
git add . ; git commit -m "update" ; git push

# Ver última URL deployada
vercel ls --meta

# Abrir último deploy en navegador
vercel open

# Ver proyecto en Vercel dashboard
vercel inspect --open
```

---

**Última actualización:** 2025-01-15  
**Tip:** Guarda este archivo en favoritos para acceso rápido
