# Astro-Pictures - Batch

This module is responsible for retrieving images from various sources at specified time intervals, and for writing out wallpaper-sized images
to a storage provider.

## Running the application locally

This project needs an S3-compatible bucket to store the generated images. To test locally, you can get a MinIO instance running with:

```bash
docker run -v ./data:/data -p 9000:9000 -p 9001:9001 -e MINIO_ROOT_USER=minio MINIO_ROOT_PASSWORD=minio123 minio:latest server /data --console-address ':9001'
```

You will need to create a `.env` file. To see an example, take a look at the [.env.example](/.env.example) file.

You can run this application locally by executing the following commands:

```bash
npm install
npm run start:dev
```

## Building for production

To create a production build, run:

```bash
npm ci
npm run build
```

This will create a `./dist` folder with the transpiled Javascript. To run it:

```bash
npm start
```

## Configuration

The application reads the following environment variables:

| Variable          | Description                                         | Allowed values                                                                                                  |
| ----------------- | --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `S3__BUCKET_NAME` | Bucket to store the images                          | type: `string`                                                                                                  |
| `S3__ENDPOINT`    | The endpoint of the S3-compatible API               | type: `string`                                                                                                  |
| `S3__PORT`        | The port of the S3-compatible API                   | type: `number`                                                                                                  |
| `S3__ACCESS_KEY`  | The ACCESS_KEY to use for the S3-compatible API     | type: `string`                                                                                                  |
| `S3__SECRET_KEY`  | The SECRET_KEY to use for the S3-compatible API     | type: `string`                                                                                                  |
| `S3__SSL`         | Use HTTPS to communicate with the S3-compatible API | `true`\|`false`                                                                                                 |
| `APP__LOG_LEVEL`  | The verbosity of logged messages                    | `info`\|`debug`\|`warn`\|`error`                                                                                |
| `APP__SCHEDULE`   | When to perform image processing. Cron-like syntax  | see: [node-scheduling](https://github.com/node-schedule/node-schedule?tab=readme-ov-file#cron-style-scheduling) |
| `APP__TZ`         | The time zone to be used for scheduling             | see: [List of tz databases time zones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List)       |
