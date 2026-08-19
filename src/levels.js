// levels.js — Mapas de fases sem caixas, com plataformas flutuantes, gemas espalhadas e portal warp no fim.
export const TILE_SIZE = 32;

export const LEVELS = [
  {
    id: 'SETOR 01',
    name: 'CIDADE NEON',
    theme: 'neon_city',
    skyColor: '#0a0d18',
    width: 90,
    height: 16,
    playerStart: { x: 2, y: 11 },
    portalX: 84,
    // G = Chao, P = Plataforma Flutuante, C = Gemas espalhadas, S = Espinhos, F = Portal
    map: [
      "                                                                                          ",
      "                                                                                          ",
      "                                                                                          ",
      "              C   C                                    C   C                              ",
      "             PPPPPP                                   PPPPPP                              ",
      "                                                                                          ",
      "                                C   C                                                     ",
      "                               PPPPPPP                                                    ",
      "                                                                C   C                     ",
      "        C   C                                                  PPPPPP                     ",
      "       PPPPPP         C                                                                   ",
      "                     PPP                                                                  ",
      "                                                                                  F       ",
      "GGGGGGGGGGGGGGGG   GGGGGGGGGGGGGGGGGGGGGG   SSSSSS   GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG",
      "GGGGGGGGGGGGGGGG   GGGGGGGGGGGGGGGGGGGGGG   GGGGGG   GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG",
      "GGGGGGGGGGGGGGGG   GGGGGGGGGGGGGGGGGGGGGG   GGGGGG   GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG"
    ],
    gems: [
      { x: 8, y: 9 }, { x: 11, y: 9 },
      { x: 15, y: 3 }, { x: 18, y: 3 },
      { x: 22, y: 10 },
      { x: 32, y: 5 }, { x: 35, y: 5 },
      { x: 48, y: 3 }, { x: 51, y: 3 },
      { x: 64, y: 7 }, { x: 67, y: 7 }
    ],
    enemies: [
      { type: 'drone', x: 25, y: 11 },
      { type: 'drone', x: 44, y: 11 },
      { type: 'drone', x: 62, y: 11 },
      { type: 'drone', x: 74, y: 11 }
    ]
  },
  {
    id: 'SETOR 02',
    name: 'RUÍNAS CRISTALINAS',
    theme: 'crystal_caves',
    skyColor: '#070b14',
    width: 95,
    height: 16,
    playerStart: { x: 2, y: 11 },
    portalX: 88,
    map: [
      "                                                                                         ",
      "                                                                                         ",
      "                                                                                         ",
      "             C   C                                    C   C                              ",
      "            PPPPPP                                   PPPPPP                              ",
      "                                                                                         ",
      "                                 C   C                                                   ",
      "                                PPPPPPP                                                  ",
      "                                                                 C   C                   ",
      "         C   C                                                  PPPPPP                   ",
      "        PPPPPP         C                                                                 ",
      "                      PPP                                                                ",
      "                                                                                 F       ",
      "GGGGGGGGGGGGGG   SSSSSSSS   GGGGGGGGGGGGGGGGGG   SSSSSSSS   GGGGGGGGGGGGGGGGGGGGGGGGGGGG",
      "GGGGGGGGGGGGGG   GGGGGGGG   GGGGGGGGGGGGGGGGGG   GGGGGGGG   GGGGGGGGGGGGGGGGGGGGGGGGGGGG",
      "GGGGGGGGGGGGGG   GGGGGGGG   GGGGGGGGGGGGGGGGGG   GGGGGGGG   GGGGGGGGGGGGGGGGGGGGGGGGGGGG"
    ],
    gems: [
      { x: 10, y: 9 }, { x: 13, y: 9 },
      { x: 14, y: 3 }, { x: 18, y: 3 },
      { x: 23, y: 10 },
      { x: 33, y: 5 }, { x: 37, y: 5 },
      { x: 50, y: 3 }, { x: 54, y: 3 },
      { x: 66, y: 7 }, { x: 70, y: 7 }
    ],
    enemies: [
      { type: 'drone', x: 28, y: 11 },
      { type: 'drone', x: 48, y: 11 },
      { type: 'drone', x: 68, y: 11 },
      { type: 'drone', x: 80, y: 11 }
    ]
  },
  {
    id: 'SETOR 03',
    name: 'NÚCLEO CYBER',
    theme: 'cyber_core',
    skyColor: '#120717',
    width: 100,
    height: 16,
    playerStart: { x: 2, y: 11 },
    portalX: 92,
    map: [
      "                                                                                                  ",
      "                                                                                                  ",
      "                                                                                                  ",
      "              C   C                                    C   C                                      ",
      "             PPPPPP                                   PPPPPP                                      ",
      "                                                                                                  ",
      "                                 C   C                                                            ",
      "                                PPPPPPP                                                           ",
      "                                                                 C   C                            ",
      "         C   C                                                  PPPPPP                            ",
      "        PPPPPP         C                                                                          ",
      "                      PPP                                                                         ",
      "                                                                                          F       ",
      "GGGGGGGGGGGG   SSSSSSSSSSSS   GGGGGGGGGGGGGG   SSSSSSSSSSSS   GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG",
      "GGGGGGGGGGGG   GGGGGGGGGGGG   GGGGGGGGGGGGGG   GGGGGGGGGGGG   GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG",
      "GGGGGGGGGGGG   GGGGGGGGGGGG   GGGGGGGGGGGGGG   GGGGGGGGGGGG   GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG"
    ],
    gems: [
      { x: 10, y: 9 }, { x: 13, y: 9 },
      { x: 15, y: 3 }, { x: 19, y: 3 },
      { x: 24, y: 10 },
      { x: 34, y: 5 }, { x: 38, y: 5 },
      { x: 52, y: 3 }, { x: 56, y: 3 },
      { x: 68, y: 7 }, { x: 72, y: 7 }
    ],
    enemies: [
      { type: 'drone', x: 26, y: 11 },
      { type: 'drone', x: 44, y: 11 },
      { type: 'drone', x: 64, y: 11 },
      { type: 'drone', x: 82, y: 11 }
    ]
  }
];
