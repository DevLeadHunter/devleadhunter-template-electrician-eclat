# devleadhunter-template-electrician-eclat

Template de site vitrine pour électricien, « Électricien Éclat » (`template_id` : `electrician-eclat`).
C'est une **layer Nuxt 4** consommée par `demo-host` via `extends` : elle reçoit un `SiteContent`
typé et rend le site. Elle ne connaît ni Storyblok, ni PostHog, ni la base.

> Architecture : `docs/TEMPLATES_ARCHITECTURE.md` dans le dépôt `devleadhunter`.

## Direction

Fond blanc, bleu nuit pour les boutons et les bandes sombres, une couleur d'accent posée par
touches. L'accent vient de `palette.primary` (la couleur du logo du prospect) ; il ne porte jamais de
texte tel quel : `app/content/eclatAccentShades.ts` en tire une nuance lisible pour chaque fond.
Aucun texte n'est posé sur une photo, et les cadres ont des proportions fixes : une photo de chantier
prise au téléphone y rend bien.

## Sections et clés de contenu

| Section (fichier dans `app/components/sections/`) | Clés de `SiteContent`                                                                                                                               |
| ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `HeroSection`                                     | `heroBadge`, `heroTitle`, `subtitle`, `heroImage`, `images.heroSecondary`, `heroPoints`, `ctaQuoteLabel`, `phone`, `city`, `rating`, `reviewsCount` |
| `TrustStripSection`                               | `trustItems`                                                                                                                                        |
| `ServicesSection`                                 | `servicesHeading`, `servicesLead`, `services`                                                                                                       |
| `AboutSection`                                    | `aboutHeading`, `about`, `aboutImage`, `logo`, `city`, `area`                                                                                       |
| `MethodSection`                                   | `stepsHeading`, `steps`                                                                                                                             |
| `GallerySection`                                  | `galleryHeading`, `gallery`                                                                                                                         |
| `ReviewsSection`                                  | `reviewsHeading`, `reviews` (masquée sans texte d'avis)                                                                                             |
| `FaqSection`                                      | `faqHeading`, `faq`                                                                                                                                 |
| `CallBannerSection`                               | `ctaTitle`, `ctaLead`, `images.ctaBackground`                                                                                                       |
| `ContactSection`                                  | `contactHeading`, `contactLead`, `phone`, `email`, `address`, `area`, `openingHours`, `lat`, `lng`                                                  |
| `SiteFooter`                                      | `social`, licence professionnelle                                                                                                                   |

Chaque clé vide retombe sur un texte ou une photo par défaut (`app/content/eclatDefaults.ts`), ou
masque son bloc. Le module `api/services/templates/electrician_eclat.py` du dépôt `devleadhunter`
garde le miroir de ces défauts : les modifier ici impose de les modifier là-bas.

## Comportements à connaître

- Note Google absente ou inférieure à 3,5 : le coin découpé de la photo d'en-tête montre la ville.
- Photo d'en-tête de moins de 480 px de large : remplacée par celle de la template.
- Sans e-mail : pas de formulaire. Le formulaire ouvre un e-mail prérempli (`mailto:`).
- Sans logo : une pastille à l'éclair le remplace.

## Développer

```bash
npm install
npm run dev
```

Le `.playground` rend la racine avec un contenu fictif : `?mock=lean` (fiche pauvre, par défaut) ou
`?mock=rich` (fiche bien remplie). `?fixture=<nom>` charge `.playground/public/fixtures/<nom>.json`,
un dossier non versionné, pour essayer un vrai contenu en local.

```bash
npm run lint
npx vue-tsc -b --noEmit
```

## Publier

Commit, tag `vX.Y.Z`, puis mettre à jour le tag dans `demo-host/nuxt.config.ts` et dans
`api/services/templates/template_repos.py` du dépôt `devleadhunter`.
