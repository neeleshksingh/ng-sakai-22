# Voucher Manage Screen Documentation

## 1. Purpose of This Screen

This screen is the **Voucher create/update screen** for Finance Pro.
It allows users to:

- create a voucher with multiple debit/credit entries,
- edit an existing voucher,
- validate account ledger balance rules in real time,
- submit balanced accounting transactions only.

This is the primary file for behavior:

- `src/app/finance-Pro/components/transactions/voucher/voucher-manage/voucher-manage.component.ts`

This is the primary file for UI:

- `src/app/finance-Pro/components/transactions/voucher/voucher-manage/voucher-manage.component.html`

---

## 2. High-Level Functional Summary

A voucher contains:

- header details (financial year, voucher type, date, number, narration), and
- a dynamic list of voucher entries (each row is Dr or Cr, ledger, and amount).

The screen enforces:

- mandatory fields,
- minimum 2 entry rows,
- debit total must equal credit total,
- amount must not exceed allowed ledger closing balance where rule applies,
- narration max word count (500).

It supports two modes:

- **Create mode**: route id = 0
- **Edit mode**: route id > 0

---

## 3. Tech Stack and Key Angular Concepts Used

- Angular standalone component (`standalone: true`)
- Reactive Forms (`FormGroup`, `FormArray`, `FormControl`, validators)
- RxJS (`Subject`, `debounceTime`, `switchMap`, `catchError`, `takeUntil`)
- PrimeNG controls (`p-table`, `p-dropdown`, `p-autoComplete`, `p-inputNumber`, `p-datepicker`, etc.)
- Dependency-injected services for APIs and utilities

---

## 4. Imported Models and Why They Are Required

### `Voucher`, `VoucherResponse`

Used for strongly-typed voucher payloads when reading/writing voucher data.

### `VoucherEntry`

Represents each line item row inside voucher entries.

### `AccountLedger`

Used for ledger dropdown/autocomplete selection and ledger metadata (name, closing balance, transaction type).

### `LedgerClosingBalanceRule`, `EntryType`

Core business-rule model for computing updated ledger balances and amount exceed checks.

### `SelectItem` (PrimeNG)

Used for dropdown options format (`label`, `value`).

---

## 5. Services and Why Each Is Needed

### `VoucherService`

- `getById(id)` for edit mode load
- `add(voucher)` for create
- `updateById(voucher)` for update

### `FinancialYearService`

Loads financial year dropdown options.

### `EnumsService`

Loads enum-based lists:

- voucher type list
- transaction type list (Dr/Cr)

### `AccountLedgerService`

Used for:

- loading full ledger list,
- search/autocomplete by voucher type + transaction type,
- fetching refreshed ledger details from “Recent Ledgers” click.

### `PartnerAppSettingService`

Reads `IsBackDateVoucherAllowed` setting, used to influence date behavior.

### `DateFormatterService`

Converts voucher date into backend-compatible IST start-of-day string.

### `UtilityService`

Removes duplicate dropdown items.

### `MessageService` and `ConfirmationService`

PrimeNG UI feedback:

- toasts for success/error/warn/info,
- submit confirmation dialog.

### `Router`, `ActivatedRoute`

Navigation and route param (`id`) to switch create vs edit mode.

---

## 6. Component State Variables Explained

## Core Form/Entity State

- `voucher: Voucher = {}`: request payload object to submit.
- `voucherFormGroup: FormGroup`: root reactive form.
- `id: number`: route voucher id (0 = create mode).
- `data: any`: response holder after save/update.

## Dropdown/Lookup Data

- `statusList`, `voucherTypeList`, `transactionTypeList`, `financialYearList`

## Ledger Related

- `filteredLedgers`: autocomplete results.
- `accountLedgerList`: complete list used for side “Recent Ledgers”.
- `ledgerSearchControl`: side panel search text form control.
- `ledgerSearch$`: RxJS subject for debounced server search.

## Totals and Validity

- `totalDebit`, `totalCredit`
- `isBalanced`
- `amountExceededRows: Set<number>`: prevents repeated popups for same row.

## Date/Config

- `isBackDateVoucherAllowed`
- `minVoucherDate`, `maxVoucherDate`

## Dialog/Row Interaction

- `displayLedgerDialog`: open “Create New Ledger” dialog.
- `newLedgerSearchText`: prefill text for creating ledger from typed autocomplete value.
- `activeRowIndexForNewLedger`: remembers row where user requested a new ledger.
- `activeEntryRowIndex`: remembers currently active row for “Recent Ledgers” interaction.

## Narration

- `maxNarrationWords = 500`
- `narrationEditor` (`ViewChild`) is contenteditable div reference.

## View Query References

- `ledgerAutocompletes` (`ViewChildren`): references every row’s autocomplete control.

## RxJS Cleanup

- `destroy$`: emits on destroy to unsubscribe active streams.

---

## 7. Form Structure and Field Definitions

`voucherFormGroup` fields:

- `id`
- `financialYearId` (required)
- `voucherTypeId` (required)
- `voucherDate` (required)
- `voucherNumber`
- `totalAmount` (required; auto computed from totals)
- `narration` (required)
- `status` (default `PUBLISHED`)
- `voucherEntryList` (`FormArray`)

System fields also kept in form for compatibility/audit:

- `createdBy`, `modifiedBy`, `createdDate`, `modifiedDate`

`voucherEntryList` row fields from `createVoucherEntry()`:

- business fields: `id`, `voucherId`, `accountLedgerId`, `amount`, `openingBalanceTransactionTypeId`, `status`
- UI helper fields: `debitAmount`, `creditAmount`, `ledger`
- rule helper fields: `closingBalance`, `originalAmount`, `originalEntryAmount`, `ledgerTransactionTypeId`, `isAmountExceeded`

Notes:

- `debitAmount` and `creditAmount` are UI-editable based on selected type.
- `amount` is canonical numeric value used in payload.

---

## 8. UI Composition (Template Walkthrough)

## Header Toolbar

- Screen title + icon
- Back behavior differs by mode (`goBack` or `goToList`)
- “New” button resets screen (`addNew`)

## Voucher Detail Card

Fields:

- Financial Year (dropdown)
- Voucher Type (dropdown)
- Voucher Number (text)
- Voucher Date (calendar with min/max constraints)

## Entry Table (`p-table` + `FormArray`)

Columns:

1. Sl. No
2. Transaction Type (Dr/Cr)
3. Particulars (ledger autocomplete + real-time balance badge)
4. Debit amount (`p-inputNumber`)
5. Credit amount (`p-inputNumber`)
6. Remove action

Balance badge under ledger input:

- appears if ledger selected
- amount shown as absolute
- suffix shown from transaction direction (`Dr` / `Cr`)
- green style for Dr, red style for Cr

## Footer in Table

- Narration editor (contenteditable)
- narration word count and limit warning
- Total Debit and Total Credit live display
- Add Row button

## Bottom Action Area

- Save Voucher (create mode)
- Update Voucher (edit mode)
- Disabled until all validations pass

## Right Side Card: Recent Ledgers

- Search box filters loaded ledger list
- click a ledger to load/select in active entry row

## New Ledger Dialog

- opens when autocomplete typed text has no match and user selects “+ Add New Ledger...”
- hosts `app-account-ledger-manage` in dialog mode
- on success, new ledger is assigned to originating row

---

## 9. Lifecycle and Initialization Flow

## `ngOnInit()` sequence

1. `initializeFormGroup()`
2. `getVoucherTypeList()`
3. `getTransactionTypeList()`
4. `setupLedgerSearch()`
5. `getAccountLedgerList()`
6. `setDefaultDates()`
7. `getPartnerAppSettings()`
8. `getFinancialYear()`
9. Read route `id`:

- if `id > 0`: `getById(id)`
- else: `setNewEntryDateLimits()`

## `ngOnDestroy()`

- emits and completes `destroy$` to clean RxJS subscriptions.

---

## 10. Data Flow: Create Mode

1. User opens route with id `0`.
2. Header fields selected.
3. User adds entry rows.
4. For each row:

- choose transaction type,
- search/select ledger,
- enter debit/credit amount.

5. Live row-level balance computation runs.
6. Totals recomputed and balance check enforced.
7. Submit confirmation appears.
8. Payload transformed and sent via `voucherService.add()`.
9. On success: success toast and `addNew()` resets form.

---

## 11. Data Flow: Edit Mode

1. User opens route with existing id.
2. `getById(id)` fetches voucher.
3. Header form patched.
4. Existing entry rows rebuilt into `FormArray`.
5. Original values stored (`originalAmount`, `originalEntryAmount`) for delta logic.
6. Row listeners attached.
7. Live validations and totals recomputed.
8. On submit: `voucherService.updateById()` called.
9. On success: navigate to same edit route and refresh data.

---

## 12. Ledger Search and Selection Logic

## Debounced Search

`setupLedgerSearch()` subscribes to `ledgerSearch$`:

- waits 300ms,
- only searches when query length >= 3,
- calls API with selected voucher type + transaction type,
- injects synthetic “Add New Ledger” option when no result.

## Selecting Ledger (`onLedgerSelect`)

- If special add-new option: open dialog and store row index.
- Else: patch row with ledger id and ledger balance metadata.
- trigger row balance validation.

## Creating Ledger From Dialog

`onLedgerCreatedInDialog(newLedger)`:

- assigns newly created ledger to the original row,
- applies balance metadata,
- revalidates row.

## Recent Ledgers Side Panel

`onRecentLedgerClick(ledger)`:

- requires active row focus,
- fetches latest ledger details,
- opens autocomplete dropdown on active row for quick selection.

---

## 13. Debit/Credit Behavior and Totals

## `onTransactionTypeChange(index)`

Resets row financial fields when Dr/Cr changes to prevent stale values.

## `enableDebitCreditFields(row)`

- Dr row => debit enabled, credit disabled
- Cr row => credit enabled, debit disabled

## `setAmount(index)` / `onAmountInput(index)`

- syncs selected amount input to canonical `amount`
- triggers row validation + totals recomputation

## `calculateTotals()`

- recomputes `totalDebit` and `totalCredit`
- sets `isBalanced`
- updates `totalAmount` in form with max of debit/credit
- revalidates all rows

---

## 14. Closing Balance Rule Engine (Critical Business Logic)

Method: `updateRowBalanceAndValidation(index, showPopup)`

Inputs per row:

- entry transaction type (Dr/Cr)
- selected ledger type (Dr/Cr)
- base/original ledger closing balance
- entered amount (or delta in edit mode)

Rule source:

- `LedgerClosingBalanceRule["<TransactionType>_<LedgerType>"]`

What it does:

1. Computes new closing balance from rule.
2. Guards negative result for subtraction-like rules by clamping at 0.
3. Determines available balance and whether amount exceeded.
4. Sets `isAmountExceeded` field.
5. Applies/removes custom validation error `amountExceeded` on active amount control.
6. Shows one-time popup per row when exceeded (controlled by `amountExceededRows` set).

Why this exists:

- prevents invalid financial postings against ledger balance constraints,
- ensures immediate user feedback,
- protects backend from avoidable invalid requests.

---

## 15. Form and Submit Validation Rules

Submit is disabled (`isSubmitDisabled`) when any is true:

- fewer than 2 entries,
- form invalid,
- narration > 500 words,
- any row has non-positive amount for selected side,
- any row has `isAmountExceeded = true`.

Extra submit-time guard in `onSubmit()`:

- validates all row balances again,
- validates debit == credit,
- asks confirmation before API call.

---

## 16. Narration Editor Logic

Narration uses `contenteditable` div instead of plain textarea.

`onNarrationInput()`:

- reads plain text and syncs to `narration` form control,
- counts words,
- wraps words above 500 in red-highlight span,
- restores cursor to end after re-render.

Utility:

- `escapeHtml()` avoids HTML injection while re-rendering highlighted content.

---

## 17. API Interactions Summary

## On init/load

- Voucher types: `enumService.getVoucherType()`
- Transaction types: `enumService.getTransactionType()`
- Ledgers: `accountLedgerService.getAll()`
- Financial years: `financialYearService.getAll()`
- Partner setting: `partnerAppSettingService.getByName("IsBackDateVoucherAllowed")`
- Existing voucher: `voucherService.getById(id)` (edit mode)

## During interactions

- Ledger autocomplete search by voucher+transaction type
- Ledger lookup for recent ledger click

## On submit

- Create: `voucherService.add(voucherPayload)`
- Update: `voucherService.updateById(voucherPayload)`

---

## 18. Payload Transformation Before Submit

Inside `onSubmit()`:

1. read form with `getRawValue()`
2. assign top-level `id`
3. remove UI-only row fields:

- `debitAmount`, `creditAmount`, `ledger`, `ledgerTransactionTypeId`, `isAmountExceeded`

4. convert `voucherDate` to IST start of day string
5. force `status = PUBLISHED`
6. for each row:

- set/normalize audit fields and status,
- set `closingBalance` from computed row value,
- in edit mode set `voucherId`,
- remove `originalAmount`, `originalEntryAmount`

This ensures backend receives clean, business-ready payload.

---

## 19. Important Methods Index (Quick Reference)

## Initialization

- `initializeFormGroup()`
- `createVoucherEntry()`
- `setDefaultDates()`
- `setNewEntryDateLimits()`

## Data loading

- `getVoucherTypeList()`
- `getTransactionTypeList()`
- `getAccountLedgerList()`
- `getFinancialYear()`
- `getPartnerAppSettings()`
- `getById(id)`

## Entries

- `addEntry()`
- `removeEntry(index)`
- `setupEntryListeners(index)`
- `setEntryAmountsAndEnable()`

## Ledger search/selection

- `setupLedgerSearch()`
- `filterLedger(event, index)`
- `onLedgerSelect(index, event)`
- `onRecentLedgerClick(ledger)`
- `onLedgerCreatedInDialog(newLedger)`

## Amount/Balances

- `onTransactionTypeChange(index)`
- `enableDebitCreditFields(row)`
- `setAmount(index)`
- `onAmountInput(index)`
- `calculateTotals()`
- `updateRowBalanceAndValidation(index, showPopup)`
- `validateAllRowBalances(showPopup)`

## Narration

- `onNarrationInput()`
- `setEndOfContenteditable(element)`
- `escapeHtml(text)`

## Submit/navigation

- `onSubmit()`
- `addNew()`
- `goBack()`
- `goToList()`

---

## 20. Computed Getters and Their Usage

- `voucherEntryList`: typed accessor for `FormArray`
- `narrationControl`: typed accessor for narration control
- `narrationWordCount`: dynamic narration word count
- `isAddRowDisabled`: disallows row add until voucher type and date selected
- `isSubmitDisabled`: global submit gating logic
- `filteredRecentLedgers`: side panel client-side search
- `getTotalOpeningBalance()`: helper utility (currently not displayed in template)
- `absBalance(index)`: absolute balance amount for badge
- `getLedgerBalanceSuffix(index)`: returns Dr/Cr suffix for balance badge

---

## 21. Why Helper Fields Exist in Entry Row

- `originalAmount`: baseline ledger balance for correct recalculation.
- `originalEntryAmount`: in edit mode, computes delta instead of reapplying full amount.
- `ledgerTransactionTypeId`: needed to apply correct Dr/Cr closing balance rule.
- `isAmountExceeded`: explicit state for both UI disable logic and validation.

Without these, edit-mode calculations can double-count and permit incorrect balances.

---

## 22. Navigation Behavior

- In create mode:
- Back button goes to list.
- Save success resets form via `addNew()`.

- In edit mode:
- Back button goes to voucher view of current id.
- Update success returns to same edit route and refreshes details.

Routes used:

- `/home/finpro/transactions/voucher/voucher-entry-manage/:id`
- `/home/finpro/transactions/voucher/voucher-entry-view/:id`
- `/home/finpro/transactions/voucher/voucher-entry-list`

---

## 23. Error Handling Pattern

Each API call uses toast-based feedback:

- success -> user confirmation,
- error -> `error.error.message` if available.

Ledger search stream also has layered `catchError` to avoid stream break and keep UI usable.

---

## 24. Handover Notes for New Team Member

## Typical enhancement points

- date restriction behavior from `IsBackDateVoucherAllowed`
- better focus management for row selection
- custom validation messages per rule type
- reusable directive/service for narration word highlighting

## Safe refactor boundaries

- Keep row helper fields unless rule engine redesigned.
- Keep payload cleanup before API submit.
- Keep `takeUntil(this.destroy$)` pattern for every subscription.

## Regression checks after change

1. Create voucher with 2+ rows and balanced totals.
2. Edit existing voucher and change amounts; verify no double-count in balance.
3. Trigger amount exceeded case and verify submit disabled.
4. Verify ledger add-from-dialog flow updates row correctly.
5. Verify narration >500 words blocks submit.

---

## 25. Known Design Decisions

- Contenteditable narration is chosen for inline highlighting of extra words.
- Totals are calculated from row controls, not backend response.
- Balance badge shows absolute amount + Dr/Cr suffix to improve readability.
- `PUBLISHED` is applied at voucher and entry level during submit.

---

## 26. Quick Start for a Developer Working on This Screen

1. Open component TS and template.
2. Understand form schema in `initializeFormGroup()` and `createVoucherEntry()`.
3. Trace row flow in this order:

- type change -> ledger select -> amount input -> totals -> submit.

4. Read `updateRowBalanceAndValidation()` thoroughly before touching amount logic.
5. Test both create and edit modes.

---

## 27. Ownership Checklist Before Merging Any Change

- `isSubmitDisabled` still protects all business constraints.
- Payload still strips UI-only fields.
- Edit mode still uses `originalEntryAmount` delta.
- Debit/Credit totals and balance rule outputs are consistent.
- No subscription memory leaks introduced.

---

## 28. File Map for This Feature

- `src/app/finance-Pro/components/transactions/voucher/voucher-manage/voucher-manage.component.ts`
- `src/app/finance-Pro/components/transactions/voucher/voucher-manage/voucher-manage.component.html`
- `src/app/finance-Pro/components/transactions/voucher/voucher-manage/voucher-manage.component.scss`
- `src/app/finance-Pro/services/voucher.service.ts`
- `src/app/finance-Pro/services/account-ledger.service.ts`
- `src/app/finance-Pro/services/enums.service.ts`
- `src/app/finance-Pro/services/financial-year.service.ts`
- `src/app/shared/models/finance-Pro/voucher.ts`
- `src/app/shared/models/finance-Pro/voucher-entry.ts`
- `src/app/shared/models/finance-Pro/account-ledger.ts`
- `src/app/shared/models/finance-Pro/update-closing-balance-rule.ts`

---

## 29. Final Summary

This screen is a reactive, rule-driven voucher entry system where ledger and amount logic is validated in real time. The central complexity is in **entry balance computation and edit-mode delta handling**. If a new team member understands:

- form structure,
- ledger selection/search flow,
- rule engine (`updateRowBalanceAndValidation`),
- payload transformation in `onSubmit`,

they can confidently maintain and extend this module.
