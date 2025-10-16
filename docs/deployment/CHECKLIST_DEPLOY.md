# ✅ Checklist de Deploy - TechStore

**Fecha:** _____________  
**URL de Producción:** _________________________________

---

## 🔧 Pre-Deploy

### Limpieza del Proyecto
- [ ] Ejecutar `SCRIPT_LIMPIEZA.ps1`
- [ ] Verificar que archivos legacy se eliminaron
- [ ] Documentación movida a `/docs/`
- [ ] README.md actualizado

### Configuración
- [ ] `vercel.json` creado en `/web/`
- [ ] `sitemap.xml` creado en `/web/public/`
- [ ] `robots.txt` creado en `/web/public/`
- [ ] `.env.local` creado con `VITE_WEB3FORMS_KEY`
- [ ] `.gitignore` actualizado

### Build Local
- [ ] `cd web; npm run build` → ✅ PASS
- [ ] Sin errores de TypeScript
- [ ] Bundle size < 500 KB
- [ ] `npm run preview` → ✅ Funciona en localhost:4173

### Git
- [ ] Commit de cambios
- [ ] Push a `main` branch
- [ ] Verificar CI/CD (si existe)

---

## 🚀 Deploy

### Opción A: GitHub Import
- [ ] Ir a https://vercel.com/new
- [ ] Importar `Nikosophos-Ecommerce`
- [ ] Root Directory: `web`
- [ ] Framework: `Vite`
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`

### Opción B: Vercel CLI
- [ ] `npm install -g vercel`
- [ ] `vercel login`
- [ ] `cd web; vercel`
- [ ] `vercel --prod`

### Variables de Entorno
- [ ] Añadir `VITE_WEB3FORMS_KEY` en Vercel Dashboard
- [ ] Environment: Production ✅
- [ ] Environment: Preview ✅
- [ ] Redeploy si fue necesario

### Deploy Completado
- [ ] URL de producción recibida: __________________________
- [ ] Deploy status: ✅ Ready
- [ ] Build time: _______ segundos

---

## ✅ Verificación Post-Deploy

### Funcionalidades Core
- [ ] **Home** carga correctamente
- [ ] **Header** con logo y navegación
- [ ] **Footer** visible en todas las páginas
- [ ] **Búsqueda** en vivo funciona
- [ ] **Filtros** (orden por precio)

### Productos y Navegación
- [ ] **ProductGrid** muestra productos
- [ ] **ProductDialog** abre con detalles
- [ ] **Categorías** navegables (CategoryNav)
- [ ] URL cambia al navegar categorías
- [ ] Deep links funcionan (recargar en `/category/electronics`)

### Carrito
- [ ] Añadir producto al carrito
- [ ] Badge del header se actualiza
- [ ] `/cart` muestra productos
- [ ] Cambiar cantidad funciona
- [ ] Eliminar producto funciona
- [ ] Cupón WELCOME10 se aplica
- [ ] Cálculo de total correcto
- [ ] Persistencia (recargar página)

### Favoritos
- [ ] Toggle favorito en ProductCard
- [ ] Badge del header se actualiza
- [ ] `/favorites` muestra favoritos
- [ ] Añadir al carrito desde favoritos
- [ ] Quitar favorito funciona
- [ ] Vaciar favoritos con confirmación
- [ ] Persistencia (recargar página)

### Autenticación
- [ ] Botón "Iniciar sesión" abre modal
- [ ] Registro funciona
- [ ] Login funciona
- [ ] Avatar se muestra en Header
- [ ] UserMenu dropdown funciona
- [ ] `/profile` carga datos de usuario
- [ ] Editar perfil funciona
- [ ] Logout funciona
- [ ] Sincronización cart/favorites con usuario

### Contacto
- [ ] `/contact` carga correctamente
- [ ] Formulario visible
- [ ] Validaciones funcionan
- [ ] Envío de formulario exitoso
- [ ] Email recibido (verificar inbox)
- [ ] Toast de confirmación aparece
- [ ] Formulario se resetea

### Responsive
- [ ] Desktop (1920x1080) ✅
- [ ] Laptop (1366x768) ✅
- [ ] Tablet (768x1024) ✅
- [ ] Móvil (375x667) ✅
- [ ] MobileNav funciona en móvil

### Performance
- [ ] Tiempo de carga inicial < 3s
- [ ] Imágenes cargan lazy
- [ ] Transiciones entre rutas suaves
- [ ] Sin errores en consola
- [ ] Sin warnings en consola

---

## 🔍 SEO y Optimización

### Meta Tags
- [ ] Title tag correcto en todas las páginas
- [ ] Meta description presente
- [ ] Open Graph tags (og:image, og:title, etc.)
- [ ] Favicon visible en pestaña

### Sitemap y Robots
- [ ] `/sitemap.xml` accesible
- [ ] `/robots.txt` accesible
- [ ] URLs actualizadas con dominio real

### Lighthouse Audit
- [ ] Performance: ______ / 100 (objetivo > 90)
- [ ] Accessibility: ______ / 100 (objetivo > 95)
- [ ] Best Practices: ______ / 100 (objetivo > 90)
- [ ] SEO: ______ / 100 (objetivo > 95)

---

## 📊 Analytics (Opcional)

- [ ] Vercel Analytics activado
- [ ] Google Analytics configurado
- [ ] Eventos de conversión funcionando:
  - [ ] Añadir al carrito
  - [ ] Aplicar cupón
  - [ ] Enviar formulario contacto

---

## 🔒 Seguridad

- [ ] HTTPS activo (Vercel auto)
- [ ] Headers de seguridad configurados:
  - [ ] X-Content-Type-Options
  - [ ] X-Frame-Options
  - [ ] X-XSS-Protection
  - [ ] Referrer-Policy

---

## 🎯 Dominio Personalizado (Opcional)

- [ ] Dominio comprado: __________________________
- [ ] DNS configurado (A records o CNAME)
- [ ] SSL generado automáticamente
- [ ] Redirección www → non-www (o viceversa)

---

## 📝 Post-Deploy

### Documentación
- [ ] Actualizar README.md con URL de producción
- [ ] Crear `DEPLOY_LOG.md` con detalles
- [ ] Actualizar `CHANGELOG.md` (si existe)

### Comunicación
- [ ] Notificar a stakeholders
- [ ] Compartir URL en redes (si aplica)
- [ ] Añadir a portfolio

### Monitoreo
- [ ] Configurar alertas en Vercel
- [ ] Revisar logs de errores (primeras 24h)
- [ ] Monitorear métricas de rendimiento

---

## 🐛 Issues Post-Deploy

**Issue #1:**
- Descripción: _________________________________________
- Solución: ___________________________________________
- Status: [ ] Pendiente [ ] Resuelto

**Issue #2:**
- Descripción: _________________________________________
- Solución: ___________________________________________
- Status: [ ] Pendiente [ ] Resuelto

**Issue #3:**
- Descripción: _________________________________________
- Solución: ___________________________________________
- Status: [ ] Pendiente [ ] Resuelto

---

## ✨ Estado Final

- [ ] **Deploy EXITOSO**
- [ ] **Todas las funcionalidades verificadas**
- [ ] **Performance aceptable**
- [ ] **Sin errores críticos**

**Firma:** _____________________  
**Fecha:** _____________________

---

**Notas adicionales:**

_________________________________________________________________

_________________________________________________________________

_________________________________________________________________
