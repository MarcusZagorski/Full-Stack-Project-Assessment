import { useState, useEffect } from "react";
import "./VideoListing.css";

const VideoListing = ({ loadVideos, setLoadVideos }) => {
	const [videos, setVideos] = useState([]);

	useEffect(() => {
		if (loadVideos) {
			fetch("/api/videos")
				.then((res) => res.json())
				.then((data) => {
					setVideos(data);
				})
				.catch((error) => {
					console.error("There was an error fetching messages", error);
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
						if (response.ok) {
							setLoadVideos(true);
						}
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
