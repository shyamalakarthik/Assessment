export const testDataFactory = {
  validUser: {
    username: 'demo-user',
    password: 'demo-password',
  },
  invalidUser: {
    username: 'invalid-user',
    password: 'wrong-password',
  },
  transfer: {
    payeeName: 'Test Payee',
    amount: '250.00',
    description: 'Monthly rent',
  },
};

// export interface UserPayload {
//   name: string;
//   email: string;
//   accountType: 'standard' | 'premium';
// }

// export interface TransactionPayload {
//   userId: string;
//   amount: number;
//   type: 'transfer' | 'payment';
//   recipientId: string;
// }

// export class DataFactory {
//   static createUser(overrides?: Partial<UserPayload>): UserPayload {
//     const uniqueId = `${Date.now()}_${Math.floor(Math.random() * 1000)}`;
//     return {
//       name: `Automated User ${uniqueId}`,
//       email: `testuser_${uniqueId}@fintechtest.com`,
//       accountType: 'premium',
//       ...overrides
//     };
//   }

//   static createTransaction(userId: string, recipientId = 'rec_auto_001', overrides?: Partial<TransactionPayload>): TransactionPayload {
//     return {
//       userId,
//       amount: 100.50,
//       type: 'transfer',
//       recipientId,
//       ...overrides
//     };
//   }
// }