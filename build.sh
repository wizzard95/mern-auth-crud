#!/bin/bash

echo "🚀 Iniciando build optimizado para Render..."

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo "❌ Error: No se encontró package.json"
    exit 1
fi

# Instalar dependencias de producción
echo "📦 Instalando dependencias de producción..."
npm install --production --no-optional --no-audit --no-fund

# Verificar que la instalación fue exitosa
if [ $? -eq 0 ]; then
    echo "✅ Dependencias instaladas correctamente"
else
    echo "❌ Error instalando dependencias"
    exit 1
fi

# Verificar que el archivo principal existe
if [ ! -f "src/index.js" ]; then
    echo "❌ Error: No se encontró src/index.js"
    exit 1
fi

echo "✅ Build completado exitosamente"
echo "🎯 Servidor listo para iniciar"
