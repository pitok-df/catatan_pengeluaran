export type AccountType = {
    accountID: string,
    name: string,
    balance: number
}

export interface Transactions {
    transactionID: number,
    amount: number,
    created_at: Date,
    description: string,
    type: string,
    paymentMethod: string
}