export interface UserDetailsResponseType {
    id: string;
    profileSetupStep: number;
    profilePicture: string | null;
    dob: Date | null;
}

export interface UserResponseType {
    id: string;
    username: string;
    name: string;
    email: string;
    contactNumber: string;
    countryPrefix: string;
    gender: 'male' | 'female';
    details: UserDetailsResponseType | null;
}
