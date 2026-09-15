export class DataFactory {
  static getUser() {
    const seed = `${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    return {
      name: `Test User ${seed}`,
      email: `user_${seed}@example.com`,
      accountType: 'premium'
    };
  }

  static getInvalidUser() {
    return {
      name: 'Invalid User',
      email: 'invalid-email',
      accountType: 'basic'
    };
  }

  static getPayeeData() {
    const seed = Math.floor(Math.random() * 10000);
    return {
      name: `Payee_${seed}`,
      accountNumber: `ACC${Date.now().toString().slice(-8)}`,
      type: 'Checking' as const
    };
  }

  static getTransferData(recipient: string) {
    return {
      recipient,
      amount: '250.00',
      description: `Test Ref: ${Date.now()}`
    };
  }

  static getTransaction(userId: string) {
    return {
      userId,
      amount: 100.5,
      type: 'transfer',
      recipientId: 'recipient-002'
    };
  }

  static getApiUser() {
    return this.getUser();
  }

  static getApiTransaction(userId: string) {
    return this.getTransaction(userId);
  }
}