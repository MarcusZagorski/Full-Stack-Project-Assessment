import "./AddVideoForm.css";

const AddVideoForm = ({ addVideo }) => {
	return (
		<>
			<form onSubmit={addVideo}>
				<label>
					<input type="text" name="title" placeholder="Video title"></input>
				</label>
				<label>
					<input type="text" name="src" placeholder="Video url"></input>
				</label>
				<button type="submit">SUBMIT</button>
			</form>
		</>
	);
};

export default AddVideoForm;
