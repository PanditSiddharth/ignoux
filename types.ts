export interface MyOptions {
    list?: {
        xs: 1 | 2;
        sm: 1 | 2 | 3;
        md: 1 | 2 | 3 | 4 | 5;
        lg: 1 | 2 | 3 | 4 | 5 | 6 | 7;
    },
    hz?: boolean;
}

export interface ProductOptions extends MyOptions {
    boughtProducts?: boolean;
    transactionId?: string;
}

export interface UserOptions extends MyOptions {
    admin?: boolean,
    showRupeeCard?: boolean
}