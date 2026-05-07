export type PetSex = 'male' | 'female' | 'unknown';
export type PetStatus = 'active' | 'inactive' | 'deceased';

export interface Pet {
    id: string;
    user_id: string;
    name: string;
    species: string;
    breed: string | null;
    sex: PetSex | null;
    date_of_birth: string | null; // ISO date string (YYYY-MM-DD)
    avatar_url: string | null;
    microchipped: boolean;
    spayed_neutered: boolean;
    status: PetStatus;
    created_at: string;
}