export type UserPlan = 'free' | 'paw_plus' | 'paw_plus_family';

export interface DbUser {
    id: string;
    clerk_id: string;
    email: string;
    first_name: string | null;
    last_name: string | null;
    avatar_url: string | null;
    plan: UserPlan;
    created_at: string;
}