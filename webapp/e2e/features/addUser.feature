Feature: Add user
 
Scenario: Trying to add a new user
  Given I am the admin trying to add a user
  When  Putting the new user's webID and the email
  Then  Pressing the add button