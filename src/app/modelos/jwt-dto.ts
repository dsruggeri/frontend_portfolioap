export class JwtDTO {
    token: string | undefined;
    type: string | undefined;
    email : string | undefined;
    authorities : string[] | undefined;
}
