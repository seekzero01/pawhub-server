export interface Medication {
    id: string;
    pet_id: string;
    name: string;
    form: string | null;
    dosage: string | null;
    frequency: string | null;
    times: string[] | null;
    start_date: string;
    end_date: string | null;
    is_active: boolean;
    notes: string | null;
    created_at: string;
}