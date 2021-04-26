Feature: Login
 
Scenario: Trying to log in
  Given I am a user trying to log in
  When  Putting my webId and fill out the form with username and password
  Then  Redirect to welcome page