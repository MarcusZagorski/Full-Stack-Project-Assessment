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

	const handleClick = async (video) => {
		const response = await fetch(`/api/videos/${video}`, {
			method: "DELETE",
		});
		if (response.ok) {
			setLoadVideos(true);
		}
	};

	const handleVoteClick = async (vid, votingFor) => {
		let response = await fetch(`/api/videos/${vid}/${votingFor}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (response.ok) {
			setLoadVideos(true);
		}
	};

	const videoDetails = videos.map((vids, index) => {
		return (
			<div key={index} className="vid-container">
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
				{
					<div className="del-review-btns">
						<button className="del-btn" onClick={() => handleClick(vids.id)}>
							<span class="text">Delete</span>
							<span class="icon">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
								>
									<path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
								</svg>
							</span>
						</button>
						<div className="review-btns">
							<svg
								class="upvote"
								viewBox="0 0 24 24"
								onClick={() => handleVoteClick(vids.id, "up")}
							>
								<path
									fill="currentColor"
									d="M15.03 9.684h3.965c.322 0 .64.08.925.232s.532.374.717.645a2.11 2.11 0 0 1 .242 1.883l-2.36 7.201c-.288.814-.48 1.355-1.884 1.355c-2.072 0-4.276-.677-6.157-1.256c-.472-.145-.924-.284-1.348-.404h-.115V9.478a25.5 25.5 0 0 0 4.238-5.514a1.8 1.8 0 0 1 .901-.83a1.74 1.74 0 0 1 1.21-.048c.396.13.736.397.96.757c.225.36.32.788.269 1.211zM4.177 10H7v8a2 2 0 1 1-4 0v-6.823C3 10.527 3.527 10 4.176 10Z"
									clip-rule="evenodd"
								/>
							</svg>
							<p className="vids_rating">{vids.rating}</p>
							<svg
								class="downvote"
								viewBox="0 0 24 24"
								onClick={() => handleVoteClick(vids.id, "down")}
							>
								<path
									fill="currentColor"
									fill-rule="evenodd"
									d="M8.97 14.316H5.004c-.322 0-.64-.08-.925-.232a2 2 0 0 1-.717-.645a2.1 2.1 0 0 1-.242-1.883l2.36-7.201C5.769 3.54 5.96 3 7.365 3c2.072 0 4.276.678 6.156 1.256c.473.145.925.284 1.35.404h.114v9.862a25.5 25.5 0 0 0-4.238 5.514c-.197.376-.516.67-.901.83a1.74 1.74 0 0 1-1.21.048a1.8 1.8 0 0 1-.96-.757a1.87 1.87 0 0 1-.269-1.211l1.562-4.63ZM19.822 14H17V6a2 2 0 1 1 4 0v6.823c0 .65-.527 1.177-1.177 1.177Z"
									clip-rule="evenodd"
								/>
							</svg>
						</div>
					</div>
				}
			</div>
		);
	});

	return <div className="videos_container">{videoDetails}</div>;
};

export default VideoListing;
