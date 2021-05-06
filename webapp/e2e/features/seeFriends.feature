Feature: See friends
 
Scenario: Trying to see the friends
  Given I am a user trying to see my friends
  When  Go to friends page
  Then  Seeing my friends