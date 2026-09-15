"use client";

import { useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export type SortSelectOption = {
  sortKey: string;
  sortValue: string;
  label: string;
};

type SortObject = { sortKey: string; sortValue: string };

type SortSelectProps = {
  value: SortObject;
  onChange: (sort: SortObject) => void;
  options: SortSelectOption[];
};

const SortSelect = ({ value, onChange, options }: SortSelectProps) => {
  function handleSort(compositeKey: string | null) {
    if (!compositeKey) {
      onChange(value);
      return;
    }

    const [sortKey, sortValue] = compositeKey.split("_");
    onChange({ sortKey, sortValue });
  }

  const selectOptions = useMemo(
    () =>
      options.map((option) => ({
        label: option.label,
        value: option.sortKey + "_" + option.sortValue,
      })),
    [options],
  );

  return (
    <Select
      items={selectOptions}
      onValueChange={handleSort}
      value={value.sortKey + "_" + value.sortValue}
    >
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {selectOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export { SortSelect };
