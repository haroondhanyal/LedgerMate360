@ui @cucumber @regression
Feature: Complete LedgerMate product regression
  Background:
    Given I am signed in to LedgerMate

  Scenario Outline: Product component remains available <case>
    When I open the "<module>" module
    Then I should see content containing "<content>"

    Examples:
      | case | module | content |
      | REG-C01 | Dashboard | Available balance |
      | REG-C02 | Workspace Admin | Workspace Admin |
      | REG-C03 | Transactions | money movement |
      | REG-C04 | Accounts | Balances update |
      | REG-C05 | Salary | Salary management |
      | REG-C06 | Khata | Khata / Udhaar |
      | REG-C07 | Loans | Loan management |
      | REG-C08 | Budget | Budget controller |
      | REG-C09 | Savings | Savings goals |
      | REG-C10 | Shared Expenses | split |
      | REG-C11 | Reports | Financial Reports |
      | REG-C12 | Import / Export | CSV |
      | REG-C13 | Recurring | recurring |
      | REG-C14 | Evidence | evidence |
      | REG-C15 | AI Assistant | LedgerMate AI Assistant |
      | REG-C16 | Settings | Appearance |
      | REG-C17 | Profile | Profile Settings |
      | REG-C18 | Notifications | Notifications |
      | REG-C19 | Transactions | Add transaction |
      | REG-C20 | Accounts | Add account |
