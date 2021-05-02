Feature: Delete friend
 
Scenario: Trying to delete a friend
  Given I am a user trying to delete a friend
  When  Selecting the friend I want to delete
  Then  Pressing the delete button