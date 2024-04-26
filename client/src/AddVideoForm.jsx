import "./AddVideoForm.css";

const AddVideoForm = ({ addVideo }) => {
	return (
		<div class="add_videos_container">
			<h1>Add video recommendations</h1>
			<form onSubmit={addVideo}>
				<label>
					<input type="text" name="title" placeholder="Video title"></input>
				</label>
				<label>
					<input type="text" name="src" placeholder="Video url"></input>
				</label>
				<button type="submit" className="submit_btn">
					SUBMIT
				</button>
			</form>
		</div>
	);
};

export default AddVideoForm;
