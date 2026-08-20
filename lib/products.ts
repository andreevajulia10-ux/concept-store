import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

export type GalleryItem = {
  figure: string;
  image: string;
  caption: string;
  w: number;
  h: number;
};

export type Finishes = { label: string; image: string }[];

export type Product = {
  slug: string;
  name: string;
  /** Самозавершающийся рекламный текст рядом с названием */
  heroTagline: string;
  /** Первый абзац описания */
  leadParagraph: string;
  /** Второй абзац описания */
  bodyParagraph?: string;
  itemNumber: string;
  leadTime: string;
  estShipDate: string;
  price: string;
  leadLabel: string;
  finishOptions: string[];
  defaultFinish: string;
  shadeOptions: string[];
  defaultShade: string;
  sizeOptions: string[];
  defaultSize: string;
  heroImage: string;
  finishTitle: string;
  gallery: GalleryItem[];
  techSpecs: { label: string; value: string }[];
  downloads: string[];
  bannerImage: string;
  bannerText: string;
  shadeFinishes: Finishes;
  metalFinishes: Finishes;
  replacementName: string;
  replacementDesc: string;
  replacementPrice: string;
  replacementImage: string;
  bulbName: string;
  bulbPrice: string;
  bulbImage: string;
};

/* ====== Общие секции (галерея, спеки) служат шаблоном по умолчанию ====== */
const defaultGallery: GalleryItem[] = [
  {
    figure: "Fig. 1",
    image: "/assets/aster-interior-01.webp",
    caption: "Aster Chandelier\n6 Arm / Aged Brass\nAlabaster Glass",
    w: 674,
    h: 859,
  },
  {
    figure: "Fig. 2",
    image: "/assets/aster-interior-02.webp",
    caption: "Aster Chandelier\nAlabaster Glass\nAged Brass",
    w: 435,
    h: 554,
  },
  {
    figure: "Fig. 3",
    image: "/assets/aster-interior-03.webp",
    caption: "Aster Chandelier\n6 Arm / Aged Brass\nAlabaster Glass",
    w: 435,
    h: 554,
  },
  {
    figure: "Fig. 4",
    image: "/assets/aster-interior-04.webp",
    caption: "Aster Chandelier\nAlabaster Glass Detail\nAged Brass",
    w: 674,
    h: 859,
  },
];

const defaultTechSpecs = [
  { label: "Dimensions", value: "46.5 in W × 32 in H\nCustomizable drop: 28–72 in" },
  { label: "Weight", value: "41 lbs" },
  { label: "Bulbs Included", value: "6 × G9 LED / 120V / 4W / 2700K\nWarm dim, dimmable" },
  { label: "Max Wattage", value: "36 W total / 6 × 6W max" },
  { label: "Materials", value: "Hand-finished alabaster glass, aged brass" },
  { label: "Certification", value: "UL Listed, damp-rated" },
  { label: "Suspension", value: "Fixed brass rod, customizable drop length" },
];

const defaultDownloads = ["Product Sheet", "Assembly Guide", "2D Drawing", "3D Model"];

const defaultBannerText =
  "Inspired by the quiet rhythm of stems and petals, Aster balances sculptural brass arms with softly formed alabaster glass. The irregular shapes create subtle variation from piece to piece, giving each chandelier its own character.";

const defaultShadeFinishes: Finishes = [
  { label: "Alabaster", image: "/assets/finish-glass-1.webp" },
  { label: "Pistachio", image: "/assets/finish-glass-2.webp" },
  { label: "Frosted Opal", image: "/assets/finish-glass-2.webp" },
  { label: "Smoke", image: "/assets/finish-glass-3.webp" },
  { label: "Warm Amber", image: "/assets/finish-glass-4.webp" },
];

const defaultMetalFinishes: Finishes = [
  { label: "Aged Brass", image: "/assets/finish-brass-1.webp" },
  { label: "Brushed Brass", image: "/assets/finish-brass-2.webp" },
  { label: "Dark Bronze", image: "/assets/finish-brass-3.webp" },
  { label: "Blackened Brass", image: "/assets/finish-brass-4.webp" },
  { label: "All", image: "/assets/finish-brass-5.webp" },
];

/* ====== Галерея товара из его собственных фото ====== */
const gallerySizes: { w: number; h: number }[] = [
  { w: 674, h: 859 },
  { w: 435, h: 554 },
  { w: 435, h: 554 },
  { w: 674, h: 859 },
];

function imageSize(
  publicRoot: string,
  rel: string,
): { w: number; h: number } | null {
  const p = path.join(publicRoot, rel);
  if (!existsSync(p)) return null;
  try {
    const b = readFileSync(p);
    // PNG: signature + width (16–19) + height (20–23).
    if (b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) {
      return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
    }

    if (
      b.length >= 30 &&
      b.toString("ascii", 0, 4) === "RIFF" &&
      b.toString("ascii", 8, 12) === "WEBP"
    ) {
      const chunk = b.toString("ascii", 12, 16);

      if (chunk === "VP8X") {
        const w = 1 + b[24] + (b[25] << 8) + (b[26] << 16);
        const h = 1 + b[27] + (b[28] << 8) + (b[29] << 16);
        return { w, h };
      }

      if (chunk === "VP8L" && b[20] === 0x2f) {
        const bits = b.readUInt32LE(21);
        return {
          w: 1 + (bits & 0x3fff),
          h: 1 + ((bits >>> 14) & 0x3fff),
        };
      }

      if (
        chunk === "VP8 " &&
        b[23] === 0x9d &&
        b[24] === 0x01 &&
        b[25] === 0x2a
      ) {
        return {
          w: b.readUInt16LE(26) & 0x3fff,
          h: b.readUInt16LE(28) & 0x3fff,
        };
      }
    }
  } catch {
    /* ignore */
  }
  return null;
}

// Есть ли в серии хоть один снимок «(N)» (номер может начинаться не с 1).
function seriesExists(publicRoot: string, base: string): boolean {
  for (let n = 1; n <= 9; n++) {
    if (existsSync(path.join(publicRoot, `${base} (${n}).webp`))) return true;
  }
  return false;
}

function buildProductGallery(name: string, heroImage: string): GalleryItem[] {
  // heroImage вида /products/slug.webp → базовый путь без расширения
  const base = heroImage.replace(/\.[a-z0-9]+$/i, "");
  const publicRoot = path.join(process.cwd(), "public");
  const relBase = base.replace(/^\//, "");

  const rels: string[] = [];

  // Файлы серии могут лежать по красивому имени («Halo Chandelier (1).webp»)
  // или по slug-имени («estelle-chandelier (1).webp»).
  const prettyRel = `products/${name}`;
  const seriesBase = seriesExists(publicRoot, prettyRel)
    ? prettyRel
    : seriesExists(publicRoot, relBase)
      ? relBase
      : null;

  if (seriesBase) {
    // Все снимки серии. Горизонтальный снимок целиком отдаётся в
    // большую карточку-баннер и в галерею не попадает.
    const nums: number[] = [];
    for (let n = 1; n <= 9; n++) {
      if (existsSync(path.join(publicRoot, `${seriesBase} (${n}).webp`))) {
        nums.push(n);
      }
    }
    const verticals = nums.filter((n) => {
      const s = imageSize(publicRoot, `${seriesBase} (${n}).webp`);
      return !(s && s.w > s.h);
    });
    // Приоритет: снимки (4) и (5) первыми (Fig.1 и Fig.2),
    // остальные вертикальные — по возрастанию нумерации.
    const ordered = [
      ...verticals.filter((n) => n === 4 || n === 5).sort((a, b) => a - b),
      ...verticals.filter((n) => n !== 4 && n !== 5).sort((a, b) => a - b),
    ];
    for (const n of ordered) rels.push(`${seriesBase} (${n}).webp`);
  } else {
    ["", "-2", "-3", "-4"].forEach((suffix, i) => {
      rels.push(i === 0 ? `${relBase}.webp` : `${relBase}${suffix}.webp`);
    });
  }

  // Горизонтальные снимки растягиваются на всю ширину колонки,
  // вертикальные используют стандартный набор вертикальных размеров.
  const fullWidth = 1121;
  const items: GalleryItem[] = [];
  let vIdx = 0;

  rels.forEach((rel) => {
    const size = imageSize(publicRoot, rel);
    const fig = items.length + 1;
    if (size && size.w > size.h) {
      items.push({
        figure: `Fig. ${fig}`,
        image: `/${rel}`,
        caption: `${name}\nDetail ${fig} · Landscape`,
        w: fullWidth,
        h: Math.round((fullWidth * size.h) / size.w),
      });
    } else {
      const s = gallerySizes[vIdx % gallerySizes.length];
      vIdx++;
      items.push({
        figure: `Fig. ${fig}`,
        image: `/${rel}`,
        caption: `${name}\nDetail ${fig}`,
        w: s.w,
        h: s.h,
      });
    }
  });

  return items;
}

/* ====== Фабрика для товаров каталога ====== */
function buildProduct(params: {
  slug: string;
  name: string;
  price: string;
  heroImage: string;
  leadParagraph: string;
  itemSeed: string;
  leadWeeks: number;
  finishName: string;
  /** Отдельный баннер для горизонтальной плашки, либо heroImage */
  bannerImage?: string;
}): Product {
  const {
    slug,
    name,
    price,
    heroImage,
    leadParagraph,
    itemSeed,
    leadWeeks,
    finishName,
    bannerImage,
  } = params;
  return {
    slug,
    name,
    heroTagline: `A sculptural ${slug.includes("lamp") ? "lamp" : "light"} designed to feel quietly expressive.`,
    leadParagraph,
    bodyParagraph:
      "Available in a selection of finishes and made to order in New York. Each piece brings subtle variation and character to the space, letting the play of material, texture and light do the talking.",
    itemNumber: `FA-${itemSeed}`,
    leadTime: `${leadWeeks} Weeks`,
    estShipDate: "Est. Ship Date: November 2026",
    price,
    leadLabel: `${Math.max(4, leadWeeks - 4)}–${leadWeeks} weeks`,
    finishOptions: ["Aged Brass", "Brushed Brass", "Dark Bronze", "Blackened Brass"],
    defaultFinish: finishName,
    shadeOptions: ["Shade → Alabaster Glass", "Shade → Smoke", "Shade → Warm Amber"],
    defaultShade: "Shade → Alabaster Glass",
    sizeOptions: ["110 × 72 cm", "100 × 62 cm", "90 × 55 cm"],
    defaultSize: "110 × 72 cm",
    heroImage,
    finishTitle: finishName,
    gallery: buildProductGallery(name, heroImage),
    techSpecs: defaultTechSpecs,
    downloads: defaultDownloads,
    bannerImage: bannerImage ?? heroImage,
    bannerText: defaultBannerText,
    shadeFinishes: defaultShadeFinishes,
    metalFinishes: defaultMetalFinishes,
    replacementName: `${name.split(" ")[0]} Replacement Shade`,
    replacementDesc: "Hand-finished shade",
    replacementPrice: "$180 each",
    replacementImage: heroImage,
    bulbName: "G9 LED Bulb — Warm Dim, 4W",
    bulbPrice: "$18 each",
    bulbImage: "/assets/finish-bulb.webp",
  };
}

/* ====== Товары ====== */
export const products: Product[] = [
  {
    slug: "aster-chandelier",
    name: "Aster Chandelier",
    heroTagline:
      "The statement-making centerpiece of the Aster Chandelier collection.",
    leadParagraph:
      "A sculptural chandelier built around a series of softly curved arms and hand-finished glass shades. Each element is slightly irregular, giving the fixture a sense of movement even when viewed from across the room.",
    bodyParagraph:
      "Designed to cast a warm, diffused light, Aster works equally well above a dining table or as a statement piece in an open living space. Available in several finishes and made to order in New York.",
    itemNumber: "FA-100015",
    leadTime: "12 Weeks",
    estShipDate: "Est. Ship Date: November 10, 2026",
    price: "From $1,295",
    leadLabel: "8–10 weeks",
    finishOptions: ["Aged Brass", "Brushed Brass", "Dark Bronze", "Blackened Brass"],
    defaultFinish: "Aged Brass",
    shadeOptions: ["Shade → Alabaster Glass", "Shade → Smoke", "Shade → Warm Amber"],
    defaultShade: "Shade → Alabaster Glass",
    sizeOptions: ["110 × 72 cm", "100 × 62 cm", "90 × 55 cm"],
    defaultSize: "110 × 72 cm",
    heroImage: "/assets/aster-hero.webp",
    finishTitle: "Aged Brass",
    gallery: defaultGallery,
    techSpecs: defaultTechSpecs,
    downloads: defaultDownloads,
    bannerImage: "/assets/aster-banner.webp",
    bannerText: defaultBannerText,
    shadeFinishes: defaultShadeFinishes,
    metalFinishes: defaultMetalFinishes,
    replacementName: "Aster Replacement Shade",
    replacementDesc: "Hand-finished alabaster glass",
    replacementPrice: "$320 each",
    replacementImage: "/assets/aster-replacement-shade.webp",
    bulbName: "G9 LED Bulb — Warm Dim, 4W",
    bulbPrice: "$18 each",
    bulbImage: "/assets/finish-bulb.webp",
  },
  {
    slug: "arc-glass-sconce",
    name: "Arc Glass Sconce",
    heroTagline:
      "A sculptural wall light shaped from hand-blown glass and warm brushed metal.",
    leadParagraph:
      "A sculptural wall light shaped from hand-blown glass and warm brushed metal. Its softened curves diffuse light in both directions, creating a quiet glow that changes with the room.",
    itemNumber: "FA-200018",
    leadTime: "6 Weeks",
    estShipDate: "Est. Ship Date: October 1, 2026",
    price: "From $285",
    leadLabel: "4–6 weeks",
    finishOptions: ["Aged Brass", "Brushed Brass", "Dark Bronze"],
    defaultFinish: "Aged Brass",
    shadeOptions: ["Glass → Frosted Opal", "Glass → Smoke", "Glass → Warm Amber"],
    defaultShade: "Glass → Frosted Opal",
    sizeOptions: ["One size", "Extended cord"],
    defaultSize: "One size",
    heroImage: "/assets/featured-arc-main.webp",
    finishTitle: "Brushed Brass",
    gallery: defaultGallery,
    techSpecs: defaultTechSpecs,
    downloads: defaultDownloads,
    bannerImage: "/assets/aster-banner.webp",
    bannerText: defaultBannerText,
    shadeFinishes: defaultShadeFinishes,
    metalFinishes: defaultMetalFinishes,
    replacementName: "Arc Replacement Glass",
    replacementDesc: "Hand-blown glass shade",
    replacementPrice: "$180 each",
    replacementImage: "/assets/aster-replacement-shade.webp",
    bulbName: "G9 LED Bulb — Warm Dim, 4W",
    bulbPrice: "$18 each",
    bulbImage: "/assets/finish-bulb.webp",
  },
  {
    slug: "orbis-wall-light",
    name: "Orbis Wall Light",
    heroTagline:
      "A sculptural wall light designed to feel quietly expressive.",
    leadParagraph:
      "A sculptural wall light designed to feel quietly expressive. Hand-finished glass and warm metal create a soft, diffused glow, while the compact silhouette keeps the focus on material, texture and light. Available in a selection of finishes, each piece brings subtle variation and character to the space.",
    itemNumber: "FA-300021",
    leadTime: "8 Weeks",
    estShipDate: "Est. Ship Date: November 1, 2026",
    price: "From $195",
    leadLabel: "6–8 weeks",
    finishOptions: ["Aged Brass", "Brushed Brass", "Blackened Brass"],
    defaultFinish: "Brushed Brass",
    shadeOptions: ["Glass → Opal", "Glass → Smoke"],
    defaultShade: "Glass → Opal",
    sizeOptions: ["Standard", "Reduced"],
    defaultSize: "Standard",
    heroImage: "/assets/featured-orbis-main.webp",
    finishTitle: "Brushed Brass",
    gallery: defaultGallery,
    techSpecs: defaultTechSpecs,
    downloads: defaultDownloads,
    bannerImage: "/assets/aster-banner.webp",
    bannerText: defaultBannerText,
    shadeFinishes: defaultShadeFinishes,
    metalFinishes: defaultMetalFinishes,
    replacementName: "Orbis Replacement Glass",
    replacementDesc: "Hand-finished glass shade",
    replacementPrice: "$160 each",
    replacementImage: "/assets/aster-replacement-shade.webp",
    bulbName: "G9 LED Bulb — Warm Dim, 4W",
    bulbPrice: "$18 each",
    bulbImage: "/assets/finish-bulb.webp",
  },
  buildProduct({
    slug: "orbis-chandelier",
    name: "Orbis Chandelier",

    price: "From $1,795",
    heroImage: "/products/orbis-chandelier.webp",
    bannerImage: "/products/Orbis Chandelier (2).webp",
    itemSeed: "410055",
    leadWeeks: 12,
    finishName: "Aged Brass",
    leadParagraph:
      "A commanding chandelier built from concentric hand-finished glass discs and warm brass, casting a halo of soft, diffused light across the room below.",
  }),
  buildProduct({
    slug: "estelle-chandelier",
    name: "Estelle Chandelier",
    price: "From $1,995",
    heroImage: "/products/estelle-chandelier.webp",
    bannerImage: "/products/estelle-chandelier (2).webp",
    itemSeed: "410056",
    leadWeeks: 12,
    finishName: "Brushed Brass",
    leadParagraph:
      "A refined chandelier of slender brass arms and delicate opaline glass shades, arranged in a balanced radial composition that feels airy and elegant.",
  }),
  buildProduct({
    slug: "solstice-chandelier",
    name: "Solstice Chandelier",
    price: "From $2,395",
    heroImage: "/products/solstice-chandelier.webp",
    bannerImage: "/products/solstice-chandelier (3).webp",
    itemSeed: "410057",
    leadWeeks: 12,
    finishName: "Blackened Brass",
    leadParagraph:
      "A dramatic statement piece with long articulating arms and mismatched hand-blown glass vessels, balanced so every angle reads as a deliberate composition.",
  }),
  buildProduct({
    slug: "halo-chandelier",

    name: "Halo Chandelier",
    price: "From $1,595",
    heroImage: "/products/halo-chandelier.webp",
    bannerImage: "/products/Halo Chandelier (2).webp",
    itemSeed: "410058",
    leadWeeks: 12,
    finishName: "Aged Brass",
    leadParagraph:
      "A circular chandelier of concentric opal glass rings suspended from slim brass rods, casting a glowing halo of soft, diffused light around the table below.",
  }),
  buildProduct({
    slug: "aurelia-pendant",
    name: "Aurelia Pendant",

    price: "From $345",
    heroImage: "/products/aurelia-pendant.webp",
    itemSeed: "410059",
    leadWeeks: 8,
    finishName: "Aged Brass",
    leadParagraph:
      "A delicate pendant with a softly flared glass shade and a slender brass stem, designed to give a warm, flattering pool of light with a quiet, airy silhouette.",
  }),
  buildProduct({
    slug: "lumen-pendant",
    name: "Lumen Pendant",
    price: "From $295",
    heroImage: "/products/lumen-pendant.webp",
    bannerImage: "/products/Lumen Pendant (2).webp",
    itemSeed: "410060",
    leadWeeks: 8,
    finishName: "Brushed Brass",
    leadParagraph:
      "A pared-down pendant with a simple cylindrical glass shade, focused purely on material contrast between translucent glass and matte metal.",
  }),
  buildProduct({
    slug: "halo-pendant",
    name: "Halo Pendant",
    price: "From $425",
    heroImage: "/products/halo-pendant.webp",
    itemSeed: "410061",
    leadWeeks: 10,
    finishName: "Dark Bronze",
    leadParagraph:
      "A circular pendant that suspends a glowing ring of opal glass, creating a soft halo of ambient illumination around a central metallic core.",
  }),
  buildProduct({
    slug: "aster-table-lamp",
    name: "Aster Table Lamp",
    price: "From $265",
    heroImage: "/products/aster-table-lamp.webp",
    bannerImage: "/products/Aster Table Lamp (2).webp",
    itemSeed: "410062",
    leadWeeks: 8,
    finishName: "Brushed Brass",
    leadParagraph:
      "A compact table lamp with a curved stem and a rounded shade, designed to bring the softness of the Aster family to a desk or bedside table.",
  }),
  buildProduct({
    slug: "lumen-table-lamp",
    name: "Lumen Table Lamp",
    price: "From $215",
    heroImage: "/products/lumen-table-lamp.webp",
    bannerImage: "/products/Lumen Table Lamp (2).webp",
    itemSeed: "410063",
    leadWeeks: 6,
    finishName: "Aged Brass",
    leadParagraph:
      "A pared-down table lamp with a simple cylindrical glass shade and a slender matte base, focusing purely on the contrast between translucent glass and warm metal.",
  }),
  buildProduct({
    slug: "axis-linear-pendant",
    name: "Axis Linear Pendant",
    price: "From $465",
    heroImage: "/products/axis-linear-pendant.webp",
    bannerImage: "/products/Axis Linear Pendant (2).webp",
    itemSeed: "410064",
    leadWeeks: 8,
    finishName: "Dark Bronze",
    leadParagraph:
      "A long, linear pendant with evenly spaced glass shades on a slim horizontal bar, ideal for casting even light across a dining table or kitchen island.",
  }),
  buildProduct({
    slug: "orbis-floor-lamp",
    name: "Orbis Floor Lamp",
    price: "From $545",
    heroImage: "/products/orbis-floor-lamp.webp",
    bannerImage: "/products/Orbis Floor Lamp (2).webp",
    itemSeed: "410065",
    leadWeeks: 10,
    finishName: "Brushed Brass",
    leadParagraph:
      "A tall floor lamp with a rounded, softly diffused glass disc set on a slender brass column, anchoring a room while casting warm ambient light above seating.",
  }),
  buildProduct({
    slug: "arc-floor-lamp",
    name: "Arc Floor Lamp",
    price: "From $585",
    heroImage: "/products/floor-lamp.webp",
    bannerImage: "/products/floor-lamp (2).webp",
    itemSeed: "410066",
    leadWeeks: 10,
    finishName: "Brushed Brass",
    leadParagraph:
      "A sculptural floor lamp whose long stem sweeps over a comfortable arc to bring a warm, focused pool of light exactly where it is needed.",
  }),
  buildProduct({
    slug: "ember-drop-pendant",
    name: "Ember Drop Pendant",
    price: "From $365",
    heroImage: "/products/ember-drop-pendant.webp",
    bannerImage: "/products/Ember Drop Pendant (2).webp",
    itemSeed: "410067",
    leadWeeks: 8,
    finishName: "Blackened Brass",
    leadParagraph:
      "A moody drop pendant with a smoked glass globe and a dark brass collar, casting a low, amber-toned light that suits intimate corners and reading nooks.",
  }),
  buildProduct({
    slug: "orbis-table-lamp",
    name: "Orbis Table Lamp",

    price: "From $245",
    heroImage: "/products/orbis-table-lamp.webp",
    bannerImage: "/products/Orbis Table Lamp (2).webp",
    itemSeed: "410068",
    leadWeeks: 6,
    finishName: "Brushed Brass",
    leadParagraph:
      "A compact table lamp with a rounded glass disc and a warm brass stem, bringing a soft, diffused glow and a sculptural silhouette to any surface.",
  }),
  buildProduct({
    slug: "orbis-wall-sconce",

    name: "Orbis Wall Sconce",
    price: "From $185",
    heroImage: "/products/orbis-wall-sconce.webp",
    bannerImage: "/products/Orbis Wall Sconce (2).webp",
    itemSeed: "410069",
    leadWeeks: 8,
    finishName: "Brushed Brass",
    leadParagraph:
      "A sculptural wall sconce with a rounded opal glass disc and a slim brass arm, casting a soft halo of light that keeps the focus on material and texture.",
  }),
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
