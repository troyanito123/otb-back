import { getRepository } from 'typeorm';
import { Role } from '../modules/role/entities/role.entity';
import { User, UserStatus } from '../modules/user/entities/user.entity';
import { MonthlyPayment } from '../modules/monthly-payments/entities/monthly-payment.entity';
import { MonthlyPaymentMade } from '../modules/monthly-payment-mades/entities/monthly-payment-made.entity';
import { Meeting } from '../modules/meetings/entities/meeting.entity';
import { MeetingType } from '../modules/meetings/enums/meeting-type.enum';
import { Contribution } from '../modules/contributions/entities/contribution.entity';
import { ContributionsPaid } from '../modules/contributions-paid/entities/contributions-paid.entity';
import { Attendence } from '../modules/attendences/entities/attendence.entity';
import { PasswordEncrypter } from '../utils/password-encrypter';

/**
 * Genera datos falsos para testing y desarrollo
 * Este archivo utiliza datos predefinidos realistas sin dependencias externas
 */
export const seedWithFakeData = async (options?: {
  userCount?: number;
  meetingCount?: number;
  generatePayments?: boolean;
}): Promise<void> => {
  const { userCount = 10, meetingCount = 6, generatePayments = true } = options || {};

  console.log('🎭 Iniciando seeding con datos falsos...');

  const roleRepository = getRepository<Role>(Role);
  const userRepository = getRepository<User>(User);
  const monthlyPaymentRepository = getRepository<MonthlyPayment>(MonthlyPayment);
  const monthlyPaymentMadeRepository = getRepository<MonthlyPaymentMade>(MonthlyPaymentMade);
  const meetingRepository = getRepository<Meeting>(Meeting);
  const contributionRepository = getRepository<Contribution>(Contribution);
  const contributionsPaidRepository = getRepository<ContributionsPaid>(ContributionsPaid);
  const attendenceRepository = getRepository<Attendence>(Attendence);

  // Obtener roles
  const userRole = await roleRepository.findOne({ where: { code: 'USER' } });
  const supervisorRole = await roleRepository.findOne({ where: { code: 'SUPERVISOR' } });

  // Nombres y apellidos comunes en Bolivia
  const nombres = [
    'María',
    'Juan',
    'Ana',
    'Carlos',
    'Rosa',
    'Pedro',
    'Carmen',
    'Luis',
    'Elena',
    'José',
    'Patricia',
    'Miguel',
    'Isabel',
    'Fernando',
    'Laura',
    'Antonio',
    'Mónica',
    'Roberto',
    'Sandra',
    'Daniel',
    'Claudia',
    'Francisco',
    'Silvia',
    'Raúl',
    'Gloria',
    'Andrés',
    'Verónica',
    'Sergio',
    'Gabriela',
    'Ricardo',
  ];

  const apellidos = [
    'García',
    'Rodríguez',
    'González',
    'Fernández',
    'López',
    'Martínez',
    'Sánchez',
    'Pérez',
    'Gómez',
    'Martín',
    'Jiménez',
    'Ruiz',
    'Hernández',
    'Díaz',
    'Moreno',
    'Álvarez',
    'Muñoz',
    'Romero',
    'Alonso',
    'Gutiérrez',
    'Navarro',
    'Torres',
    'Domínguez',
    'Vázquez',
    'Ramos',
    'Gil',
    'Ramírez',
    'Serrano',
    'Blanco',
    'Suárez',
  ];

  const bloques = ['A', 'B', 'C', 'D', 'E'];

  // Generar usuarios
  const existingUsers = await userRepository.count();
  if (existingUsers < 5) {
    console.log(`👥 Generando ${userCount} usuarios (actualmente hay ${existingUsers})...`);

    const users = [];
    for (let i = 0; i < userCount; i++) {
      const nombre = nombres[Math.floor(Math.random() * nombres.length)];
      const apellido = apellidos[Math.floor(Math.random() * apellidos.length)];
      const bloque = bloques[Math.floor(Math.random() * bloques.length)];
      const direccion = String(Math.floor(Math.random() * 50) + 1).padStart(3, '0');

      const userData = {
        name: `${nombre} ${apellido}`,
        email: `${nombre.toLowerCase()}.${apellido.toLowerCase()}${i}@email.com`,
        identification_number: String(10000000 + Math.floor(Math.random() * 90000000)),
        address_number: direccion,
        block_number: bloque,
        role: Math.random() > 0.9 ? supervisorRole : userRole, // 10% supervisores
        status: UserStatus.ACTIVE,
        password: PasswordEncrypter.encrypt('password123'),
        subscription_at: new Date(
          2021,
          Math.floor(Math.random() * 12),
          Math.floor(Math.random() * 28) + 1,
        ).toISOString(),
      };

      const existingUser = await userRepository.findOne({ where: { email: userData.email } });
      if (!existingUser) {
        const user = userRepository.create(userData);
        const savedUser = await userRepository.save(user);
        users.push(savedUser);
        console.log(`  ✅ ${userData.name} - Bloque ${userData.block_number}`);
      }
    }
  }

  // Generar pagos mensuales
  if (generatePayments) {
    const currentYear = new Date().getFullYear();
    const existingPayments = await monthlyPaymentRepository.count();

    if (existingPayments < 12) {
      console.log('💰 Generando pagos mensuales...');

      const meses = [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
      ];

      const monthlyPayments = [];
      for (let year = currentYear - 1; year <= currentYear; year++) {
        for (let i = 0; i < meses.length; i++) {
          const amount = 50 + Math.floor(Math.random() * 30); // Entre 50 y 80
          const monthlyPayment = monthlyPaymentRepository.create({
            month: meses[i],
            year: year.toString(),
            amount,
          });
          const saved = await monthlyPaymentRepository.save(monthlyPayment);
          monthlyPayments.push(saved);
          console.log(`  ✅ ${meses[i]} ${year} - $${amount}`);
        }
      }

      // Generar algunos pagos realizados
      const users = await userRepository.find();
      if (users.length > 0) {
        console.log('💳 Generando pagos realizados...');

        for (const payment of monthlyPayments.slice(-6)) {
          // Últimos 6 meses
          for (const user of users) {
            if (Math.random() > 0.3) {
              // 70% de probabilidad de pago
              const paymentMade = monthlyPaymentMadeRepository.create({
                amount: payment.amount,
                user,
                monthly_paymet: payment,
                date: new Date(
                  parseInt(payment.year),
                  meses.indexOf(payment.month),
                  Math.floor(Math.random() * 28) + 1,
                ),
              });
              await monthlyPaymentMadeRepository.save(paymentMade);
            }
          }
        }
      }
    }
  }

  // Generar reuniones
  const existingMeetings = await meetingRepository.count();
  if (existingMeetings < 10) {
    console.log(`🏛️ Generando reuniones (actualmente hay ${existingMeetings})...`);

    const tiposReunion = [MeetingType.GENERAL, MeetingType.EXTRAORDINARY, MeetingType.MEETING];
    const temasReunion = [
      'Seguridad del Barrio',
      'Mejoramiento de Calles',
      'Actividades Comunitarias',
      'Presupuesto Anual',
      'Mantenimiento de Áreas Verdes',
      'Recolección de Basura',
      'Iluminación Pública',
      'Obras de Infraestructura',
    ];

    const meetings = [];
    const currentDate = new Date();

    for (let i = 0; i < meetingCount; i++) {
      const tema = temasReunion[Math.floor(Math.random() * temasReunion.length)];
      const tipo = tiposReunion[Math.floor(Math.random() * tiposReunion.length)];
      const fechaReunion = new Date(
        currentDate.getFullYear(),
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28) + 1,
      );

      const meetingData = {
        name: `${
          tipo === MeetingType.GENERAL
            ? 'Asamblea General'
            : tipo === MeetingType.EXTRAORDINARY
            ? 'Reunión Extraordinaria'
            : 'Reunión'
        } - ${tema}`,
        description: `Reunión para tratar temas relacionados con ${tema.toLowerCase()} en nuestro barrio`,
        date: fechaReunion,
        fine_amount: tipo === MeetingType.EXTRAORDINARY ? 30 : 20,
        type: tipo,
        year: fechaReunion.getFullYear().toString(),
        conclutions:
          Math.random() > 0.3
            ? `Se acordaron medidas específicas para mejorar ${tema.toLowerCase()}`
            : null,
      };

      const meeting = meetingRepository.create(meetingData);
      const savedMeeting = await meetingRepository.save(meeting);
      meetings.push(savedMeeting);
      console.log(`  ✅ ${meetingData.name}`);
    }

    // Generar asistencias aleatorias
    const users = await userRepository.find();
    if (users.length > 0 && meetings.length > 0) {
      console.log('📋 Generando asistencias...');

      for (const meeting of meetings) {
        for (const user of users) {
          if (Math.random() > 0.4) {
            // 60% de probabilidad de asistencia
            const attendence = attendenceRepository.create({
              user,
              meeting,
            });
            await attendenceRepository.save(attendence);
          }
        }
      }
    }
  }

  // Generar contribuciones
  const existingContributions = await contributionRepository.count();
  if (existingContributions < 8) {
    console.log('🤝 Generando contribuciones...');

    const tiposContribucion = [
      { name: 'Mejoramiento de Jardines', desc: 'plantas y herramientas', amount: [80, 120] },
      { name: 'Seguridad Nocturna', desc: 'servicio de seguridad', amount: [100, 150] },
      {
        name: 'Mantenimiento de Canchas',
        desc: 'reparación de instalaciones deportivas',
        amount: [150, 200],
      },
      { name: 'Actividades Navideñas', desc: 'celebraciones de fin de año', amount: [60, 100] },
      { name: 'Limpieza General', desc: 'materiales de limpieza', amount: [40, 80] },
      { name: 'Pintura de Muros', desc: 'pintura para muros perimetrales', amount: [120, 180] },
    ];

    const contributions = [];

    for (const tipo of tiposContribucion) {
      const amount = Math.floor(Math.random() * (tipo.amount[1] - tipo.amount[0])) + tipo.amount[0];

      const contributionData = {
        description: `${tipo.name} - Contribución para ${tipo.desc}`,
        amount,
      };

      const contribution = contributionRepository.create(contributionData);
      const saved = await contributionRepository.save(contribution);
      contributions.push(saved);
      console.log(`  ✅ ${tipo.name} - $${amount}`);
    }

    // Generar algunas contribuciones pagadas
    const users = await userRepository.find();
    if (users.length > 0 && contributions.length > 0) {
      console.log('💰 Generando contribuciones pagadas...');

      for (const contribution of contributions) {
        for (const user of users) {
          if (Math.random() > 0.5) {
            // 50% de probabilidad
            const contributionPaid = contributionsPaidRepository.create({
              amount: contribution.amount,
              user,
              contribution,
              date: new Date(
                new Date().getFullYear(),
                Math.floor(Math.random() * 12),
                Math.floor(Math.random() * 28) + 1,
              ),
            });
            await contributionsPaidRepository.save(contributionPaid);
          }
        }
      }
    }
  }

  console.log('🎉 Seeding con datos falsos completado exitosamente!');
};
