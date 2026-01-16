---
name: ui-design-standards
description: Provides UI/UX design standards and guidelines for TOM JSON project. Use this skill when designing or modifying any user interface components, layouts, styling, or visual elements in the TOM JSON codebase.
---

# UI Design Standards for TOM JSON

This skill provides comprehensive UI/UX design standards that all interface designs in the TOM JSON project must follow.

## When to Use This Skill

Use this skill whenever:
- Creating new UI components or views
- Modifying existing visual elements
- Adding new colors, typography, or spacing
- Implementing responsive layouts
- Designing interactive elements (buttons, inputs, etc.)
- Creating icons or graphical elements

## Core Design Principles

### Visual Consistency

Maintain visual consistency across the entire application by:
- Using the defined color system for all elements
- Following the typography scale for all text
- Applying consistent spacing and sizing rules
- Using the same component patterns for similar functionalities

### Accessibility

Ensure accessibility by:
- Providing sufficient color contrast (minimum 4.5:1 for normal text)
- Including keyboard navigation support
- Adding ARIA labels where appropriate
- Using semantic HTML elements
- Supporting screen readers

### Responsive Design

Create layouts that work across different screen sizes:
- Use Tailwind CSS utility classes for responsive design
- Test on common screen resolutions
- Ensure critical content is accessible on mobile

## Color System

### Semantic Colors

Apply these CSS variables consistently throughout the application:

```css
/* Background colors */
--color-background: #ffffff;
--color-background-soft: #f8f8f8;
--color-background-mute: #f2f2f2;

/* Border colors */
--color-border: rgba(60, 60, 60, 0.12);
--color-border-hover: rgba(60, 60, 60, 0.29);

/* Text colors */
--color-heading: #2c3e50;
--color-text: #2c3e50;
```

### Data Type Colors

Use specific colors for JSON data types to maintain consistency:

```css
/* Strings */
--color-string: #0451a5;

/* Numbers */
--color-number: #098658;

/* Booleans */
--color-boolean-true: #098658;
--color-boolean-false: #ff0000;

/* Null values */
--color-null: #afafaf;

/* Key names in key-value pairs */
--color-key: #a31515;
```

### Container Colors

Apply these colors for structural elements:

```css
/* Array containers - Orange theme */
--color-array-primary: #ff6b00;
--color-array-border: rgba(255, 107, 0, 0.2);
--color-array-background: rgba(255, 107, 0, 0.07);

/* Object containers - Purple theme */
--color-object-primary: #761cea;
--color-object-border: rgba(118, 28, 234, 0.2);
--color-object-background: rgba(118, 28, 234, 0.07);

/* Toolbar backgrounds */
--color-toolbar-background: #ececec;

/* Node backgrounds */
--color-node-background: #f6f8fa;
```

## Typography

### Font Family

Use the defined font stack for all text elements:

```css
font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 
  Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 
  'Helvetica Neue', sans-serif;
```

### Font Size Scale

Follow this scale for consistent sizing:

```css
/* Base text */
--font-size-base: 15px;

/* Code editor */
--font-size-editor: 14px;

/* Graph nodes - base content */
--font-size-node-base: 12px;

/* Graph nodes - arrays/objects */
--font-size-node-array: 14px;
```

### Line Height

Maintain consistent line height:

```css
line-height: 1.6;
```

### Font Weight

Use font weights strategically:
- Normal (400): Body text, labels
- Medium (500): Subheadings, emphasis
- Semibold (600): Container labels, important UI elements

## Component Styling

### Toolbars

Style top and bottom toolbars consistently:

```css
height: 40px;
background: #ececec;
padding: 4px 8px;
border-bottom: 1px solid #cccccc;
color: #05275a;
z-index: 36;
```

### Graph Nodes

Apply consistent styling to all graph nodes:

```css
/* Base node container */
display: block;
width: auto;
min-width: 150px;
background: #f6f8fa;
white-space: pre;

/* Array containers */
color: #ff6b00;
font-size: 14px;
font-weight: 600;
border: 2px solid rgba(255, 107, 0, 0.2);
border-radius: 6px;
background-color: rgba(255, 107, 0, 0.07);
padding: 8px 12px;
margin: 4px 0;

/* Object containers */
color: #761cea;
font-size: 14px;
font-weight: 600;
border: 2px solid rgba(118, 28, 234, 0.2);
border-radius: 6px;
background-color: rgba(118, 28, 234, 0.07);
padding: 8px 12px;
margin: 4px 0;

/* Value items (primitives) */
padding: 0px 10px;
color: rgb(83, 83, 83);
display: block;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
text-align: left;
```

### Hover States

Implement hover effects for interactive elements:

```css
/* Show tooltips on hover */
.element:hover {
  cursor: pointer;
  /* Add visual feedback */
}

/* For nodes with truncated content, show full value on hover */
.node-item[title]:hover::after {
  content: attr(title);
}
```

### Scrollbars

Style scrollbars consistently:

```css
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  transition: all 0.2s ease-in-out;
}

::-webkit-scrollbar-thumb:hover {
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.3);
}
```

## Layout Guidelines

### Split Panels

Use vue3-page-split for resizable panels:

```vue
<PageSplit
  :distribute="distribute"
  :lineThickness="2"
  :isVertical="true"
  :firstMinValue="200"
  :secondMinValue="200"
  :hasLineTip="false"
>
```

### Spacing

Use consistent spacing values:
- Small gap: 4px
- Medium gap: 8px
- Large gap: 16px
- Default padding: 8px-12px

### Z-Index Layering

Maintain proper layering:

```css
z-index: 36;  /* Top toolbar */
z-index: 35;  /* Bottom toolbar */
```

## Icon Design

### Icon Buttons

Style icon buttons consistently:
- Use cursor pointer for interactive icons
- Include tooltips for icon actions
- Maintain consistent size (typically 16-20px)
- Use appropriate hover states

### Icon Visibility

Show/hide icons based on state:
- Expand/collapse icons for arrays and objects
- Icons only visible when appropriate (e.g., array elements don't show icons)

## Monaco Editor Configuration

When integrating Monaco Editor:

```javascript
{
  theme: 'vs',
  minimap: { enabled: false },
  automaticLayout: true,
  fontSize: 14,
  lineNumbers: 'on',
  scrollBeyondLastLine: false,
  wordWrap: 'on',
  formatOnPaste: true,
  formatOnType: true
}
```

## Vue Flow Configuration

When configuring Vue Flow graph display:

```javascript
{
  defaultViewport: { zoom: 1 },
  minZoom: 0.2,
  maxZoom: 4,
  nodesDraggable: false
}
```

## Dark Mode Support

Implement dark mode using CSS variables:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #181818;
    --color-background-soft: #222222;
    --color-background-mute: #282828;
    --color-border: rgba(84, 84, 84, 0.48);
    --color-border-hover: rgba(84, 84, 84, 0.65);
    --color-heading: #ffffff;
    --color-text: rgba(235, 235, 235, 0.64);
  }
}
```

Always use CSS variables instead of hardcoded colors to support theming.

## Implementation Checklist

When creating or modifying UI components, verify:

- [ ] Uses defined color variables (not hardcoded values)
- [ ] Follows typography scale
- [ ] Implements proper hover states
- [ ] Includes accessibility features (ARIA labels, keyboard nav)
- [ ] Works in dark mode
- [ ] Has consistent spacing
- [ ] Uses proper z-index layering
- [ ] Implements responsive design
- [ ] Includes appropriate tooltips
- [ ] Maintains visual consistency with existing components

## Common Patterns

### Loading Indicators

Use Element Plus loading components when appropriate.

### Error States

Display error messages with clear, actionable text using Element Plus message components.

### Confirmation Dialogs

Use Element Plus dialog components for user confirmations.

### Form Validation

Apply consistent validation styles using Element Plus form validation.

## Code Style

When writing styling code:
- Use scoped styles for component-specific styles
- Prefer CSS variables over hardcoded values
- Use Tailwind utility classes for layout and spacing
- Use custom CSS only for component-specific styling
- Group related styles logically
- Include descriptive comments for complex styles

## References

See existing components for implementation examples:
- `src/components/flow/CustomItem.vue` - Node styling
- `src/views/editor/top-tool/TopTool.vue` - Toolbar styling
- `src/views/editor/bottom-tool/BottomTool.vue` - Toolbar styling
- `src/assets/base.css` - Color variables and global styles
