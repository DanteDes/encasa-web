#!/bin/bash

# Script para verificar la configuración de autenticación

echo "🔍 Verificando configuración de autenticación..."
echo ""

# Verificar si existe .env.local
if [ ! -f ".env.local" ]; then
    echo "❌ No se encontró el archivo .env.local"
    echo "📝 Creá el archivo usando: cp .env.example .env.local"
    echo "📖 Seguí las instrucciones en SETUP_GOOGLE_AUTH.md"
    exit 1
else
    echo "✅ Archivo .env.local encontrado"
fi

# Verificar variables de entorno
echo ""
echo "🔧 Verificando variables de entorno..."

check_env_var() {
    local var_name=$1
    local var_value=$(grep "^${var_name}=" .env.local | cut -d '=' -f2)
    
    if [ -z "$var_value" ]; then
        echo "❌ Variable ${var_name} no está configurada"
        return 1
    elif [[ "$var_value" == *"your-"* ]] || [[ "$var_value" == *"tu-"* ]]; then
        echo "⚠️  Variable ${var_name} usa valor por defecto (necesita actualización)"
        return 1
    else
        echo "✅ Variable ${var_name} configurada"
        return 0
    fi
}

all_configured=true

check_env_var "AUTH_SECRET" || all_configured=false
check_env_var "NEXTAUTH_URL" || all_configured=false
check_env_var "GOOGLE_CLIENT_ID" || all_configured=false
check_env_var "GOOGLE_CLIENT_SECRET" || all_configured=false

echo ""
if [ "$all_configured" = true ]; then
    echo "✅ Todas las variables están configuradas correctamente"
    echo ""
    echo "🚀 Podés iniciar la aplicación con: npm run dev"
    echo "📖 Para más información, consultá SETUP_GOOGLE_AUTH.md"
else
    echo "❌ Algunas variables necesitan ser configuradas"
    echo ""
    echo "📝 Pasos siguientes:"
    echo "1. Generá un AUTH_SECRET con: openssl rand -base64 32"
    echo "2. Configurá Google OAuth en https://console.cloud.google.com/"
    echo "3. Actualizá las variables en .env.local"
    echo "4. Ejecutá este script de nuevo para verificar"
    echo ""
    echo "📖 Guía completa en: SETUP_GOOGLE_AUTH.md"
    exit 1
fi







