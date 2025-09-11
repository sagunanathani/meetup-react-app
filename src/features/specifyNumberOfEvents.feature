Feature: Specify Number of Events

    Scenario: Default number of events is 32
        Given the user has not specified a number of events
        When the app loads
        Then the user should see up to 32 events

    Scenario: User can change the number of events
        Given the user has opened the app
        When the user types "5" in the number of events input
        Then the app should display 5 events
