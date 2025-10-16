# Script de Limpieza - Preparación para Deploy
# Ejecutar desde la raíz del proyecto con: .\SCRIPT_LIMPIEZA_V2.ps1

Write-Host "Iniciando limpieza del proyecto..." -ForegroundColor Cyan
Write-Host ""

# Confirmación
$confirm = Read-Host "Este script eliminara archivos del proyecto viejo. Continuar? (y/n)"
if ($confirm -ne 'y') {
    Write-Host "Operacion cancelada" -ForegroundColor Red
    exit
}

Write-Host ""
Write-Host "Paso 1: Creando estructura de documentacion..." -ForegroundColor Yellow

# Crear estructura de docs
New-Item -Path ".\docs\migration\phases" -ItemType Directory -Force | Out-Null
New-Item -Path ".\docs\deployment" -ItemType Directory -Force | Out-Null

Write-Host "Estructura creada" -ForegroundColor Green

Write-Host ""
Write-Host "Paso 2: Moviendo documentacion de migracion..." -ForegroundColor Yellow

# Mover documentación
if (Test-Path ".\MIGRACION_A_REACT_VITE.md") {
    Move-Item -Path ".\MIGRACION_A_REACT_VITE.md" -Destination ".\docs\migration\" -Force
    Write-Host "  MIGRACION_A_REACT_VITE.md movido" -ForegroundColor Green
}

Get-ChildItem -Path ".\FASE_*.md" -ErrorAction SilentlyContinue | ForEach-Object {
    Move-Item -Path $_.FullName -Destination ".\docs\migration\phases\" -Force
    Write-Host "  $($_.Name) movido" -ForegroundColor Green
}

# Mover PLAN_DEPLOY_VERCEL.md
if (Test-Path ".\PLAN_DEPLOY_VERCEL.md") {
    Copy-Item -Path ".\PLAN_DEPLOY_VERCEL.md" -Destination ".\docs\deployment\" -Force
    Write-Host "  PLAN_DEPLOY_VERCEL.md copiado a docs/deployment/" -ForegroundColor Green
}

Write-Host ""
Write-Host "Paso 3: Eliminando archivos del proyecto viejo..." -ForegroundColor Yellow

# Eliminar archivos del proyecto viejo
$filesToDelete = @(
    ".\index.html",
    ".\package.json",
    ".\package-lock.json"
)

foreach ($file in $filesToDelete) {
    if (Test-Path $file) {
        Remove-Item -Path $file -Force
        Write-Host "  Eliminado: $file" -ForegroundColor Green
    } else {
        Write-Host "  No existe: $file" -ForegroundColor Gray
    }
}

# Eliminar carpetas
$foldersToDelete = @(
    ".\src",
    ".\node_modules"
)

foreach ($folder in $foldersToDelete) {
    if (Test-Path $folder) {
        Remove-Item -Path $folder -Recurse -Force
        Write-Host "  Eliminado: $folder" -ForegroundColor Green
    } else {
        Write-Host "  No existe: $folder" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "Paso 4: Creando README.md actualizado..." -ForegroundColor Yellow

# Leer el README template si existe, sino crear uno básico
if (Test-Path ".\web\README.md") {
    # Copiar el README de web como base
    Copy-Item -Path ".\web\README.md" -Destination ".\README.md" -Force
    Write-Host "README.md copiado desde web/" -ForegroundColor Green
} else {
    # Crear README básico
    $readmeBasic = "# TechStore - E-commerce React + Vite`n`n"
    $readmeBasic += "E-commerce moderno construido con React, TypeScript, Vite y TailwindCSS v4.`n`n"
    $readmeBasic += "## Estructura del Proyecto`n`n"
    $readmeBasic += "- web/ : Aplicacion React`n"
    $readmeBasic += "- docs/ : Documentacion`n`n"
    $readmeBasic += "## Instalacion`n`n"
    $readmeBasic += "cd web`n"
    $readmeBasic += "npm install`n"
    $readmeBasic += "npm run dev`n`n"
    $readmeBasic += "Ver documentacion completa en web/README.md`n"
    
    Set-Content -Path ".\README.md" -Value $readmeBasic -Encoding UTF8
    Write-Host "README.md creado" -ForegroundColor Green
}

Write-Host ""
Write-Host "Paso 5: Actualizando .gitignore..." -ForegroundColor Yellow

# Crear .gitignore actualizado
$gitignore = @"
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Dependencies
node_modules/
dist/
dist-ssr/
*.local

# Environment variables
.env
.env.local
.env.production.local
.env.development.local
.env.test.local

# Editor
.vscode/*
!.vscode/extensions.json
!.vscode/settings.json
.idea/
.DS_Store
*.suo
*.ntvs*
*.njsproj*
*.sln
*.sw?

# Vercel
.vercel

# OS
Thumbs.db

# Build artifacts
build/

# Testing
coverage/
"@

Set-Content -Path ".\.gitignore" -Value $gitignore -Encoding UTF8
Write-Host ".gitignore actualizado" -ForegroundColor Green

Write-Host ""
Write-Host "Limpieza completada con exito!" -ForegroundColor Green
Write-Host ""
Write-Host "Resumen de cambios:" -ForegroundColor Cyan
Write-Host "  Archivos del proyecto viejo eliminados" -ForegroundColor Green
Write-Host "  Documentacion reorganizada en /docs/" -ForegroundColor Green
Write-Host "  README.md actualizado" -ForegroundColor Green
Write-Host "  .gitignore actualizado" -ForegroundColor Green
Write-Host ""
Write-Host "Proximos pasos:" -ForegroundColor Yellow
Write-Host "  1. Revisar cambios: git status" -ForegroundColor White
Write-Host "  2. Verificar build: cd web; npm run build" -ForegroundColor White
Write-Host "  3. Commit cambios: git add .; git commit -m `"chore: preparacion para deploy`"" -ForegroundColor White
Write-Host "  4. Deploy a Vercel: cd web; vercel --prod" -ForegroundColor White
Write-Host ""
Write-Host "Ver plan completo: .\docs\deployment\PLAN_DEPLOY_VERCEL.md" -ForegroundColor Cyan
