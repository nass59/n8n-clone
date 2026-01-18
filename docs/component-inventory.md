# Component Inventory

> Generated: 2026-01-18 | Project: nodebase

## Overview

Nodebase uses **shadcn/ui** as its primary component library, built on **Radix UI** primitives with **Tailwind CSS** styling.

## Component Categories

### shadcn/ui Components (51)

Located in `src/components/ui/`

#### Layout & Structure

| Component | File | Description |
|-----------|------|-------------|
| Card | `card.tsx` | Container with header, content, footer |
| Separator | `separator.tsx` | Visual divider |
| Aspect Ratio | `aspect-ratio.tsx` | Maintain aspect ratios |
| Scroll Area | `scroll-area.tsx` | Custom scrollable container |
| Sidebar | `sidebar.tsx` | Navigation sidebar |

#### Navigation

| Component | File | Description |
|-----------|------|-------------|
| Breadcrumb | `breadcrumb.tsx` | Breadcrumb navigation |
| Tabs | `tabs.tsx` | Tabbed interface |
| Pagination | `pagination.tsx` | Page navigation |
| Menubar | `menubar.tsx` | Application menu bar |

#### Forms & Inputs

| Component | File | Description |
|-----------|------|-------------|
| Form | `form.tsx` | Form with react-hook-form |
| Field | `field.tsx` | Form field wrapper |
| Input | `input.tsx` | Text input |
| Input Group | `input-group.tsx` | Input with addons |
| Input OTP | `input-otp.tsx` | One-time password input |
| Textarea | `textarea.tsx` | Multi-line text input |
| Select | `select.tsx` | Dropdown selection |
| Checkbox | `checkbox.tsx` | Checkbox input |
| Radio Group | `radio-group.tsx` | Radio button group |
| Switch | `switch.tsx` | Toggle switch |
| Slider | `slider.tsx` | Range slider |
| Calendar | `calendar.tsx` | Date picker calendar |
| Combobox | `combobox.tsx` | Searchable dropdown |
| Label | `label.tsx` | Form label |

#### Buttons & Actions

| Component | File | Description |
|-----------|------|-------------|
| Button | `button.tsx` | Primary action button |
| Button Group | `button-group.tsx` | Grouped buttons |
| Toggle | `toggle.tsx` | Toggle button |
| Toggle Group | `toggle-group.tsx` | Multiple toggles |

#### Feedback & Status

| Component | File | Description |
|-----------|------|-------------|
| Alert | `alert.tsx` | Alert messages |
| Badge | `badge.tsx` | Status badges |
| Progress | `progress.tsx` | Progress indicator |
| Skeleton | `skeleton.tsx` | Loading placeholder |
| Spinner | `spinner.tsx` | Loading spinner |
| Sonner | `sonner.tsx` | Toast notifications |
| Empty | `empty.tsx` | Empty state display |

#### Overlays & Modals

| Component | File | Description |
|-----------|------|-------------|
| Dialog | `dialog.tsx` | Modal dialog |
| Alert Dialog | `alert-dialog.tsx` | Confirmation dialog |
| Sheet | `sheet.tsx` | Slide-out panel |
| Drawer | `drawer.tsx` | Bottom drawer |
| Popover | `popover.tsx` | Popover content |
| Tooltip | `tooltip.tsx` | Hover tooltips |
| Hover Card | `hover-card.tsx` | Hover content card |

#### Menus & Dropdowns

| Component | File | Description |
|-----------|------|-------------|
| Dropdown Menu | `dropdown-menu.tsx` | Dropdown actions |
| Context Menu | `context-menu.tsx` | Right-click menu |
| Command | `command.tsx` | Command palette |

#### Data Display

| Component | File | Description |
|-----------|------|-------------|
| Table | `table.tsx` | Data table |
| Avatar | `avatar.tsx` | User avatar |
| Accordion | `accordion.tsx` | Expandable sections |
| Collapsible | `collapsible.tsx` | Collapsible content |
| Carousel | `carousel.tsx` | Image/content carousel |
| Item | `item.tsx` | List item |
| Kbd | `kbd.tsx` | Keyboard shortcut display |

---

### Custom Components

#### Providers (`src/components/providers/`)

| Component | File | Description |
|-----------|------|-------------|
| Providers | `index.tsx` | Root provider wrapper |

**Provider Stack:**
```tsx
<TRPCReactProvider>
  <NuqsAdapter>
    {children}
    <Toaster />
  </NuqsAdapter>
</TRPCReactProvider>
```

---

### Module Components

#### Auth Module (`src/modules/auth/components/`)

| Component | File | Description |
|-----------|------|-------------|
| AuthLayout | `auth-layout.tsx` | Auth page layout |
| AuthCard | `auth-card.tsx` | Auth form container |
| LoginForm | `login-form.tsx` | Email/password login |
| RegisterForm | `register-form.tsx` | User registration |
| OAuthButtons | `oauth-buttons.tsx` | Social login buttons |
| PasswordInput | `password-input.tsx` | Password field with toggle |

#### Workflows Module (`src/modules/workflows/components/`)

| Component | File | Description |
|-----------|------|-------------|
| Workflows | `workflows.tsx` | Workflows list view |

---

## Component Patterns

### Styling Convention

All components use the `cn()` utility for conditional classes:

```typescript
import { cn } from "@/lib/utils";

export const Card = ({ className, ...props }: CardProps) => {
  return (
    <div className={cn("rounded-lg border bg-card", className)} {...props} />
  );
};
```

### Export Pattern

```typescript
// Named export with arrow function
export const ComponentName = ({ prop }: ComponentNameProps) => {
  return <div>{prop}</div>;
};
```

### Props Pattern

```typescript
type ButtonProps = React.ComponentProps<"button"> & {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
};
```

---

## Adding Components

### From shadcn/ui

```bash
bunx shadcn@latest add <component-name>
```

Components are added to `src/components/ui/` and can be customized.

### Custom Components

1. Create file in appropriate location:
   - Global: `src/components/<name>.tsx`
   - Module-specific: `src/modules/<module>/components/<name>.tsx`

2. Follow the export pattern:
   ```typescript
   export const MyComponent = ({ prop }: MyComponentProps) => {
     return <div>{prop}</div>;
   };
   ```

3. Use path aliases for imports:
   ```typescript
   import { MyComponent } from "@/components/my-component";
   ```

---

## Component Dependencies

### Core Dependencies

| Package | Purpose |
|---------|---------|
| `@radix-ui/*` | Accessible primitives |
| `class-variance-authority` | Variant styling |
| `tailwind-merge` | Class merging |
| `clsx` | Conditional classes |

### Utility Components

| Package | Component | Purpose |
|---------|-----------|---------|
| `sonner` | Toaster | Toast notifications |
| `cmdk` | Command | Command palette |
| `vaul` | Drawer | Bottom drawer |
| `input-otp` | InputOTP | OTP input |
| `embla-carousel-react` | Carousel | Carousels |
| `react-day-picker` | Calendar | Date selection |
| `recharts` | Charts | Data visualization |
| `react-resizable-panels` | Panels | Resizable layouts |

---

## Design Tokens

Components use CSS variables defined in `globals.css`:

```css
:root {
  --background: ...;
  --foreground: ...;
  --card: ...;
  --card-foreground: ...;
  --primary: ...;
  --primary-foreground: ...;
  --secondary: ...;
  --muted: ...;
  --accent: ...;
  --destructive: ...;
  --border: ...;
  --ring: ...;
  --radius: ...;
}
```

Dark mode is supported via `next-themes` and `.dark` class variants.
