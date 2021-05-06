import "jest";
import { defineFeature, loadFeature } from "jest-cucumber";
const feature = loadFeature("features/seeChat.feature");
const puppeteer = require("puppeteer");
let browser = null;
let page = null;

defineFeature(feature, (test) => {
	beforeEach(async () => {
		jest.setTimeout(12000000);
	});

	test("Trying to see a chat", ({ given, when, then }) => {
		given("I am a user trying to see a chat", async () => {
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



		
			await page.goto("https://radarines6awebapp.herokuapp.com/chat", {
				waitUntil: "networkidle2"
			});
		});

		when("Putting the user's webID", async () => {
			await page.waitFor(500);
            
			await page.waitForSelector("[id='chat']", { visible: true });
			await page.type("[id='chat']", "uo264254.inrupt.net");
            
		});

		then("Pressing the chat button", async () => {
			await page.evaluate(() => {
				let submit = document.getElementById("send_user");
				submit.click();
			});
			await page.waitForFunction(
				'document.querySelector("div").innerText.includes("Buenos días")'
			);
			await browser.close();
		});
	});
});