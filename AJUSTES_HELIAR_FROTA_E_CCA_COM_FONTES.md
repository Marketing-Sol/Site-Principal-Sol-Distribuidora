# Ajustes dirigidos — Heliar HEFB225TD, HEFB225TE, HE60HD e HEFB60HD

Pesquisa e conferência: 24/09/2026. Este documento orienta **alterações futuras no site**; não altera as páginas por si só. Escopo limitado aos quatro modelos citados. Não alterar imagens nem prazos de garantia nesta rodada, conforme decisão da Sol.

## Decisão editorial e técnica

- Comunicar os dados confirmados em voz direta da Sol. Deixar as fontes imediatamente abaixo do bloco que sustentam, com link para a página do fabricante ou registro oficial. Não exibir ao cliente notas internas como “pendente de validação”, “dados técnicos ocultados” ou “confirme a ficha vigente”.
- Separar **tecnologia** (EFB/SLI) de **aplicação** (veículo leve/frota pesada). A HEFB225TD e a HEFB225TE são EFB para veículos comerciais pesados; não devem herdar o texto de EFB de carro de passeio, táxi e aplicativo. A Heliar trata especificamente do uso de EFB em ônibus e caminhões, e a página oficial da HEFB225TD identifica a bateria como Frota EFB. [Heliar — EFB em ônibus e veículos pesados](https://www.heliar.com/blog/heliar-blog/entenda-por-que-onibus-precisam-da-tecnologia-de-bateria-efb-da-heliar); [Heliar — HEFB225TD](https://www.heliar.com/produtos/detalhes-do-produto/hefb225td).
- Usar o modelo **exato** do registro do Inmetro. A inclusão de 24/10/2024 do registro 003848/2013 distingue TD e TE inclusive no peso. Não transportar o peso da TD para a TE. [Inmetro — registro 003848/2013, página 5](https://registro.inmetro.gov.br/consulta/detalhe.aspx?NumeroRegistro=003848%2F2013&pag=5).
- CCA deve aparecer como corrente em ampères. Quando a fonte só mostra “CCA” sem temperatura ou norma, não acrescentar “−18 °C”, “SAE” ou outro método por inferência. Não confundir CCA com reserva de capacidade (RC).
- O registro Inmetro é a base adotada pela Sol para campos cobertos por entrada correspondente. Se a página da fabricante e a descrição registral divergem, registrar a divergência **internamente** e confirmar a variante/medida antes de substituir o campo no site. Não exibir duas dimensões incompatíveis como alternativas equivalentes.

## 1. HEFB225TD — corrigir a ficha de frota

Página: `/heliar-hefb225td`.

### Problema atual

O primeiro parágrafo recebe a capacidade textual “Confirme a ficha vigente” e vira “Bateria EFB de Confirme a ficha vigente…”. Capacidade, dimensões e peso aparecem como pendências; a nota interna é pública. A página herda blocos sobre start-stop simples, táxis e carros de aplicativo, embora seja uma EFB de aplicação pesada.

### Dados que podem entrar

| Campo | Texto recomendado no site | Base |
|---|---|---|
| Tecnologia e aplicação | EFB · linha Frota / veículos comerciais pesados | Página oficial HEFB225TD e conteúdo oficial Heliar sobre EFB em ônibus e caminhões. |
| Tensão | 12 V | Inmetro, inclusão de 24/10/2024. |
| Capacidade | 225 Ah (C20) | Inmetro; página oficial Heliar. |
| Corrente de partida | CCA: 1.050 A a −18 °C | Inmetro, modelo HEFB225TD. |
| Reserva de capacidade | 450 min | Inmetro, modelo HEFB225TD. |
| Peso | 57,4 kg | Inmetro, modelo HEFB225TD. |

Fonte abaixo da ficha técnica: `Fontes: Heliar, página do modelo HEFB225TD; Inmetro, registro 003848/2013, inclusão de 24/10/2024 para HEFB225TD.` Transformar os nomes em links para as duas páginas oficiais acima. A fonte da tecnologia/aplicação pesada pode ficar também sob o bloco explicativo: [Heliar — EFB em ônibus e veículos pesados](https://www.heliar.com/blog/heliar-blog/entenda-por-que-onibus-precisam-da-tecnologia-de-bateria-efb-da-heliar).

**Dimensões: não consolidar ainda.** A página oficial Heliar exibe **517 × 275 × 236 mm**, mas a descrição da inclusão consultada no Inmetro começa com **comprimento 530 mm**. O acesso textual à descrição completa não permitiu confirmar largura/altura nem se as medidas se referem à mesma definição/variante. A Sol determinou priorizar o Inmetro para divergências técnicas. Portanto, não preencher a ficha com 517 × 275 × 236 mm como se a divergência estivesse resolvida. Conferir o texto registral completo e a peça comercial exata com a engenharia/Clarios; até lá, **omitir a linha de dimensões**, sem mostrar “A confirmar” ao cliente. Não transformar 530 mm em dimensão completa por analogia. [Heliar — HEFB225TD](https://www.heliar.com/produtos/detalhes-do-produto/hefb225td); [Inmetro — registro 003848/2013, página 5](https://registro.inmetro.gov.br/consulta/detalhe.aspx?NumeroRegistro=003848%2F2013&pag=5).

### Texto pronto para a abertura

> A Heliar HEFB225TD é uma bateria EFB de 12 V e 225 Ah (C20) para veículos comerciais pesados compatíveis. Seus 1.050 A de CCA a −18 °C e 450 minutos de reserva de capacidade são referências para conferir a exigência elétrica da aplicação.

Não prometer compatibilidade automática com qualquer caminhão ou ônibus. Montagem, dimensões, polaridade e exigências do veículo precisam ser verificadas por código/variante antes da indicação.

### Texto pronto para “Tecnologia e aplicação”

> A tecnologia EFB foi desenvolvida para suportar rotinas de carga e descarga mais exigentes. Na linha pesada, ela atende veículos comerciais que exigem uma bateria compatível com sua especificação elétrica e com o perfil de uso da frota. A escolha deve considerar o código da bateria instalada, o espaço de montagem e os requisitos do fabricante do veículo.

Não reutilizar o bloco de benefícios que diz “start-stop simples” e cita táxis/carros de aplicativo. É possível mencionar start-stop ou alternador inteligente **somente como tecnologia presente em veículos comerciais compatíveis**, não como aplicação universal deste SKU. Fonte para o contexto: [Heliar — EFB em ônibus e veículos pesados](https://www.heliar.com/blog/heliar-blog/entenda-por-que-onibus-precisam-da-tecnologia-de-bateria-efb-da-heliar).

## 2. HEFB225TE — corrigir o texto e o peso, sem confundir com TD

Página: `/heliar-hefb225te`.

- Dar a ela o mesmo **enquadramento editorial de frota pesada EFB** da TD, com texto próprio para o código TE. Retirar menções a táxis, carros de aplicativo e a indicação genérica de EFB para automóveis leves. Não copiar dados de montagem/polaridade da TD: as terminações TD e TE devem continuar distinguíveis na especificação e na busca.
- O registro Inmetro 003848/2013, inclusão de 24/10/2024, traz para **HEFB225TE**: 12 V, 225 Ah em C20, CCA de 1.050 A a −18 °C, RC de 450 min e **peso de 56 kg**. A ficha atual mostra 57,4 kg, valor da TD; substituir por 56 kg quando implementado. [Inmetro — registro 003848/2013, página 5](https://registro.inmetro.gov.br/consulta/detalhe.aspx?NumeroRegistro=003848%2F2013&pag=5).
- A página atual contém duas menções incompatíveis de garantia: 24 meses na ficha e 15 meses no parágrafo comercial. **Remover o prazo do parágrafo**, sem mudar o campo de garantia nesta rodada. A Sol fará a revisão comercial específica depois.
- A dimensão publicada de 517 × 275 × 236 mm coincide com material da Heliar consultado, mas a descrição do Inmetro para a inclusão TE também começa por comprimento 530 mm. Aplicar a mesma regra da TD: conferir o registro integral e a variante comercial; não apresentar a dimensão como definitivamente conciliada. Na ausência dessa verificação, omitir o campo da página, sem placeholder público. [Heliar — linha EFB, incluindo HEFB225TE](https://www.heliar.com/produtos/baterias-automotivas/heliar-efb/hefb225te); [Inmetro — registro 003848/2013, página 5](https://registro.inmetro.gov.br/consulta/detalhe.aspx?NumeroRegistro=003848%2F2013&pag=5).

Texto pronto para abertura:

> A Heliar HEFB225TE é uma bateria EFB de 12 V e 225 Ah (C20) para veículos comerciais pesados compatíveis. A corrente de partida é de 1.050 A de CCA a −18 °C, com reserva de capacidade de 450 minutos. Confirme montagem e requisitos do veículo pelo código TE antes da substituição.

Nota de fonte sob a tabela: `Fonte: Inmetro, registro 003848/2013, inclusão de 24/10/2024 para HEFB225TE.` Usar link direto. Para o texto de tecnologia/aplicação, incluir fonte separada da Heliar sobre EFB em pesados.

## 3. HE60HD — substituir nota interna por referência útil

Página: `/heliar-he60hd`.

A Heliar confirma para o **HE60HD**: bateria convencional, 60 Ah em C20, **480 A de CCA** e 242 × 175 × 190 mm. A página oficial não explicita temperatura nem padrão do ensaio de CCA; não acrescentar esses detalhes à ficha com base apenas nela. O registro Inmetro 004088/2013 contém histórico de 480 A a −18 °C, porém as linhas de alteração de 10/08/2026 encontradas na consulta exibem dados transpostos/inconsistentes entre RC e CCA e dimensões diferentes da página do fabricante. Até a confirmação da entrada aplicável, usar a página Heliar para o valor de CCA e **não publicar temperatura ou RC como dado consolidado**. [Heliar — HE60HD](https://www.heliar.com/produtos/detalhes-do-produto/h60hd); [Inmetro — registro 004088/2013, página 14](https://registro.inmetro.gov.br/consulta/detalhe.aspx?NumeroRegistro=004088%2F2013&pag=14); [histórico de exclusões, página 47](https://registro.inmetro.gov.br/consulta/detalhe.aspx?NumeroRegistro=004088%2F2013&pag=47).

Mudança dirigida:

1. Remover da área pública `Fonte técnica específica do HE60HD: pendente de validação para publicar o método e a temperatura de CCA.`
2. Exibir `CCA: 480 A` se o campo for mantido, sem “−18 °C”, “SAE” ou RC não confirmado.
3. Abaixo da ficha, inserir `Fonte dos dados de capacidade, CCA e dimensões: Heliar — HE60HD`, com link para a página oficial. **Não atribuir o peso de 14,2 kg a esse link**, pois a página Heliar consultada não informa peso. Não alterar o peso nesta rodada sem fonte específica validada pela Sol.
4. Manter a apresentação curta de SLI/convencional para veículos compatíveis sem start-stop; não repetir benefício genérico ou promessa de durabilidade sem ensaio contextualizado.

Texto pronto para abertura:

> A Heliar HE60HD é uma bateria convencional de 12 V e 60 Ah (C20), com 480 A de CCA. É uma opção para veículos sem start-stop cuja aplicação peça esse código e suas dimensões de 242 × 175 × 190 mm.

## 4. HEFB60HD — substituir nota interna por referência útil

Página: `/heliar-hefb60hd`.

A página oficial Heliar do **HEFB60HD** confirma EFB, 60 Ah em C20, **560 A de CCA** e 242 × 175 × 190 mm, com aplicação em veículos de start-stop simples ou alternadores inteligentes. Ela não informa temperatura/padrão do CCA nem peso. Os resultados do Inmetro localizados durante a pesquisa trazem entradas históricas de **HFB60HD** (sem “E” após H), não uma inclusão atual inequívoca do código **HEFB60HD**; não transferir número ou peso do HFB60HD por semelhança de nome. [Heliar — HEFB60HD](https://www.heliar.com/produtos/detalhes-do-produto/hefb60hd); [Inmetro — histórico HFB60HD, registro 004088/2013](https://registro.inmetro.gov.br/consulta/detalhe.aspx?NumeroRegistro=004088%2F2013&pag=44).

Mudança dirigida:

1. Remover da área pública `Fonte técnica específica do HEFB60HD: pendente de validação para publicar o método e a temperatura de CCA.`
2. Exibir `CCA: 560 A`, sem acrescentar temperatura/padrão não informados pela fonte do modelo exato.
3. Abaixo da ficha, inserir `Fonte dos dados de capacidade, CCA, dimensões e aplicação: Heliar — HEFB60HD`, com link para a página oficial. O peso hoje publicado (20,4 kg) **não é comprovado por essa página**; preservá-lo apenas conforme decisão comercial/documental já existente e não atribuí-lo à Heliar ou ao HFB60HD sem confirmação específica. Se a Sol exigir fonte junto de todos os campos, retirar somente a linha de peso até obter ficha da variante HEFB60HD, sem trocar por peso de outro código.
4. Manter a indicação de start-stop **simples/alternador inteligente** sujeita à compatibilidade do veículo. Evitar dizer que todo veículo desse tipo usa obrigatoriamente esse modelo.

Texto pronto para abertura:

> A Heliar HEFB60HD reúne tecnologia EFB, 60 Ah (C20) e 560 A de CCA. Suas dimensões são 242 × 175 × 190 mm; a aplicação deve corresponder ao veículo com start-stop simples ou alternador inteligente especificado para esse código.

## Orientação de implementação no site

- Em `app/product-specs.ts`, revisar as quatro entradas `Heliar|HEFB225TD`, `Heliar|HEFB225TE`, `Heliar|HE60HD` e `Heliar|HEFB60HD`: números separados por modelo, descrições curtas, `sourceNote` objetivo e `sourceHref` oficial. O campo `description` da TE não deve mencionar garantia.
- Em `app/site.tsx`, a função `heliarLineFor` identifica “EFB” antes de “Frota”; por isso `Frota / EFB` recebe automaticamente conteúdo EFB de veículo leve. Tratar TD e TE como uma apresentação própria **Frota EFB** (ou exceção explícita de página), preservando a tecnologia EFB na ficha e trocando abertura, benefícios, texto de aplicação, FAQ e produtos relacionados. Não resolver apenas trocando a palavra “Frota” no rótulo.
- No agrupamento `productNiche`, a TD aparece como Frota, mas a TE cai em EFB Tech. Colocar ambas na mesma seção de frota pesada, sem remover outros modelos nem criar novos produtos.
- Para dimensões dos dois modelos 225, a interface deve poder **ocultar o campo** enquanto a divergência é apurada. Não renderizar “A confirmar” nem “Confirme a ficha vigente” no front-end. Reintroduzir valor único apenas após confirmação documentada.
- Manter as fontes técnicas abaixo da ficha, e a fonte Heliar de aplicação/tecnologia abaixo do respectivo texto. Os links são para consulta e rastreabilidade; a Sol continua comunicando os dados de forma assertiva.
- **Garantias congeladas:** não modificar os campos de prazo nesta entrega. Remover apenas menções inconsistentes nos parágrafos descritivos. A validação comercial ficará para a rodada de garantias.

## Checagem de publicação

1. As quatro URLs abrem sem “pendente”, “A confirmar”, “Confirme a ficha vigente” ou frases gramaticalmente quebradas.
2. TD e TE mostram 225 Ah (C20), 1.050 A de CCA a −18 °C, RC 450 min e pesos **distintos** (57,4 kg TD; 56 kg TE); não há extrapolação de montagem/polaridade.
3. HE60HD mostra 480 A de CCA; HEFB60HD, 560 A. Não há temperatura/norma inventada para esses dois códigos.
4. As páginas 225 descrevem **frota pesada**, sem o parágrafo de táxis/carros de aplicativo. A navegação as mantém juntas na seção correspondente.
5. Dimensões dos modelos 225 permanecem ocultas até reconciliação da fonte Inmetro × Heliar. Registrar internamente a resolução e reabrir o campo somente depois.
6. Fonte sob cada bloco corresponde ao dado citado e ao modelo exato. Prazos de garantia permanecem sem alteração.

## Fontes oficiais principais

- [Heliar — HEFB225TD](https://www.heliar.com/produtos/detalhes-do-produto/hefb225td).
- [Heliar — linha EFB com HEFB225TD e HEFB225TE](https://www.heliar.com/produtos/baterias-automotivas/heliar-efb/hefb225te). A URL específica da TE pode redirecionar/variar; validar o destino no momento de inserir um link público. Para a TE, o registro do Inmetro é a referência numérica principal.
- [Heliar — EFB em ônibus e veículos pesados](https://www.heliar.com/blog/heliar-blog/entenda-por-que-onibus-precisam-da-tecnologia-de-bateria-efb-da-heliar).
- [Inmetro — HEFB225TD e HEFB225TE, registro 003848/2013, inclusão de 24/10/2024](https://registro.inmetro.gov.br/consulta/detalhe.aspx?NumeroRegistro=003848%2F2013&pag=5).
- [Heliar — HE60HD](https://www.heliar.com/produtos/detalhes-do-produto/h60hd).
- [Heliar — HEFB60HD](https://www.heliar.com/produtos/detalhes-do-produto/hefb60hd).
- [Inmetro — HE60HD, registro 004088/2013, página 14](https://registro.inmetro.gov.br/consulta/detalhe.aspx?NumeroRegistro=004088%2F2013&pag=14) e [histórico, página 47](https://registro.inmetro.gov.br/consulta/detalhe.aspx?NumeroRegistro=004088%2F2013&pag=47); usados para identificar a inconsistência, não para substituir os números da página Heliar sem validação.

### Pendências internas antes de fechar todos os campos

- Resolver com a Clarios/engenharia a diferença entre as dimensões públicas Heliar (517 × 275 × 236 mm) e a descrição registral que começa por 530 mm para HEFB225TD/TE; obter o registro integral e identificar se se trata de medida externa, caixa ou variante.
- Confirmar fonte do peso de HEFB60HD e, se necessário, do HE60HD, sem usar código parecido como substituto.
- Conferir a inclusão do modelo exato HEFB60HD no Inmetro caso a Sol queira publicar temperatura/padrão de CCA a partir desse registro. A página da Heliar sustenta o valor 560 A, mas não explicita essas condições.
