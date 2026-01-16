# UI Design Standards Skill

This skill provides comprehensive UI/UX design guidelines for the TOM JSON project.

## Purpose

Ensure visual consistency, accessibility, and maintainability across all UI components in the TOM JSON application.

## Skill Structure

```
ui-design-standards/
├── SKILL.md                    # Main skill documentation (required)
├── README.md                    # This file
├── references/                  # Reference documentation
│   └── color-palette.md        # Complete color reference
├── assets/                     # Reusable assets
│   └── component-template.vue  # Vue component template
└── scripts/                    # Executable scripts (empty for this skill)
```

## How to Use

### For Claude (AI Assistant)

When working on UI/UX tasks in TOM JSON:
1. Claude automatically loads this skill when relevant
2. Follow guidelines in SKILL.md
3. Reference color-palette.md for color choices
4. Use component-template.vue as starting point for new components

### For Developers

1. Read SKILL.md for comprehensive guidelines
2. Check references/color-palette.md for color values
3. Use assets/component-template.vue when creating new components
4. Follow implementation checklist in SKILL.md

## Key Design Elements

### Color System
- Semantic CSS variables for consistent theming
- Light and dark mode support
- Data type-specific colors (orange for arrays, purple for objects)

### Typography
- Consistent font stack
- Defined font size scale
- Proper line heights and weights

### Component Patterns
- Consistent toolbar styling
- Hover states with visual feedback
- Accessible color contrasts

### Layout Standards
- Split panel design using vue3-page-split
- Proper z-index layering
- Responsive design principles

## Quick Reference

### Common Colors
- Text: `var(--color-text)`
- Background: `var(--color-background)`
- Border: `var(--color-border)`
- Array: `var(--color-array-primary)`
- Object: `var(--color-object-primary)`

### Common Typography
- Base: `var(--font-size-base)` (15px)
- Editor: `var(--font-size-editor)` (14px)
- Line height: `1.6`

### Common Spacing
- Small: 4px
- Medium: 8px
- Large: 16px

## Maintenance

To update design standards:
1. Modify SKILL.md for procedural changes
2. Update references/color-palette.md for color additions
3. Update assets/component-template.vue for pattern changes
4. Document changes in this README

## Contact

For questions about design standards, refer to existing components in the TOM JSON codebase or consult the project maintainers.
