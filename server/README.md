# YTGrab Backend

This folder contains a production-ready Express backend scaffold for YTGrab. It provides the following endpoints:

- POST /api/analyze  -> validate a url and return metadata/formats (uses yt-dlp)
- GET  /api/download -> stream a selected format to the client
- GET  /api/health   -> health check (including yt-dlp availability)

Quick start

1. Install dependencies

   cd server
   npm install

2. Copy .env.example -> .env and configure

3. Ensure yt-dlp is available on the server (or set YTDLP_PATH to the binary)

4. Run dev

   npm run dev

Notes
- The download endpoint streams directly from yt-dlp to the HTTP response to avoid buffering large files in memory.
- Configure MAX_DOWNLOAD_MB and DOWNLOAD_TIMEOUT_MS in the .env for production limits.
