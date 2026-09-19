@ui @cucumber @smoke
Feature: LedgerMate authentication screens
  Scenario Outline: Authentication screen <case>
    Given I open LedgerMate authentication
    When I choose authentication mode "<mode>"
    Then I should see authentication heading "<heading>"

    Examples:
      | case | mode | heading |
      | AUTH-C01 | register | Create your account |
      | AUTH-C02 | login | Welcome back |
      | AUTH-C03 | forgot | Forgot password |
      | AUTH-C04 | register | Create your account |
      | AUTH-C05 | login | Welcome back |
      | AUTH-C06 | forgot | Forgot password |
      | AUTH-C07 | register | Create your account |
      | AUTH-C08 | login | Welcome back |
      | AUTH-C09 | forgot | Forgot password |
      | AUTH-C10 | login | Welcome back |
