# Original concept artwork

Place the original exported images here. Suggested filenames:

- character-designs.png
- school-classroom-concepts.png
- website-wireframes.png
- website-current.png

In src/about.ts, add entries to the matching concepts item's images array:

```ts
images: [
  { src: '/images/concepts/character-designs.png', alt: 'Describe the actual character sketches here' },
],
```

For Website Design Development, include both website-wireframes.png and
website-current.png as separate entries, each with accurate alt text.
PNG, JPEG and WebP are suitable; match the URL to the actual extension.
Do not include public/ in the URL.

An empty images array shows only a compact decorative step number. No image is
invented or requested until a URL is configured. Images share a 4:3 display area
and use object-fit: contain so original artwork is never cropped.
