import "jest";
import { defineFeature, loadFeature } from "jest-cucumber";
const feature = loadFeature("features/addFriend.feature");
const puppeteer = require("puppeteer");
let browser = null;
let page = null;

defineFeature(feature, (test) => {
	beforeEach(async () => {
		jest.setTimeout(12000000);
	});

	test("Trying to add a new friend", ({ given, when, then }) => {
		given("I am a user trying to add a new friend", async () => {
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



		
			await page.goto("http://localhost:3000/friends", {
				waitUntil: "networkidle2"
			});
		});

		when("Putting the new friend's webID", async () => {
			await page.waitFor(500);

			await page.waitForSelector("[id='friendId']", { visible: true });
			await page.type("[id='friendId']", "https://uo266007.inrupt.net");
		});

		then("Pressing the add button", async () => {
			await page.evaluate(() => {
				let submit = document.getElementById("btnAdd");
				submit.click();
			});
			await page.waitForFunction(
				'document.querySelector("center").innerText.includes("https://uo266007.inrupt.net")'
			);
			await browser.close();
		});
	});
});