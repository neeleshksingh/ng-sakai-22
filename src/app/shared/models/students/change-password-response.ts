export class ChangePasswordResponse {
    succeeded?: boolean;
    errors?: errors;
}
export class errors {
    code?: string;
    description?: string;
}