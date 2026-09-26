# Visual release check — 2026-09-26

Scope: line-layout landing page; local appearance controls and rounded-layout
experiments are excluded from this release.

## Consistency checks

- Main section headings share the Museo family and the responsive 32–48 px
  heading scale. Sticky feature navigation intentionally uses a smaller heading.
- Certification and secrets cards share 20/26 px titles and native Isoform SVGs.
- Eight editable illustration scenes retain whole-object animation groups and
  a shared 0.85 px non-scaling stroke. Reduced-motion handling stays in place.
- Desktop (1440 px) and mobile (390 px) layouts checked in the browser; images
  loaded and no browser errors were reported.

## Fixes

- Clip the decorative pricing background to its section. On a 390 px viewport
  it previously increased document width to 832 px; document width is now 390 px.
- Share desktop pricing rows with CSS subgrid so description wrapping does not
  misalign prices or action buttons. Mobile plans keep their stacked layout.
- Replace the stretched feature-background dot asset with a fixed 16 px CSS
  grid and soften the saturated blue gradient endpoint.
- Include Isoform geometry validation in the regular React check command.

Verification: `npm run react:verify` (contracts, navigation/frame checks,
illustration geometry, production build and deployment asset validation).
This is a visual/release check, not a guarantee of zero bugs or a full WCAG audit.
