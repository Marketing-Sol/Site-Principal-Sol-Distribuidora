export type ProductSpec = {
  technology: string;
  voltage: string;
  capacity: string;
  capacityByRate?: {
    c10: string;
    c20: string;
    c100: string;
  };
  cca: string;
  reserveCapacity?: string;
  sourceNote?: string;
  sourceHref?: string;
  sourceLinks?: Array<{ label: string; href: string }>;
  dimensions?: string;
  weight: string;
  warranty: string;
  description: string;
};

export const productSpecKey = (brand: string, model: string) => `${brand}|${model}`;

export const PRODUCT_SPECS: Record<string, ProductSpec> = {
    "Freedom|DF300":  {
                          "technology":  "Estacionária chumbo-ácido ventilada",
                          "voltage":  "12 V",
                          "capacity":  "24 Ah (C10) · 26 Ah (C20) · 30 Ah (C100)",
                          "capacityByRate":  { "c10": "24 Ah", "c20": "26 Ah", "c100": "30 Ah" },
                          "cca":  "-",
                          "dimensions":  "175 × 175 × 175 mm (C × L × A)",
                          "weight":  "8,9 kg",
                          "warranty":  "24 meses",
                          "description":  "Bateria estacionária de 12 V para sistemas de energia de reserva, com 24 Ah em C10, 26 Ah em C20 e 30 Ah em C100. Compare sempre produtos no mesmo regime de descarga e confirme as condições do sistema antes de estimar a autonomia."
                      },
    "Freedom|DF500":  {
                          "technology":  "Estacionária chumbo-ácido ventilada",
                          "voltage":  "12 V",
                          "capacity":  "30 Ah (C10) · 36 Ah (C20) · 40 Ah (C100)",
                          "capacityByRate":  { "c10": "30 Ah", "c20": "36 Ah", "c100": "40 Ah" },
                          "cca":  "-",
                          "dimensions":  "175 × 175 × 175 mm (C × L × A)",
                          "weight":  "9,6 kg",
                          "warranty":  "24 meses",
                          "description":  "Bateria estacionária de 12 V para sistemas de energia de reserva, com 30 Ah em C10, 36 Ah em C20 e 40 Ah em C100. Compare sempre produtos no mesmo regime de descarga e confirme as condições do sistema antes de estimar a autonomia."
                      },
    "Freedom|DF700":  {
                          "technology":  "Estacionária chumbo-ácido ventilada",
                          "voltage":  "12 V",
                          "capacity":  "41 Ah (C10) · 45 Ah (C20) · 50 Ah (C100)",
                          "capacityByRate":  { "c10": "41 Ah", "c20": "45 Ah", "c100": "50 Ah" },
                          "cca":  "-",
                          "dimensions":  "210 × 175 × 175 mm (C × L × A)",
                          "weight":  "12,3 kg",
                          "warranty":  "24 meses",
                          "description":  "Bateria estacionária de 12 V para sistemas de energia de reserva, com 41 Ah em C10, 45 Ah em C20 e 50 Ah em C100. Compare sempre produtos no mesmo regime de descarga e confirme as condições do sistema antes de estimar a autonomia."
                      },
    "Freedom|DF1000":  {
                           "technology":  "Estacionária chumbo-ácido ventilada",
                           "voltage":  "12 V",
                           "capacity":  "54 Ah (C10) · 60 Ah (C20) · 70 Ah (C100)",
                           "capacityByRate":  { "c10": "54 Ah", "c20": "60 Ah", "c100": "70 Ah" },
                           "cca":  "-",
                           "dimensions":  "242 × 175 × 175 mm (C × L × A)",
                           "weight":  "15 kg",
                           "warranty":  "24 meses",
                           "description":  "Bateria estacionária para sistemas de energia de reserva. As capacidades variam conforme o regime de descarga: 54 Ah em C10, 60 Ah em C20 e 70 Ah em C100. Compare sempre produtos no mesmo regime e considere a carga, as condições de operação e os limites do sistema ao estimar a autonomia."
                       },
    "Freedom|DF1500":  {
                           "technology":  "Estacionária chumbo-ácido ventilada",
                           "voltage":  "12 V",
                           "capacity":  "76 Ah (C10) · 80 Ah (C20) · 93 Ah (C100)",
                           "capacityByRate":  { "c10": "76 Ah", "c20": "80 Ah", "c100": "93 Ah" },
                           "cca":  "-",
                           "dimensions":  "330 × 172 × 240 mm (C × L × A)",
                           "weight":  "23,9 kg",
                           "warranty":  "24 meses",
                           "description":  "Bateria estacionária de 12 V para sistemas de energia de reserva, com 76 Ah em C10, 80 Ah em C20 e 93 Ah em C100. Compare sempre produtos no mesmo regime de descarga e confirme as condições do sistema antes de estimar a autonomia."
                       },
    "Freedom|DF2000":  {
                           "technology":  "Estacionária chumbo-ácido ventilada",
                           "voltage":  "12 V",
                           "capacity":  "94 Ah (C10) · 105 Ah (C20) · 115 Ah (C100)",
                           "capacityByRate":  { "c10": "94 Ah", "c20": "105 Ah", "c100": "115 Ah" },
                           "cca":  "-",
                           "dimensions":  "330 × 172 × 240 mm (C × L × A)",
                           "weight":  "27,3 kg",
                           "warranty":  "24 meses",
                           "description":  "Bateria estacionária de 12 V para sistemas de energia de reserva, com 94 Ah em C10, 105 Ah em C20 e 115 Ah em C100. Compare sempre produtos no mesmo regime de descarga e confirme as condições do sistema antes de estimar a autonomia."
                       },
    "Freedom|DF2500":  {
                           "technology":  "Estacionária chumbo-ácido ventilada",
                           "voltage":  "12 V",
                           "capacity":  "130 Ah (C10) · 150 Ah (C20) · 165 Ah (C100)",
                           "capacityByRate":  { "c10": "130 Ah", "c20": "150 Ah", "c100": "165 Ah" },
                           "cca":  "-",
                           "dimensions":  "510 × 213 × 230 mm (C × L × A)",
                           "weight":  "42 kg",
                           "warranty":  "24 meses",
                           "description":  "Bateria estacionária de 12 V para sistemas de energia de reserva, com 130 Ah em C10, 150 Ah em C20 e 165 Ah em C100. Compare sempre produtos no mesmo regime de descarga e confirme as condições do sistema antes de estimar a autonomia."
                       },
    "Freedom|DF3000":  {
                           "technology":  "Estacionária chumbo-ácido ventilada",
                           "voltage":  "12 V",
                           "capacity":  "156 Ah (C10) · 170 Ah (C20) · 185 Ah (C100)",
                           "capacityByRate":  { "c10": "156 Ah", "c20": "170 Ah", "c100": "185 Ah" },
                           "cca":  "-",
                           "dimensions":  "511 × 213 × 230 mm (C × L × A)",
                           "weight":  "48,3 kg",
                           "warranty":  "24 meses",
                           "description":  "Bateria estacionária de 12 V para sistemas de energia de reserva, com 156 Ah em C10, 170 Ah em C20 e 185 Ah em C100. Compare sempre produtos no mesmo regime de descarga e confirme as condições do sistema antes de estimar a autonomia."
                       },
    "Freedom|DF4100":  {
                           "technology":  "Estacionária chumbo-ácido ventilada",
                           "voltage":  "12 V",
                           "capacity":  "200 Ah (C10) · 220 Ah (C20) · 240 Ah (C100)",
                           "capacityByRate":  { "c10": "200 Ah", "c20": "220 Ah", "c100": "240 Ah" },
                           "cca":  "-",
                           "dimensions":  "530 × 280 × 246 mm (C × L × A)",
                           "weight":  "60,3 kg",
                           "warranty":  "24 meses",
                           "description":  "Bateria estacionária de 12 V para sistemas de energia de reserva, com 200 Ah em C10, 220 Ah em C20 e 240 Ah em C100. Compare sempre produtos no mesmo regime de descarga e dimensione a autonomia conforme a carga e as condições do sistema."
                       },
    "eCON|EGM60HD-24":  {
                            "technology":  "AGM",
                            "voltage":  "12 V",
                            "capacity":  "60 Ah (C20)",
                            "cca":  "600 A a −18 °C",
                            "reserveCapacity": "110 min",
                            "dimensions":  "241 x 174 x 190 mm",
                            "weight":  "18,60 kg",
                            "sourceNote": "Fonte: Registro Inmetro 010090/2026, inclusão de 17/08/2026.",
                            "sourceHref": "https://registro.inmetro.gov.br/consulta/detalhe.aspx?NumeroRegistro=010090%2F2026&pag=1",
                            "warranty":  "24 meses",
                            "description":  "Bateria AGM de 12 V com 60 Ah em C20 e corrente de partida de 600 A a −18 °C. Reserva: 110 min; dimensões: 241 × 174 × 190 mm; peso: 18,60 kg.",
                        },
    "eCON|EGM70PD-24":  {
                            "technology":  "AGM",
                            "voltage":  "12 V",
                            "capacity":  "70 Ah (C20)",
                            "cca":  "760 A a −18 °C",
                            "reserveCapacity": "140 min",
                            "dimensions":  "278 x 174 x 190 mm",
                            "weight":  "21,2 kg",
                            "sourceNote": "Fonte: Registro Inmetro 010092/2026, inclusão de 17/08/2026.",
                            "sourceHref": "https://registro.inmetro.gov.br/consulta/detalhe.aspx?NumeroRegistro=010092%2F2026&pag=1",
                            "warranty":  "24 meses",
                            "description":  "Bateria AGM de 12 V com 70 Ah em C20 e corrente de partida de 760 A a −18 °C. Reserva: 140 min; dimensões: 278 × 174 × 190 mm; peso: 21,20 kg."
                        },
    "eCON|EGM80KD-24":  {
                            "technology":  "AGM",
                            "voltage":  "12 V",
                            "capacity":  "80 Ah (C20)",
                            "cca":  "800 A a −18 °C",
                            "reserveCapacity": "160 min",
                            "dimensions":  "314 x 174 x 190 mm",
                            "weight":  "23,42 kg",
                            "sourceNote": "Fonte: Registro Inmetro 010092/2026, inclusão de 17/08/2026.",
                            "sourceHref": "https://registro.inmetro.gov.br/consulta/detalhe.aspx?NumeroRegistro=010092%2F2026&pag=1",
                            "warranty":  "24 meses",
                            "description":  "Bateria AGM de 12 V com 80 Ah em C20 e corrente de partida de 800 A a −18 °C. Reserva: 160 min; dimensões: 314 × 174 × 190 mm; peso: 23,42 kg."
                        },
    "eCON|EGM92MD-24":  {
                            "technology":  "AGM",
                            "voltage":  "12 V",
                            "capacity":  "92 Ah (C20)",
                            "cca":  "800 A a −18 °C",
                            "reserveCapacity": "170 min",
                            "dimensions":  "352 x 175 x 190 mm",
                            "weight":  "26,8 kg",
                            "sourceNote": "Fonte: Registro Inmetro 002416/2021, inclusão de 03/01/2025.",
                            "sourceHref": "https://registro.inmetro.gov.br/consulta/detalhe.aspx?NumeroRegistro=002416%2F2021&pag=1",
                            "warranty":  "24 meses",
                            "description":  "Bateria AGM de 12 V com 92 Ah em C20 e corrente de partida de 800 A a −18 °C. Reserva: 170 min; dimensões: 352 × 175 × 190 mm; peso: 26,80 kg."
                        },
    "eCON|EFB50GD-24":  {
                            "technology":  "EFB",
                            "voltage":  "12 V",
                            "capacity":  "50 Ah (C20)",
                            "cca":  "540 A a −18 °C",
                            "reserveCapacity": "70 min",
                            "dimensions":  "207 x 175 x 190 mm",
                            "weight":  "14,4 kg",
                            "sourceNote": "Fonte: certificado de conformidade Tudor BR35857003, modelo eCON EFB50GD-24.",
                            "sourceHref": "https://www.tudor.com.br/assets/img/certificados/pdf/certificado-bauru-1.pdf",
                            "warranty":  "24 meses",
                            "description":  "Bateria EFB de 12 V com 50 Ah em C20 e corrente de partida de 540 A a −18 °C. Reserva: 70 min; dimensões: 207 × 175 × 190 mm; peso: 14,4 kg."
                        },
    "eCON|EFB60HD-24":  {
                            "technology":  "EFB",
                            "voltage":  "12 V",
                            "capacity":  "60 Ah (C20)",
                            "cca":  "570 A a −18 °C",
                            "reserveCapacity": "100 min",
                            "dimensions":  "241 x 175 x 190 mm",
                            "weight":  "16,85 kg",
                            "sourceNote": "Fonte: Registro Inmetro 006389/2013, inclusão de 06/01/2025.",
                            "sourceHref": "https://registro.inmetro.gov.br/consulta/detalhe.aspx?NumeroRegistro=006389%2F2013&pag=1",
                            "warranty":  "24 meses",
                            "description":  "Bateria EFB de 12 V com 60 Ah em C20 e corrente de partida de 570 A a −18 °C. Reserva: 100 min; dimensões: 241 × 175 × 190 mm; peso: 16,85 kg.",
                        },
    "eCON|EFB72PD-24":  {
                            "technology":  "EFB",
                            "voltage":  "12 V",
                            "capacity":  "72 Ah (C20)",
                            "cca":  "650 A a −18 °C",
                            "reserveCapacity": "115 min",
                            "dimensions":  "277 x 175 x 190 mm",
                            "weight":  "19,32 kg",
                            "sourceNote": "Fonte: Registro Inmetro 006082/2013, inclusão de 06/01/2025.",
                            "sourceHref": "https://registro.inmetro.gov.br/consulta/detalhe.aspx?NumeroRegistro=006082%2F2013&pag=1",
                            "warranty":  "24 meses",
                            "description":  "Bateria EFB de 12 V com 72 Ah em C20 e corrente de partida de 650 A a −18 °C. Reserva: 115 min; dimensões: 277 × 175 × 190 mm; peso: 19,32 kg."
                        },
    "eCON|E45BD-18":  {
                          "technology":  "SLI",
                          "voltage":  "12 V",
                          "capacity":  "45 Ah (C20)",
                          "cca":  "350 A a −18 °C",
                          "reserveCapacity": "60 min",
                          "dimensions":  "208 x 172 x 172 mm",
                          "weight":  "11,6 kg",
                          "sourceNote": "Fonte: tabela técnica eCON e cadastro de produtos Baterlife, 2025, modelo E45BD-18.",
                          "warranty":  "18 meses",
                          "description":  "Bateria convencional de 12 V com 45 Ah em C20 e corrente de partida de 350 A a −18 °C. Reserva: 60 min; dimensões: 208 × 172 × 172 mm; peso: 11,6 kg.",
                      },
    "eCON|E50GD-18":  {
                          "technology":  "SLI",
                          "voltage":  "12 V",
                          "capacity":  "50 Ah (C20)",
                          "cca":  "390 A a −18 °C",
                          "reserveCapacity": "65 min",
                          "dimensions":  "208 x 172 x 189 mm",
                          "weight":  "12,6 kg",
                          "sourceNote": "Fonte: tabela técnica eCON e cadastro de produtos Baterlife, 2025, modelo E50GD-18.",
                          "warranty":  "18 meses",
                          "description":  "Bateria convencional de 12 V com 50 Ah em C20 e corrente de partida de 390 A a −18 °C. Reserva: 65 min; dimensões: 208 × 172 × 189 mm; peso: 12,6 kg."
                      },
    "eCON|E60DD-18":  {
                          "technology":  "SLI",
                          "voltage":  "12 V",
                          "capacity":  "60 Ah (C20)",
                          "cca":  "430 A a −18 °C",
                          "reserveCapacity": "90 min",
                          "dimensions":  "238 x 175 x 175 mm",
                          "weight":  "13,7 kg",
                          "sourceNote": "Fonte: tabela técnica eCON e cadastro de produtos Baterlife, 2025, modelo E60DD-18.",
                          "warranty":  "18 meses",
                          "description":  "Bateria convencional de 12 V com 60 Ah em C20 e corrente de partida de 430 A a −18 °C. Reserva: 90 min; dimensões: 238 × 175 × 175 mm; peso: 13,7 kg."
                      },
    "eCON|E60HD-18":  {
                          "technology":  "SLI",
                          "voltage":  "12 V",
                          "capacity":  "60 Ah (C20)",
                          "cca":  "485 A a −18 °C",
                          "reserveCapacity": "90 min",
                          "dimensions":  "238 x 175 x 189 mm",
                          "weight":  "14,5 kg",
                          "sourceNote": "Corrente de partida, reserva e peso: Registro Inmetro 000034/2014, inclusão de 13/01/2025. Dimensões: tabela técnica eCON.",
                          "sourceHref": "https://registro.inmetro.gov.br/consulta/detalhe.aspx?NumeroRegistro=000034%2F2014&pag=20",
                          "warranty":  "18 meses",
                          "description":  "Bateria convencional de 12 V com 60 Ah em C20 e corrente de partida de 485 A a −18 °C. Reserva: 90 min; dimensões: 238 × 175 × 189 mm; peso: 14,5 kg."
                      },
    "eCON|E70ND-15":  {
                          "technology":  "SLI",
                          "voltage":  "12 V",
                          "capacity":  "70 Ah (C20)",
                          "cca":  "560 A a −18 °C",
                          "reserveCapacity": "110 min",
                          "dimensions":  "275 x 175 x 175 mm",
                          "weight":  "17,2 kg",
                          "sourceNote": "Fonte: catálogo técnico eCON, modelo E70ND-15.",
                          "warranty":  "15 meses",
                          "description":  "Bateria convencional de 12 V com 70 Ah em C20 e corrente de partida de 560 A a −18 °C. Reserva: 110 min; dimensões: 275 × 175 × 175 mm; peso: 17,2 kg."
                      },
    "eCON|E95MD-15":  {
                          "technology":  "SLI / Convencional",
                          "voltage":  "12 V",
                          "capacity":  "95 Ah (C20)",
                          "cca":  "720 A a −18 °C",
                          "reserveCapacity": "175 min",
                          "dimensions":  "350 x 174 x 189 mm",
                          "weight":  "23,2 kg",
                          "sourceNote": "Fonte: relação de produtos certificados do Inmetro publicada pelo município de Monte Alto, código Baterlife E95MD-15.",
                          "sourceHref": "https://montealto.sp.gov.br/site/wp-content/uploads/2025/08/Docs-da-Empresa-Ravi_Todos.pdf",
                          "warranty":  "15 meses",
                          "description":  "Bateria convencional de 12 V com 95 Ah em C20 e corrente de partida de 720 A a −18 °C. Reserva: 175 min; dimensões: 350 × 174 × 189 mm; peso: 23,2 kg.",
                      },
    "eCON|ES100LE-15":  {
                            "technology":  "SLI / Convencional",
                            "voltage":  "12 V",
                            "capacity":  "100 Ah (C20)",
                            "cca":  "700 A a −18 °C",
                            "reserveCapacity": "170 min",
                            "dimensions":  "328 x 172 x 242 mm",
                            "weight":  "25,5 kg",
                            "sourceNote": "Fonte: tabela técnica eCON e cadastro de produtos Baterlife, 2025, modelo ES100LE-15.",
                            "warranty":  "15 meses",
                            "description":  "Bateria convencional de 12 V com 100 Ah em C20 e corrente de partida de 700 A a −18 °C. Reserva: 170 min; dimensões: 328 × 172 × 242 mm; peso: 25,5 kg."
                        },
    "eCON|EM100LE-12":  {
                            "technology":  "Frota",
                            "voltage":  "12 V",
                            "capacity":  "100 Ah (C20)",
                            "cca":  "700 A a −18 °C",
                            "reserveCapacity": "175 min",
                            "dimensions":  "344 x 172 x 240 mm",
                            "weight":  "26,4 kg",
                            "sourceNote": "Fonte: relação de produtos certificados do Inmetro publicada pelo município de Monte Alto, código Baterlife EM100LE-12.",
                            "sourceHref": "https://montealto.sp.gov.br/site/wp-content/uploads/2025/08/Docs-da-Empresa-Ravi_Todos.pdf",
                            "warranty":  "12 meses",
                            "description":  "Bateria de 12 V para aplicações de frota, com 100 Ah em C20 e corrente de partida de 700 A a −18 °C. Reserva: 175 min; dimensões: 344 × 172 × 240 mm; peso: 26,4 kg."
                        },
    "eCON|E150TD-12":  {
                           "technology":  "Frota",
                           "voltage":  "12 V",
                           "capacity":  "150 Ah (C20)",
                           "cca":  "900 A a −18 °C",
                           "reserveCapacity": "280 min",
                           "dimensions":  "508 x 215 x 230 mm",
                           "weight":  "39 kg",
                           "sourceNote": "Fonte: tabela técnica eCON e cadastro de produtos Baterlife, 2025, modelo E150TD-12.",
                           "warranty":  "12 meses",
                           "description":  "Bateria de 12 V para aplicações de frota, com 150 Ah em C20 e corrente de partida de 900 A a −18 °C. Reserva: 280 min; dimensões: 508 × 215 × 230 mm; peso: 39 kg."
                       },
    "eCON|ES150TD-15":  {
                            "technology":  "SLI / Convencional",
                            "voltage":  "12 V",
                            "capacity":  "150 Ah (C20)",
                            "cca":  "950 A a −18 °C",
                            "reserveCapacity": "285 min",
                            "dimensions":  "508 x 215 x 230 mm",
                            "weight":  "40,5 kg",
                            "sourceNote": "Fonte: tabela técnica eCON e cadastro de produtos Baterlife, 2025, modelo ES150TD-15.",
                            "warranty":  "15 meses",
                            "description":  "Bateria convencional de 12 V com 150 Ah em C20 e corrente de partida de 950 A a −18 °C. Reserva: 285 min; dimensões: 508 × 215 × 230 mm; peso: 40,5 kg."
                        },
    "eCON|E180TD-12":  {
                           "technology":  "Frota",
                           "voltage":  "12 V",
                           "capacity":  "180 Ah (C20)",
                           "cca":  "1.150 A a −18 °C",
                           "reserveCapacity": "360 min",
                           "dimensions":  "508 x 215 x 230 mm",
                           "weight":  "44,0 kg",
                           "sourceNote": "Corrente de partida, reserva e peso: Registro Inmetro 003656/2018, inclusão de 10/04/2026. Dimensões: tabela técnica eCON.",
                           "sourceHref": "https://registro.inmetro.gov.br/consulta/detalhe.aspx?NumeroRegistro=003656%2F2018&pag=100",
                           "warranty":  "12 meses",
                           "description":  "Bateria de 12 V para aplicações de frota, com 180 Ah em C20 e corrente de partida de 1.150 A a −18 °C. Reserva: 360 min; dimensões: 508 × 215 × 230 mm; peso: 44,0 kg."
                       },
    "eCON|E180TE-12":  {
                           "technology":  "Frota",
                           "voltage":  "12 V",
                           "capacity":  "180 Ah (C20)",
                           "cca":  "1.150 A a −18 °C",
                           "reserveCapacity": "360 min",
                           "dimensions":  "508 x 215 x 230 mm",
                           "weight":  "44,0 kg",
                           "sourceNote": "Corrente de partida, reserva e peso: Registro Inmetro 003656/2018, inclusão de 10/04/2026. Dimensões: tabela técnica eCON.",
                           "sourceHref": "https://registro.inmetro.gov.br/consulta/detalhe.aspx?NumeroRegistro=003656%2F2018&pag=100",
                           "warranty":  "12 meses",
                           "description":  "Bateria de 12 V para aplicações de frota, com 180 Ah em C20 e corrente de partida de 1.150 A a −18 °C. Reserva: 360 min; dimensões: 508 × 215 × 230 mm; peso: 44,0 kg."
                       },
    "Heliar|HAGM60HD":  {
                            "technology":  "AGM",
                            "voltage":  "12 V",
                            "capacity":  "60 Ah (C20)",
                            "cca":  "600 A a −18 °C",
                            "reserveCapacity": "100 min",
                            "dimensions":  "242 × 175 × 190 mm (C × L × A)",
                            "weight":  "17,7 kg",
                            "sourceNote": "Fonte: Registros Inmetro 007078/2021 e 009443/2014; CCA a −18 °C e reserva de capacidade conforme cadastro.",
                            "sourceHref": "https://registro.inmetro.gov.br/consulta/detalhe.aspx?NumeroRegistro=007078%2F2021&pag=1",
                            "warranty":  "24 meses",
                            "description":  "Bateria Heliar AGM com 60 Ah (C20), 600 A de CCA e 24 meses de garantia. É indicada para veículos compatíveis com start-stop avançado ou alta demanda elétrica. Confirme sempre a equivalência e as dimensões vigentes antes de fechar a venda."
                        },
    "Heliar|HAGM70PD":  {
                            "technology":  "AGM",
                            "voltage":  "12 V",
                            "capacity":  "70 Ah (C20)",
                            "cca":  "760 CCA",
                            "dimensions":  "281 x 175 x 190 mm",
                            "weight":  "20,4 kg",
                            "warranty":  "24 meses",
                            "description":  "Produto Heliar com 120 Ah (C20) e 760 CCA, uma combinação que apoia uma indicação segura para a faixa de demanda elétrica correspondente. O HAGM70PD oferece 24 meses de garantia e permite apoiar a venda em atributos reconhecidos da marca: PowerFrame, tradição em equipamento original e ampla cobertura de aplicações. Confirme sempre a equivalência do modelo antes de fechar a venda."
                        },
    "Heliar|HAGM80KD":  {
                            "technology":  "AGM",
                            "voltage":  "12 V",
                            "capacity":  "80 Ah (C20)",
                            "cca":  "800 CCA",
                            "dimensions":  "315 x 175 x 190 mm",
                            "weight":  "22,2 kg",
                            "warranty":  "24 meses",
                            "description":  "Produto Heliar com 80 Ah (C20) e 800 CCA, uma combinação que apoia uma indicação segura para a faixa de demanda elétrica correspondente. O HAGM80KD oferece 24 meses de garantia e permite apoiar a venda em atributos reconhecidos da marca: PowerFrame, tradição em equipamento original e ampla cobertura de aplicações. Confirme sempre a equivalência do modelo antes de fechar a venda."
                        },
    "Heliar|HAGM95MD":  {
                            "technology":  "AGM",
                            "voltage":  "12 V",
                            "capacity":  "95 Ah (C20)",
                            "cca":  "850 CCA",
                            "dimensions":  "353 x 175 x 190 mm",
                            "weight":  "26,1 kg",
                            "warranty":  "24 meses",
                            "description":  "Produto Heliar com 95 Ah (C20) e 850 CCA, uma combinação que apoia uma indicação segura para a faixa de demanda elétrica correspondente. O HAGM95MD oferece 24 meses de garantia e permite apoiar a venda em atributos reconhecidos da marca: PowerFrame, tradição em equipamento original e ampla cobertura de aplicações. Confirme sempre a equivalência do modelo antes de fechar a venda."
                        },
    "Heliar|HAGM105SD":  {
                             "technology":  "AGM",
                             "voltage":  "12 V",
                             "capacity":  "105 Ah (C20)",
                             "cca":  "950 CCA",
                             "dimensions":  "393 x 175 x 190 mm",
                             "weight":  "29,2 kg",
                             "warranty":  "24 meses",
                             "description":  "Produto Heliar com 105 Ah (C20) e 950 CCA, uma combinação que apoia uma indicação segura para a faixa de demanda elétrica correspondente. O HAGM105SD oferece 24 meses de garantia e permite apoiar a venda em atributos reconhecidos da marca: PowerFrame, tradição em equipamento original e ampla cobertura de aplicações. Confirme sempre a equivalência do modelo antes de fechar a venda."
                         },
    "Heliar|HEFB50GD":  {
                            "technology":  "EFB",
                            "voltage":  "12 V",
                            "capacity":  "50 Ah (C20)",
                            "cca":  "540 CCA",
                            "dimensions":  "207 x 175 x 190 mm",
                            "weight":  "15 kg",
                            "warranty":  "24 meses",
                            "description":  "Produto Heliar com 50 Ah (C20) e 540 CCA, uma combinação que apoia uma indicação segura para a faixa de demanda elétrica correspondente. O HEFB50GD oferece 24 meses de garantia e permite apoiar a venda em atributos reconhecidos da marca: PowerFrame, tradição em equipamento original e ampla cobertura de aplicações. Confirme sempre a equivalência do modelo antes de fechar a venda."
                        },
    "Heliar|HEFB60HD":  {
                            "technology":  "EFB",
                            "voltage":  "12 V",
                            "capacity":  "60 Ah (C20)",
                            "cca":  "560 A",
                            "dimensions":  "242 × 175 × 190 mm (C × L × A)",
                            "weight":  "20,4 kg",
                            "warranty":  "24 meses",
                            "sourceNote": "Fonte dos dados de capacidade, CCA, dimensões e aplicação: Heliar — HEFB60HD.",
                            "sourceHref": "https://www.heliar.com/produtos/detalhes-do-produto/hefb60hd",
                            "description":  "A Heliar HEFB60HD reúne tecnologia EFB, 60 Ah (C20) e 560 A de CCA. Suas dimensões são 242 × 175 × 190 mm; a aplicação deve corresponder ao veículo com start-stop simples ou alternador inteligente especificado para esse código."
                        },
    "Heliar|HEFB72PD":  {
                            "technology":  "EFB",
                            "voltage":  "12 V",
                            "capacity":  "72 Ah (C20)",
                            "cca":  "700 CCA",
                            "dimensions":  "281 x 175 x 190 mm",
                            "weight":  "18,7 kg",
                            "warranty":  "24 meses",
                            "description":  "Produto Heliar com 72 Ah (C20) e 700 CCA, uma combinação que apoia uma indicação segura para a faixa de demanda elétrica correspondente. O HEFB72PD oferece 24 meses de garantia e permite apoiar a venda em atributos reconhecidos da marca: PowerFrame, tradição em equipamento original e ampla cobertura de aplicações. Confirme sempre a equivalência do modelo antes de fechar a venda."
                        },
    "Heliar|HEFB225TD":  {
                             "technology":  "EFB — Frota pesada",
                             "voltage":  "12 V",
                             "capacity":  "225 Ah (C20)",
                             "cca":  "1.050 A a −18 °C",
                             "reserveCapacity": "450 min",
                             "weight":  "57,4 kg",
                             "warranty":  "24 meses",
                             "sourceNote": "Fontes técnicas para HEFB225TD.",
                             "sourceLinks": [
                               { "label": "Heliar — página do modelo HEFB225TD", "href": "https://www.heliar.com/produtos/detalhes-do-produto/hefb225td" },
                               { "label": "Inmetro — registro 003848/2013, inclusão de 24/10/2024", "href": "https://registro.inmetro.gov.br/consulta/detalhe.aspx?NumeroRegistro=003848%2F2013&pag=5" }
                             ],
                             "description":  "A Heliar HEFB225TD é uma bateria EFB de 12 V e 225 Ah (C20) para veículos comerciais pesados compatíveis. Seus 1.050 A de CCA a −18 °C e 450 minutos de reserva de capacidade são referências para conferir a exigência elétrica da aplicação."
                         },
    "Heliar|HEFB225TE":  {
                             "technology":  "EFB — Frota pesada",
                             "voltage":  "12 V",
                             "capacity":  "225 Ah (C20)",
                             "cca":  "1.050 A a −18 °C",
                             "reserveCapacity": "450 min",
                             "weight":  "56 kg",
                             "warranty":  "24 meses",
                             "sourceNote": "Fonte: Inmetro, registro 003848/2013, inclusão de 24/10/2024 para HEFB225TE.",
                             "sourceHref": "https://registro.inmetro.gov.br/consulta/detalhe.aspx?NumeroRegistro=003848%2F2013&pag=5",
                             "description":  "A Heliar HEFB225TE é uma bateria EFB de 12 V e 225 Ah (C20) para veículos comerciais pesados compatíveis. A corrente de partida é de 1.050 A de CCA a −18 °C, com reserva de capacidade de 450 minutos. Confirme montagem e requisitos do veículo pelo código TE antes da substituição."
                         },
    "Heliar|H38JD":  {
                         "technology":  "SLI",
                         "voltage":  "12 V",
                         "capacity":  "40 Ah (C20)",
                         "cca":  "320 CCA",
                         "dimensions":  "187 x 127 x 225 mm",
                         "weight":  "9,7 kg",
                         "warranty":  "24 meses",
                         "description":  "Produto Heliar com 40 Ah (C20) e 320 CCA, uma combinação que apoia uma indicação segura para a faixa de demanda elétrica correspondente. O H38JD oferece 24 meses de garantia e permite apoiar a venda em atributos reconhecidos da marca: PowerFrame, tradição em equipamento original e ampla cobertura de aplicações. Confirme sempre a equivalência do modelo antes de fechar a venda."
                     },
    "Heliar|H40JD JIS":  {
                             "technology":  "SLI",
                             "voltage":  "12 V",
                             "capacity":  "40 Ah (C20)",
                             "cca":  "300 CCA",
                             "dimensions":  "187 x 140 x 225 mm",
                             "weight":  "9,7 kg",
                             "warranty":  "24 meses",
                             "description":  "Produto Heliar com 40 Ah (C20) e 300 CCA, uma combinação que apoia uma indicação segura para a faixa de demanda elétrica correspondente. O H40JD JIS oferece 24 meses de garantia e permite apoiar a venda em atributos reconhecidos da marca: PowerFrame, tradição em equipamento original e ampla cobertura de aplicações. Confirme sempre a equivalência do modelo antes de fechar a venda."
                         },
    "Heliar|HE48BD":  {
                          "technology":  "SLI",
                          "voltage":  "12 V",
                          "capacity":  "48 Ah (C20)",
                          "cca":  "375 CCA",
                          "dimensions":  "210 x 175 x 175 mm",
                          "weight":  "11,9 kg",
                          "warranty":  "24 meses",
                          "description":  "Produto Heliar com 48 Ah (C20) e 375 CCA, uma combinação que apoia uma indicação segura para a faixa de demanda elétrica correspondente. O HE48BD oferece 24 meses de garantia e permite apoiar a venda em atributos reconhecidos da marca: PowerFrame, tradição em equipamento original e ampla cobertura de aplicações. Confirme sempre a equivalência do modelo antes de fechar a venda."
                      },
    "Heliar|H50JE":  {
                         "technology":  "SLI",
                         "voltage":  "12 V",
                         "capacity":  "50 Ah (C20)",
                         "cca":  "340 CCA",
                         "dimensions":  "238 x 129 x 225 mm",
                         "weight":  "12 kg",
                         "warranty":  "24 meses",
                         "description":  "Produto Heliar com 50 Ah (C20) e 340 CCA, uma combinação que apoia uma indicação segura para a faixa de demanda elétrica correspondente. O H50JE oferece 24 meses de garantia e permite apoiar a venda em atributos reconhecidos da marca: PowerFrame, tradição em equipamento original e ampla cobertura de aplicações. Confirme sempre a equivalência do modelo antes de fechar a venda."
                     },
    "Heliar|H50JD":  {
                         "technology":  "SLI",
                         "voltage":  "12 V",
                         "capacity":  "50 Ah (C20)",
                         "cca":  "405 CCA",
                         "dimensions":  "238 x 129 x 225 mm",
                         "weight":  "12,4 kg",
                         "warranty":  "24 meses",
                         "description":  "Produto Heliar com 50 Ah (C20) e 405 CCA, uma combinação que apoia uma indicação segura para a faixa de demanda elétrica correspondente. O H50JD oferece 24 meses de garantia e permite apoiar a venda em atributos reconhecidos da marca: PowerFrame, tradição em equipamento original e ampla cobertura de aplicações. Confirme sempre a equivalência do modelo antes de fechar a venda."
                     },
    "Heliar|HE50GD":  {
                          "technology":  "SLI",
                          "voltage":  "12 V",
                          "capacity":  "50 Ah (C20)",
                          "cca":  "420 CCA",
                          "dimensions":  "207 x 175 x 190 mm",
                          "weight":  "12,5 kg",
                          "warranty":  "24 meses",
                          "description":  "Produto Heliar com 50 Ah (C20) e 420 CCA, uma combinação que apoia uma indicação segura para a faixa de demanda elétrica correspondente. O HE50GD oferece 24 meses de garantia e permite apoiar a venda em atributos reconhecidos da marca: PowerFrame, tradição em equipamento original e ampla cobertura de aplicações. Confirme sempre a equivalência do modelo antes de fechar a venda."
                      },
    "Heliar|HE60DD":  {
                          "technology":  "SLI",
                          "voltage":  "12 V",
                          "capacity":  "60 Ah (C20)",
                          "cca":  "480 CCA",
                          "dimensions":  "244 x 175 x 175 mm",
                          "weight":  "13,6 kg",
                          "warranty":  "24 meses",
                          "description":  "Produto Heliar com 60 Ah (C20) e 480 CCA, uma combinação que apoia uma indicação segura para a faixa de demanda elétrica correspondente. O HE60DD oferece 24 meses de garantia e permite apoiar a venda em atributos reconhecidos da marca: PowerFrame, tradição em equipamento original e ampla cobertura de aplicações. Confirme sempre a equivalência do modelo antes de fechar a venda."
                      },
    "Heliar|HE60HD":  {
                          "technology":  "SLI",
                          "voltage":  "12 V",
                          "capacity":  "60 Ah (C20)",
                          "cca":  "480 A",
                          "dimensions":  "242 × 175 × 190 mm (C × L × A)",
                          "weight":  "14,2 kg",
                          "warranty":  "24 meses",
                          "sourceNote": "Fonte dos dados de capacidade, CCA e dimensões: Heliar — HE60HD.",
                          "sourceHref": "https://www.heliar.com/produtos/detalhes-do-produto/h60hd",
                          "description":  "A Heliar HE60HD é uma bateria convencional de 12 V e 60 Ah (C20), com 480 A de CCA. É uma opção para veículos sem start-stop cuja aplicação peça esse código e suas dimensões de 242 × 175 × 190 mm."
                      },
    "Heliar|HE60DE":  {
                          "technology":  "SLI",
                          "voltage":  "12 V",
                          "capacity":  "60 Ah (C20)",
                          "cca":  "440 CCA",
                          "dimensions":  "244 x 175 x 175 mm",
                          "weight":  "13,5 kg",
                          "warranty":  "24 meses",
                          "description":  "Produto Heliar com 60 Ah (C20) e 440 CCA, uma combinação que apoia uma indicação segura para a faixa de demanda elétrica correspondente. O HE60DE oferece 24 meses de garantia e permite apoiar a venda em atributos reconhecidos da marca: PowerFrame, tradição em equipamento original e ampla cobertura de aplicações. Confirme sempre a equivalência do modelo antes de fechar a venda."
                      },
    "Heliar|H65HD":  {
                         "technology":  "SLI",
                         "voltage":  "12 V",
                         "capacity":  "65 Ah (C20)",
                         "cca":  "550 CCA",
                         "dimensions":  "242 x 175 x 190 mm",
                         "weight":  "15,5 kg",
                         "warranty":  "24 meses",
                         "description":  "Produto Heliar com 65 Ah (C20) e 550 CCA, uma combinação que apoia uma indicação segura para a faixa de demanda elétrica correspondente. O H65HD oferece 24 meses de garantia e permite apoiar a venda em atributos reconhecidos da marca: PowerFrame, tradição em equipamento original e ampla cobertura de aplicações. Confirme sempre a equivalência do modelo antes de fechar a venda."
                     },
    "Heliar|H70NE":  {
                         "technology":  "SLI",
                         "voltage":  "12 V",
                         "capacity":  "70 Ah (C20)",
                         "cca":  "610 CCA",
                         "dimensions":  "281 x 175 x 175 mm",
                         "weight":  "16,2 kg",
                         "warranty":  "24 meses",
                         "description":  "Produto Heliar com 70 Ah (C20) e 610 CCA, uma combinação que apoia uma indicação segura para a faixa de demanda elétrica correspondente. O H70NE oferece 24 meses de garantia e permite apoiar a venda em atributos reconhecidos da marca: PowerFrame, tradição em equipamento original e ampla cobertura de aplicações. Confirme sempre a equivalência do modelo antes de fechar a venda."
                     },
    "Heliar|H70ND":  {
                         "technology":  "SLI",
                         "voltage":  "12 V",
                         "capacity":  "70 Ah (C20)",
                         "cca":  "610 CCA",
                         "dimensions":  "281 x 175 x 175 mm",
                         "weight":  "16,2 kg",
                         "warranty":  "24 meses",
                         "description":  "Produto Heliar com 70 Ah (C20) e 610 CCA, uma combinação que apoia uma indicação segura para a faixa de demanda elétrica correspondente. O H70ND oferece 24 meses de garantia e permite apoiar a venda em atributos reconhecidos da marca: PowerFrame, tradição em equipamento original e ampla cobertura de aplicações. Confirme sempre a equivalência do modelo antes de fechar a venda."
                     },
    "Heliar|H75PD":  {
                         "technology":  "SLI",
                         "voltage":  "12 V",
                         "capacity":  "75 Ah (C20)",
                         "cca":  "620 CCA",
                         "dimensions":  "281 x 175 x 190 mm",
                         "weight":  "17,6 kg",
                         "warranty":  "24 meses",
                         "description":  "Produto Heliar com 75 Ah (C20) e 620 CCA, uma combinação que apoia uma indicação segura para a faixa de demanda elétrica correspondente. O H75PD oferece 24 meses de garantia e permite apoiar a venda em atributos reconhecidos da marca: PowerFrame, tradição em equipamento original e ampla cobertura de aplicações. Confirme sempre a equivalência do modelo antes de fechar a venda."
                     },
    "Heliar|H75LE":  {
                         "technology":  "SLI",
                         "voltage":  "12 V",
                         "capacity":  "75 Ah (C20)",
                         "cca":  "530 CCA",
                         "dimensions":  "273 x 170 x 226 mm",
                         "weight":  "18 kg",
                         "warranty":  "18 meses",
                         "description":  "Produto Heliar com 75 Ah (C20) e 530 CCA, uma combinação que apoia uma indicação segura para a faixa de demanda elétrica correspondente. O H75LE oferece 18 meses de garantia e permite apoiar a venda em atributos reconhecidos da marca: PowerFrame, tradição em equipamento original e ampla cobertura de aplicações. Confirme sempre a equivalência do modelo antes de fechar a venda."
                     },
    "Heliar|H75LD":  {
                         "technology":  "SLI",
                         "voltage":  "12 V",
                         "capacity":  "75 Ah (C20)",
                         "cca":  "530 CCA",
                         "dimensions":  "273 x 170 x 226 mm",
                         "weight":  "18 kg",
                         "warranty":  "18 meses",
                         "description":  "Produto Heliar com 75 Ah (C20) e 530 CCA, uma combinação que apoia uma indicação segura para a faixa de demanda elétrica correspondente. O H75LD oferece 18 meses de garantia e permite apoiar a venda em atributos reconhecidos da marca: PowerFrame, tradição em equipamento original e ampla cobertura de aplicações. Confirme sempre a equivalência do modelo antes de fechar a venda."
                     },
    "Heliar|H90LD":  {
                         "technology":  "SLI",
                         "voltage":  "12 V",
                         "capacity":  "90 Ah (C20)",
                         "cca":  "710 CCA",
                         "dimensions":  "320 x 171 x 226 mm",
                         "weight":  "22 kg",
                         "warranty":  "18 meses",
                         "description":  "Produto Heliar com 90 Ah (C20) e 710 CCA, uma combinação que apoia uma indicação segura para a faixa de demanda elétrica correspondente. O H90LD oferece 18 meses de garantia e permite apoiar a venda em atributos reconhecidos da marca: PowerFrame, tradição em equipamento original e ampla cobertura de aplicações. Confirme sempre a equivalência do modelo antes de fechar a venda."
                     },
    "Heliar|H90LE":  {
                         "technology":  "SLI",
                         "voltage":  "12 V",
                         "capacity":  "90 Ah (C20)",
                         "cca":  "710 CCA",
                         "dimensions":  "320 x 171 x 226 mm",
                         "weight":  "22 kg",
                         "warranty":  "18 meses",
                         "description":  "Produto Heliar com 90 Ah (C20) e 710 CCA, uma combinação que apoia uma indicação segura para a faixa de demanda elétrica correspondente. O H90LE oferece 18 meses de garantia e permite apoiar a venda em atributos reconhecidos da marca: PowerFrame, tradição em equipamento original e ampla cobertura de aplicações. Confirme sempre a equivalência do modelo antes de fechar a venda."
                     },
    "Heliar|H95MD":  {
                         "technology":  "SLI",
                         "voltage":  "12 V",
                         "capacity":  "95 Ah (C20)",
                         "cca":  "800 CCA",
                         "dimensions":  "353 x 175 x 190 mm",
                         "weight":  "22,6 kg",
                         "warranty":  "18 meses",
                         "description":  "Produto Heliar com 95 Ah (C20) e 800 CCA, uma combinação que apoia uma indicação segura para a faixa de demanda elétrica correspondente. O H95MD oferece 18 meses de garantia e permite apoiar a venda em atributos reconhecidos da marca: PowerFrame, tradição em equipamento original e ampla cobertura de aplicações. Confirme sempre a equivalência do modelo antes de fechar a venda."
                     },
    "Heliar|H100LE":  {
                          "technology":  "Frota",
                          "voltage":  "12 V",
                          "capacity":  "100 Ah (C20)",
                          "cca":  "700 CCA",
                          "dimensions":  "330 x 172 x 241 mm",
                          "weight":  "24,9 kg",
                          "warranty":  "15 meses",
                          "description":  "Produto Heliar com 100 Ah (C20) e 700 CCA, uma combinação que apoia uma indicação segura para a faixa de demanda elétrica correspondente. O H100LE oferece 15 meses de garantia e permite apoiar a venda em atributos reconhecidos da marca: PowerFrame, tradição em equipamento original e ampla cobertura de aplicações. Confirme sempre a equivalência do modelo antes de fechar a venda."
                      },
    "Heliar|HS100LE":  {
                           "technology":  "Frota",
                           "voltage":  "12 V",
                           "capacity":  "100 Ah (C20)",
                           "cca":  "750 CCA",
                           "dimensions":  "330 x 172 x 241 mm",
                           "weight":  "25,8 kg",
                           "warranty":  "15 meses",
                           "description":  "Produto Heliar com 100 Ah (C20) e 750 CCA, uma combinação que apoia uma indicação segura para a faixa de demanda elétrica correspondente. O HS100LE oferece 15 meses de garantia e permite apoiar a venda em atributos reconhecidos da marca: PowerFrame, tradição em equipamento original e ampla cobertura de aplicações. Confirme sempre a equivalência do modelo antes de fechar a venda."
                       },
    "Heliar|HS150TD":  {
                           "technology":  "Frota",
                           "voltage":  "12 V",
                           "capacity":  "150 Ah (C20)",
                           "cca":  "900 CCA",
                           "dimensions":  "510 x 213 x 236 mm",
                           "weight":  "40,2 kg",
                           "warranty":  "15 meses",
                           "description":  "Produto Heliar com 150 Ah (C20) e 900 CCA, uma combinação que apoia uma indicação segura para a faixa de demanda elétrica correspondente. O HS150TD oferece 15 meses de garantia e permite apoiar a venda em atributos reconhecidos da marca: PowerFrame, tradição em equipamento original e ampla cobertura de aplicações. Confirme sempre a equivalência do modelo antes de fechar a venda."
                       },
    "Heliar|H150TD":  {
                          "technology":  "Frota",
                          "voltage":  "12 V",
                          "capacity":  "150 Ah (C20)",
                          "cca":  "900 CCA",
                          "dimensions":  "510 x 213 x 236 mm",
                          "weight":  "40,2 kg",
                          "warranty":  "15 meses",
                          "description":  "Produto Heliar com 150 Ah (C20) e 900 CCA, uma combinação que apoia uma indicação segura para a faixa de demanda elétrica correspondente. O H150TD oferece 15 meses de garantia e permite apoiar a venda em atributos reconhecidos da marca: PowerFrame, tradição em equipamento original e ampla cobertura de aplicações. Confirme sempre a equivalência do modelo antes de fechar a venda."
                      },
    "Heliar|H180TD":  {
                          "technology":  "Frota",
                          "voltage":  "12 V",
                          "capacity":  "180 Ah (C20)",
                          "cca":  "950 CCA",
                          "dimensions":  "510 x 213 x 236 mm",
                          "weight":  "44,5 kg",
                          "warranty":  "15 meses",
                          "description":  "Produto Heliar com 180 Ah (C20) e 950 CCA, uma combinação que apoia uma indicação segura para a faixa de demanda elétrica correspondente. O H180TD oferece 15 meses de garantia e permite apoiar a venda em atributos reconhecidos da marca: PowerFrame, tradição em equipamento original e ampla cobertura de aplicações. Confirme sempre a equivalência do modelo antes de fechar a venda."
                      },
    "Heliar|HS180TD":  {
                           "technology":  "Chumbo-ácido para frota",
                           "voltage":  "12 V",
                           "capacity":  "180 Ah (C20)",
                           "cca":  "950 A",
                           "dimensions":  "510 × 213 × 236 mm (C × L × A)",
                           "weight":  "44,5 kg",
                           "warranty":  "15 meses",
                           "description":  "Bateria Heliar da linha Frota / Comercial, com 180 Ah (C20), 950 A de CCA e 15 meses de garantia. A construção da linha HS é voltada a aplicações severas e combina selagem, indicador de carga, ancoragem dos blocos e grades PowerFrame. Confirme sempre a equivalência antes de fechar a venda."
                       },
    "Heliar|HT180TE":  {
                           "technology":  "Frota",
                           "voltage":  "12 V",
                           "capacity":  "180 Ah (C20)",
                           "cca":  "1.050 CCA",
                           "dimensions":  "513 x 223 x 218 mm",
                           "weight":  "45,1 kg",
                           "warranty":  "15 meses",
                           "description":  "Produto Heliar com 180 Ah (C20) e 1.050 CCA, uma combinação que apoia uma indicação segura para a faixa de demanda elétrica correspondente. O HT180TE oferece 15 meses de garantia e permite apoiar a venda em atributos reconhecidos da marca: PowerFrame, tradição em equipamento original e ampla cobertura de aplicações. Confirme sempre a equivalência do modelo antes de fechar a venda."
                       },
    "Heliar|HT180TD":  {
                           "technology":  "Frota",
                           "voltage":  "12 V",
                           "capacity":  "180 Ah (C20)",
                           "cca":  "1.050 CCA",
                           "dimensions":  "513 x 223 x 218 mm",
                           "weight":  "45,1 kg",
                           "warranty":  "15 meses",
                           "description":  "Produto Heliar com 180 Ah (C20) e 1.050 CCA, uma combinação que apoia uma indicação segura para a faixa de demanda elétrica correspondente. O HT180TD oferece 15 meses de garantia e permite apoiar a venda em atributos reconhecidos da marca: PowerFrame, tradição em equipamento original e ampla cobertura de aplicações. Confirme sempre a equivalência do modelo antes de fechar a venda."
                       },
    "eCON VRLA|EP12-5":  {
                             "technology":  "VRLA AGM, chumbo-ácido regulada por válvula",
                             "voltage":  "12 V",
                             "capacity":  "5 Ah (C20, 25 °C, 1,75 V/célula)",
                             "cca":  "-",
                             "dimensions":  "90 × 70 × 101 mm (C × L × A)",
                             "weight":  "1,39 kg",
                             "warranty":  "Consulte as condições com a equipe Sol",
                             "description":  "Bateria eCON VRLA AGM de 12 V e 5 Ah em C20, desenvolvida para sistemas de energia de reserva. As tabelas de descarga e o formato compacto apoiam a especificação conforme o consumo e o espaço disponível."
                         },
    "eCON VRLA|EP12-7W":  {
                              "technology":  "VRLA AGM, chumbo-ácido regulada por válvula",
                              "voltage":  "12 V",
                              "capacity":  "7 Ah (C20, 25 °C, 1,75 V/célula)",
                              "cca":  "-",
                              "dimensions":  "151 × 65 × 93,5 mm (C × L × A)",
                              "weight":  "1,82 kg",
                              "warranty":  "Consulte as condições com a equipe Sol",
                              "description":  "Bateria eCON VRLA AGM de 12 V e 7 Ah em C20, desenvolvida para sistemas de energia de reserva. As tabelas de descarga e o formato compacto apoiam a especificação conforme o consumo e o espaço disponível."
                          },
    "eCON VRLA|EP12-7":  {
                             "technology":  "VRLA AGM, chumbo-ácido regulada por válvula",
                             "voltage":  "12 V",
                             "capacity":  "7 Ah (C20, 25 °C, até 1,75 V/célula)",
                             "cca":  "-",
                             "dimensions":  "151 × 65 × 93,5 mm (C × L × A)",
                             "weight":  "1,97 kg",
                             "warranty":  "Consulte as condições com a equipe Sol",
                             "description":  "Bateria eCON VRLA AGM de 12 V e 7 Ah em C20, desenvolvida para sistemas de energia de reserva. As tabelas de descarga e o formato compacto apoiam a especificação conforme o consumo e o espaço disponível."
                         },
    "eCON VRLA|EP12-9":  {
                             "technology":  "VRLA AGM, chumbo-ácido regulada por válvula",
                             "voltage":  "12 V",
                             "capacity":  "9 Ah (C20, 25 °C, 1,75 V/célula)",
                             "cca":  "-",
                             "dimensions":  "151 × 65 × 93,5 mm (C × L × A)",
                             "weight":  "2,52 kg",
                             "warranty":  "Consulte as condições com a equipe Sol",
                             "description":  "Bateria eCON VRLA AGM de 12 V e 9 Ah em C20, desenvolvida para sistemas de energia de reserva. As tabelas de descarga e o formato compacto apoiam a especificação conforme o consumo e o espaço disponível."
                         },
    "eCON VRLA|EP12-12":  {
                              "technology":  "VRLA AGM, chumbo-ácido regulada por válvula",
                              "voltage":  "12 V",
                              "capacity":  "12 Ah (C20, 25 °C, 1,75 V/célula)",
                              "cca":  "-",
                              "dimensions":  "151 × 98 × 95 mm (C × L × A)",
                              "weight":  "3,24 kg",
                              "warranty":  "Consulte as condições com a equipe Sol",
                              "description":  "Bateria eCON VRLA AGM de 12 V e 12 Ah em C20, desenvolvida para sistemas de energia de reserva. As tabelas de descarga e as dimensões apoiam a especificação conforme o consumo e o espaço disponível."
                          },
    "eCON VRLA|EP12-18":  {
                              "technology":  "VRLA AGM, chumbo-ácido regulada por válvula",
                              "voltage":  "12 V",
                              "capacity":  "18 Ah (C20, 25 °C, 1,75 V/célula)",
                              "cca":  "-",
                              "dimensions":  "181,5 × 76,5 × 167,5 mm (C × L × A)",
                              "weight":  "5 kg",
                              "warranty":  "Consulte as condições com a equipe Sol",
                              "description":  "Bateria eCON VRLA AGM de 12 V e 18 Ah em C20, desenvolvida para sistemas de energia de reserva. As tabelas de descarga e as dimensões apoiam a especificação conforme o consumo e o espaço disponível."
                          },
    "Heliar|H40JD": {
      "technology": "SLI / chumbo-ácido convencional",
      "voltage": "12 V",
      "capacity": "40 Ah (C20)",
      "cca": "320 A",
      "dimensions": "187 x 127 x 225 mm",
      "weight": "Não informado na ficha oficial consultada",
      "warranty": "24 meses",
      "description": "Bateria Heliar de 40 Ah para reposição em veículos convencionais compatíveis. Combina 320 A de CCA e garantia de 24 meses, com o respaldo da tecnologia PowerFrame. Uma escolha direta para quem procura confiabilidade na partida e compatibilidade com a aplicação correta."
    },
    "Heliar|HE45BE": {
      "technology": "SLI / chumbo-ácido convencional",
      "voltage": "12 V",
      "capacity": "45 Ah (C20)",
      "cca": "330 A",
      "dimensions": "210 x 175 x 175 mm",
      "weight": "Não informado na ficha oficial consultada",
      "warranty": "24 meses",
      "description": "Bateria Heliar de 45 Ah indicada para reposição em veículos convencionais compatíveis. Seus 330 A de CCA apoiam partidas consistentes dentro da aplicação prevista, enquanto os 24 meses de garantia e a tecnologia PowerFrame reforçam uma proposta de confiança para o cliente."
    },
    "Heliar|H45JE": {
      "technology": "SLI / chumbo-ácido convencional",
      "voltage": "12 V",
      "capacity": "45 Ah (C20)",
      "cca": "340 A",
      "dimensions": "238 x 129 x 225 mm",
      "weight": "Não informado na ficha oficial consultada",
      "warranty": "24 meses",
      "description": "Bateria Heliar de 45 Ah para aplicações convencionais compatíveis, com 340 A de CCA e garantia de 24 meses. O formato específico do modelo amplia as opções de reposição para veículos que exigem essa configuração, combinando desempenho de partida e a reconhecida tecnologia PowerFrame."
    },
    "Heliar|HS180TE": {
      "technology": "Chumbo-ácido para frota",
      "voltage": "12 V",
      "capacity": "180 Ah (C20)",
      "cca": "950 A",
      "dimensions": "510 x 213 x 236 mm",
      "weight": "Não informado na ficha oficial consultada",
      "warranty": "15 meses",
      "description": "Bateria Heliar de 180 Ah para aplicações comerciais compatíveis, com 950 A de CCA e garantia de 15 meses. É uma opção para frotas que precisam de capacidade energética e partida robusta na configuração correta. A tecnologia PowerFrame e a origem de equipamento original fortalecem a argumentação de confiabilidade para a operação."
    }
};
