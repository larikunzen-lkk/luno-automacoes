# Luno Automações — Product Requirements Document (PRD)

**Data:** 2026-03-21
**Versão:** 1.1
**Status:** Ready for Architect
**Autor:** Morgan (@pm)

---

## Goals and Background Context

### Goals

- Criar presença digital profissional para a Luno Automações que gere leads qualificados de clínicas
- Demonstrar competência técnica através do próprio funcionamento do site (formulário automatizado, agendamento integrado)
- Converter visitantes em clientes com ticket médio de R$900 sem depender de indicações
- Capturar leads 24/7 via diagnóstico gratuito automatizado com resposta em menos de 5 minutos
- Estabelecer autoridade no nicho de automação para clínicas via cases e calculadora de ROI
- Habilitar tráfego via Facebook e Instagram com Meta Pixel integrado desde o lançamento

### Background Context

A Luno Automações é uma marca de serviços de automação de processos voltada para pequenas e médias empresas, com foco inicial em clínicas. O problema central é a ausência de presença digital estruturada: sem um site próprio, a profissional depende exclusivamente de indicações para prospectar clientes, resultando em ciclos de venda longos e dificuldade em escalar.

O mercado de automação para PMEs brasileiras está em crescimento acelerado com ferramentas como Make, n8n e Zapier — mas a maioria dos gestores de clínicas não sabe calcular o custo real de seus processos manuais nem como justificar a contratação de um serviço de automação. O site da Luno precisa preencher essa lacuna: comunicar valor em linguagem de negócio, demonstrar resultados concretos e converter pelo exemplo — sendo ele próprio uma automação funcionando ao vivo.

### Change Log

| Data | Versão | Descrição | Autor |
|------|--------|-----------|-------|
| 2026-03-21 | 1.0 | Versão inicial | Morgan (@pm) |
| 2026-03-21 | 1.1 | Adicionados FR11, FR12, NFR9, NFR10 (LGPD + webhook auth + retenção de dados); fallback Make.com; Sentry | Morgan (@pm) |

---

## Requirements

### Functional

- **FR1:** O site deve exibir homepage com headline, proposta de valor (*"A geração imediatista não espera. Sua operação também não deveria."*) e CTA principal para diagnóstico gratuito
- **FR2:** O site deve conter calculadora de ROI interativa com estimativa de economia mensal em R$ em tempo real
- **FR3:** O site deve conter formulário de diagnóstico multi-step coletando: nome, empresa, segmento, dor principal e contato (WhatsApp ou e-mail)
- **FR4:** Ao submeter o formulário, o sistema deve notificar automaticamente via WhatsApp e e-mail em menos de 5 minutos
- **FR5:** O site deve integrar Calendly para agendamento direto acessível via CTA na página
- **FR6:** O site deve exibir mínimo de 2 cases de sucesso com estrutura antes/após e métricas documentadas
- **FR7:** O site deve conter seção "Como funciona" com 3 passos em linguagem não-técnica
- **FR8:** O site deve conter página de serviços com 2-3 pacotes nomeados, descrição em linguagem de negócio e CTA por pacote
- **FR9:** Meta Pixel implementado em todas as páginas rastreando: `PageView`, `Lead`, `ViewContent`, `Schedule`
- **FR10:** Site responsivo em mobile (iOS/Android) e principais navegadores (Chrome, Safari, Firefox)
- **FR11:** O site deve exibir banner de consentimento de cookies (LGPD) com opt-in explícito antes de ativar o Meta Pixel — Meta Pixel só deve disparar após consentimento do usuário
- **FR12:** O site deve ter página `/privacidade` com política de privacidade descrevendo: dados coletados, finalidade, base legal (LGPD), tempo de retenção e direitos do titular

### Non-Functional

- **NFR1:** Lighthouse score ≥ 90 em Performance, Acessibilidade e SEO
- **NFR2:** Tempo de carregamento da homepage < 2s em conexão 4G
- **NFR3:** Rate limiting no formulário: máx. 3 submissões por IP por hora
- **NFR4:** HTTPS obrigatório com certificado SSL válido
- **NFR5:** Proteção anti-spam via Cloudflare Turnstile no formulário
- **NFR6:** Stack dentro do free tier no MVP (Vercel, Make.com ≤1.000 ops/mês, Calendly free)
- **NFR7:** Uptime ≥ 99,9% (garantido pelo Vercel)
- **NFR8:** Dados de leads armazenados em Google Sheets via webhook com backup automático
- **NFR9:** Endpoint do webhook do formulário deve validar token secreto (Bearer token ou HMAC) para autenticar requisições do Make.com — rejeitar requests sem token válido com HTTP 401
- **NFR10:** Dados de leads retidos por no máximo 24 meses no Google Sheets, após o que devem ser anonimizados ou removidos

---

## User Interface Design Goals

### Overall UX Vision
Site de conversão com identidade profissional, vibrante e moderna — transmite confiança e competência técnica sem intimidar gestores não-técnicos. Experiência fluida, direta e orientada a uma única ação: agendar o diagnóstico gratuito. Cada scroll deve reforçar credibilidade e remover objeções de compra.

### Key Interaction Paradigms
- Single CTA dominante visível em todas as seções (sticky no mobile)
- Scroll progressivo de confiança: Proposta de valor → Prova social → Como funciona → Pacotes → CTA final
- Calculadora interativa com resultado em tempo real (sem submit)
- Formulário conversacional com campos progressivos por etapa

### Core Screens and Views
1. **Homepage** — Proposta de valor, calculadora de ROI, preview dos cases, CTA
2. **Página de Serviços / Pacotes** — 2-3 pacotes com nomes, descrição e CTA
3. **Formulário de Diagnóstico** — Multi-step com campos progressivos
4. **Cases de Sucesso** — Antes/após com métricas por nicho
5. **Confirmação de Agendamento** — Pós-formulário com Calendly integrado
6. **Política de Privacidade** — Página `/privacidade` (LGPD)

### Accessibility
**WCAG AA** — Contraste adequado, labels em formulários, navegação por teclado

### Branding
**Luno Automações** — Paleta vibrante, média e clara. Base branca/off-white com acentos em azul médio, lilás ou verde-água vibrante. Sem dark mode. Tipografia sans-serif moderna (Inter ou Geist). Identidade visual final a definir antes do desenvolvimento.

### Target Device and Platforms
**Web Responsivo** — Desktop-first no design, mobile-first no desenvolvimento (tráfego Meta Ads majoritariamente mobile)

---

## Technical Assumptions

### Repository Structure
**Monorepo** — Repositório único com Next.js app e configurações de integração

### Service Architecture
**JAMstack + Serverless Functions** — Next.js 14+ (App Router) com SSG/ISR para SEO e performance, serverless functions no Vercel para endpoints do formulário (com autenticação webhook) e webhooks, zero servidor dedicado

### Testing Requirements
**Unit + Integration** — Testes unitários para calculadora de ROI, testes de integração para fluxo formulário → webhook → Google Sheets, testes manuais de responsividade e cross-browser antes do lançamento

### Additional Technical Assumptions
- **Frontend:** Next.js 14+, TypeScript, Tailwind CSS, shadcn/ui
- **Deploy:** Vercel (free tier) com CI/CD automático via GitHub
- **Automação (primária):** Make.com (free tier) → Google Sheets + WhatsApp/e-mail
- **Automação (fallback):** Se Make.com indisponível, serverless function envia e-mail direto via Resend (free tier: 3.000 emails/mês) como backup
- **Agendamento:** Calendly (free tier) via embed ou link
- **Anti-spam:** Cloudflare Turnstile (gratuito)
- **Analytics:** Meta Pixel (com consentimento LGPD) + Vercel Analytics
- **Error monitoring:** Sentry free tier — integrado desde a Story 1.1
- **Domínio:** `lunoautomacoes.com.br` (~R$40/ano)
- **Sem banco de dados, sem autenticação de usuário, sem CMS** no MVP
- **Conteúdo de cases:** MDX — versionado no repositório Git
- **Runtime:** Node.js 18+

---

## Epic List

| # | Epic | Objetivo |
|---|------|---------|
| 1 | Fundação & Homepage | Infraestrutura + homepage publicada com identidade Luno |
| 2 | Conversão & Automação | Calculadora de ROI + formulário + Make.com + Calendly |
| 3 | Credibilidade & Serviços | Cases + pacotes + checklist de lançamento |

---

## Epic 1: Fundação & Homepage

> Estabelecer a infraestrutura completa do projeto (repositório GitHub, CI/CD via Vercel, domínio) e entregar a homepage funcional da Luno Automações com identidade visual base, proposta de valor clara e CTA principal operacional — resultando em um site publicado e acessível ao final deste epic.

### Story 1.1 — Setup do Projeto e Deploy Inicial

> Como desenvolvedora da Luno Automações,
> quero inicializar o repositório Next.js com configuração base e deploy automático no Vercel,
> para que o ambiente de desenvolvimento e produção estejam operacionais desde o início.

**Acceptance Criteria:**
1. Repositório GitHub criado com Next.js 14+ (App Router), TypeScript e Tailwind CSS configurados
2. shadcn/ui instalado e configurado com tema base
3. Deploy automático no Vercel configurado — push para `main` publica em produção
4. Vercel Analytics integrado e coletando dados de pageview
5. Sentry integrado (free tier) para error monitoring em produção
6. Variáveis de ambiente configuradas no Vercel (estrutura base para futuras integrações)
7. Lighthouse score ≥ 90 na página inicial

### Story 1.2 — Identidade Visual e Layout Base

> Como visitante do site da Luno Automações,
> quero ver uma identidade visual consistente e profissional em todas as páginas,
> para que eu perceba a marca como confiável e competente.

**Acceptance Criteria:**
1. Paleta clara e vibrante da Luno Automações aplicada via Tailwind config (base branca/off-white + acentos médios/vibrantes — azul, lilás ou verde-água)
2. Tipografia configurada (Inter ou Geist via `next/font`)
3. Componentes base criados: Header com logo/nome da marca e nav mínima, Footer com contato e redes sociais
4. Layout responsivo funcional em mobile (≥375px) e desktop (≥1280px)
5. Favicon e meta tags Open Graph configurados para compartilhamento no Facebook/Instagram

### Story 1.3 — Homepage: Hero e Proposta de Valor

> Como gestor de clínica visitando o site via anúncio no Instagram,
> quero ver imediatamente o que a Luno Automações faz e por que é relevante para mim,
> para que eu decida em menos de 10 segundos se vale continuar lendo.

**Acceptance Criteria:**
1. Seção Hero exibe headline *"A geração imediatista não espera. Sua operação também não deveria."* e subheadline em linguagem de negócio voltada para clínicas
2. CTA principal "Quero meu diagnóstico gratuito" visível no hero sem scroll
3. Seção de credibilidade rápida abaixo do hero (ferramentas usadas ou estatísticas de impacto)
4. Banner de consentimento de cookies (LGPD) exibido na primeira visita com opt-in — Meta Pixel só ativa após consentimento
5. Meta Pixel disparando `PageView` apenas após consentimento do usuário
6. Meta Pixel disparando `Lead` ao clicar no CTA principal (após consentimento)

### Story 1.4 — Homepage: Seções de Suporte e SEO Base

> Como gestor de clínica navegando pela homepage,
> quero encontrar informações suficientes para confiar na Luno antes de preencher qualquer formulário,
> para que eu me sinta seguro ao compartilhar meus dados de contato.

**Acceptance Criteria:**
1. Seção "Como funciona" com 3 passos visuais em linguagem não-técnica
2. Seção de preview dos pacotes/serviços com link para página completa
3. Seção de CTA final repetindo o botão de diagnóstico gratuito
4. Meta tags de SEO configuradas: `title`, `description`, `og:image` específicos para homepage
5. Sitemap.xml e robots.txt gerados automaticamente via Next.js
6. Página `/privacidade` publicada com política de privacidade (LGPD) — dados coletados, finalidade, base legal, retenção de 24 meses, direitos do titular
7. Site acessível via domínio configurado com SSL ativo

---

## Epic 2: Conversão & Automação

> Implementar os mecanismos centrais de conversão do site: calculadora de ROI interativa, formulário de diagnóstico multi-step com automação completa via Make.com (notificação WhatsApp/e-mail + registro em Google Sheets com fallback via Resend) e integração com Calendly — transformando visitantes em leads qualificados de forma totalmente automatizada.

### Story 2.1 — Calculadora de ROI Interativa

> Como gestor de clínica visitando o site,
> quero inserir quantas horas semanais perco em tarefas manuais e ver quanto isso me custa por mês,
> para que eu consiga justificar internamente a contratação de um serviço de automação.

**Acceptance Criteria:**
1. Campo numérico (ou slider) para horas semanais gastas em tarefas manuais
2. Resultado calculado automaticamente em tempo real (sem submit): economia mensal estimada em R$
3. Resultado exibe comparativo: custo mensal atual de trabalho manual vs. investimento em automação (~R$900)
4. Componente responsivo e funcional em mobile
5. Meta Pixel dispara `ViewContent` ao interagir com a calculadora (se consentimento ativo)
6. Testes unitários cobrindo a lógica de cálculo (valores válidos e extremos)

### Story 2.2 — Formulário de Diagnóstico Multi-Step

> Como gestor de clínica interessado no serviço,
> quero preencher um formulário simples e progressivo sobre minha operação,
> para que eu receba um diagnóstico personalizado sem precisar ligar para ninguém.

**Acceptance Criteria:**
1. Formulário multi-step com 4 etapas: segmento/empresa → dor principal → contato (nome + WhatsApp ou e-mail) → confirmação
2. Progresso visual entre etapas (barra ou indicador de passos)
3. Validação em tempo real por campo antes de avançar
4. Cloudflare Turnstile na etapa final (anti-spam)
5. Rate limiting: máx. 3 submissões por IP por hora via Vercel serverless function
6. Submissão bem-sucedida redireciona para página de confirmação com link Calendly
7. Meta Pixel dispara `Lead` ao completar o formulário (se consentimento ativo)

### Story 2.3 — Automação Make.com: Lead para Google Sheets e Notificação

> Como proprietária da Luno Automações,
> quero ser notificada automaticamente quando um novo lead preencher o formulário,
> para que eu possa responder em menos de 5 minutos sem verificar o site manualmente.

**Acceptance Criteria:**
1. Endpoint serverless valida Bearer token antes de processar o webhook — rejeita requests sem token válido com HTTP 401
2. Webhook no Make.com recebe dados do formulário via Vercel serverless function autenticada
3. Lead registrado automaticamente em Google Sheets: data/hora, nome, empresa, segmento, dor principal, contato
4. Notificação por e-mail enviada em menos de 2 minutos após submissão com resumo do lead
5. Notificação via WhatsApp (Make.com + WhatsApp Business) com dados principais do lead
6. Fallback ativo: se Make.com indisponível, serverless function envia e-mail direto via Resend garantindo que nenhum lead se perde
7. Cenário Make.com documentado com export para referência futura
8. Teste E2E: submissão real → verificar planilha + notificações (e-mail e WhatsApp) em menos de 2 minutos

### Story 2.4 — Integração Calendly e Página de Confirmação

> Como lead que acabou de preencher o diagnóstico,
> quero agendar uma conversa diretamente após o formulário sem trocar mensagens,
> para que eu garanta meu horário de forma imediata e sem fricção.

**Acceptance Criteria:**
1. Página de confirmação exibida após submissão bem-sucedida com mensagem de agradecimento personalizada
2. Embed ou link do Calendly integrado na página de confirmação para agendamento imediato
3. Botão de Calendly disponível no header/nav do site como alternativa de conversão
4. Página de confirmação otimizada para mobile
5. Meta Pixel dispara `Schedule` ao clicar no link/botão do Calendly (se consentimento ativo)

---

## Epic 3: Credibilidade & Serviços

> Construir as seções de prova social e oferta que completam o funil de conversão: cases de sucesso com resultados reais por nicho, página de pacotes com precificação clara e FAQ, e checklist de lançamento — entregando um site completo e pronto para receber tráfego pago via Facebook e Instagram.

### Story 3.1 — Cases de Sucesso

> Como gestor de clínica avaliando contratar a Luno Automações,
> quero ver resultados reais de outros negócios similares ao meu,
> para que eu confie que o serviço funciona antes de investir R$900.

**Acceptance Criteria:**
1. Mínimo de 2 cases publicados com estrutura: contexto → problema → solução → resultado com métricas (ex: "reduziu 8h/semana", "diminuiu faltas em 30%")
2. Cada case identifica o nicho e ferramentas utilizadas
3. Cases renderizados via MDX — versionados no repositório
4. Seção de preview na homepage com link para detalhes completos
5. Layout responsivo com destaque visual para métricas de resultado
6. Fallback aceitável para MVP: case simulado com dados realistas e disclaimer "resultado baseado em projeto piloto" — substituir por case real assim que disponível

### Story 3.2 — Página de Pacotes e Serviços

> Como visitante interessado em contratar a Luno Automações,
> quero entender claramente o que está incluído em cada pacote e quanto custa,
> para que eu possa tomar a decisão de compra sem precisar falar com ninguém primeiro.

**Acceptance Criteria:**
1. Página `/servicos` com 2-3 pacotes nomeados criativamente em vez de nomenclatura técnica
2. Cada pacote exibe: nome, descrição em linguagem de negócio, lista do que está incluído, preço (ou "a partir de R$X") e CTA
3. Pacote recomendado visualmente destacado (badge ou destaque visual)
4. Seção de FAQ com objeções: "É caro?", "Preciso de TI?", "Quanto tempo leva?", "E se não funcionar?"
5. CTAs direcionam para formulário de diagnóstico (sem checkout no MVP)
6. Meta Pixel dispara `ViewContent` na visualização da página (se consentimento ativo)

### Story 3.3 — Otimização Final e Checklist de Lançamento

> Como proprietária da Luno Automações prestes a lançar o site,
> quero garantir que todos os elementos estão funcionando corretamente antes de investir em anúncios,
> para que o tráfego pago não seja desperdiçado por falhas técnicas ou de conversão.

**Acceptance Criteria:**
1. Lighthouse score ≥ 90 em Performance, Acessibilidade e SEO em todas as páginas principais
2. Meta Pixel Debugger confirma eventos disparando corretamente após consentimento: `PageView`, `Lead`, `ViewContent`, `Schedule`
3. Banner LGPD testado: Meta Pixel não dispara antes do opt-in; dispara corretamente após
4. Fluxo E2E testado: homepage → calculadora → formulário → confirmação → Calendly
5. Formulário testado em iOS Safari e Android Chrome
6. Google Sheets recebendo leads com todos os campos preenchidos
7. Notificações WhatsApp e e-mail chegando em menos de 2 minutos
8. Fallback Resend testado: simular falha do Make.com → confirmar recebimento de e-mail de fallback
9. Domínio com SSL ativo apontando para Vercel
10. Página `/privacidade` acessível e com conteúdo completo

---

## Checklist Results Report

| Categoria | Status | Resolução |
|-----------|--------|-----------|
| 1. Problem Definition & Context | ⚠️ PARTIAL (80%) | Sem pesquisa formal — aceitável para MVP solo |
| 2. MVP Scope Definition | ⚠️ PARTIAL (85%) | Escopo bem definido; feedback pós-MVP não crítico agora |
| 3. User Experience Requirements | ⚠️ PARTIAL (80%) | Flows cobertos nas ACs das stories |
| 4. Functional Requirements | ✅ PASS (92%) | FR11 e FR12 adicionados (LGPD) |
| 5. Non-Functional Requirements | ✅ PASS (90%) | NFR9 (webhook auth) e NFR10 (retenção) adicionados |
| 6. Epic & Story Structure | ✅ PASS (95%) | — |
| 7. Technical Guidance | ⚠️ PARTIAL (82%) | Sentry e fallback Make.com adicionados |
| 8. Cross-Functional Requirements | ⚠️ PARTIAL (75%) | Webhook auth e retenção adicionados |
| 9. Clarity & Communication | ⚠️ PARTIAL (78%) | Projeto solo — stakeholder único |

**Completude geral:** 86% | **Escopo MVP:** ✅ Just Right | **Decisão:** ✅ **READY FOR ARCHITECT**

---

## Next Steps

### UX Expert Prompt

> Você é @ux-design-expert. Usando o PRD da Luno Automações (`docs/prd.md`) como input, crie a arquitetura de UX e especificação visual detalhada do site. Foco em: paleta vibrante/clara (sem dark mode), formulário multi-step de diagnóstico, calculadora de ROI interativa e homepage orientada a conversão para gestores de clínicas. Plataforma: Web Responsivo, mobile-first no desenvolvimento.

### Architect Prompt

> Você é @architect. Usando o PRD da Luno Automações (`docs/prd.md`) como input, crie a arquitetura técnica detalhada do site. Stack definida: Next.js 14+ (App Router), TypeScript, Tailwind CSS, shadcn/ui, Vercel (JAMstack + Serverless). Integrações: Make.com, Google Sheets, Calendly, Meta Pixel, Cloudflare Turnstile, Resend (fallback), Sentry. Foco especial em: segurança do webhook (NFR9), consentimento LGPD para Meta Pixel (FR11), e fallback de automação (Story 2.3 AC6).

---

*Morgan (@pm) · Synkra AIOX · 2026-03-21*
