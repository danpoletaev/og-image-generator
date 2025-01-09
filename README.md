## What is OG Image Generator?

OG Image Generator is a tool that lets you dynamically create OG images from your HTML templates via an API. The tool is flexible, allowing you to use the default template or create fully custom templates.

To get started, simply add a template (you can use the default one), provide the template input data, and click the **"Save & Start"** button.

---

## Example of the Output OG Image

![Example of the output](https://i.ibb.co/xM4vt5k/og-image-1055ac96-26f3-4f6c-9759-af4f0441c59a.jpg)

> This is the default template you can use, or you can create your own custom HTML template. Learn more in the [Templating](#templating) section.

---

## How to Use the API to Dynamically Generate OG Images

Using the API to generate dynamic OG images is simple! Here's how:

```
POST https://api.apify.com/v2/acts/<your_username>~og-image-generator/run-sync-get-dataset-items?token=<your_apify_token>

{
    "html": "<!DOCTYPE html>\n<html lang=\"en\">...your_html_template...</html>",
    "templateData": {
        "category": "Technology",
        "title": "How to create dynamic OG title for your web",
        "logoUrl": "https://w7.pngwing.com/pngs/243/698/png-transparent-apify-logo-tech-companies.png",
        "date": "January 3, 2025",
        "author": "Daniil Poletaev",
        "authorImage": "https://images.apifyusercontent.com/rO00zibE4A243KKKW3pwsdT-IXjgOFWuA2s4RJV_7VM/rs:fill:70:70/aHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSWRPZ1QxMHAxblVSbGhKZUswSlZUdXpLZzJmVWN6MkEtNGZka1hwVWRSX1NtOVFSZw"
    }
}
```

> DO NOT USE THE API IN A META TAG! Doing so will generate an image on every page reload and publicly expose your token.

---

## With OG Image Generator, You Can:

- Generate dynamic OG images for your blog or other pages (e.g., article pages, author pages, category pages).
- Use any HTML templates you want.
- Utilize Tailwind CSS for styling your templates.
- Pass any data needed for your template (e.g., title, author, date, etc.).

---

## How Many OG Images Can I Create?

There’s no limit to how many images you can generate! The Actor itself is free to use, and you’ll only pay for computation units—approximately **$0.001 per image**, which is around **$1 for 1,000 images**.

---

## Input

To generate an OG image, you need to provide the following input:

```jsonc
{
    "html": "<!DOCTYPE html>\n<html......</html>",
    "templateData": {} // A flattened object containing the data to populate your HTML template. Each key must match a placeholder in your template (e.g., {{title}}).
}
```

---

## Templating

You can add any data you need to the template. Make sure to wrap dynamic content keys in double curly braces (`{{}}`) in the HTML template:

```html
<p>{{title}}</p>
<p>{{date}}</p>
```

Then, in the `templateData` object, provide the corresponding values:

```json
{
    "title": "My first title",
    "date": "January 3, 2025"
}
```

The keys in your HTML and `templateData` must match exactly.
> **Note:** All keys in `templateData` must be flattened—nested objects are not supported.

---

## Output Example in JSON

Here’s a sample of the JSON response you'll receive:

```json
{
    "url": "https://api.apify.com/v2/key-value-stores/**********/records/og-image-**********.jpg"
}
```

> Do not pass the image URL directly into the meta tag, as our default storage is temporary and will be removed after 7 days. Refer to the [documentation](https://docs.apify.com/platform/storage/usage#data-retention) for more details.
> **Instead, save it to your storage (ideally with CDN enabled).**

---

## How to Generate Dynamic OG Images with HTML & Tailwind via API

You can use Tailwind CSS to create templates for your OG images. To get started, use the **Play CDN** HTML template. [Check Tailwind documentation](https://tailwindcss.com/docs/installation/play-cdn).

Here’s an example:

```html
<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
</body>
</html>
```

---

## Tips

- DO NOT USE API IN THE META TAG! It will generate image on every page reload as well as it will expose your token publicly.
- Instead, create an API endpoint, save image to your storage and cache the generated images to prevent redundant image generation (and unnecessary costs).

---

