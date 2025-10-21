#!/bin/bash

echo "🚀 Iniciando MERN CRUD Auth Backend..."

# Verificar variables de entorno
if [ -z "$MONGODB_URI" ]; then
    echo "⚠️ MONGODB_URI no está configurada"
fi

if [ -z "$TOKEN_SECRET" ]; then
    echo "⚠️ TOKEN_SECRET no está configurada"
fi

# Iniciar el servidor
echo "🌍 Entorno: ${NODE_ENV:-development}"
echo "🔌 Puerto: ${PORT:-3003}"
echo "📊 Base de datos: ${MONGODB_URI:+Configurada}"

exec node src/index.js
