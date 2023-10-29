import { client } from "@gradio/client";


async function run() {

	const response_0 = await fetch("https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png");
	const exampleImage = await response_0.blob();
						
	const app = await client("https://d96490aa700cf00916.gradio.live/");
	const result = await app.predict("/predict", [
				exampleImage, 	// blob in 'Upload an image' Image component		
				"Howdy!", // string  in 'Ask a question about the image' Textbox component
	]);

	console.log(result?.data);
}

run();