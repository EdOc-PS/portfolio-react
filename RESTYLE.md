# Restyle — branch `new`

Escopo: só front (`portfolio-react`). `portfolio-node` e `portfolio-react/api` não são afetados (a menos que necessário).

## Referências
- https://www.seanhalpin.xyz/fun — bordas arredondadas, espaçamento generoso, minimalismo, cards limpos.
- https://www.brandappart.com/ — menu lateral fixo com ícones + tooltip, fundo claro sólido, tipografia grande, layout não-landing-page (telas separadas).

## Mudança de arquitetura de navegação
- Deixa de ser uma landing page única (scroll com todas as seções).
- Vira telas/rotas separadas.
- Menu lateral fixo (estilo Brand Appart), por enquanto com 3 itens:
  - Work
  - About
  - Contact
- Ícones do menu: **HugeIcons** (por enquanto).
- Cada ícone do menu tem tooltip lateral com fonte amigável/sans diferenciada (ver seção Fontes).

## Cards de projeto (seção Work)
- Estilo dos cards inspirado no seanhalpin.xyz/fun: bordas arredondadas (radius 12px nos cards grandes, checado no DOM real do site), espaçamento confortável, minimalista.

## Radius (checado no DOM do seanhalpin.xyz/fun)
- Cards grandes: 12px
- Itens de nav/pills (altura ~36-44px): 24px — bem mais arredondado, quase pill
- Usar pill (`rounded-full`) nos itens do menu lateral, que são grandes (80px), pra manter o "muito arredondado" do site de referência.

## Tamanho / escala
- Padrão do site: elementos grandes, vivos, minimalistas (textos maiores, ícones maiores, bastante espaço).
- Menu lateral: itens grandes (80px, estilo brandappart.com + bem arredondado como seanhalpin), fundo glassmorfismo tanto no item quanto no tooltip, sem borda/sombra.
- Hover no item do menu: cresce (scale-110).

## Tema
- Tema principal: **claro** (light).
- Cor de fundo: `#FBF9EF` (branco quente)
- Cor de texto/contraste: `#1F1F1F` (preto, confirmado — contraste ~15.8:1 com o fundo)

## Paleta de cores vivas
- Roxo escuro vivo (principal): `#4635B1`
- Azul vivo (principal): `#45CFDD`
- Roxo complementar (secundário): `#9681EB`
- Azul complementar (secundário): `#A7EDE7`

## Cores de acento (stickers)
- 4 cores sólidas extraídas da paleta de gradientes dos stickers de referência (estilo "gradient sticker illustration", ex: Freepik/Storyset "Gradient"), pra usar de forma pontual em cada sticker/elemento decorativo — não substituem roxo/azul de marca, são complementares:
  - Verde: `#2FD48B`
  - Azul (sticker): `#5B9BEA`
  - Laranja: `#F2994A`
  - Rosa: `#F2618C`
- Uso: sólido por padrão; gradiente (entre 2 desses tons, ou tom+variante) só em ocasiões específicas, não como regra geral.

## Stickers (estilo "gradient sticker illustration")
- Estilo: contorno preto grosso + preenchimento sólido (cor de acento) + marcações tipo rabisco (linhas de movimento, pontinhos).
- Fonte recomendada: Freepik/Storyset "Gradient" ou Iconscout "Gradient Stickers" (adaptar preenchimento pra cor sólida da paleta acima).
- Onde usar (1 por seção, nunca em grupo, pra não poluir):
  - Hero da Work: 1 sticker pequeno perto do título
  - Card "Projeto em destaque": 1 sticker no canto da badge
  - About: 1 sticker perto da foto/bio
  - Contact: 1 sticker perto do CTA
  - Footer: opcional, perto do "Obrigado pela visita!"

## Imagens
- Imagens do Google já baixadas existem no projeto, mas **não serão usadas ainda** nesta etapa de reformulação.

## Fontes
- Trocar fontes atuais para acompanhar os novos tamanhos/padrão amigável.
- Fontes maiores no geral.
- **Plus Jakarta Sans** (Regular/Medium) — texto/corpo geral.
- **Poppins** (Bold/ExtraBold) — títulos e tooltip do menu lateral (fonte de destaque, reaproveitada em tamanho pequeno pros tooltips, como no brandappart.com com "Youth").

## Pendências / decisões em aberto
- [ ] Estrutura de rotas para Work / About / Contact
- [ ] Mapear componentes existentes (`src/components/layout/*`, `src/pages/*`) para a nova arquitetura de telas separadas
