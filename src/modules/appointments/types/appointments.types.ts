export interface Appointment {
    id: string;
    pet_id: string;
    user_id: string;
    title: string;
    type: string | null;
    location: string | null;
    vet_name: string | null;
    scheduled_at: string;
    status: string;
    notes: string | null;
    created_at: string;
}