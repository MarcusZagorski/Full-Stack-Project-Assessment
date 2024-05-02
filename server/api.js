import { Router, urlencoded } from "express";
import db from "./db.js";

const router = Router();
router.use(urlencoded({ extended: true }));

const apiKey = process.env.YOUTUBE_API_KEY;

const getYoutubeTitle = async (videoUrl, apiKey) => {
	let videoId = videoUrl.split("?");
	videoId = videoId[0].split("/");
	videoId = videoId[[videoId.length - 1]];

	return await fetch(
		`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`
	)
		.then((res) => res.json())
		.then((data) => {
			return data.items.length == 0 ? "Error" : data.items[0].snippet.title;
		});
};

router.get("/videos", async (_, res) => {
	const videos = await db.query("SELECT * FROM videos ORDER BY id ASC");
	videos
		? res.send(videos.rows)
		: res
				.status(500)
				.send({ success: "false", error: "Could not connect to database" });
});

router.post("/videos", async (req, res) => {
	try {
		let videoSrc = req.body.src;
		videoSrc = videoSrc.includes("youtu.be")
			? videoSrc.replace("youtu.be", "youtube.com/embed")
			: videoSrc.replace("watch?v=", "embed/");
		videoSrc = videoSrc.includes("https://www.")
			? videoSrc
			: `https://www.${videoSrc}`;

		const youtubeTitle = await getYoutubeTitle(videoSrc, apiKey);
		const videoTitle = req.body.title ? req.body.title : youtubeTitle;

		if (videoSrc.length == 41 || videoSrc.length == 61) {
			const addVideo = await db.query(
				"INSERT INTO videos (title, src) VALUES ($1, $2)",
				[videoTitle, videoSrc]
			);
			res.send(addVideo.rows);
		} else {
			res.status(404).send("Please add a valid Youtube video");
		}
	} catch (err) {
		console.error(err);
		res.status(500).send("Database could not be loaded");
	}
});

router.post("/videos/:id/:vote", async (req, res) => {
	const selectId = parseInt(req.params.id);
	const selectVote = req.params.vote;

	if (selectVote === "up") {
		await db.query("UPDATE videos SET rating = rating + 1 WHERE id = $1", [
			selectId,
		]);
	} else {
		await db.query("UPDATE videos SET rating = rating - 1 WHERE id = $1", [
			selectId,
		]);
	}

	res.send("successful");
});

router.delete("/videos/:id", async (req, res) => {
	const deleteVideo = await db.query(
		`DELETE FROM videos WHERE id = ${req.params.id}`
	);

	deleteVideo
		? res.send({ success: true })
		: res.status(404).send({ success: false });
});

export default router;
