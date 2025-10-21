#!/bin/bash

# Script optimizado para build en Render
echo "🚀 Iniciando build optimizado..."

# Instalar dependencias del backend
echo "📦 Instalando dependencias del backend..."
npm install --production --no-optional

# Instalar dependencias del frontend
echo "📦 Instalando dependencias del frontend..."
cd client
npm install --production --no-optional

# Build del frontend
echo "🔨 Construyendo frontend..."
npm run build

echo "✅ Build completado exitosamente"
