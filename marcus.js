// const main = async () => {
// 	const videoUrl = "https://www.youtube.com/embed/Gvv99E2zdgk?t=124";
// 	const apiKey = process.env.YOUTUBE_API_KEY;

// 	const getVideoId = (url) => {
// 		let test = url.split("?");
// 		test = test[0].split("/");
// 		return test[test.length - 1];
// 	};

// 	const getYoutubeTitle = async (videoId, apiKey) => {
// 		return await fetch(
// 			`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`
// 		)
// 			.then((res) => res.json())
// 			.then((data) => data.items[0].snippet.title);
// 	};

// 	const videoId = getVideoId(videoUrl);
// 	console.log(await getYoutubeTitle(videoId, apiKey));
// };

// main();
