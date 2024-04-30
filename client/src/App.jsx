import VideoListing from "./VideoListing";
import AddVideoForm from "./AddVideoForm";
import { useState } from "react";

const App = () => {
	const [loadVideos, setLoadVideos] = useState(true);
	const [checked, setChecked] = useState(false);
	const [addedVideo, setAddedVideo] = useState(null);

	const addVideo = async (e) => {
		e.preventDefault();
		const videoForm = Object.fromEntries(new FormData(e.target));

		const response = await fetch("/api/videos", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(videoForm),
		});
		if (response.ok) {
			setAddedVideo(true);
			setLoadVideos(true);
			setChecked(false);
			e.target.reset();
		} else {
			setAddedVideo(false);
		}
	};

	return (
		<>
			<h1>Video Recommendations</h1>
			<VideoListing loadVideos={loadVideos} setLoadVideos={setLoadVideos} />
			<AddVideoForm
				addVideo={addVideo}
				checked={checked}
				setChecked={setChecked}
				addedVideo={addedVideo}
			/>
		</>
	);
};

export default App;
