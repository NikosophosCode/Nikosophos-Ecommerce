# Configuración del Formulario de Contacto

El formulario de contacto utiliza Web3Forms, un servicio gratuito para envío de emails sin necesidad de backend.

## Configuración rápida

### 1. Obtener Access Key gratuita

1. Ve a [https://web3forms.com](https://web3forms.com)
2. Ingresa tu email y haz clic en "Get Your Access Key"
3. Revisa tu email y copia el Access Key que te envían

### 2. Configurar la variable de entorno

1. En la carpeta `web/`, crea un archivo `.env.local`
2. Agrega tu Access Key:

```env
VITE_WEB3FORMS_KEY=tu_access_key_aqui
```

3. Guarda el archivo

### 3. Reiniciar el servidor

```powershell
cd web
npm run dev
```

## Funcionamiento

- Los emails se enviarán al correo registrado en Web3Forms
- Puedes personalizar el formato del email en tu panel de Web3Forms
- Límite gratuito: 250 envíos/mes (más que suficiente para pruebas)

## Desarrollo sin configuración

Si ejecutas el formulario sin configurar `VITE_WEB3FORMS_KEY`:
- El formulario se mostrará normalmente
- Al intentar enviar, verás un toast de advertencia
- Todas las validaciones funcionarán correctamente

## Producción

Para producción, configura la variable de entorno en tu plataforma de hosting:

**Vercel:**
```
Settings > Environment Variables
VITE_WEB3FORMS_KEY = tu_access_key
```

**Netlify:**
```
Site settings > Build & deploy > Environment
VITE_WEB3FORMS_KEY = tu_access_key
```

**GitHub Actions:**
```yaml
env:
  VITE_WEB3FORMS_KEY: ${{ secrets.WEB3FORMS_KEY }}
```

## Alternativas

Si prefieres otra solución:
- **Formspree**: Similar a Web3Forms
- **Resend**: API moderna con SDKs
- **EmailJS**: Sin backend necesario
- **Backend propio**: Serverless function + SendGrid/Mailgun

## Seguridad

✅ La API Key se incluye en el bundle del frontend (es normal para Web3Forms)  
✅ Web3Forms valida el dominio y previene spam  
✅ Puedes configurar rate limiting en tu panel de Web3Forms  
✅ Los datos no se almacenan en localStorage (solo se envían)

## Soporte

- Documentación Web3Forms: https://docs.web3forms.com
- Problemas con el formulario: revisar consola del navegador
- Verificar que el Access Key esté configurado correctamente
