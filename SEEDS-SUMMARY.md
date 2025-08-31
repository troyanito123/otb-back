# 🌱 Sistema de Seeds - OTB Back

## ✅ ¿Qué está disponible?

Tu proyecto ahora tiene un **sistema completo de seeds** que genera datos realistas para desarrollo y testing.

### 📦 Archivos principales:
- `src/scripts/seed-with-fake-data.ts` - Generador de datos falsos
- `src/scripts/run-fake-seed.ts` - Ejecutor independiente
- `src/scripts/set-default-data.ts` - Sistema original (roles + admin)

### 🚀 Comando disponible:
```bash
npm run seed:fake
```

## 🎯 Lo que genera:

### 👥 **15 Usuarios realistas**
- Nombres y apellidos bolivianos
- Distribuidos en bloques A, B, C, D, E
- 90% usuarios normales, 10% supervisores
- Contraseña: `password123`

### 💰 **Sistema de pagos completo**
- Pagos mensuales para 2 años (año pasado + actual)
- Pagos realizados con 70% de probabilidad
- Montos realistas ($50-$80)

### 🏛️ **8 Reuniones variadas**
- Tipos: General, Extraordinaria, Coordinación
- Temas realistas del barrio
- Multas según tipo de reunión
- Asistencias aleatorias (60% probabilidad)

### 🤝 **6 Tipos de contribuciones**
- Mejoramiento de jardines
- Seguridad nocturna  
- Mantenimiento de canchas
- Actividades navideñas
- Limtura general
- Pintura de muros

### 📊 **Datos relacionados**
- Contribuciones pagadas (50% probabilidad)
- Fechas realistas distribuidas
- Relaciones consistentes entre entidades

## 🔧 Cómo usar:

### Para desarrollo local:
```bash
# Ejecutar migraciones primero
npm run migration:run

# Poblar con datos de prueba
npm run seed:fake
```

### Para testing:
```bash
npm run seed:fake
```

### Para limpiar y empezar de nuevo:
```bash
npm run migration:dropdb
npm run migration:run
npm run seed:fake
```

## ⚡ Características técnicas:

✅ **Idempotente**: Se puede ejecutar múltiples veces sin duplicar
✅ **Inteligente**: Verifica datos existentes antes de crear
✅ **Seguro**: No sobrescribe datos importantes
✅ **Rápido**: No requiere dependencias externas
✅ **Realista**: Datos apropiados para el contexto boliviano

## 🎉 ¡Listo para usar!

Tu sistema de seeds está configurado y listo. Solo ejecuta:

```bash
npm run seed:fake
```

Y tendrás una base de datos completa con datos realistas para empezar a desarrollar o hacer demos del sistema de gestión de juntas vecinales.
