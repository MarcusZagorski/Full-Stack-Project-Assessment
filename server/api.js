import { Router, urlencoded } from "express";
// import db from "./db.js";
import { createClient } from "@supabase/supabase-js";

const router = Router();
router.use(urlencoded({ extended: true }));

const supabase = createClient(
	"https://asvgjqjkepjhmbwzyxug.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzdmdqcWprZXBqaG1id3p5eHVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM1NTcwMzksImV4cCI6MjAyOTEzMzAzOX0.lzqeh7SMdhZaHuXSIVQArp2nDIXZAD-Gtqxca9sexjs"
);

router.get("/videos", async (_, res) => {
	// const result = await db.query("select * from videos");
	// result
	// 	? res.json(result.rows)
	// 	: res
	// 			.status(500)
	// 			.send({ success: "false", error: "Could not connect to database" });
	const { data } = await supabase.from("videos").select("*");
	res.send(data);
});

router.post("/videos", async (req, res) => {
	// const addVideo = await db.query(
	// 	`INSERT INTO videos (title, src) VALUES ('${req.body.title}', '${req.body.src}')`
	// );
	// res.send("Success!");
	const { error } = await supabase.from("videos").insert({
		title: req.body.title,
		src: req.body.src,
	});
	if (error) {
		res.send(error);
	}
	res.send("Success!");
});

export default router;
