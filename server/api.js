import { Router, urlencoded } from "express";
import db from "./db.js";

const router = Router();
router.use(urlencoded({ extended: true }));

const apiKey = process.env.YOUTUBE_API_KEY;

const getVideoId = (url) => {
	let id = url.split("?");
	id = id[0].split("/");
	return id[id.length - 1];
};

const getYoutubeTitle = async (videoId, apiKey) => {
	return await fetch(
		`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`
	)
		.then((res) => res.json())
		.then((data) => {
			return data.items.length == 0 ? "Error" : data.items[0].snippet.title;
		});
};

router.get("/videos", async (_, res) => {
	const videos = await db.query("SELECT * FROM videos");
	videos
		? res.send(videos.rows)
		: res
				.status(500)
				.send({ success: "false", error: "Could not connect to database" });
});

router.post("/videos", async (req, res) => {
	let videoSrc = req.body.src;
	videoSrc = videoSrc.includes("youtu.be")
		? videoSrc.replace("youtu.be", "www.youtube.com/embed")
		: videoSrc.replace("watch?v=", "embed/");

	console.log(videoSrc);
	console.log(getVideoId(videoSrc));

	const title = await getYoutubeTitle(getVideoId(videoSrc), apiKey);

	console.log(title);

	const addVideo = await db.query(
		`INSERT INTO videos (title, src) VALUES ('${title ? title : req.body.title}', '${videoSrc}')`
	);

	addVideo
		? res.send({ success: true })
		: res.status(404).send({ success: false });
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
