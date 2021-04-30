import "jest";
import { defineFeature, loadFeature } from "jest-cucumber";
const feature = loadFeature("features/deleteLocation.feature");
const puppeteer = require("puppeteer");
let browser = null;
let page = null;

defineFeature(feature, (test) => {
	beforeEach(async () => {
		jest.setTimeout(12000000);
	});

	test("Trying to delete a location", ({ given, when, then }) => {
		given("I am a user trying to delete a location", async () => {
			browser = await puppeteer.launch({
				headless: false
			});

			// login
			page = await browser.newPage();
			await page.goto("http://localhost:3000/login", {
				waitUntil: "load",
				// Remove the timeout
				timeout: 0
			});
			await page.waitForSelector(".sc-EHOje.cffgrt");
			await page.type(".sc-EHOje.cffgrt", "https://uo264699.inrupt.net");
			
	
		

			await page.evaluate(() => {
				let btns = [ ...document.querySelectorAll("button") ];
				btns.forEach(function(btn) {
					if (btn.innerText === "Log In") {
						btn.click();
					}
				});
			});  

			await page.waitForSelector("[id='username']", { visible: true });
			await page.type("[id='username']", "UO264699");

			await page.waitFor(500);
			await page.waitForSelector("[id='password']", { visible: true });
			await page.type("[id='password']", "Karimbenzema9!", { visible: true });

			await page.waitFor(500);

			await page.evaluate(() => {
				let btns = [ ...document.querySelector(".form-horizontal.login-up-form").querySelectorAll("button") ];
				btns.forEach(function(btn) {
					if (btn.innerText === "Log In") {
						btn.click();
					}
				});
			}); 
			await page.waitForNavigation({
				waitUntil: "networkidle2"
			});



		
			await page.goto("http://localhost:3000/locations", {
				waitUntil: "networkidle2"
			});
		});

		when("Putting the location's date I want to see and pressing the show button", async () => {
			await page.waitFor(500);

			await page.waitForSelector("[id='locations_date']", { visible: true });
			await page.type("[id='locations_date']", "2023-10-23");

            await page.evaluate(() => {
				let submit = document.getElementById("search_locations");
				submit.click();
			});
		});

		then("Pressing the delete button", async () => {
			await page.evaluate(() => {
				let submit = document.getElementById("delete_location");
				submit.click();
			});
			
			await browser.close();
		});
	});
});