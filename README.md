In the project directory, you can run:

### `Environment Set Up`

Create the Google Map API through https://console.cloud.google.com/

1. Follow the instructions and you will get API key for Google Map APIs.
Skip the API restriction setting for now.

2. After getting the API key, navigate to "Billing" using the hamburger menu on the to left corner.

3. On the bottom right corner of the page main content. Activate the free trail in the "Credits" section.

4. You can navigate to "APIs & Services" > "Credentials" to retrieve your `Maps API Key`.
Edit your API key. Limit your API key access to allow only required google map APIs. 
The APIs we use in this project are 
- Directions API
- Distance Matrix API
- Geocoding API
- Maps JavaScript API
- Places API

4. Create an `.env` file in the root directory.

5. Add line `REACT_APP_GOOGLE_MAP_API_KEY=<YOUR GOOGLE MAP API KEY>` and replace `<YOUR GOOGLE MAP API KEY>` with your Google Map API key.


** It requires credit card to create an API key, but Google offers some credit limit which 
way more than enough for testing and development within trail period

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.