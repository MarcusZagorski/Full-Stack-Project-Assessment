import VideoListing from "./VideoListing";
import AddVideoForm from "./AddVideoForm";
import { useState } from "react";

const App = () => {
	const [loadVideos, setLoadVideos] = useState(true);

	return (
		<>
			<h1>Video Recommendations</h1>
			<VideoListing loadVideos={loadVideos} setLoadVideos={setLoadVideos} />
			<AddVideoForm setLoadVideos={setLoadVideos} />
		</>
	);
};

export default App;
