import VideoListing from "./VideoListing";
import AddVideoForm from "./AddVideoForm";

const App = () => {
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

		e.target.reset();
	};

	return (
		<>
			<h1>Video Recommendations</h1>
			<VideoListing />
			<AddVideoForm addVideo={addVideo} />
		</>
	);
};

export default App;
