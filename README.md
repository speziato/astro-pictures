# Astro-Pictures API

🔭 Unofficial API to retrieve periodically-released astronomy pictures and related metadata from various sources.

It aims to be a simple source of image links and metadata in a standardized format.

This repository is composed of:

- [WIP] REST API source to serve metadata and image links;
- Batch job source to process the latest images;

## Sources

For now, the only implemented source is the [ESA/Hubble picture of the week](https://esahubble.org/images/potw/).

I'm planning to also add:

- [NOIRLab image of the week](https://noirlab.edu/public/images/iotw/)
- [ESA/WEBB picture of the month](https://esawebb.org/images/potm/)

### Image processing

A periodic background process downloads the latest, largest JPEG image available from each source. It also parses some metadata from the corresponding
description page, such as the object's name and the credit line.

Then, it creates a bunch of different versions of that image to fit [a variety of screen resolutions](./batch/src/config/Resolutions.ts),
adds the object's name and credit line to the upper-right corner and writes the results in a bucket.
<!-- Files in that bucket are used as source for links provided by this API. -->

## Running locally

You can run this project locally using the provided [compose-dev.yaml](./compose-dev.yaml) file, for example with:

```bash
podman compose -f compose-dev.yaml --podman-run-args=--replace up --build
```

## Tech stack

This project is built with:

- [Node.js](https://nodejs.org) LTS (22.12)
- [Typescript](https://www.typescriptlang.org/) 5.8
<!-- - Fastify
- MikroORM with SQLite backend -->
- [Sharp](https://sharp.pixelplumbing.com/) for image processing
