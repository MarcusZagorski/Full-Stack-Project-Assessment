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

router.get("/videos", async (req, res) => {
	const videos = await db.query("SELECT * FROM videos ORDER BY id ASC");

	const orderQuery = req.query.order;
	if (orderQuery === "asc") {
		const videosASC = await db.query(
			"SELECT * FROM videos ORDER BY rating ASC"
		);
		res.send(videosASC.rows);
	} else if (orderQuery === "desc") {
		const videosDESC = await db.query(
			"SELECT * FROM videos ORDER BY rating DESC"
		);
		res.send(videosDESC.rows);
	} else {
		videos
			? res.send(videos.rows)
			: res
					.status(500)
					.send({ success: "false", error: "Could not connect to database" });
	}
});

router.post("/videos", async (req, res) => {
	try {
		let videoSrc = req.body.src;
		videoSrc = videoSrc.includes("youtu.be")
			? videoSrc.replace("youtu.be", "youtube.com/embed")
			: videoSrc.replace("watch?v=", "embed/");
		videoSrc = videoSrc.includes("https://") ? videoSrc : `https://${videoSrc}`;

		const youtubeTitle = await getYoutubeTitle(videoSrc, apiKey);
		const videoTitle = req.body.title ? req.body.title : youtubeTitle;

		// FIX THIS CONDITION
		// if (videoSrc.length == 41 || videoSrc.length == 61) {
		// 	const addVideo = await db.query(
		// 		"INSERT INTO videos (title, src, timeSent) VALUES ($1, $2, $3)",
		// 		[videoTitle, videoSrc, timeStamp]
		// 	);

		// const currentDate = new Date().toLocaleDateString();
		// // const currentTime = new Date().toLocaleTimeString();

		const addVideo = await db.query(
			"INSERT INTO videos (title, src, currentTime, currentDate) VALUES ($1, $2, NOW(), CURRENT_DATE)",
			[videoTitle, videoSrc]
		);

		addVideo
			? res.send(addVideo.rows)
			: res.status(404).send("Please add a valid Youtube video");
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
