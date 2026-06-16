// ─────────────────────────────────────────────────────────────────────────────
// WINE SELECTION / SHOP — placeholder data for Cellar
// Owner: edit this list to update the bottles shown on the site and in the shop.
//   name, region, grape   — text
//   type                  — stable key used for shop filters
//                           ('sparkling' | 'orange' | 'rose' | 'red' | 'white')
//   style                 — display label per language (EN/NL)
//   color                 — bottle illustration colour
//   price                 — bottle price (€)
//   note                  — fun tasting note per language (EN/NL)
// ─────────────────────────────────────────────────────────────────────────────

export const wines = [
  {
    id: 'cellar-door',
    name: 'Cellar Door',
    region: 'Loire, France',
    grape: 'Chenin Blanc',
    type: 'sparkling',
    style: { en: 'Sparkling', nl: 'Bruisend' },
    color: '#e7d27a',
    price: 29,
    note: {
      en: 'Fizzy, fresh and a little wild. Green apple and a Saturday-morning mood.',
      nl: 'Bruisend, fris en een tikje wild. Groene appel en een zaterdagochtend-gevoel.',
    },
  },
  {
    id: 'sunday-orange',
    name: 'Sunday Orange',
    region: 'Sicily, Italy',
    grape: 'Catarratto',
    type: 'orange',
    style: { en: 'Orange', nl: 'Oranje' },
    color: '#e08a2b',
    price: 33,
    note: {
      en: 'Skin-contact and sunny. Apricot, tea and a gentle, grippy finish.',
      nl: 'Skin-contact en zonnig. Abrikoos, thee en een zachte, grippige finish.',
    },
  },
  {
    id: 'pink-brick',
    name: 'Pink Brick',
    region: 'Provence, France',
    grape: 'Cinsault',
    type: 'rose',
    style: { en: 'Rosé', nl: 'Rosé' },
    color: '#e9a0a6',
    price: 28,
    note: {
      en: 'Pale, dry and dangerously easy. Wild strawberry on a warm evening.',
      nl: 'Bleek, droog en gevaarlijk easy. Wilde aardbei op een warme avond.',
    },
  },
  {
    id: 'easy-red',
    name: 'Easy Red',
    region: 'Beaujolais, France',
    grape: 'Gamay',
    type: 'red',
    style: { en: 'Red', nl: 'Rood' },
    color: '#9e2236',
    price: 30,
    note: {
      en: 'Chillable red with a cheeky crunch. Cherry, pepper, pure fun.',
      nl: 'Koel te drinken rood met een brutale crunch. Kers, peper, puur plezier.',
    },
  },
  {
    id: 'slate-and-smoke',
    name: 'Slate & Smoke',
    region: 'Bierzo, Spain',
    grape: 'Mencía',
    type: 'red',
    style: { en: 'Red', nl: 'Rood' },
    color: '#5a1020',
    price: 32,
    note: {
      en: 'Dark, smoky and soulful. Blackberry, slate and a slow finish.',
      nl: 'Donker, rokerig en met ziel. Braam, leisteen en een trage finish.',
    },
  },
  {
    id: 'volcanic-white',
    name: 'Volcanic White',
    region: 'Tenerife, Spain',
    grape: 'Listán Blanco',
    type: 'white',
    style: { en: 'White', nl: 'Wit' },
    color: '#ece2bf',
    price: 35,
    note: {
      en: 'Salty, mineral and alive. Like a sea breeze in a glass (in a good way).',
      nl: 'Zilt, mineraal en levendig. Als een zeebries in een glas (op een goede manier).',
    },
  },
  {
    id: 'morning-bubbles',
    name: 'Morning Bubbles',
    region: 'Penedès, Spain',
    grape: 'Xarel·lo',
    type: 'sparkling',
    style: { en: 'Sparkling', nl: 'Bruisend' },
    color: '#ecdf9a',
    price: 27,
    note: {
      en: 'Crisp, citrusy bubbles for any hour. Brunch in a glass.',
      nl: 'Knisperende, citrusachtige bubbels voor elk uur. Brunch in een glas.',
    },
  },
  {
    id: 'amber-alley',
    name: 'Amber Alley',
    region: 'Friuli, Italy',
    grape: 'Friulano',
    type: 'orange',
    style: { en: 'Orange', nl: 'Oranje' },
    color: '#d98a3c',
    price: 31,
    note: {
      en: 'Bold skin-contact with nutty depth and a honeyed edge.',
      nl: 'Stevige skin-contact met nootachtige diepte en een honingrandje.',
    },
  },
  {
    id: 'coral-crush',
    name: 'Coral Crush',
    region: 'Loire, France',
    grape: 'Grolleau',
    type: 'rose',
    style: { en: 'Rosé', nl: 'Rosé' },
    color: '#eaa6ac',
    price: 26,
    note: {
      en: 'Juicy, floral and feather-light. Sunset on the terrace.',
      nl: 'Sappig, bloemig en vederlicht. Zonsondergang op het terras.',
    },
  },
  {
    id: 'velvet-night',
    name: 'Velvet Night',
    region: 'Douro, Portugal',
    grape: 'Touriga Nacional',
    type: 'red',
    style: { en: 'Red', nl: 'Rood' },
    color: '#6a142a',
    price: 34,
    note: {
      en: 'Deep, dark and velvety. Plum, cocoa and a warm hug.',
      nl: 'Diep, donker en fluweelzacht. Pruim, cacao en een warme knuffel.',
    },
  },
  {
    id: 'sea-salt-white',
    name: 'Sea Salt White',
    region: 'Vinho Verde, Portugal',
    grape: 'Loureiro',
    type: 'white',
    style: { en: 'White', nl: 'Wit' },
    color: '#e6e6c8',
    price: 24,
    note: {
      en: 'Zippy, low-alcohol and gulpable. Lemon and a salty breeze.',
      nl: 'Pittig, laag in alcohol en vlot wegdrinkbaar. Citroen en een zilte bries.',
    },
  },
  {
    id: 'hilltop-pinot',
    name: 'Hilltop Pinot',
    region: 'Pfalz, Germany',
    grape: 'Pinot Noir',
    type: 'red',
    style: { en: 'Red', nl: 'Rood' },
    color: '#8c2030',
    price: 36,
    note: {
      en: 'Silky and elegant with red cherry and a whisper of spice.',
      nl: 'Zijdezacht en elegant met rode kers en een vleugje kruidigheid.',
    },
  },
]
