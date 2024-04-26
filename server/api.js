import { Router, urlencoded } from "express";
import db from "./db.js";

const router = Router();
router.use(urlencoded({ extended: true }));

router.get("/videos", async (_, res) => {
	const videos = await db.query("SELECT * FROM videos");

	videos
		? res.send(videos.rows)
		: res
				.status(500)
				.send({ success: "false", error: "Could not connect to database" });
});

router.post("/videos", async (req, res) => {
	const addVideo = await db.query(
		`INSERT INTO videos (title, src) VALUES ('${req.body.title}', '${req.body.src}')`
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
