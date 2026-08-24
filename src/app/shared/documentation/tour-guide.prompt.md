You are working as a **Senior Frontend Architect / Principal Angular Engineer with 10+ years of production experience** and an expert-level product UX mindset.

Treat this as a **production implementation**, not a demo, proof of concept, or simple library integration.

I have an existing Angular student onboarding/dashboard application. The relevant TypeScript, HTML, payment flow, routing, and payment-success components already exist in the repository/current workspace.

Study the existing implementation carefully before making any changes.

The goal is to implement a **beautiful, reliable, interactive, mobile-first onboarding experience** that teaches a student how to use the dashboard and complete the payment workflow.

---

# 1. PRIMARY OBJECTIVE

Implement a production-ready guided onboarding/product tour using **Driver.js**.

The complete journey should be:

```text
Welcome
   ↓
Student Dashboard
   ↓
Fees
   ↓
Verify Fee Amount
   ↓
Fee Breakdown
   ↓
Make Payment
   ↓
Wait for Payment Order Creation
   ↓
Continue
   ↓
Razorpay
   ↓
Razorpay Callback / Fallback URL
   ↓
Payment Status
   ↓
Payment Details
   ↓
Receipt
   ↓
Student Portal Credentials
   ↓
Finish
```

This must be a **real interactive tour**.

Do NOT implement a slideshow that merely highlights elements.

The student should perform important actions themselves.

For example:

```text
Highlight Fees
    ↓
Student clicks Fees
    ↓
Existing Angular navigation runs

Highlight Make Payment
    ↓
Student clicks Make Payment
    ↓
Existing createOrder() runs

Wait for actual API success
    ↓
Continue appears

Highlight Continue
    ↓
Student clicks Continue
    ↓
Existing Razorpay flow runs
```

The tour must work around the application's existing business logic rather than replacing it.

---

# 2. IMPORTANT: STUDY THE EXISTING CODE FIRST

Before modifying anything, inspect and understand:

### Angular/application structure

1. Angular version.
2. `package.json`.
3. Existing dependencies.
4. Existing global/shared services.
5. Existing routing configuration.
6. Existing storage utilities.
7. Existing responsive layout structure.
8. Existing PrimeNG usage.

### Student dashboard

Inspect:

```text
StudentProgramProvisionalLandingComponent
```

and its HTML/template.

Understand:

```text
activeTabIndex
setActiveTab()
createOrder()
isMakePaymentBtnVisible
isContinuePaymentBtnVisible
studentProvisionalFee
getTotalDueAmount()
```

and the existing route structure.

### Payment

Trace:

```text
createOrder()
→ saveOnlinePaymentRequest()
→ paymentOrderResponse
→ razorPayCheckOutRequest
→ Continue
→ Razorpay
```

### Razorpay callback/fallback

Inspect:

```text
environment.partner.razorPay.onBoardingPaymentCallbackUrl
```

and determine exactly:

* which route Razorpay redirects to
* which component receives that route
* how route parameters are provided
* whether there is a full browser navigation
* how `paymentResponseId` is received
* how provisional number/phone/email/reference number are received

Do not assume the route. Read the actual routing configuration.

### Payment-success component

Inspect:

```text
PaymentSuccessComponent
```

and understand:

```text
getOnlinePaymentReferenceByPaymentResponseId()
getFeeReceiptByProvisionalStudentIdAndReferenceNumber()
printReceipt()
retryPayment()
paymentStatusPrint
registrationNumber
studentId
referenceNumber
receiptNumber
paidAmount
transactionDate
password
isHiddenReceipt
isHiddenRetryPayment
feeReceiptDialog
```

### Receipt

Inspect:

```text
FeeReceiptComponent
```

to determine whether it contains:

* print
* download
* export
* other useful actions

Do not assume that a download action exists.

---

# 3. LIBRARY DECISION

Use **Driver.js**.

Install it if it does not already exist:

```bash
npm install driver.js
```

Use the version compatible with the existing Angular project.

Do not blindly use an API from memory.

Inspect the installed Driver.js API and use the actual supported API.

Do not introduce another onboarding library.

Do not create your own spotlight engine.

---

# 4. ARCHITECTURE

Do NOT dump the implementation into the existing large component.

The student dashboard component already contains significant application logic.

Create a reusable service following the project's existing architecture, preferably something like:

```text
shared/
  services/
    onboarding-tour.service.ts
```

Use the actual shared/global service structure found in the repository.

Recommended architecture:

```text
              OnboardingTourService
                       │
                       ▼
                    Driver.js
                  /           \
                 /             \
                ▼               ▼
StudentProgramProvisional   PaymentSuccessComponent
      LandingComponent
```

The service owns:

```text
Driver.js instance
Tour state
Tour persistence
Route-aware resuming
Cross-page state
Start/stop
Completion
Dismissal
Cleanup
```

Expose methods conceptually like:

```ts
startStudentPaymentTour()
resumeStudentPaymentTour()
stopTour()
completeTour()
dismissTour()
resetTour()
restartPaymentTour()
isTourCompleted()
getTourState()
setTourState()
```

Do not expose sensitive payment/credential data to the tour service.

---

# 5. TOUR STATE

Use an explicit state machine.

Suggested state:

```ts
type PaymentTourState =
  | 'idle'
  | 'welcome'
  | 'fees-menu'
  | 'fee-summary'
  | 'fee-breakdown'
  | 'make-payment'
  | 'waiting-for-order'
  | 'continue-payment'
  | 'awaiting-payment-result'
  | 'payment-status'
  | 'payment-details'
  | 'print-receipt'
  | 'receipt-actions'
  | 'student-credentials'
  | 'completed'
  | 'dismissed';
```

Do not create excessive complexity if a simpler state model is enough.

The key requirement is that the tour knows where the user is in the actual workflow.

---

# 6. STABLE TOUR TARGETS

Do NOT target elements using styling classes such as:

```text
.p-button-raised
.col-12
.info-card
.grid
.active-tab
.glass-card
.primary-button
```

These are presentation classes and may change.

Add stable semantic attributes:

```html
data-tour="fees-menu"
data-tour="fee-summary"
data-tour="fee-breakdown"
data-tour="make-payment"
data-tour="continue-payment"
data-tour="payment-status"
data-tour="payment-details"
data-tour="print-receipt"
data-tour="receipt-download"
data-tour="receipt-print"
data-tour="student-credentials"
data-tour="student-portal-url"
data-tour="student-username"
data-tour="student-password"
data-tour="retry-payment"
```

Only add selectors that correspond to real UI.

If some optional receipt action does not exist, do not invent one.

---

# 7. STEP 0 — WELCOME

Before highlighting anything, show a polished welcome state.

Title:

```text
Welcome to Your Student Dashboard
```

Description:

```text
Let us quickly show you how to check your fees, make a payment, access your receipt, and find your student portal credentials.
```

Actions:

```text
Start Tour
Skip
```

Keep this concise and professional.

It should feel like a product onboarding experience.

Do not use excessive text.

---

# 8. STEP 1 — FEES MENU

Highlight:

```text
[data-tour="fees-menu"]
```

Message:

```text
Open Fees

Click here to view your fee structure and outstanding amount.
```

The student must actually click the Fees menu.

Do NOT programmatically invoke:

```ts
element.click()
```

The tour is teaching the student where to click.

---

# 9. ROUTE-AWARE FEES NAVIGATION

The current application uses the existing `setActiveTab()` and Angular Router.

Do not replace this navigation system.

Expected:

```text
Student clicks Fees
       ↓
Existing setActiveTab(1)
       ↓
Angular Router navigation
       ↓
Fees route
       ↓
Fees DOM rendered
       ↓
Tour resumes
```

Use Router navigation events such as `NavigationEnd` and proper rendering/lifecycle checks.

Do NOT use arbitrary fixed delays such as:

```ts
setTimeout(() => ..., 3000)
```

The tour must wait for the actual target element.

---

# 10. STEP 2 — FEE SUMMARY

Highlight:

```text
[data-tour="fee-summary"]
```

Message:

```text
Verify Your Fees

Review your fee summary and make sure the amount looks correct before starting your payment.
```

This is informational.

The student does not need to click anything.

---

# 11. STEP 3 — FEE BREAKDOWN

Highlight:

```text
[data-tour="fee-breakdown"]
```

Message:

```text
Review Your Outstanding Amount

This section shows your fee breakdown, paid amount, and outstanding amount.
```

The important information is:

```text
Fee Amount
Paid Amount
Due Amount
Total Due
```

Do not make the student navigate manually to find the relevant amount.

---

# 12. STEP 4 — MAKE PAYMENT

Highlight:

```text
[data-tour="make-payment"]
```

Message:

```text
Ready to Pay?

Click Make Payment to create your payment order.
```

The user must click the real button.

Do NOT:

```ts
createOrder()
```

from the tour.

The existing application remains responsible for creating the payment order.

---

# 13. STEP 5 — WAIT FOR REAL PAYMENT ORDER CREATION

This is critical.

The existing application has state similar to:

```text
isMakePaymentBtnVisible
isContinuePaymentBtnVisible
```

The tour must wait for the actual payment API response.

Expected:

```text
Student clicks Make Payment
        ↓
Existing createOrder()
        ↓
Backend payment order API
        ↓
Successful response
        ↓
Make Payment disappears
        ↓
Continue becomes visible
        ↓
Tour detects Continue
        ↓
Tour highlights Continue
```

Do NOT advance immediately after click.

Do NOT use a fixed timeout.

Do NOT fake the Continue step.

If payment-order creation fails:

```text
Keep tour at Make Payment.
```

Existing error/toast behavior must remain untouched.

---

# 14. STEP 6 — CONTINUE

Highlight:

```text
[data-tour="continue-payment"]
```

Message:

```text
Continue to Payment

Your payment order is ready. Click Continue to proceed to the secure payment gateway.
```

The user must click the actual Continue button.

Do NOT call:

```ts
form.submit()
```

from the tour.

The existing Continue button must remain responsible for triggering Razorpay.

---

# 15. CRITICAL — RAZORPAY REDIRECT / FALLBACK URL

The tour does NOT end at Continue.

After Continue:

```text
Continue
   ↓
Razorpay
   ↓
Student completes payment
   ↓
Razorpay callback/fallback URL
   ↓
Angular route
   ↓
PaymentSuccessComponent
```

This may involve a full browser navigation.

Therefore:

**Before Continue leaves the application, persist the tour state.**

Set:

```text
awaiting-payment-result
```

before the Razorpay form submission occurs.

Do not rely on an in-memory Driver.js instance surviving a browser redirect.

---

# 16. PERSIST TOUR STATE BEFORE RAZORPAY

Use a student-specific storage key.

For example:

```text
student-payment-tour:<student-unique-key>
```

Use the strongest safe student/provisional identifier already available.

Do NOT use a global key such as:

```text
payment-tour-completed
```

because multiple students could use the same browser.

Persist only metadata such as:

```ts
{
  version: 1,
  tourId: 'student-payment-tour',
  state: 'awaiting-payment-result',
  provisionalNumber: '...',
  startedAt: '...',
  updatedAt: '...'
}
```

Do NOT persist:

```text
password
payment signature
Razorpay secret
payment credential
API key
sensitive payment payload
```

Do not log them either.

---

# 17. DO NOT ASSUME PAYMENT SUCCESS

This is a hard requirement.

The following is NOT valid:

```text
Continue clicked = payment successful
```

Correct:

```text
Continue clicked
      ↓
awaiting-payment-result
      ↓
Razorpay
      ↓
callback/fallback
      ↓
PaymentSuccessComponent
      ↓
backend payment status
      ↓
SUCCESS / FAILED / PENDING
```

Only the real backend/payment-status response determines the next tour state.

---

# 18. PAYMENT SUCCESS COMPONENT

The existing `PaymentSuccessComponent` must participate in the same tour.

Do NOT create another independent Driver.js instance inside that component.

Instead:

```text
OnboardingTourService
        │
        ├── StudentProgramProvisionalLandingComponent
        │
        └── PaymentSuccessComponent
```

The PaymentSuccessComponent should notify/use the service when:

* payment status data has finished loading
* success is confirmed
* receipt is available
* credentials are available

The tour service decides which onboarding step to show.

---

# 19. PAYMENT STATUS STEP

After `PaymentSuccessComponent` has loaded the actual backend result and:

```text
paymentStatusPrint === 'SUCCESS'
```

highlight:

```text
[data-tour="payment-status"]
```

Message:

```text
Payment Successful 🎉

Your payment has been completed successfully. You can review your payment details and receipt below.
```

Do not start this step before the real payment data is available.

Do not use arbitrary delays.

---

# 20. PAYMENT DETAILS STEP

Highlight the existing details area containing:

```text
Provisional Admission Number
Student Id
Reference Number
Receipt Number
Paid Amount
Transaction Date
```

Target:

```text
[data-tour="payment-details"]
```

Message:

```text
Payment Details

You can review your transaction reference, receipt number, paid amount, and transaction date here for your records.
```

This is informational.

---

# 21. PRINT RECEIPT STEP

The PaymentSuccessComponent already provides:

```text
Print Receipt
```

through:

```ts
printReceipt()
```

Highlight:

```text
[data-tour="print-receipt"]
```

Message:

```text
Your Receipt

Open your official fee receipt from here and print or save it for your records.
```

Do not automatically click the button.

The user should perform the action.

Only show this step when the button actually exists and is visible.

---

# 22. INSPECT FeeReceiptComponent

Before writing receipt-related tour logic, inspect:

```text
FeeReceiptComponent
```

Determine whether it actually contains:

* print
* download
* save
* export
* other receipt controls

If download exists, add a guided step for it.

For example:

```text
[data-tour="receipt-download"]
```

Message:

```text
Download Your Receipt

Use this option to save a copy of your official fee receipt.
```

If print exists:

```text
[data-tour="receipt-print"]
```

Message:

```text
Print Your Receipt

Use this option whenever you need a physical copy.
```

If those actions do not exist, do NOT claim that they exist.

Never invent functionality.

---

# 23. RECEIPT DIALOG BEHAVIOR

The existing Print Receipt action opens a PrimeNG dialog containing:

```text
<app-fee-receipt>
```

Do not replace this behavior.

Do not alter receipt business logic.

If the receipt dialog is too complex for an additional spotlight step, it is acceptable to:

```text
Highlight Print Receipt
   ↓
Explain that it opens the receipt
   ↓
Let the student inspect it normally
```

The tour should never make the receipt dialog unusable.

---

# 24. STUDENT CREDENTIALS — MAJOR ONBOARDING STEP

The PaymentSuccessComponent displays:

```text
Your credentials have been successfully generated.
```

and:

```text
URL
Username
Password
```

This is a very important onboarding step.

Highlight:

```text
[data-tour="student-credentials"]
```

Message:

```text
Your Student Login

Your student portal credentials have been generated successfully. Keep these details safe because you will use them to access your student portal.
```

This must be part of the tour.

---

# 25. STUDENT PORTAL URL

Highlight:

```text
[data-tour="student-portal-url"]
```

if doing so improves UX.

Message:

```text
Student Portal

This is the portal you will use to log in to your student account.
```

Do not navigate away from the current payment-success page.

---

# 26. STUDENT USERNAME

Highlight:

```text
[data-tour="student-username"]
```

Message:

```text
Your Username

Your Student ID is used as your username when signing in to the student portal.
```

---

# 27. STUDENT PASSWORD

Highlight:

```text
[data-tour="student-password"]
```

Message:

```text
Your Password

Use the generated password shown here when signing in.
Keep it safe and do not share it with anyone.
```

IMPORTANT:

Never copy the actual password into:

* tour state
* Driver.js configuration
* localStorage
* sessionStorage
* console logs
* analytics
* service state

The tour may highlight the existing DOM element, but it must never receive or store the password value.

---

# 28. CREDENTIALS UX

Prefer one credentials step if three individual steps create unnecessary friction.

For example:

```text
Your Student Login

Your portal URL, username, and password are available here.
Keep these credentials safe because you will use them for future logins.
```

Use individual highlights only if they genuinely improve understanding.

Do not make the tour excessively long.

---

# 29. DO NOT AUTOMATICALLY NAVIGATE TO THE PORTAL

Even though:

```text
https://sbu.ncorepro.com
```

is displayed, do not automatically navigate there.

The tour should explain where the portal is and where the credentials are.

Leave existing link behavior unchanged.

---

# 30. PAYMENT FAILURE FLOW

If:

```text
paymentStatusPrint === 'FAILED'
```

do NOT complete the tour.

Highlight:

```text
[data-tour="payment-status"]
```

Message:

```text
Payment Failed

Your payment was not completed. You can retry the payment using the option below.
```

If Retry Payment exists, highlight:

```text
[data-tour="retry-payment"]
```

Message:

```text
Retry Payment

You can return to the payment screen from here and try again.
```

Use the existing:

```ts
retryPayment()
```

behavior.

Do not duplicate it.

---

# 31. PAYMENT PENDING FLOW

If:

```text
paymentStatusPrint === 'PENDING'
```

do not complete the tour.

Message:

```text
Payment Pending

Your payment is still being processed. Please wait for the final payment status before continuing.
```

Do not show receipt/credentials as successful unless the real application state confirms success.

---

# 32. ZERO OUTSTANDING BALANCE

If:

```ts
getTotalDueAmount() === 0
```

do not start the payment-making portion of the tour.

The current UI already behaves differently when no amount is due.

Respect that existing behavior.

If the user already paid and visits the success page without a valid active tour state, do not unnecessarily start the full payment tour.

---

# 33. ALREADY-PAID USERS

Do not show:

```text
Fees → Make Payment → Continue
```

to a student who already has no outstanding payment and is simply revisiting the application.

Only resume the payment-success tour if there is valid persisted tour state indicating that the user came through the onboarding payment flow.

---

# 34. ERROR / INVALID RESPONSE HANDLING

If payment-status data is invalid/missing:

```text
Do not crash.
Do not mark the tour completed.
Do not show false success messaging.
```

Allow the existing component error/toast behavior to continue normally.

The tour can gracefully stop/resume later.

---

# 35. CROSS-PAGE STATE MACHINE

The expected flow:

```text
idle
  ↓
welcome
  ↓
fees-menu
  ↓
fee-summary
  ↓
fee-breakdown
  ↓
make-payment
  ↓
waiting-for-order
  ↓
continue-payment
  ↓
awaiting-payment-result
  ↓
payment-status
  ↓
payment-details
  ↓
print-receipt
  ↓
receipt-actions
  ↓
student-credentials
  ↓
completed
```

The state must survive:

```text
Angular route changes
full browser navigation
Razorpay navigation
PaymentSuccessComponent initialization
```

Do not restart from Step 1 after Razorpay.

---

# 36. ROUTE DETECTION

Do not hardcode route assumptions.

Inspect the actual application's routes.

Use actual:

```text
Router
ActivatedRoute
NavigationEnd
```

information where necessary.

Do not invent route names.

---

# 37. WAIT FOR TARGET ELEMENTS

Angular uses conditional rendering such as:

```text
*ngIf="activeTabIndex === 1"
*ngIf="getTotalDueAmount() > 0"
*ngIf="isMakePaymentBtnVisible"
*ngIf="isContinuePaymentBtnVisible"
[hidden]="isPaymentGet"
@if (!isHiddenReceipt)
@if (!isHiddenRetryPayment)
```

Therefore target elements may not exist immediately.

Create a robust helper conceptually:

```ts
waitForElement(selector)
```

Requirements:

* finite timeout
* cancellation
* no infinite polling
* no arbitrary multi-second sleep
* handles component destruction
* gracefully resolves when target becomes unavailable

Use MutationObserver only if it is actually useful.

Keep the implementation simple and deterministic.

---

# 38. CLEANUP

Clean up:

* Router subscriptions
* Driver.js instance
* observers
* timers
* resize listeners
* orientation listeners
* pending wait operations

when:

* tour stops
* tour completes
* component is destroyed
* user logs out

Do not introduce memory leaks.

Only one Driver.js instance should ever be active.

---

# 39. PERSISTENCE

Use a student-specific key.

Recommended lifecycle:

```text
Start Tour
   → active

Skip
   → dismissed

Complete
   → completed

Restart
   → clear/reset and start again
```

Do not mark completed when the user simply skips.

Different students using the same browser must not inherit each other's tour state.

Use existing application storage utilities where appropriate.

---

# 40. REPLAY / RESTART

Create:

```ts
restartPaymentTour()
```

in the service.

If the application already has a Help/User Assistance area, integrate the replay action there.

Do not create an unrelated large UI just for this feature.

The capability should be available for future integration.

---

# 41. MOBILE-FIRST REQUIREMENT — HARD REQUIREMENT

This application is likely to be used heavily from mobile devices.

Therefore:

**Mobile is the primary design target, not an afterthought.**

The tour must be designed and tested mobile-first.

It must provide an excellent experience on:

```text
Mobile portrait
Mobile landscape
Tablet portrait
Tablet landscape
Desktop
```

Minimum test widths:

```text
320px
360px
375px
390px
414px
480px
768px
1024px+
```

---

# 42. MOBILE NAVIGATION

Inspect how the dashboard sidebar behaves on mobile.

It may:

* collapse
* become a drawer
* become a hamburger menu
* move above the content
* change layout

The tour must target the actual visible Fees control.

If mobile navigation requires opening a drawer:

```text
Highlight navigation trigger
      ↓
Student taps navigation
      ↓
Navigation opens
      ↓
Highlight Fees
      ↓
Student taps Fees
```

Do not assume the desktop sidebar remains visible.

---

# 43. MOBILE SPOTLIGHT

The spotlight must never point to a target that is hidden behind:

* the browser chrome
* sticky headers
* navigation
* the Driver.js popover
* bottom buttons
* other fixed elements

Before each step:

1. Find target.
2. Confirm it exists.
3. Confirm it is visible.
4. Scroll it into a safe viewport position.
5. Wait for layout stabilization.
6. Recalculate the target position.
7. Render the spotlight.

---

# 44. MOBILE POPOVER

Driver.js popovers must stay fully inside the viewport.

Never allow:

```text
horizontal overflow
vertical clipping
popover outside viewport
popover covering the target
popover covering the user's required action
```

The popover should adapt intelligently based on:

```text
target position
viewport width
viewport height
current scroll position
```

Do not blindly force one placement such as:

```text
position: right
```

for every mobile step.

---

# 45. TOUCH-FIRST CONTROLS

The tour must be comfortable for touch.

Ensure:

* large tap targets
* sufficient spacing
* readable text
* no hover dependency
* clear Next/Back/Skip controls
* no tiny clickable controls
* no accidental skip when tapping outside
* no dependence on precise mouse movement

The student should be able to complete the whole tour using only touch.

---

# 46. MOBILE FEE BREAKDOWN

Inspect the actual responsive behavior of the PrimeNG Fee Breakdown table.

Do not assume the desktop table is readable on mobile.

The most important information is:

```text
Fee Amount
Paid Amount
Due Amount
Total Due
```

If the mobile UI transforms the table into a different layout, target the actual mobile representation.

If the most useful target is the mobile total-due element rather than the whole table, highlight the total-due element.

Do not spotlight a technically valid but practically unreadable table area.

---

# 47. MOBILE PAYMENT BUTTONS

Before highlighting:

```text
[data-tour="make-payment"]
[data-tour="continue-payment"]
```

ensure the buttons are:

* visible
* fully inside viewport
* tappable
* not obscured by the tour popover

When `createOrder()` replaces Make Payment with Continue, recalculate the layout.

Do not assume Continue is located at the exact same coordinates as Make Payment.

---

# 48. MOBILE RAZORPAY

Do not interfere with Razorpay.

The expected behavior:

```text
Continue
   ↓
Persist tour state
   ↓
Razorpay
```

The tour is paused while the external payment flow is active.

After Razorpay returns:

```text
Callback / fallback route
   ↓
PaymentSuccessComponent
   ↓
Resume tour
```

---

# 49. MOBILE PAYMENT SUCCESS SCREEN

The payment-success tour must work naturally while the user scrolls through:

```text
Payment Status
Payment Details
Print Receipt
Retry Payment
Student Credentials
Portal URL
Username
Password
```

Do not assume all these elements are visible simultaneously.

The tour should progressively move through the page.

Each step may require scrolling.

The user should never have to guess where the next highlighted item is.

---

# 50. MOBILE CREDENTIALS

Make sure:

```text
[data-tour="student-credentials"]
```

can be highlighted without covering:

```text
Username
Password
```

The following must remain readable:

```text
URL
Username
Password
```

Do not create horizontal scrolling.

Do not copy credential values into tour state.

Do not log them.

---

# 51. MOBILE RECEIPT

Inspect the existing PrimeNG receipt dialog on mobile.

Ensure:

* dialog fits viewport
* content can scroll
* tour does not block receipt controls
* no horizontal overflow
* touch controls are usable

If the receipt dialog is too complex for a clean spotlight, explain the Print Receipt action and let the user explore the receipt component normally.

Do not damage the existing receipt UX for the sake of the tour.

---

# 52. ORIENTATION / VIEWPORT CHANGES

The tour must tolerate:

```text
portrait → landscape
landscape → portrait
```

and mobile browser viewport changes.

Handle meaningful:

```text
resize
orientationchange
```

events.

Refresh Driver.js positioning when required.

Do not run expensive continuous handlers.

Use debouncing/throttling where appropriate.

---

# 53. MOBILE PERFORMANCE

Keep the tour lightweight.

Do not introduce:

* large animation frameworks
* unnecessary images
* large Lottie files
* continuous polling
* expensive DOM observers
* heavy scroll listeners

Driver.js should remain the primary dependency.

The tour must not noticeably degrade performance on lower-end mobile devices.

---

# 54. ACCESSIBILITY

Implement reasonable accessibility.

Ensure:

* popovers are readable
* keyboard navigation works where supported
* buttons have meaningful labels
* Skip is accessible
* focus is handled sensibly
* tour is not dependent on color
* reduced-motion considerations are respected where practical

---

# 55. DRIVER.JS VISUAL EXPERIENCE

The final tour should feel like a modern SaaS product walkthrough:

* smooth spotlight
* darkened overlay
* subtle animation
* clean rounded popovers
* good spacing
* readable typography
* progress indication
* clear actions
* responsive positioning

Do not make it flashy.

Do not make it feel like a developer tool.

The UX should communicate:

```text
"Let me show you how this works."
```

not:

```text
"Here are some rectangles over the UI."
```

---

# 56. KEEP TOUR COPY SHORT

Especially on mobile.

Prefer:

```text
Verify Your Fees

Review your outstanding amount before making a payment.
```

Instead of long paragraphs.

Prefer:

```text
Your Receipt

Open your official receipt here.
```

Instead of excessive explanation.

The user should understand each step within a few seconds.

---

# 57. DO NOT BREAK EXISTING BUSINESS LOGIC

This is a hard requirement.

Do NOT modify payment business logic unless absolutely necessary for tour integration.

Preserve:

```text
createOrder()
saveOnlinePaymentRequest()
razorPayCheckOutRequest
form.submit()
isMakePaymentBtnVisible
isContinuePaymentBtnVisible
getOnlinePaymentReferenceByPaymentResponseId()
getFeeReceiptByProvisionalStudentIdAndReferenceNumber()
printReceipt()
retryPayment()
```

The existing application remains the source of truth.

The tour should observe and orchestrate around it.

---

# 58. DO NOT DUPLICATE PAYMENT API CALLS

The tour must NEVER independently call payment APIs just to determine state.

Do not create another payment order.

Do not create a second payment request.

Do not create another payment-status API flow unless absolutely unavoidable.

Prefer observing the state already loaded by the components/services.

---

# 59. SECURITY — PAYMENT + CREDENTIALS

The student password and payment data are sensitive.

Never:

* log password
* store password in tour state
* store password in Driver.js config
* send password to analytics
* place password in localStorage/sessionStorage
* copy password into service state

The tour should only point to the existing DOM element.

Persist tour metadata only.

---

# 60. STRONG TYPES

Avoid unnecessary `any`.

Use proper types for:

```text
TourStep
PaymentTourState
PaymentTourStorageState
```

where useful.

Follow the project's existing TypeScript conventions.

Do not over-engineer.

---

# 61. DO NOT REFACTOR UNRELATED CODE

Do not change:

* withdrawal workflow
* challan generation
* refund policy
* authentication/session behavior
* unrelated UI
* unrelated APIs
* unrelated styles

unless required by the tour.

Keep the diff focused and reviewable.

---

# 62. TESTING

After implementation:

### Build

1. Run TypeScript compilation.
2. Run Angular production build.
3. Fix all build errors.
4. Fix lint errors if configured.
5. Verify Driver.js is bundled correctly.

### First-time tour

Test:

```text
Welcome
→ Fees
→ Fee summary
→ Fee breakdown
→ Make Payment
→ Order creation
→ Continue
→ Razorpay
→ Callback
→ Payment Success
→ Payment Details
→ Print Receipt
→ Credentials
→ Finish
```

### Payment failure

Test:

```text
Make Payment
→ payment error
→ tour stays at Make Payment
```

### Payment status failure

Test:

```text
Razorpay
→ FAILED
→ Payment Failed
→ Retry Payment
```

### Payment pending

Test:

```text
Razorpay
→ PENDING
→ Payment Pending
```

### Already paid

Verify that the payment-making tour is not incorrectly shown.

### Zero balance

Verify the payment-making tour is not started.

### Refresh

Test refresh:

* dashboard
* Fees
* after Continue
* callback/payment-status page

### Navigation

Test:

* Browser Back
* Browser Forward
* direct payment-success route
* logout

### Mobile

Test at:

```text
320px
360px
375px
390px
414px
480px
768px
```

Verify:

* no horizontal overflow
* spotlight visible
* popover fully visible
* touch actions easy
* buttons visible
* tables usable
* receipt usable
* credentials readable
* orientation changes do not break positioning

### Tablet

Test portrait and landscape.

### Desktop

Test common desktop viewport.

---

# 63. MOBILE ACCEPTANCE CRITERIA

The implementation is NOT complete unless the full experience can be completed comfortably on a mobile device.

At minimum:

* Welcome fits correctly.
* Fees navigation works.
* Responsive navigation is correctly handled.
* Spotlight never points outside the viewport.
* Popover never clips.
* Popover never permanently covers the target.
* No horizontal scrolling is introduced.
* Next/Back/Skip are touch-friendly.
* Fee amount is readable.
* Fee Breakdown is understandable.
* Make Payment is fully visible.
* Continue is fully visible.
* Razorpay transition is not interfered with.
* Payment Status is readable.
* Payment Details are readable.
* Print Receipt is accessible.
* Credentials are readable.
* Username is readable.
* Password is readable.
* Portal URL is readable.
* Tour survives scrolling.
* Orientation changes do not break the tour.
* Mobile performance remains acceptable.

---

# 64. IMPORTANT TOUR UX RULE

The tour should **guide**, not **operate** the user's workflow.

Correct:

```text
Highlight Fees
   ↓
Student clicks Fees
   ↓
Application navigates
```

Correct:

```text
Highlight Make Payment
   ↓
Student clicks Make Payment
   ↓
createOrder()
```

Correct:

```text
Highlight Continue
   ↓
Student clicks Continue
   ↓
Razorpay
```

Incorrect:

```text
Tour clicks Fees
Tour calls createOrder()
Tour submits payment form
Tour manipulates Razorpay
```

Do not automate business actions.

---

# 65. TOUR COMPLETION

Only mark:

```text
completed
```

after the student has reached the final onboarding stage and the tour has successfully shown the student credentials/payment completion information.

Do not mark completed after:

```text
Continue
```

Do not mark completed after:

```text
Razorpay opens
```

Do not mark completed merely because the payment-success route loaded.

The final onboarding steps must actually run.

---

# 66. FINAL TOUR FLOW

The expected end-to-end experience should be:

```text
┌────────────────────────────┐
│ Welcome                    │
└─────────────┬──────────────┘
              ↓
┌────────────────────────────┐
│ Click Fees                 │
└─────────────┬──────────────┘
              ↓
┌────────────────────────────┐
│ Verify Fee Summary         │
└─────────────┬──────────────┘
              ↓
┌────────────────────────────┐
│ Review Fee Breakdown       │
└─────────────┬──────────────┘
              ↓
┌────────────────────────────┐
│ Click Make Payment         │
└─────────────┬──────────────┘
              ↓
┌────────────────────────────┐
│ Wait for real API response │
└─────────────┬──────────────┘
              ↓
┌────────────────────────────┐
│ Click Continue             │
└─────────────┬──────────────┘
              ↓
        RAZORPAY
              ↓
     CALLBACK / FALLBACK
              ↓
┌────────────────────────────┐
│ Payment Successful 🎉      │
└─────────────┬──────────────┘
              ↓
┌────────────────────────────┐
│ Payment Details            │
└─────────────┬──────────────┘
              ↓
┌────────────────────────────┐
│ Print / Receipt             │
└─────────────┬──────────────┘
              ↓
┌────────────────────────────┐
│ Student Credentials        │
│ URL / Username / Password  │
└─────────────┬──────────────┘
              ↓
┌────────────────────────────┐
│ You're All Set! 🎉         │
└────────────────────────────┘
```

---

# 67. FINAL COMPLETION MESSAGE

Use a polished final message similar to:

```text
You're All Set! 🎉

You now know how to:

• Check your fees
• Verify your outstanding amount
• Make a payment
• Continue to secure payment
• View your payment details
• Access your receipt
• Find your student portal credentials

You can replay this guide anytime from Help.
```

Keep this concise.

---

# 68. FINAL ACCEPTANCE CRITERIA

The implementation is complete only when ALL of the following are true:

* Driver.js is integrated correctly.
* Correct compatible Driver.js version is used.
* Tour logic is isolated in a reusable service.
* Stable `data-tour` selectors are used.
* Fees is genuinely clicked by the user.
* Existing Angular navigation remains intact.
* Tour resumes after route navigation.
* Fee summary is explained.
* Fee breakdown is explained.
* Make Payment is genuinely clicked.
* Existing `createOrder()` remains the source of truth.
* Tour waits for actual payment-order creation.
* Continue is genuinely clicked.
* Existing Razorpay behavior is untouched.
* Tour state is persisted before Razorpay.
* Tour survives the Razorpay redirect/fallback URL.
* Existing callback route is correctly identified from the repository.
* PaymentSuccessComponent resumes the tour.
* Tour waits for actual backend payment status.
* SUCCESS is highlighted.
* Payment details are highlighted.
* Print Receipt is highlighted.
* FeeReceiptComponent is inspected before claiming download/print functionality.
* Receipt actions are explained only if they actually exist.
* Student credentials are highlighted.
* Student portal URL is explained.
* Username is explained.
* Password is explained.
* Password is never stored/logged by the tour.
* FAILED status is handled correctly.
* PENDING status is handled correctly.
* Retry Payment is handled correctly.
* Already-paid users are not unnecessarily shown the payment-making flow.
* Zero-balance students do not start the payment-making flow.
* Tour state is student-specific.
* First-time users receive onboarding.
* Returning users do not repeatedly receive onboarding.
* Skip works.
* Restart works.
* Refresh does not corrupt the state.
* Browser navigation does not crash the tour.
* Duplicate Driver.js instances cannot occur.
* No memory leaks.
* Mobile-first behavior works.
* 320px-width behavior works.
* Mobile portrait works.
* Mobile landscape works.
* Tablet works.
* Desktop works.
* No horizontal scrolling is introduced.
* Popovers remain inside the viewport.
* Spotlight positioning is recalculated after scrolling.
* Orientation changes are handled.
* Touch targets are comfortable.
* No hover dependency exists.
* Mobile payment flow works.
* Mobile payment-success flow works.
* Receipt is usable on mobile.
* Credentials are readable on mobile.
* Performance remains acceptable.
* Accessibility is reasonable.
* Existing payment logic remains unchanged.
* Existing receipt logic remains unchanged.
* No unrelated business logic was modified.
* Angular production build passes.
* TypeScript compilation passes.
* Lint passes if configured.

---

# 69. DELIVERABLES

After implementation, provide:

1. Files created.
2. Files modified.
3. npm/package changes.
4. Exact Driver.js version installed.
5. Tour service architecture.
6. Exact tour flow.
7. How route-aware navigation works.
8. How tour state is persisted.
9. How Razorpay redirect/resume works.
10. How PaymentSuccessComponent resumes the tour.
11. How SUCCESS / FAILED / PENDING are handled.
12. How receipt onboarding works.
13. How credentials onboarding works.
14. How mobile behavior was implemented.
15. Mobile viewport test results.
16. Tablet test results.
17. Desktop test results.
18. Build/lint/test results.
19. Any remaining limitations or assumptions.

Do not merely describe how this could be implemented.

**Actually implement it in the repository.**

Before finishing:

* inspect the final diff
* remove debug logs
* remove dead code
* remove duplicated logic
* remove temporary workarounds
* verify no payment business logic was accidentally changed
* verify no payment API can be triggered twice because of the tour
* verify no password/credential value is logged or persisted by the tour
* verify the tour works across the Razorpay redirect
* verify the payment-success tour resumes correctly
* verify the mobile experience at small viewport sizes
* verify the desktop experience remains unaffected

The final implementation should feel like a **premium, production-grade, mobile-first student onboarding experience**, similar to the guided experiences used by high-quality modern SaaS applications.

Do not optimize only for "it works".

Optimize for:

```text
Reliability
UX
Accessibility
Mobile usability
Maintainability
Performance
Security
Clean architecture
Minimal regression risk
```
