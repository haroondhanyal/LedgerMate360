@ui @cucumber @regression
Feature: LedgerMate workspace experience
  Background:
    Given I am signed in to LedgerMate

  Scenario Outline: Workspace capability is accessible <case>
    When I open the "<module>" module
    Then I should see content containing "<content>"

    Examples:
      | case | module | content |
      | EXP-C01 | Dashboard | Available balance |
      | EXP-C02 | Workspace Admin | Workspace Admin |
      | EXP-C03 | Reports | Financial reports |
      | EXP-C04 | Import / Export | Import / Export |
      | EXP-C05 | Notifications | Notifications |
      | EXP-C06 | Settings | Appearance |
      | EXP-C07 | Profile | Profile Settings |
      | EXP-C08 | AI Assistant | LedgerMate AI Assistant |
      | EXP-C09 | Transactions | money movement |
      | EXP-C10 | Accounts | Balances update |
