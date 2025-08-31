import { createConnection } from 'typeorm';
import { seedWithFakeData } from './seed-with-fake-data';
import * as dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

async function runFakeSeed() {
  try {
    console.log('🔗 Conectando a la base de datos para seed con datos falsos...');
    console.log(`📍 Host: ${process.env.DB_HOST}`);
    console.log(`🔌 Puerto: ${process.env.DB_PORT}`);
    console.log(`🗃️ Base de datos: ${process.env.DB_DATABASE}`);

    const connection = await createConnection({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5433'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || '123123',
      database: process.env.DB_DATABASE || 'OTB_DB',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: false,
    });

    console.log('✅ Conexión establecida');

    // Generar datos más extensos
    await seedWithFakeData({
      userCount: 15,
      meetingCount: 8,
      generatePayments: true,
    });

    await connection.close();
    console.log('🔐 Conexión cerrada');
    console.log('');
    console.log('🎉 Seed con datos falsos completado!');
    console.log('👥 15 usuarios generados');
    console.log('🏛️ 8 reuniones generadas');
    console.log('💰 Pagos y contribuciones generados');
    console.log('📝 Contraseña para todos los usuarios: password123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error ejecutando seed con datos falsos:', error);
    process.exit(1);
  }
}

runFakeSeed();
