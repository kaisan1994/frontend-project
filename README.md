In the project directory, you can run:

### `Environment Set Up`

Create the Google Map API through https://console.cloud.google.com/

1. Follow the instructions and you will get API key for Google Map APIs.
Skip the API restriction setting for now.

2. After getting the API key, navigate to "Billing" using the hamburger menu on the to left corner.

3. On the bottom right corner of the page main content. Activate the free trail in the "Credits" section.

4. You can navigate to "APIs & Services" > "Credentials" to retrieve your `Maps API Key`.
Edit your API key. Limit your API key access to allow only required google map APIs. Or you can just leave it without restriction for testing purpose.

The APIs we use in this project are 
- Directions API
- Distance Matrix API
- Geocoding API
- Maps JavaScript API
- Places API

5. Replace `<YOUR GOOGLE MAP API KEY>` with your Google Map API key.

** It requires credit card to create an API key, but Google offers some credit limit which 
way more than enough for testing and development within trail period

Start the application locally.

1. boot up the backend mock api locally. Or just use the server link by replacing your the env variable `REACT_APP_BASE_API_URL` by the target server domain.

2. run `npm install` to install the packages.

3. run `npm run start` to boot up the development mode.

Create production build

1. Create your production google map API with correct restriction with the instruction above and update corresponding values in your `.env` file

2. run `npm run build`. The production build is in the `./build` folder