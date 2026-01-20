import { IconSearch } from "@tabler/icons-react";
import { useId } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type ListSearchProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  /**
   * Accessible label for screen readers.
   * Not visually displayed but important for accessibility.
   * @default "Search"
   */
  label?: string;
};

/**
 * A search input component for filtering list content.
 *
 * Renders an accessible search input with a search icon. The input is
 * a controlled component that requires parent state management. It uses
 * `useId()` for generating unique IDs, ensuring proper label association
 * even when multiple instances exist on the same page.
 *
 * Features:
 * - Search icon indicator (non-interactive, properly hidden from assistive tech)
 * - Screen reader accessible label (visually hidden)
 * - Native search input type with browser clear button support
 * - Responsive width constraint (max-w-50)
 */
export const ListSearch = ({
  value,
  onChange,
  placeholder = "Search",
  label = "Search",
}: ListSearchProps) => {
  const inputId = useId();

  return (
    <div className="relative ml-auto">
      <Label className="sr-only" htmlFor={inputId}>
        {label}
      </Label>
      <IconSearch
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-muted-foreground"
      />
      <Input
        className="max-w-50 border-border bg-background pl-8 shadow-none"
        id={inputId}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type="search"
        value={value}
      />
    </div>
  );
};
