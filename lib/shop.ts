export type ShopProduct = {
  name: string;
  image: string;
  price: string;
  /** slug товара Morrow, если такой уже есть на сайте → карточка ведёт на /product/[slug] */
  slug?: string;
};

export const products: ShopProduct[] = [
  /* ===== Chandeliers ===== */
  {
    name: "Aster Chandelier",
    image: "/products/aster-chandelier.webp",
    price: "From $1,295",
    slug: "aster-chandelier",
  },
  {
    name: "Halo Chandelier",
    image: "/products/halo-chandelier.webp",
    price: "From $1,595",
    slug: "halo-chandelier",
  },
  {
    name: "Orbis Chandelier",
    image: "/products/orbis-chandelier.webp",
    price: "From $1,795",
    slug: "orbis-chandelier",
  },
  {
    name: "Estelle Chandelier",
    image: "/products/estelle-chandelier.webp",
    price: "From $1,995",
    slug: "estelle-chandelier",
  },
  {
    name: "Solstice Chandelier",
    image: "/products/solstice-chandelier.webp",
    price: "From $2,395",
    slug: "solstice-chandelier",
  },

  /* ===== Pendants ===== */
  {
    name: "Lumen Pendant",
    image: "/products/lumen-pendant.webp",
    price: "From $295",
    slug: "lumen-pendant",
  },
  {
    name: "Halo Pendant",
    image: "/products/halo-pendant.webp",
    price: "From $425",
    slug: "halo-pendant",
  },
  {
    name: "Ember Drop Pendant",
    image: "/products/ember-drop-pendant.webp",
    price: "From $365",
    slug: "ember-drop-pendant",
  },
  {
    name: "Aurelia Pendant",
    image: "/products/aurelia-pendant.webp",
    price: "From $345",
    slug: "aurelia-pendant",
  },
  {
    name: "Axis Linear Pendant",
    image: "/products/axis-linear-pendant.webp",
    price: "From $465",
    slug: "axis-linear-pendant",
  },

  /* ===== Table Lamps ===== */
  {
    name: "Lumen Table Lamp",
    image: "/products/lumen-table-lamp.webp",
    price: "From $215",
    slug: "lumen-table-lamp",
  },
  {
    name: "Orbis Table Lamp",
    image: "/products/orbis-table-lamp.webp",
    price: "From $245",
    slug: "orbis-table-lamp",
  },
  {
    name: "Aster Table Lamp",
    image: "/products/aster-table-lamp.webp",
    price: "From $265",
    slug: "aster-table-lamp",
  },

  /* ===== Floor Lamps ===== */
  {
    name: "Arc Floor Lamp",
    image: "/products/floor-lamp.webp",
    price: "From $585",
    slug: "arc-floor-lamp",
  },
  {
    name: "Orbis Floor Lamp",
    image: "/products/orbis-floor-lamp.webp",
    price: "From $545",
    slug: "orbis-floor-lamp",
  },

  /* ===== Wall Lights ===== */
  {
    name: "Orbis Wall Sconce",
    image: "/products/orbis-wall-sconce.webp",
    price: "From $185",
    slug: "orbis-wall-sconce",
  },
];

/* ===== Категории, выводимые в боковом меню и в фильтре «Light:» ===== */
export type Category =
  | "All"
  | "Chandeliers"
  | "Pendants"
  | "Wall Lights"
  | "Ceiling Lights"
  | "Table Lamps"
  | "Floor Lamps";

export const categories: Category[] = [
  "All",
  "Chandeliers",
  "Pendants",
  "Wall Lights",
  "Ceiling Lights",
  "Table Lamps",
  "Floor Lamps",
];

/* ===== Ключевые слова для определения категории по названию ===== */
const KEYWORDS: { category: Category; words: string[] }[] = [
  { category: "Chandeliers", words: ["chandelier"] },
  { category: "Pendants", words: ["pendant"] },
  { category: "Wall Lights", words: ["sconce"] },
  { category: "Ceiling Lights", words: ["flush mount", "surface mount", "ceiling"] },
  { category: "Table Lamps", words: ["table lamp"] },
  { category: "Floor Lamps", words: ["floor lamp"] },
];

/** Возвращает категорию товара по ключевым словам в названии. */
export function categoryOf(product: Pick<ShopProduct, "name">): Category {
  const name = product.name.toLowerCase();

  // Приоритет — более специфичные категории, поэтому идём от конкретных.
  for (const { category, words } of KEYWORDS) {
    if (words.some((w) => name.includes(w))) return category;
  }
  return "All";
}

/** Фильтрует товары по категории. */
export function filterByCategory(
  list: ShopProduct[],
  category: Category,
): ShopProduct[] {
  if (category === "All") return list;
  return list.filter((p) => categoryOf(p) === category);
}

/* ===== Данные для раскрывающейся панели «Filter» ===== */
export const materials = [
  "Brass",
  "Glass",
  "Alabaster Glass",
  "Ceramic",
  "Stone",
  "Wood",
];

export const leadTimes = [
  "Ready to Ship",
  "2–4 Weeks",
  "6–8 Weeks",
  "8–10 Weeks",
  "Made to Order",
];

/** Приводит слово к единственному числу для сопоставления с материалами. */
function singularize(word: string): string {
  return word.endsWith("s") ? word.slice(0, -1) : word;
}

/** Проверяет совпадение материала с названием товара. */
export function matchesMaterial(
  product: Pick<ShopProduct, "name">,
  material: string,
): boolean {
  const needle = material.toLowerCase().replace(/[\s–-]+/g, " ");
  const name = product.name.toLowerCase().replace(/[\s–-]+/g, " ");
  return (
    name.includes(needle) || name.includes(singularize(needle))
  );
}


