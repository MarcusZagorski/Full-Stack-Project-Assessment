import { useState, useRef, useEffect } from "react";
import "./VideoListing.css";

const VideoListing = ({ loadVideos, setLoadVideos }) => {
	const [videos, setVideos] = useState([]);
	//const [loadVideos, setLoadVideos] = useState(true);
	const fetchState = useRef(true);

	useEffect(() => {
		if (loadVideos) {
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
			setLoadVideos(false);
		}
	}, [loadVideos]);

	const videoDetails = videos.map((vids, index) => {
		return (
			<div key={index}>
				<p className="vid-title">{vids.title}</p>
				<iframe
					src={vids.src}
					title="YouTube video player"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					referrerpolicy="strict-origin-when-cross-origin"
					allowfullscreen
					className="video"
				></iframe>
				<button
					className="del_btn"
					onClick={async () => {
						const deleteID = vids.id;
						const response = await fetch(`/api/videos/${deleteID}`, {
							method: "DELETE",
						});
					}}
				>
					DELETE
				</button>
			</div>
		);
	});

	return <div className="videos_container">{videoDetails}</div>;
};

export default VideoListing;
