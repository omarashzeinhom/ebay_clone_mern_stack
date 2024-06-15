import { createApi } from "unsplash-js";

// Unsplash API client
export const unsplashApi = createApi({
    accessKey: process.env.REACT_APP_UNSPLASH_API_AK || ''
  });
  