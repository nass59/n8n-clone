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
   */
  label?: string;
};

/**
 * PURPOSE: Accessible search input for list filtering
 * CONTROLLED: Requires parent state (value, onChange)
 * ACCESSIBILITY: useId() + sr-only label for screen readers
 * ICON: Search icon with aria-hidden for visual-only display
 * USED BY: All list pages - typically paired with useListSearch hook
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
