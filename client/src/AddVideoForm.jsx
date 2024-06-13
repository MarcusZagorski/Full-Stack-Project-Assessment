import "./AddVideoForm.css";
import { useState } from "react";

const AddVideoForm = ({ setLoadVideos }) => {
	const [checked, setChecked] = useState(false);
	const [addedVideo, setAddedVideo] = useState(false);
	// const [newVideo, setNewVideo] = useState({});

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
			e.target.reset();
		}
	};

	const handleClick = () => {
		setChecked(!checked);
	};

	// NEEDS TO BE FIXED!!!
	// const addedVideoMessage = () => {
	// if (newVideo.src.length === 61 || newVideo.src.length === 41) {
	// 	return <p className="successful-message">Video added successfully!</p>;
	// } else if (newVideo.src.length !== 61 || newVideo.src.length !== 41) {
	// 	<p className="error-message">*Please enter a valid YouTube video</p>;
	// } else {
	// 	return (
	// 		<p className="error-message">*Title and Src field cannot be empty</p>
	// 	);
	// }
	// };

	const submitForm = () => {
		const videoTitleInputField = !checked ? null : (
			<>
				<label for="vid-title"></label>
				<input
					type="text"
					name="title"
					placeholder="Video title"
					className="video-title"
					id="vid-title"
				></input>
			</>
		);

		return (
			<form onSubmit={addVideo}>
				<div>
					<label className="checkbox">
						<input type="checkbox" onClick={handleClick}></input>
					</label>
					<span>Add custom title?</span>
				</div>
				{videoTitleInputField}
				<label for="vid-url"></label>
				<input
					type="text"
					name="src"
					placeholder="Video url"
					className="video-url"
					id="vid-url"
				></input>
				<button type="submit" className="submit_btn">
					SUBMIT
				</button>
			</form>
		);
	};

	return (
		<div className="add_videos_container">
			<h1>Submit a new video</h1>
			{submitForm()}
		</div>
	);
};

export default AddVideoForm;
