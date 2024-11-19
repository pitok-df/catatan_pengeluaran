export type AccountType = {
    accountID: string,
    name: string,
    balance: number
}

export interface Transactions {
    transactionID: number,
    amount: number,
    created_at: string,
    description: string,
    type: string,
    paymentMethod: string
}

export interface Accounts {
    name: string;
    userID: string;
    created_at: Date;
    updated_at: Date;
    accountID: string;
    balance: number
}