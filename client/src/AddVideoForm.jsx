import "./AddVideoForm.css";

const AddVideoForm = ({ addVideo, checked, setChecked, addedVideo }) => {
	const handleClick = () => {
		setChecked(!checked);
	};

	const videoTitleInputField = () => {
		return !checked ? null : (
			<input
				type="text"
				name="title"
				placeholder="Video title"
				className="video-title"
			></input>
		);
	};

	const addedVideoMessage = () => {
		if (addedVideo === null) {
			return "";
		}
		if (addedVideo === true) {
			return <p className="successful-message">Video added successfully!</p>;
		} else {
			return (
				<p className="error-message">*Title and Src field cannot be empty</p>
			);
		}
	};

	return (
		<div className="add_videos_container">
			<h1>Add video recommendations</h1>
			{addedVideoMessage()}
			<form onSubmit={addVideo}>
				<div>
					<label className="checkbox">
						<input type="checkbox" onClick={handleClick}></input>
					</label>
					<span>Add custom title?</span>
				</div>
				{videoTitleInputField()}
				<input
					type="text"
					name="src"
					placeholder="Video url"
					className="video-url"
				></input>
				<button type="submit" className="submit_btn">
					SUBMIT
				</button>
			</form>
		</div>
	);
};

export default AddVideoForm;
