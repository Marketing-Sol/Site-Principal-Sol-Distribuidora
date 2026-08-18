export type ProductSpec = {
  technology: string;
  voltage: string;
  capacity: string;
  cca: string;
  dimensions: string;
  weight: string;
  warranty: string;
  description: string;
};

export const productSpecKey = (brand: string, model: string) => `${brand}|${model}`;

export const PRODUCT_SPECS: Record<string, ProductSpec> = {
    "Freedom|DF300":  {
                          "technology":  "Estacionária chumbo-ácida ventilada",
                          "voltage":  "12 V",
                          "capacity":  "30 Ah (C100)",
                          "cca":  "-",
                          "dimensions":  "175 x 175 x 175 mm",
                          "weight":  "8,8 kg",
                          "warranty":  "24 meses",
                          "description":  "Uma opção de 30 Ah para compor soluções de energia de reserva com a segurança de 24 meses de garantia. O modelo DF300 facilita a montagem de bancos conforme a autonomia desejada e reúne benefícios valorizados pelo cliente: confiabilidade para cargas críticas, resistência térmica e a reputação da linha Freedom em aplicações estacionárias."
                      },
    "Freedom|DF500":  {
                          "technology":  "Estacionária chumbo-ácida ventilada",
                          "voltage":  "12 V",
                          "capacity":  "40 Ah (C100)",
                          "cca":  "-",
                          "dimensions":  "175 x 175 x 175 mm",
                          "weight":  "9,4 kg",
                          "warranty":  "24 meses",
                          "description":  "Uma opção de 40 Ah para compor soluções de energia de reserva com a segurança de 24 meses de garantia. O modelo DF500 facilita a montagem de bancos conforme a autonomia desejada e reúne benefícios valorizados pelo cliente: confiabilidade para cargas críticas, resistência térmica e a reputação da linha Freedom em aplicações estacionárias."
                      },
    "Freedom|DF700":  {
                          "technology":  "Estacionária chumbo-ácida ventilada",
                          "voltage":  "12 V",
                          "capacity":  "50 Ah (C100)",
                          "cca":  "-",
                          "dimensions":  "210 x 175 x 175 mm",
                          "weight":  "12,3 kg",
                          "warranty":  "24 meses",
                          "description":  "Uma opção de 50 Ah para compor soluções de energia de reserva com a segurança de 24 meses de garantia. O modelo DF700 facilita a montagem de bancos conforme a autonomia desejada e reúne benefícios valorizados pelo cliente: confiabilidade para cargas críticas, resistência térmica e a reputação da linha Freedom em aplicações estacionárias."
                      },
    "Freedom|DF1000":  {
                           "technology":  "Estacionária chumbo-ácida ventilada",
                           "voltage":  "12 V",
                           "capacity":  "70 Ah (C100)",
                           "cca":  "-",
                           "dimensions":  "244 x 175 x 175 mm",
                           "weight":  "14,7 kg",
                           "warranty":  "24 meses",
                           "description":  "Uma opção de 70 Ah para compor soluções de energia de reserva com a segurança de 24 meses de garantia. O modelo DF1000 facilita a montagem de bancos conforme a autonomia desejada e reúne benefícios valorizados pelo cliente: confiabilidade para cargas críticas, resistência térmica e a reputação da linha Freedom em aplicações estacionárias."
                       },
    "Freedom|DF1500":  {
                           "technology":  "Estacionária chumbo-ácida ventilada",
                           "voltage":  "12 V",
                           "capacity":  "93 Ah (C100)",
                           "cca":  "-",
                           "dimensions":  "330 x 172 x 240 mm",
                           "weight":  "23 kg",
                           "warranty":  "24 meses",
                           "description":  "Uma opção de 93 Ah para compor soluções de energia de reserva com a segurança de 24 meses de garantia. O modelo DF1500 facilita a montagem de bancos conforme a autonomia desejada e reúne benefícios valorizados pelo cliente: confiabilidade para cargas críticas, resistência térmica e a reputação da linha Freedom em aplicações estacionárias."
                       },
    "Freedom|DF2000":  {
                           "technology":  "Estacionária chumbo-ácida ventilada",
                           "voltage":  "12 V",
                           "capacity":  "115 Ah (C100)",
                           "cca":  "-",
                           "dimensions":  "330 x 172 x 240 mm",
                           "weight":  "26 kg",
                           "warranty":  "24 meses",
                           "description":  "Uma opção de 115 Ah para compor soluções de energia de reserva com a segurança de 24 meses de garantia. O modelo DF2000 facilita a montagem de bancos conforme a autonomia desejada e reúne benefícios valorizados pelo cliente: confiabilidade para cargas críticas, resistência térmica e a reputação da linha Freedom em aplicações estacionárias."
                       },
    "Freedom|DF2500":  {
                           "technology":  "Estacionária chumbo-ácida ventilada",
                           "voltage":  "12 V",
                           "capacity":  "165 Ah (C100)",
                           "cca":  "-",
                           "dimensions":  "511 x 213 x 230 mm",
                           "weight":  "44 kg",
                           "warranty":  "24 meses",
                           "description":  "Uma opção de 165 Ah para compor soluções de energia de reserva com a segurança de 24 meses de garantia. O modelo DF2500 facilita a montagem de bancos conforme a autonomia desejada e reúne benefícios valorizados pelo cliente: confiabilidade para cargas críticas, resistência térmica e a reputação da linha Freedom em aplicações estacionárias."
                       },
    "Freedom|DF3000":  {
                           "technology":  "Estacionária chumbo-ácida ventilada",
                           "voltage":  "12 V",
                           "capacity":  "185 Ah (C100)",
                           "cca":  "-",
                           "dimensions":  "511 x 213 x 230 mm",
                           "weight":  "47,6 kg",
                           "warranty":  "24 meses",
                           "description":  "Uma opção de 185 Ah para compor soluções de energia de reserva com a segurança de 24 meses de garantia. O modelo DF3000 facilita a montagem de bancos conforme a autonomia desejada e reúne benefícios valorizados pelo cliente: confiabilidade para cargas críticas, resistência térmica e a reputação da linha Freedom em aplicações estacionárias."
                       },
    "Freedom|DF4100":  {
                           "technology":  "Estacionária chumbo-ácida ventilada",
                           "voltage":  "12 V",
                           "capacity":  "240 Ah (C100)",
                           "cca":  "-",
                           "dimensions":  "530 x 280 x 246 mm",
                           "weight":  "59,9 kg",
                           "warranty":  "24 meses",
                           "description":  "Uma opção de 240 Ah para compor soluções de energia de reserva com a segurança de 24 meses de garantia. O modelo DF4100 facilita a montagem de bancos conforme a autonomia desejada e reúne benefícios valorizados pelo cliente: confiabilidade para cargas críticas, resistência térmica e a reputação da linha Freedom em aplicações estacionárias."
                       },
    "eCON|EGM60HD-24":  {
                            "technology":  "AGM",
                            "voltage":  "12 V",
                            "capacity":  "60 Ah (C20)",
                            "cca":  "600 CCA",
                            "dimensions":  "242 x 175 x 190 mm",
                            "weight":  "18,6 kg",
                            "warranty":  "24 meses",
                            "description":  "Combina 600 CCA de CCA e 60 Ah (C20) para oferecer uma alternativa eCON alinhada à necessidade de partida do veículo. Com 24 meses de garantia, o EGM60HD-24 ajuda a construir uma proposta de bom custo-benefício para reposição, destacando a tecnologia AGM, a cobertura de garantia e a disponibilidade da marca no mercado nacional."
                        },
    "eCON|EGM70PD-24":  {
                            "technology":  "AGM",
                            "voltage":  "12 V",
                            "capacity":  "70 Ah (C20)",
                            "cca":  "760 CCA",
                            "dimensions":  "278 x 175 x 190 mm",
                            "weight":  "21,2 kg",
                            "warranty":  "24 meses",
                            "description":  "Combina 760 CCA de CCA e 70 Ah (C20) para oferecer uma alternativa eCON alinhada à necessidade de partida do veículo. Com 24 meses de garantia, o EGM70PD-24 ajuda a construir uma proposta de bom custo-benefício para reposição, destacando a tecnologia AGM, a cobertura de garantia e a disponibilidade da marca no mercado nacional."
                        },
    "eCON|EGM80KD-24":  {
                            "technology":  "AGM",
                            "voltage":  "12 V",
                            "capacity":  "80 Ah (C20)",
                            "cca":  "800 CCA",
                            "dimensions":  "310 x 175 x 190 mm",
                            "weight":  "23,42 kg",
                            "warranty":  "24 meses",
                            "description":  "Combina 800 CCA de CCA e 80 Ah (C20) para oferecer uma alternativa eCON alinhada à necessidade de partida do veículo. Com 24 meses de garantia, o EGM80KD-24 ajuda a construir uma proposta de bom custo-benefício para reposição, destacando a tecnologia AGM, a cobertura de garantia e a disponibilidade da marca no mercado nacional."
                        },
    "eCON|EGM92MD-24":  {
                            "technology":  "AGM",
                            "voltage":  "12 V",
                            "capacity":  "92 Ah (C20)",
                            "cca":  "800 CCA",
                            "dimensions":  "353 x 175 x 190 mm",
                            "weight":  "26,8 kg",
                            "warranty":  "24 meses",
                            "description":  "Combina 800 CCA de CCA e 92 Ah (C20) para oferecer uma alternativa eCON alinhada à necessidade de partida do veículo. Com 24 meses de garantia, o EGM92MD-24 ajuda a construir uma proposta de bom custo-benefício para reposição, destacando a tecnologia AGM, a cobertura de garantia e a disponibilidade da marca no mercado nacional."
                        },
    "eCON|EFB50GD-24":  {
                            "technology":  "EFB",
                            "voltage":  "12 V",
                            "capacity":  "50 Ah (C20)",
                            "cca":  "540 CCA",
                            "dimensions":  "209 x 174 x 190 mm",
                            "weight":  "14,4 kg",
                            "warranty":  "24 meses",
                            "description":  "Combina 540 CCA de CCA e 50 Ah (C20) para oferecer uma alternativa eCON alinhada à necessidade de partida do veículo. Com 24 meses de garantia, o EFB50GD-24 ajuda a construir uma proposta de bom custo-benefício para reposição, destacando a tecnologia EFB, a cobertura de garantia e a disponibilidade da marca no mercado nacional."
                        },
    "eCON|EFB60HD-24":  {
                            "technology":  "EFB",
                            "voltage":  "12 V",
                            "capacity":  "60 Ah (C20)",
                            "cca":  "570 CCA",
                            "dimensions":  "242 x 175 x 190 mm",
                            "weight":  "16,85 kg",
                            "warranty":  "24 meses",
                            "description":  "Combina 570 CCA de CCA e 60 Ah (C20) para oferecer uma alternativa eCON alinhada à necessidade de partida do veículo. Com 24 meses de garantia, o EFB60HD-24 ajuda a construir uma proposta de bom custo-benefício para reposição, destacando a tecnologia EFB, a cobertura de garantia e a disponibilidade da marca no mercado nacional."
                        },
    "eCON|EFB72PD-24":  {
                            "technology":  "EFB",
                            "voltage":  "12 V",
                            "capacity":  "72 Ah (C20)",
                            "cca":  "650 CCA",
                            "dimensions":  "277 x 174 x 190 mm",
                            "weight":  "19,32 kg",
                            "warranty":  "24 meses",
                            "description":  "Combina 650 CCA de CCA e 72 Ah (C20) para oferecer uma alternativa eCON alinhada à necessidade de partida do veículo. Com 24 meses de garantia, o EFB72PD-24 ajuda a construir uma proposta de bom custo-benefício para reposição, destacando a tecnologia EFB, a cobertura de garantia e a disponibilidade da marca no mercado nacional."
                        },
    "eCON|E45BD-18":  {
                          "technology":  "SLI",
                          "voltage":  "12 V",
                          "capacity":  "45 Ah (C20)",
                          "cca":  "350 CCA",
                          "dimensions":  "208 x 172 x 172 mm",
                          "weight":  "11,6 kg",
                          "warranty":  "18 meses",
                          "description":  "Combina 350 CCA de CCA e 45 Ah (C20) para oferecer uma alternativa eCON alinhada à necessidade de partida do veículo. Com 18 meses de garantia, o E45BD-18 ajuda a construir uma proposta de bom custo-benefício para reposição, destacando a tecnologia SLI, a cobertura de garantia e a disponibilidade da marca no mercado nacional."
                      },
    "eCON|E50GD-18":  {
                          "technology":  "SLI",
                          "voltage":  "12 V",
                          "capacity":  "50 Ah (C20)",
                          "cca":  "390 CCA",
                          "dimensions":  "208 x 172 x 189 mm",
                          "weight":  "12,6 kg",
                          "warranty":  "18 meses",
                          "description":  "Combina 390 CCA de CCA e 50 Ah (C20) para oferecer uma alternativa eCON alinhada à necessidade de partida do veículo. Com 18 meses de garantia, o E50GD-18 ajuda a construir uma proposta de bom custo-benefício para reposição, destacando a tecnologia SLI, a cobertura de garantia e a disponibilidade da marca no mercado nacional."
                      },
    "eCON|E60DD-18":  {
                          "technology":  "SLI",
                          "voltage":  "12 V",
                          "capacity":  "60 Ah (C20)",
                          "cca":  "430 CCA",
                          "dimensions":  "238 x 175 x 175 mm",
                          "weight":  "13,7 kg",
                          "warranty":  "18 meses",
                          "description":  "Combina 430 CCA de CCA e 60 Ah (C20) para oferecer uma alternativa eCON alinhada à necessidade de partida do veículo. Com 18 meses de garantia, o E60DD-18 ajuda a construir uma proposta de bom custo-benefício para reposição, destacando a tecnologia SLI, a cobertura de garantia e a disponibilidade da marca no mercado nacional."
                      },
    "eCON|E60HD-18":  {
                          "technology":  "SLI",
                          "voltage":  "12 V",
                          "capacity":  "60 Ah (C20)",
                          "cca":  "485 CCA",
                          "dimensions":  "238 x 175 x 189 mm",
                          "weight":  "14,5 kg",
                          "warranty":  "18 meses",
                          "description":  "Combina 485 CCA de CCA e 60 Ah (C20) para oferecer uma alternativa eCON alinhada à necessidade de partida do veículo. Com 18 meses de garantia, o E60HD-18 ajuda a construir uma proposta de bom custo-benefício para reposição, destacando a tecnologia SLI, a cobertura de garantia e a disponibilidade da marca no mercado nacional."
                      },
    "eCON|E70ND-15":  {
                          "technology":  "SLI",
                          "voltage":  "12 V",
                          "capacity":  "70 Ah (C20)",
                          "cca":  "560 CCA",
                          "dimensions":  "275 x 175 x 175 mm",
                          "weight":  "17,2 kg",
                          "warranty":  "18 meses",
                          "description":  "Combina 560 CCA de CCA e 70 Ah (C20) para oferecer uma alternativa eCON alinhada à necessidade de partida do veículo. Com 18 meses de garantia, o E70ND-15 ajuda a construir uma proposta de bom custo-benefício para reposição, destacando a tecnologia SLI, a cobertura de garantia e a disponibilidade da marca no mercado nacional."
                      },
    "eCON|E95MD-15":  {
                          "technology":  "Frota",
                          "voltage":  "12 V",
                          "capacity":  "95 Ah (C20)",
                          "cca":  "720 CCA",
                          "dimensions":  "350 x 174 x 189 mm",
                          "weight":  "23,2 kg",
                          "warranty":  "15 meses",
                          "description":  "Combina 720 CCA de CCA e 95 Ah (C20) para oferecer uma alternativa eCON alinhada à necessidade de partida do veículo. Com 15 meses de garantia, o E95MD-15 ajuda a construir uma proposta de bom custo-benefício para reposição, destacando a tecnologia Frota, a cobertura de garantia e a disponibilidade da marca no mercado nacional."
                      },
    "eCON|ES100LE-15":  {
                            "technology":  "Frota",
                            "voltage":  "12 V",
                            "capacity":  "100 Ah (C20)",
                            "cca":  "700 CCA",
                            "dimensions":  "328 x 172 x 242 mm",
                            "weight":  "25,5 kg",
                            "warranty":  "15 meses",
                            "description":  "Combina 700 CCA de CCA e 100 Ah (C20) para oferecer uma alternativa eCON alinhada à necessidade de partida do veículo. Com 15 meses de garantia, o ES100LE-15 ajuda a construir uma proposta de bom custo-benefício para reposição, destacando a tecnologia Frota, a cobertura de garantia e a disponibilidade da marca no mercado nacional."
                        },
    "eCON|EM100LE-12":  {
                            "technology":  "Frota",
                            "voltage":  "12 V",
                            "capacity":  "100 Ah (C20)",
                            "cca":  "700 CCA",
                            "dimensions":  "344 x 172 x 240 mm",
                            "weight":  "26,4 kg",
                            "warranty":  "12 meses",
                            "description":  "Combina 700 CCA de CCA e 100 Ah (C20) para oferecer uma alternativa eCON alinhada à necessidade de partida do veículo. Com 12 meses de garantia, o EM100LE-12 ajuda a construir uma proposta de bom custo-benefício para reposição, destacando a tecnologia Frota, a cobertura de garantia e a disponibilidade da marca no mercado nacional."
                        },
    "eCON|E150TD-12":  {
                           "technology":  "Frota",
                           "voltage":  "12 V",
                           "capacity":  "150 Ah (C20)",
                           "cca":  "900 CCA",
                           "dimensions":  "508 x 215 x 230 mm",
                           "weight":  "39 kg",
                           "warranty":  "12 meses",
                           "description":  "Combina 900 CCA de CCA e 150 Ah (C20) para oferecer uma alternativa eCON alinhada à necessidade de partida do veículo. Com 12 meses de garantia, o E150TD-12 ajuda a construir uma proposta de bom custo-benefício para reposição, destacando a tecnologia Frota, a cobertura de garantia e a disponibilidade da marca no mercado nacional."
                       },
    "eCON|ES150TD-15":  {
                            "technology":  "Frota",
                            "voltage":  "12 V",
                            "capacity":  "150 Ah (C20)",
                            "cca":  "950 CCA",
                            "dimensions":  "508 x 215 x 225 mm",
                            "weight":  "40,5 kg",
                            "warranty":  "15 meses",
                            "description":  "Combina 950 CCA de CCA e 150 Ah (C20) para oferecer uma alternativa eCON alinhada à necessidade de partida do veículo. Com 15 meses de garantia, o ES150TD-15 ajuda a construir uma proposta de bom custo-benefício para reposição, destacando a tecnologia Frota, a cobertura de garantia e a disponibilidade da marca no mercado nacional."
                        },
    "eCON|E180TD-12":  {
                           "technology":  "Frota",
                           "voltage":  "12 V",
                           "capacity":  "180 Ah (C20)",
                           "cca":  "1.150 CCA",
                           "dimensions":  "508 x 215 x 230 mm",
                           "weight":  "45,6 kg",
                           "warranty":  "12 meses",
                           "description":  "Combina 1.150 CCA de CCA e 180 Ah (C20) para oferecer uma alternativa eCON alinhada à necessidade de partida do veículo. Com 12 meses de garantia, o E180TD-12 ajuda a construir uma proposta de bom custo-benefício para reposição, destacando a tecnologia Frota, a cobertura de garantia e a disponibilidade da marca no mercado nacional."
                       },
    "eCON|E180TE-12":  {
                           "technology":  "Frota",
                           "voltage":  "12 V",
                           "capacity":  "180 Ah (C20)",
                           "cca":  "1.150 CCA",
                           "dimensions":  "508 x 215 x 230 mm",
                           "weight":  "45,6 kg",
                           "warranty":  "12 meses",
                           "description":  "Combina 1.150 CCA de CCA e 180 Ah (C20) para oferecer uma alternativa eCON alinhada à necessidade de partida do veículo. Com 12 meses de garantia, o E180TE-12 ajuda a construir uma proposta de bom custo-benefício para reposição, destacando a tecnologia Frota, a cobertura de garantia e a disponibilidade da marca no mercado nacional."
                       },
    "Heliar|HAGM60HD":  {
                            "technology":  "AGM",
                            "voltage":  "12 V",
                            "capacity":  "60 Ah (C20)",
                            "cca":  "600 CCA",
                            "dimensions":  "242 x 175 x 190 mm",
                            "weight":  "17,4 kg",
                            "warranty":  "24 meses",
                            "description":  "Produto Heliar com 60 Ah (C20) e 600 CCA, uma combinação que apoia uma indicação segura para a faixa de demanda elétrica correspondente. O HAGM60HD oferece 24 meses de garantia e permite apoiar a venda em atributos reconhecidos da marca: PowerFrame, tradição em equipamento original e ampla cobertura de aplicações. Confirme sempre a equivalência do modelo antes de fechar a venda."
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
                            "cca":  "560 CCA",
                            "dimensions":  "242 x 175 x 190 mm",
                            "weight":  "20,4 kg",
                            "warranty":  "24 meses",
                            "description":  "Produto Heliar com 60 Ah (C20) e 560 CCA, uma combinação que apoia uma indicação segura para a faixa de demanda elétrica correspondente. O HEFB60HD oferece 24 meses de garantia e permite apoiar a venda em atributos reconhecidos da marca: PowerFrame, tradição em equipamento original e ampla cobertura de aplicações. Confirme sempre a equivalência do modelo antes de fechar a venda."
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
                             "technology":  "EFB",
                             "voltage":  "12 V",
                             "capacity":  "225 Ah (C20)",
                             "cca":  "1.050 CCA",
                             "dimensions":  "517 x 275 x 236 mm",
                             "weight":  "17,4 kg",
                             "warranty":  "24 meses",
                             "description":  "Produto Heliar com 225 Ah (C20) e 1.050 CCA, uma combinação que apoia uma indicação segura para a faixa de demanda elétrica correspondente. O HEFB225TD oferece 15 meses de garantia e permite apoiar a venda em atributos reconhecidos da marca: PowerFrame, tradição em equipamento original e ampla cobertura de aplicações. Confirme sempre a equivalência do modelo antes de fechar a venda."
                         },
    "Heliar|HEFB225TE":  {
                             "technology":  "EFB",
                             "voltage":  "12 V",
                             "capacity":  "225 Ah (C20)",
                             "cca":  "1.050 CCA",
                             "dimensions":  "517 x 275 x 236 mm",
                             "weight":  "57,4 kg",
                             "warranty":  "24 meses",
                             "description":  "Produto Heliar com 225 Ah (C20) e 1.050 CCA, uma combinação que apoia uma indicação segura para a faixa de demanda elétrica correspondente. O HEFB225TE oferece 15 meses de garantia e permite apoiar a venda em atributos reconhecidos da marca: PowerFrame, tradição em equipamento original e ampla cobertura de aplicações. Confirme sempre a equivalência do modelo antes de fechar a venda."
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
                          "cca":  "480 CCA",
                          "dimensions":  "242 x 175 x 190 mm",
                          "weight":  "14,2 kg",
                          "warranty":  "24 meses",
                          "description":  "Produto Heliar com 60 Ah (C20) e 480 CCA, uma combinação que apoia uma indicação segura para a faixa de demanda elétrica correspondente. O HE60HD oferece 24 meses de garantia e permite apoiar a venda em atributos reconhecidos da marca: PowerFrame, tradição em equipamento original e ampla cobertura de aplicações. Confirme sempre a equivalência do modelo antes de fechar a venda."
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
                           "technology":  "Frota",
                           "voltage":  "12 V",
                           "capacity":  "180 Ah (C20)",
                           "cca":  "950 CCA",
                           "dimensions":  "510 x 213 x 236 mm",
                           "weight":  "44,5 kg",
                           "warranty":  "15 meses",
                           "description":  "Produto Heliar com 180 Ah (C20) e 950 CCA, uma combinação que apoia uma indicação segura para a faixa de demanda elétrica correspondente. O HS180TD oferece 15 meses de garantia e permite apoiar a venda em atributos reconhecidos da marca: PowerFrame, tradição em equipamento original e ampla cobertura de aplicações. Confirme sempre a equivalência do modelo antes de fechar a venda."
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
                             "technology":  "VRLA",
                             "voltage":  "12 V",
                             "capacity":  "5 Ah (Cn)",
                             "cca":  "-",
                             "dimensions":  "90 x 70 x 101 mm",
                             "weight":  "1,39 kg",
                             "warranty":  "12 meses",
                             "description":  "Uma solução compacta de 5 Ah para reposição e montagem de sistemas de energia de emergência em 12 V. O EP12-5 agrega praticidade por ser selado e de manutenção reduzida, além de 12 meses de garantia, o que simplifica a argumentação para clientes de segurança, nobreak e telecomunicações."
                         },
    "eCON VRLA|EP12-7W":  {
                              "technology":  "VRLA",
                              "voltage":  "12 V",
                              "capacity":  "7 Ah (Cn)",
                              "cca":  "-",
                              "dimensions":  "151 x 65 x 93,5 mm",
                              "weight":  "1,82 kg",
                              "warranty":  "12 meses",
                              "description":  "Uma solução compacta de 7 Ah para reposição e montagem de sistemas de energia de emergência em 12 V. O EP12-7W agrega praticidade por ser selado e de manutenção reduzida, além de 12 meses de garantia, o que simplifica a argumentação para clientes de segurança, nobreak e telecomunicações."
                          },
    "eCON VRLA|EP12-7":  {
                             "technology":  "VRLA",
                             "voltage":  "12 V",
                             "capacity":  "7 Ah (Cn)",
                             "cca":  "-",
                             "dimensions":  "151 x 65 x 93,5 mm",
                             "weight":  "1,97 kg",
                             "warranty":  "12 meses",
                             "description":  "Uma solução compacta de 7 Ah para reposição e montagem de sistemas de energia de emergência em 12 V. O EP12-7 agrega praticidade por ser selado e de manutenção reduzida, além de 12 meses de garantia, o que simplifica a argumentação para clientes de segurança, nobreak e telecomunicações."
                         },
    "eCON VRLA|EP12-9":  {
                             "technology":  "VRLA",
                             "voltage":  "12 V",
                             "capacity":  "9 Ah (Cn)",
                             "cca":  "-",
                             "dimensions":  "151 x 65 x 93,5 mm",
                             "weight":  "2,52 kg",
                             "warranty":  "12 meses",
                             "description":  "Uma solução compacta de 9 Ah para reposição e montagem de sistemas de energia de emergência em 12 V. O EP12-9 agrega praticidade por ser selado e de manutenção reduzida, além de 12 meses de garantia, o que simplifica a argumentação para clientes de segurança, nobreak e telecomunicações."
                         },
    "eCON VRLA|EP12-12":  {
                              "technology":  "VRLA",
                              "voltage":  "12 V",
                              "capacity":  "12 Ah (Cn)",
                              "cca":  "-",
                              "dimensions":  "151 x 98 x 99,5 mm",
                              "weight":  "3,24 kg",
                              "warranty":  "12 meses",
                              "description":  "Uma solução compacta de 12 Ah para reposição e montagem de sistemas de energia de emergência em 12 V. O EP12-12 agrega praticidade por ser selado e de manutenção reduzida, além de 12 meses de garantia, o que simplifica a argumentação para clientes de segurança, nobreak e telecomunicações."
                          },
    "eCON VRLA|EP12-18":  {
                              "technology":  "VRLA",
                              "voltage":  "12 V",
                              "capacity":  "18 Ah (Cn)",
                              "cca":  "-",
                              "dimensions":  "181,5 x 76,5 x 167,5 mm",
                              "weight":  "5 kg",
                              "warranty":  "12 meses",
                              "description":  "Uma solução compacta de 18 Ah para reposição e montagem de sistemas de energia de emergência em 12 V. O EP12-18 agrega praticidade por ser selado e de manutenção reduzida, além de 12 meses de garantia, o que simplifica a argumentação para clientes de segurança, nobreak e telecomunicações."
                          }
};
