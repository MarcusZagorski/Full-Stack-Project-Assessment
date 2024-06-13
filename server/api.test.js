import request from "supertest";
import app from "./app.js";

describe("/api", () => {
	describe("/videos", () => {
		describe("GET", () => {
			it("Returns the list of videos", async () => {
				const response = await request(app).get("/api/videos");

				expect(response.statusCode).toBe(200);
				expect(response.body[0].title).toBe("Never Gonna Give You Up");
				expect(response.body[0].url).toBe(
					"https://www.youtube.com/watch?v=dQw4w9WgXcQ"
				);
			});
		});
	});
});
