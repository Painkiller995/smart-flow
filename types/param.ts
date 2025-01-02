export type EncryptedValueObject = {
    [key: string]: {
        value: string;
        selectedSecretId: string;
    };
}
