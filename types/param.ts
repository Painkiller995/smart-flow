export type EncryptedValueObject = {
    [key: string]: {
        value: string;
        selectedSecretId: string;
    };
}

export type ParameterObject = {
    [key: string]: {
        parameterKey: string;
        parameterValue: string;
    };
}
