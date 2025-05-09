export type User = {
    id: number;
    name: string;
    email: string;
    user_data: {
        height: string;
        height_unit: string;
        weight: string;
        weight_unit: string;
        birth_date: string; // format: "DD/MM/YYYY"
        gender: 'Female' | 'Male' ; // add more if needed
        fitness_goal: string;
        activity_level: string;
    };
    email_verified_at: string | null;
    created_at: string; // ISO 8601 format
    updated_at: string; // ISO 8601 format
};
export type Profile = {
    id: number;
    bio: string;
    followers: number;
    workout:number;
    following: number;
    settings: {
        profileVisibility: string;
        settings: {
            showWorkoutHistory: boolean;
            showAchievements: boolean;
            showStats: boolean;
            allowDataCollection: boolean;
            showRealName: boolean;
            allowTagging: boolean;
        };
    };
    achievements: any[]; // You can define a specific Achievement type if needed
    goals: any[];        // You can define a specific Goal type if needed
    user_id: number;
    created_at: string; // ISO date string
    updated_at: string;
    user: User;
};
