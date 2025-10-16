# 🚀 Guía Rápida: Deploy en Vercel

Esta guía te llevará paso a paso desde la limpieza hasta el deploy en producción.

---

## ⏱️ Tiempo estimado: 15-30 minutos

---

## 📋 Pasos a Seguir

### 1️⃣ Ejecutar Script de Limpieza (5 min)

```powershell
# Desde la raíz del proyecto
.\SCRIPT_LIMPIEZA.ps1
```

**Qué hace:**
- ✅ Elimina archivos del proyecto vanilla JS viejo
- ✅ Organiza documentación en `/docs/`
- ✅ Crea README.md actualizado
- ✅ Actualiza .gitignore

---

### 2️⃣ Configurar Variables de Entorno (5 min)

```powershell
cd web
```

**Crear archivo `.env.local`:**

```env
VITE_WEB3FORMS_KEY=tu_clave_aqui
```

**Obtener clave Web3Forms:**
1. Ir a https://web3forms.com/
2. Crear cuenta gratuita
3. Generar Access Key
4. Copiar al archivo `.env.local`

---

### 3️⃣ Verificar Build Local (3 min)

```powershell
# Desde web/
npm run build
```

**Verificar:**
- ✅ Sin errores de TypeScript
- ✅ Build completa exitosamente
- ✅ Tamaño de bundle razonable

**Preview local:**

```powershell
npm run preview
```

Abre http://localhost:4173 y verifica que todo funcione.

---

### 4️⃣ Commit y Push a GitHub (2 min)

```powershell
# Volver a la raíz
cd ..

git add .
git commit -m "feat: preparación para deploy en Vercel

- Limpieza de archivos legacy
- Configuración de Vercel (vercel.json)
- SEO: sitemap.xml y robots.txt
- Optimización de build (code splitting)
- Documentación completa de deploy"

git push origin main
```

---

### 5️⃣ Deploy en Vercel (10 min)

#### **Opción A: Via GitHub (Recomendado para CI/CD)**

1. **Ir a Vercel Dashboard:**
   - https://vercel.com/new

2. **Importar Repositorio:**
   - Buscar: `Nikosophos-Ecommerce`
   - Click "Import"

3. **Configurar Proyecto:**
   ```
   Project Name: techstore (o el que prefieras)
   Framework Preset: Vite
   Root Directory: web
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Variables de Entorno:**
   - Click "Environment Variables"
   - Añadir:
     - Key: `VITE_WEB3FORMS_KEY`
     - Value: `[tu-clave-web3forms]`
     - Environments: Production, Preview

5. **Deploy:**
   - Click "Deploy"
   - Esperar 2-5 minutos

#### **Opción B: Via CLI (Más rápido)**

```powershell
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy desde /web/
cd web
vercel

# Seguir prompts:
# - Set up and deploy? Yes
# - Which scope? [tu-cuenta]
# - Link to existing project? No
# - Project name? techstore
# - In which directory is your code located? ./
# - Want to override settings? No

# Deploy a producción
vercel --prod
```

---

### 6️⃣ Configurar Variables en Vercel Dashboard (si usaste CLI)

1. Ir a tu proyecto en Vercel Dashboard
2. Settings → Environment Variables
3. Añadir `VITE_WEB3FORMS_KEY`
4. Redeploy desde Dashboard

---

### 7️⃣ Verificación Post-Deploy (5 min)

**Abrir URL de producción** (proporcionada por Vercel)

**Checklist de verificación:**

- [ ] **Home** carga correctamente
- [ ] **Búsqueda** funciona
- [ ] **Categorías** navegables
- [ ] **Carrito:** Añadir productos, cambiar cantidades
- [ ] **Favoritos:** Toggle favoritos
- [ ] **Auth:** Registro, login, logout
- [ ] **Perfil:** Editar datos
- [ ] **Contacto:** Enviar formulario (verificar email)
- [ ] **Cupones:** Aplicar WELCOME10, SAVE20, FIRST5
- [ ] **Responsive:** Probar en móvil
- [ ] **Persistencia:** Recargar página, verificar stores

---

### 8️⃣ Optimización SEO (Opcional, 5 min)

**Actualizar URLs en archivos:**

1. **web/public/sitemap.xml:**
   - Reemplazar `https://tu-dominio.vercel.app` con tu URL real

2. **web/public/robots.txt:**
   - Reemplazar `https://tu-dominio.vercel.app` con tu URL real

```powershell
# Commit y push cambios
git add .
git commit -m "chore: actualizar URLs de producción en sitemap"
git push origin main
```

Vercel auto-deployará los cambios.

---

### 9️⃣ Lighthouse Audit (Opcional, 3 min)

```powershell
# Instalar Lighthouse CLI
npm install -g lighthouse

# Ejecutar audit
lighthouse https://tu-url.vercel.app --view
```

**Objetivos:**
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 90
- SEO: > 95

---

## 🎉 ¡Listo!

Tu app está en producción en Vercel.

**Próximos pasos opcionales:**

- 🌐 **Dominio personalizado:** Vercel → Settings → Domains
- 📊 **Analytics:** Activar Vercel Analytics (gratis)
- 🔔 **Notificaciones:** Configurar Slack/Discord webhooks
- 🛡️ **Seguridad:** Añadir Content Security Policy headers
- 🚀 **Performance:** Implementar PWA con `vite-plugin-pwa`

---

## 📞 Soporte

**Errores comunes:**

1. **Build falla:**
   - Verificar que `VITE_WEB3FORMS_KEY` esté configurada
   - Revisar logs en Vercel Dashboard

2. **Variables de entorno no funcionan:**
   - Verificar que comiencen con `VITE_`
   - Redeploy después de añadirlas

3. **404 en rutas:**
   - Verificar que `vercel.json` esté presente
   - Verificar rewrites configurados

**Documentación:**
- [Plan completo de deploy](./docs/deployment/PLAN_DEPLOY_VERCEL.md)
- [Vercel Docs](https://vercel.com/docs)

---

**Última actualización:** 2025-01-15
