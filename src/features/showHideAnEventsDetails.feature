
# showHideAnEventsDetails.feature
# This file contains BDD scenarios for Show/Hide Event Details feature

Feature: Show/Hide Event Details

    Scenario: Event details are collapsed by default
        Given the user opens the Meet app
        When the app loads
        Then the event details should be hidden

    Scenario: User can expand an event to see details
        Given the user opens the Meet app
        When the user clicks on "Show details"
        Then the event details should be displayed

    Scenario: User can collapse an event to hide details
        Given the event details are shown
        When the user clicks on "Hide details"
        Then the event details should be hidden
