import "jest";
import { defineFeature, loadFeature } from "jest-cucumber";
const feature = loadFeature("features/addUser.feature");
const puppeteer = require("puppeteer");
let browser = null;
let page = null;

defineFeature(feature, (test) => {
	beforeEach(async () => {
		jest.setTimeout(12000000);
	});

	test("Trying to add a new user", ({ given, when, then }) => {
		given("I am the admin trying to add a user", async () => {
			browser = await puppeteer.launch({
				headless: false
			});

			// login
			page = await browser.newPage();
			await page.goto("https://radarines6awebapp.herokuapp.com/login", {
				waitUntil: "load",
				// Remove the timeout
				timeout: 0
			});
			await page.waitForSelector(".sc-EHOje.cffgrt");
			await page.type(".sc-EHOje.cffgrt", "https://radarines6a.inrupt.net");
			
	
		

			await page.evaluate(() => {
				let btns = [ ...document.querySelectorAll("button") ];
				btns.forEach(function(btn) {
					if (btn.innerText === "Log In") {
						btn.click();
					}
				});
			});  

			await page.waitForSelector("[id='username']", { visible: true });
			await page.type("[id='username']", "radarines6a");

			await page.waitFor(500);
			await page.waitForSelector("[id='password']", { visible: true });
			await page.type("[id='password']", "R1d1r3n2s6a", { visible: true });

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



		
			await page.goto("https://radarines6awebapp.herokuapp.com/users", {
				waitUntil: "networkidle2"
			});
		});

		when("Putting the new user's webID and the email", async () => {
			await page.waitFor(500);
            
			await page.waitForSelector("[id='newUser']", { visible: true });
			await page.type("[id='newUser']", "uo264699");
            await page.waitForSelector("[id='newIdp']", { visible: true });
			await page.type("[id='newIdp']", "https://uo264699.inrupt.net");
		});

		then("Pressing the add button", async () => {
			await page.evaluate(() => {
				let submit = document.getElementById("add_user");
				submit.click();
			});
			await page.waitForFunction(
				'document.querySelector("div").innerText.includes("uo264699")'
			);
			await browser.close();
		});
	});
});