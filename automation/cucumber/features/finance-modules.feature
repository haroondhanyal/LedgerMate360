@ui @cucumber @regression
Feature: LedgerMate finance module actions
  Background:
    Given I am signed in to LedgerMate

  Scenario Outline: Finance module exposes its primary action <case>
    When I open the "<module>" module
    Then I should see the action "<action>"

    Examples:
      | case | module | action |
      | FIN-C01 | Transactions | Add transaction |
      | FIN-C02 | Accounts | Add account |
      | FIN-C03 | Salary | Add salary profile |
      | FIN-C04 | Khata | Add entry |
      | FIN-C05 | Loans | Add loan |
      | FIN-C06 | Budget | Add budget |
      | FIN-C07 | Savings | Add goal |
      | FIN-C08 | Shared Expenses | Add record |
      | FIN-C09 | Evidence | Add record |
      | FIN-C10 | Recurring | Add record |
