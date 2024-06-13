import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";
import { test, expect } from "@playwright/test";
import pg from "pg";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, "../../.env") });

const { Pool } = pg;
const db = new Pool({ connectionString: process.env.TEST_DATABASE_URL });

async function openWebsite(page) {
	// Open URL
	await page.goto("http://localhost:3000");
	// Wait for title to appear
	await expect(
		page.getByRole("heading", { name: "Video Recommendations", exact: true })
	).toBeVisible();
}

async function findVideoByTitle(page, title) {
	// Find the title on the screen
	await expect(page.getByText(title)).toBeVisible();

	const titleComponent = page.getByText(title);
	// Go up a couple levels to find the encompassing component of the video
	// You might need to change this if the structure of your video components differ
	const videoParent = titleComponent.locator("xpath=./..");

	return videoParent;
}

test.describe("Videos", () => {
	test.beforeEach(async () => {
		console.log("!--- TEST STARTED ---!");
	});

	test("Level 130 requirements - display videos", async ({ page }) => {
		const videoResults = await db.query("SELECT * FROM videos LIMIT 1");

		// Given I open the website
		await openWebsite(page);

		// Then I am able to see the video entries
		const vidTitle = await findVideoByTitle(page, videoResults.rows[0].title);
		await expect(vidTitle).toBeVisible();
	});

	test("Level 200 requirements - videos in iframe", async ({ page }) => {
		// Given I have a video from the database
		const videoResults = await db.query("SELECT * FROM videos LIMIT 1");

		// And I open up the website
		await openWebsite(page);

		// Then I am able to see the video's title
		const videoParent = await findVideoByTitle(
			page,
			videoResults.rows[0].title
		);

		// And I am able to see the embedded video
		const videoIframe = videoParent.locator("iframe");

		await expect(videoIframe).toHaveAttribute(
			"src",
			"https://www.youtube.com/embed" +
				videoResults.rows[0].src.slice(
					videoResults.rows[0].src.lastIndexOf("/"),
					videoResults.rows[0].src.length
				)
		);
	});

	test("Level 210 requirements - add new video", async ({ page }) => {
		// Given I open up the website
		await openWebsite(page);

		// Then I am able to see the upload section
		await expect(page.getByText("Submit a new video")).toBeVisible();

		await page.getByRole("checkbox").setChecked(true);

		// And I am able to fill in the details
		await page
			.getByPlaceholder("Video title")
			.fill("Designing & Building Websites is Easy");
		await page
			.getByPlaceholder("Video url")
			.fill("https://www.youtube.com/watch?v=PgxT1wItu8M");

		// When I submit the details
		await page.getByRole("button", { name: "SUBMIT" }).click();

		// Then I am able to see the video's title to appear
		const videoParent = await findVideoByTitle(
			page,
			"Designing & Building Websites is Easy"
		);

		// And I am able to see the embedded video
		const videoIframe = videoParent.locator("iframe");
		await expect(videoIframe).toHaveAttribute(
			"src",
			"https://www.youtube.com/embed/PgxT1wItu8M"
		);

		// And I can see the new video in the database
		const dbResponse = await db.query(
			"SELECT * FROM videos WHERE title = $1 AND src = $2",
			[
				"Designing & Building Websites is Easy",
				"https://www.youtube.com/embed/PgxT1wItu8M",
			]
		);

		expect(dbResponse.rows.length).toBe(1);
	});

	test("Level 220 requirements - delete video", async ({ page }) => {
		// Given I have a video from the database
		const videoResults = await db.query(
			"SELECT * FROM videos where title = 'Designing & Building Websites is Easy'"
		);

		// And I open up the website
		await openWebsite(page);

		// Then I am able to see the video's title
		const videoParent = await findVideoByTitle(
			page,
			videoResults.rows[0].title
		);

		// Then I am able to see a button that removes the video
		const deleteButton = videoParent.getByText("DELETE");

		// When I remove the video when pressing the button
		deleteButton.click();

		// Then the video gets removed from the screen
		await expect(page.getByText(videoResults.rows[0].title)).toHaveCount(0);

		// And the video gets removed from the database
		const videoResultsAfterDelete = await db.query(
			"SELECT * FROM videos WHERE id = $1",
			[videoResults.rows[0].id]
		);
		expect(videoResultsAfterDelete.rows.length).toBe(0);
	});

	test("Level 300 requirements - ratings", async ({ page }) => {
		// Given I have a video from the database
		const videoResults = await db.query("SELECT * FROM videos LIMIT 1");

		// And I open up the website
		await openWebsite(page);

		// Then I am able to see the video's title
		const videoParent = await findVideoByTitle(
			page,
			videoResults.rows[0].title
		);

		// And I am able to see a button that adds a vote to the video
		const upVoteButton = videoParent.locator("svg.upvote");

		// And the current rating
		await expect(
			videoParent.getByText(new RegExp(`^${videoResults.rows[0].rating}$`))
		).toBeVisible();

		// When I upvote the video when pressing the button
		upVoteButton.click();

		// Then the vote will update on the screen
		await expect(
			videoParent.getByText(new RegExp(`^${videoResults.rows[0].rating + 1}$`))
		).toBeVisible();

		// And the video will update in the database
		const videoResultsAfterUpvote = await db.query(
			"SELECT * FROM videos WHERE id = $1",
			[videoResults.rows[0].id]
		);
		expect(videoResultsAfterUpvote.rows[0].rating).toBe(
			videoResults.rows[0].rating + 1
		);
	});

	test("Level 350 requirements - downvote", async ({ page }) => {
		const videoResults = await db.query("SELECT * FROM videos LIMIT 1");

		await openWebsite(page);

		const videoParent = await findVideoByTitle(
			page,
			videoResults.rows[0].title
		);

		const downVoteButton = videoParent.locator("svg.downvote");

		await expect(
			videoParent.getByText(new RegExp(`^${videoResults.rows[0].rating}$`))
		).toBeVisible();

		downVoteButton.click();

		await expect(
			videoParent.getByText(new RegExp(`^${videoResults.rows[0].rating - 1}$`))
		).toBeVisible();

		const videoResultsAfterDownvote = await db.query(
			"SELECT * FROM videos WHERE id = $1",
			[videoResults.rows[0].id]
		);
		expect(videoResultsAfterDownvote.rows[0].rating).toBe(
			videoResults.rows[0].rating - 1
		);
	});
});
