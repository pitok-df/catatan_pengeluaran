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

export interface Transaction {
    type: "expense" | "income";
    created_at: Date;
    transactionID: number;
    description: string | null;
    categoryID: number;
    accountID: string;
    amount: number;
    account: Accounts
}

export interface Accounts {
    name: string;
    userID: string;
    created_at: Date;
    updated_at: Date;
    accountID: string;
    balance: number;
}

export interface TransferDana {
    trFroms: { name: string }
    trTos: { name: string }
    amount: number
    adminFee: number,
    created_at: string,
    desc: string,
}

export interface Categories {
    name: string;
    categoryID: number;
    userID: string;
    type: "expense" | "income";
    created_at: Date;
    transaction: Transaction[];
}