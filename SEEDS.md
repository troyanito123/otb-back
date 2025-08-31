# Sistema de Seeds para OTB-Back

## ✨ ¿Qué son los Seeds?

Los **seeds** son scripts que permiten poblar la base de datos con datos de prueba o datos iniciales. Son especialmente útiles para:

- 🧪 **Testing y Desarrollo**: Crear datos de prueba rápidamente
- 🚀 **Demos**: Mostrar el sistema con datos realistas
- 👥 **Onboarding**: Ayudar a nuevos desarrolladores a entender el sistema
- 🔄 **Desarrollo Local**: Tener datos consistentes entre desarrolladores

## 🚀 Seed con Datos Falsos

Genera un conjunto completo de datos realistas para desarrollo y testing:
- ✅ 15 usuarios con nombres bolivianos
- ✅ 8 reuniones variadas
- ✅ Pagos mensuales para 2 años
- ✅ Pagos realizados aleatorios (70% de usuarios)
- ✅ Asistencias a reuniones aleatorias (60% de usuarios)
- ✅ 6 tipos de contribuciones
- ✅ Contribuciones pagadas aleatorias (50% de usuarios)

```bash
npm run seed:fake
```

## 🛠 Implementación Técnica

### Sistema Actual Mejorado

1. **Archivo principal existente**: `src/scripts/set-default-data.ts`
   - Se ejecuta automáticamente al iniciar la aplicación
   - Crea roles básicos y usuario administrador

2. **Nuevo archivo de seeds**:
   - `src/scripts/seed-with-fake-data.ts` - Datos extensos con algoritmos realistas
   - `src/scripts/run-fake-seed.ts` - Ejecutor para seed con datos falsos

### Características de los Seeds

#### 🎯 **Datos Realistas**
- Nombres y apellidos bolivianos comunes
- Direcciones con formato de bloques (A, B, C, D, E)
- Números de identificación generados aleatoriamente
- Fechas de suscripción variadas

#### 🏗 **Estructura Inteligente**
- Verifica datos existentes antes de crear
- No duplica información
- Respeta las relaciones entre entidades
- Genera datos relacionados (pagos → pagos realizados)

#### 📊 **Distribución Realista**
- 90% usuarios normales, 10% supervisores
- 70% de probabilidad de pago mensual
- 60% de probabilidad de asistencia a reuniones
- 50% de probabilidad de pago de contribuciones

## 🔧 Uso en Desarrollo

### Para Testing y Demos
```bash
# Datos completos y realistas
npm run seed:fake
```

### Integración con CI/CD
```bash
# En scripts de deployment
npm run migration:run
npm run seed:fake
```

## 📦 Alternativas con Librerías Externas

### Opción con Faker.js
Si quieres datos aún más realistas, puedes instalar Faker.js:

```bash
npm install @faker-js/faker
npm install -D @types/faker
```

Esto permitiría generar:
- Emails más realistas
- Direcciones más variadas
- Fechas más distribuidas
- Textos de descripciones más naturales

## 🎯 Ventajas del Sistema Actual

✅ **Sin dependencias externas**: Usa solo datos predefinidos
✅ **Datos culturalmente apropiados**: Nombres y contextos bolivianos
✅ **Rápido y eficiente**: No requiere conexiones externas
✅ **Consistente**: Siempre genera los mismos tipos de datos
✅ **Seguro**: No expone datos reales

## 📝 Notas de Desarrollo

- Todos los usuarios generados tienen la contraseña: `password123`
- Los datos se crean solo si no existen previamente
- Los seeds son idempotentes (se pueden ejecutar múltiples veces)
- Los scripts se conectan directamente a la base de datos usando TypeORM
