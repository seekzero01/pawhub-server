import 'dotenv/config'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import {PrismaClient} from "../src/generated/client";

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

const USER_ID = 'g0tEFrsxTepOSTyc2WgzurhnlK9Fhgrv'

const main = async () => {
    const mochi = await prisma.pet.upsert({
        where: { id: 'seed-pet-001' },
        update: {},
        create: {
            id: 'seed-pet-001',
            userId: USER_ID,
            name: 'Mochi',
            species: 'dog',
            breed: 'Shiba Inu',
            sex: 'male',
            dateOfBirth: new Date('2020-03-15'),
            microchipped: true,
            spayedNeutered: true,
            status: 'active',
        },
    })

    const luna = await prisma.pet.upsert({
        where: { id: 'seed-pet-002' },
        update: {},
        create: {
            id: 'seed-pet-002',
            userId: USER_ID,
            name: 'Luna',
            species: 'cat',
            breed: 'British Shorthair',
            sex: 'female',
            dateOfBirth: new Date('2021-07-22'),
            microchipped: true,
            spayedNeutered: true,
            status: 'active',
        },
    })

    await prisma.userNotificationSettings.upsert({
        where: { userId: USER_ID },
        update: {},
        create: {
            id: 'seed-notif-001',
            userId: USER_ID,
            medicationReminders: true,
            appointmentReminders: true,
            aiVetInsights: true,
        },
    })

    const appt1 = await prisma.appointment.upsert({
        where: { id: 'seed-appt-001' },
        update: {},
        create: {
            id: 'seed-appt-001',
            petId: mochi.id,
            userId: USER_ID,
            title: 'Annual Checkup',
            type: 'checkup',
            location: 'Helsinki Animal Clinic',
            vetName: 'Dr. Virtanen',
            scheduledAt: new Date('2025-08-10T10:00:00'),
            status: 'upcoming',
        },
    })

    await prisma.vaccination.upsert({
        where: { id: 'seed-vacc-001' },
        update: {},
        create: {
            id: 'seed-vacc-001',
            petId: mochi.id,
            appointmentId: appt1.id,
            name: 'Rabies',
            type: 'core',
            administeredBy: 'Dr. Virtanen',
            clinic: 'Helsinki Animal Clinic',
            givenAt: new Date('2024-08-10'),
            nextDueAt: new Date('2025-08-10'),
        },
    })

    await prisma.vaccination.upsert({
        where: { id: 'seed-vacc-002' },
        update: {},
        create: {
            id: 'seed-vacc-002',
            petId: luna.id,
            appointmentId: null,
            name: 'FVRCP',
            type: 'core',
            administeredBy: 'Dr. Mäkinen',
            clinic: 'Kamppi Vet Center',
            givenAt: new Date('2024-06-01'),
            nextDueAt: new Date('2025-06-01'),
        },
    })

    const med1 = await prisma.medication.upsert({
        where: { id: 'seed-med-001' },
        update: {},
        create: {
            id: 'seed-med-001',
            petId: mochi.id,
            name: 'Bravecto',
            form: 'chewable',
            dosage: '1 tablet',
            frequency: 'every 12 weeks',
            times: ['08:00'],
            startDate: new Date('2025-01-01'),
            isActive: true,
        },
    })

    const med2 = await prisma.medication.upsert({
        where: { id: 'seed-med-002' },
        update: {},
        create: {
            id: 'seed-med-002',
            petId: luna.id,
            name: 'Metacam',
            form: 'liquid',
            dosage: '0.5ml',
            frequency: 'daily',
            times: ['09:00'],
            startDate: new Date('2025-06-01'),
            endDate: new Date('2025-06-14'),
            isActive: true,
        },
    })

    await prisma.medicationLog.upsert({
        where: { id: 'seed-medlog-001' },
        update: {},
        create: {
            id: 'seed-medlog-001',
            medicationId: med1.id,
            petId: mochi.id,
            scheduledAt: new Date('2025-06-01T08:00:00'),
            givenAt: new Date('2025-06-01T08:12:00'),
            status: 'given',
        },
    })

    await prisma.medicationLog.upsert({
        where: { id: 'seed-medlog-002' },
        update: {},
        create: {
            id: 'seed-medlog-002',
            medicationId: med2.id,
            petId: luna.id,
            scheduledAt: new Date('2025-06-01T09:00:00'),
            givenAt: null,
            status: 'pending',
        },
    })

    await prisma.weightLog.upsert({
        where: { id: 'seed-wt-001' },
        update: {},
        create: {
            id: 'seed-wt-001',
            petId: mochi.id,
            weightKg: 8.4,
            source: 'vet',
            recordedAt: new Date('2025-05-15T10:00:00'),
        },
    })

    await prisma.weightLog.upsert({
        where: { id: 'seed-wt-002' },
        update: {},
        create: {
            id: 'seed-wt-002',
            petId: luna.id,
            weightKg: 4.1,
            source: 'home_scale',
            recordedAt: new Date('2025-05-20T11:00:00'),
        },
    })

    await prisma.task.upsert({
        where: { id: 'seed-task-001' },
        update: {},
        create: {
            id: 'seed-task-001',
            petId: mochi.id,
            userId: USER_ID,
            title: 'Monthly flea treatment',
            category: 'grooming',
            frequency: 'monthly',
            dueAt: new Date('2025-07-01T08:00:00'),
            isCompleted: false,
        },
    })

    await prisma.task.upsert({
        where: { id: 'seed-task-002' },
        update: {},
        create: {
            id: 'seed-task-002',
            petId: luna.id,
            userId: USER_ID,
            title: 'Brush teeth',
            category: 'dental',
            frequency: 'weekly',
            dueAt: new Date('2025-06-07T09:00:00'),
            isCompleted: false,
        },
    })

    const conv = await prisma.aiVetConversation.upsert({
        where: { id: 'seed-conv-001' },
        update: {},
        create: {
            id: 'seed-conv-001',
            userId: USER_ID,
            petId: mochi.id,
            title: 'Is Mochi drinking too much water?',
        },
    })

    await prisma.aiVetMessage.createMany({
        skipDuplicates: true,
        data: [
            {
                id: 'seed-msg-001',
                conversationId: conv.id,
                role: 'user',
                content: 'Mochi has been drinking a lot more water than usual over the past week.',
            },
            {
                id: 'seed-msg-002',
                conversationId: conv.id,
                role: 'assistant',
                content: 'Increased water intake in dogs can indicate diet changes, heat, or conditions like diabetes. If it persists beyond 2–3 days, a vet visit is recommended.',
            },
        ],
    })

    console.log('✅ Seed complete')
}

main()
    .then(async () => {
        await prisma.$disconnect()
        await pool.end()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        await pool.end()
        process.exit(1)
    })