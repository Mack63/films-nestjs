export class UserProfileDto {
    readonly firstName: string;
    readonly email: string;
    readonly password: string;

    readonly location: string;
    readonly phoneNumber: string;
    readonly occupation: string ;
    readonly birthDate: Date;
}