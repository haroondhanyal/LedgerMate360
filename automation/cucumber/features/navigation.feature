@ui @cucumber @smoke
Feature: LedgerMate primary navigation
  Background:
    Given I am signed in to LedgerMate

  Scenario Outline: Open core module <case>
    When I open the "<module>" module
    Then the page title should be "<title>"

    Examples:
      | case | module | title |
      | NAV-C01 | Dashboard | Good afternoon |
      | NAV-C02 | Transactions | Transactions |
      | NAV-C03 | Accounts | Accounts |
      | NAV-C04 | Salary | Salary |
      | NAV-C05 | Khata | Khata |
      | NAV-C06 | Loans | Loans |
      | NAV-C07 | Budget | Budget |
      | NAV-C08 | Savings | Savings |
      | NAV-C09 | Reports | Reports |
      | NAV-C10 | AI Assistant | AI Assistant |
