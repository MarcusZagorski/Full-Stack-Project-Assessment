import { useState, useRef, useEffect } from "react";

const VideoListing = () => {
	const [videos, setVideos] = useState([]);
	const fetchState = useRef(true);

	useEffect(() => {
		if (fetchState.current) {
			fetchState.current = false;
			fetch("/api/videos")
				.then((res) => res.json())
				.then((data) => {
					setVideos(data);
					fetchState.current = true;
				})
				.catch((error) => {
					console.error("There was an error fetching messages", error);
					fetchState.current = true;
				});
		}
	}, []);

	console.log(videos);

	const videoNames = videos.map((vids, index) => {
		return (
			<div key={index}>
				<p>{vids.title}</p>
				<iframe
					width="560"
					height="315"
					src={vids.src}
					title="YouTube video player"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					referrerpolicy="strict-origin-when-cross-origin"
					allowfullscreen
				></iframe>
			</div>
		);
	});

	return <>{videoNames}</>;
};

export default VideoListing;
