import "jest";

import { defineFeature, loadFeature } from "jest-cucumber";

const feature = loadFeature("features/login.feature");
const puppeteer = require("puppeteer");
let browser = null;
let page = null;

defineFeature(feature, (test) => {
	beforeEach(async () => {
		jest.setTimeout(12000000);
	});

	test("Trying to log in", async ({ given, when, then }) => {
		given("I am a user trying to log in", async () => {
			browser = await puppeteer.launch({
				headless: false
			});

			page = await browser.newPage();
			await page.goto("http://localhost:3000/#/login", {
				waitUntil: "load",
				// Remove the timeout
				timeout: 0
			});
		});

		when("Putting my webId and fill out the form with username and password", async () => {
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
		});

		
			
	

		then("Redirect to welcome page", async () => {
			await page.waitForNavigation({
				waitUntil: "networkidle2"
			});
			expect(page.url()).toBe("http://localhost:3000/welcome#");
			await browser.close();
		});
	});
});