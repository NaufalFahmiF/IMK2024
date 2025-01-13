import axios from 'axios';
import { JSDOM } from 'jsdom';

const SIGN_IN_URL = 'https://v-class.gunadarma.ac.id/login/index.php';

// Function to fetch login token
const fetchLoginToken = async () => {
  try {
    const response = await axios.get(SIGN_IN_URL);
    const dom = new JSDOM(response.data);
    const loginToken = dom.window.document.querySelector('input[name="logintoken"]')?.value;

    if (!loginToken) {
      throw new Error('Login token not found');
    }

    return loginToken;
  } catch (error) {
    console.error('Error fetching login token:', error.message);
    throw error;
  }
};

// Function to handle sign-in
export const signIn = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const email = `${username.trim()}@student.gunadarma.ac.id`;

  try {
    // Fetch the login token
    const loginToken = await fetchLoginToken();

    // Prepare login payload
    const payload = new URLSearchParams({
      username: email,
      password,
      logintoken: loginToken,
    }).toString();

    // Perform login request
    const loginResponse = await axios.post(
      SIGN_IN_URL,
      payload,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Referer': SIGN_IN_URL,
        },
        maxRedirects: 0, // Prevent automatic redirection
        validateStatus: (status) => status < 400 || status === 302, // Allow status 302 for redirection
      }
    );

    // Parse response HTML to check for login errors
    const dom = new JSDOM(loginResponse.data || '');
    const errorMessage = dom.window.document.querySelector('.loginerrors')?.textContent?.trim();

    if (errorMessage) {
      // Return specific error message if login failed
      return res.status(401).json({
        message: 'Authentication failed',
        error: errorMessage,
      });
    }

    // Check if session token exists
    const cookies = loginResponse.headers['set-cookie'] || [];
    const moodleSession = cookies.find((cookie) => cookie.startsWith('MoodleSession'));

    if (moodleSession) {
      // Successfully authenticated
      return res.status(200).json({
        message: 'Login successful',
        sessionToken: moodleSession,
      });
    }

    // Fallback if no specific error is found
    return res.status(401).json({ message: 'Invalid username or password' });
  } catch (error) {
    console.error('Error in sign-in process:', error.message);

    // Log the full error for debugging
    console.error(error);

    return res.status(500).json({ message: 'Internal server error' });
  }
};
