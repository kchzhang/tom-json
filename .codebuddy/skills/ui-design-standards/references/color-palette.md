# Color Palette Reference

Complete color reference for TOM JSON project.

## Usage

When using colors, prefer CSS variables over hardcoded values for maintainability and theming support.

## CSS Variables

### Base Colors

```css
/* Light Mode (Default) */
--vt-c-white: #ffffff;
--vt-c-white-soft: #f8f8f8;
--vt-c-white-mute: #f2f2f2;

--vt-c-black: #181818;
--vt-c-black-soft: #222222;
--vt-c-black-mute: #282828;

--vt-c-indigo: #2c3e50;

/* Semantic Light Mode */
--color-background: var(--vt-c-white);
--color-background-soft: var(--vt-c-white-soft);
--color-background-mute: var(--vt-c-white-mute);
--color-border: rgba(60, 60, 60, 0.12);
--color-border-hover: rgba(60, 60, 60, 0.29);
--color-heading: var(--vt-c-indigo);
--color-text: var(--vt-c-indigo);

/* Dark Mode */
--color-background: var(--vt-c-black);
--color-background-soft: var(--vt-c-black-soft);
--color-background-mute: var(--vt-c-black-mute);
--color-border: rgba(84, 84, 84, 0.48);
--color-border-hover: rgba(84, 84, 84, 0.65);
--color-heading: var(--vt-c-white);
--color-text: rgba(235, 235, 235, 0.64);
```

### Data Type Colors

```css
/* String values */
--color-string: #0451a5;

/* Number values */
--color-number: #098658;

/* Boolean - True */
--color-boolean-true: #098658;

/* Boolean - False */
--color-boolean-false: #ff0000;

/* Null values */
--color-null: #afafaf;

/* Key names */
--color-key: #a31515;
```

### Container Colors

```css
/* Array container - Orange theme */
--color-array-primary: #ff6b00;
--color-array-border: rgba(255, 107, 0, 0.2);
--color-array-background: rgba(255, 107, 0, 0.07);

/* Object container - Purple theme */
--color-object-primary: #761cea;
--color-object-border: rgba(118, 28, 234, 0.2);
--color-object-background: rgba(118, 28, 234, 0.07);

/* Toolbar background */
--color-toolbar-background: #ececec;

/* Node background */
--color-node-background: #f6f8fa;
```

## Color Usage Guidelines

### Backgrounds
- Primary backgrounds: Use `--color-background`
- Secondary backgrounds: Use `--color-background-soft`
- Muted backgrounds: Use `--color-background-mute`

### Text
- Headings: Use `--color-heading`
- Body text: Use `--color-text`
- Emphasis: Use `--color-string` for strings, `--color-number` for numbers

### Borders
- Default borders: Use `--color-border`
- Hover states: Use `--color-border-hover`

### Data Visualization
- Arrays: Use orange theme (`--color-array-*`)
- Objects: Use purple theme (`--color-object-*`)
- Keys: Use `--color-key`

## Contrast Ratios

All text must meet WCAG AA standards (minimum 4.5:1 for normal text):

- Light mode: All standard colors meet requirements
- Dark mode: Adjusted opacity values ensure proper contrast
- Tooltips: Always use high contrast background

## Best Practices

1. Always use CSS variables for colors
2. Test in both light and dark modes
3. Ensure sufficient contrast for accessibility
4. Maintain semantic meaning of color (e.g., orange = arrays)
5. Use alpha values for backgrounds and borders
