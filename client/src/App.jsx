import VideoListing from "./VideoListing";
import AddVideoForm from "./AddVideoForm";
import { useState } from "react";

const App = () => {
	const [loadVideos, setLoadVideos] = useState(true);

	const addVideo = async (e) => {
		e.preventDefault();
		const videoForm = Object.fromEntries(new FormData(e.target));

		await fetch("/api/videos", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(videoForm),
		});

		setLoadVideos(true);
		e.target.reset();
	};

	return (
		<>
			<h1>Video Recommendations</h1>
			<VideoListing loadVideos={loadVideos} setLoadVideos={setLoadVideos} />
			<AddVideoForm addVideo={addVideo} />
		</>
	);
};

export default App;
