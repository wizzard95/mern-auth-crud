# 🚀 Guía de Deploy - MERN CRUD Auth

## Opciones de Deploy Recomendadas

### Opción 1: Backend en Render + Frontend en Vercel (Recomendado)

#### Backend en Render:
1. Conecta tu repositorio a Render
2. Usa la configuración `render-config.yaml`
3. Render configurará automáticamente:
   - Base de datos MongoDB
   - Variables de entorno
   - Health check

#### Frontend en Vercel:
1. Conecta la carpeta `client/` a Vercel
2. Vercel detectará automáticamente la configuración
3. El frontend se deployará automáticamente

### Opción 2: Todo en Render

#### Backend:
- Usa `render-config.yaml` en la raíz del proyecto

#### Frontend:
- Usa `client/render.yaml` en la carpeta client

## 🔧 Configuración Automática

### Variables de Entorno (se configuran automáticamente):
- `NODE_ENV=production`
- `PORT=3003`
- `MONGODB_URI` (desde la base de datos de Render)
- `TOKEN_SECRET` (generado automáticamente)

### URLs de CORS Configuradas:
- `http://localhost:5173` (desarrollo)
- `https://mern-crud-auth-frontend.onrender.com`
- `https://mern-crud-auth-backend.onrender.com`

## 📋 Pasos para Deploy:

1. **Backend en Render:**
   - Conecta repositorio
   - Selecciona `render-config.yaml`
   - Render configurará todo automáticamente

2. **Frontend en Vercel:**
   - Conecta carpeta `client/`
   - Vercel detectará la configuración automáticamente

3. **Actualizar URLs:**
   - Una vez deployado el backend, actualiza `VITE_API_URL` en el frontend

## ✅ Verificación:
- Backend: `https://tu-backend.onrender.com/api/health`
- Frontend: `https://tu-frontend.vercel.app`

## 🐛 Troubleshooting:
- Si el build falla, verifica que todas las dependencias estén en `package.json`
- Si hay errores de CORS, verifica que las URLs estén en `src/app.js`
- Si la base de datos no conecta, verifica que `MONGODB_URI` esté configurada
