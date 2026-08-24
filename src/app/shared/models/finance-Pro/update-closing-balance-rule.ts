export type EntryType = 'Dr' | 'Cr';

export interface ClosingBalanceRuleValue {
    resultType: EntryType;
    operation: '+' | '-';
    compute: (ledgerBalance: number, transactionAmount: number) => number;
}

export const LedgerClosingBalanceRule: Record<string, ClosingBalanceRuleValue> = {
    'Dr_Dr': { resultType: 'Dr', operation: '+', compute: (b, a) => b + a },
    'Dr_Cr': { resultType: 'Cr', operation: '-', compute: (b, a) => b - a },
    'Cr_Cr': { resultType: 'Cr', operation: '+', compute: (b, a) => b + a },
    'Cr_Dr': { resultType: 'Dr', operation: '-', compute: (b, a) => b - a },
};

export function applyClosingBalanceRule(
    transactionType: EntryType,
    ledgerType: EntryType,
    ledgerBalance: number,
    transactionAmount: number
): { newBalance: number; resultType: EntryType } {
    const rule = LedgerClosingBalanceRule[`${transactionType}_${ledgerType}`];
    return {
        newBalance: rule.compute(ledgerBalance, transactionAmount),
        resultType: rule.resultType
    };
}



//Basic Rules to maintain closing balance of ledger
// Transaction Type  |	 Ledger  |  Result
// Dr				 |	  Dr	 | 	Dr + Dr
// Dr                |	  Cr	 | 	Cr - Dr
// Cr                |    Cr	 | 	Cr + Cr
// Cr                |	  Dr	 | 	Dr - Cr