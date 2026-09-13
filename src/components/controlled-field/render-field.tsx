"use client";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FormFieldType, SelectOption } from "./types";

type RenderFieldProps<T extends FieldValues> = {
  id: string;
  fieldType: FormFieldType;
  field: ControllerRenderProps<T>;
  areaInvalid: boolean;
  disabled: boolean;
  placeholder?: string;
  className?: string;
  options?: SelectOption[];
  label?: string;
  inputType?: string;
};

export function RenderField<T extends FieldValues>({
  id,
  fieldType,
  field,
  areaInvalid,
  disabled,
  placeholder,
  className,
  options,
  label,
  inputType,
}: RenderFieldProps<T>) {
  switch (fieldType) {
    case "input":
      return (
        <Input
          {...field}
          value={field.value ?? ""}
          id={id}
          aria-invalid={areaInvalid}
          placeholder={placeholder}
          disabled={disabled}
          className={className}
          type={inputType || "text"}
        />
      );

    case "textarea":
      return (
        <Textarea
          {...field}
          value={field.value ?? ""}
          id={id}
          aria-invalid={areaInvalid}
          placeholder={placeholder}
          disabled={disabled}
          className={className}
        />
      );

    case "checkbox":
      return (
        <div className="flex gap-4 items-center">
          <Checkbox
            id={id}
            name={field.name}
            aria-invalid={areaInvalid}
            checked={field.value as boolean}
            onCheckedChange={field.onChange}
            disabled={disabled}
          />
          <FieldLabel htmlFor={id}>{label}</FieldLabel>
        </div>
      );

    case "select":
      return (
        <Select
          name={field.name}
          value={field.value as string}
          onValueChange={field.onChange}
          disabled={disabled}
        >
          <SelectTrigger
            id={id}
            aria-invalid={areaInvalid}
            className={className}
          >
            <SelectValue placeholder={placeholder || "Select"} />
          </SelectTrigger>
          <SelectContent>
            {options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );

    case "datePicker":
      return (
        <Popover>
          <PopoverTrigger
            render={
              <Button
                variant={"outline"}
                className={cn(
                  "justify-between text-left font-normal",
                  !field.value ? "text-muted-foreground" : "",
                  className,
                )}
                disabled={disabled}
              >
                {field.value ? (
                  format(field.value as Date, "PPP")
                ) : (
                  <span>{placeholder || "Pick a date"}</span>
                )}
                <ChevronDownIcon />
              </Button>
            }
          />
          <PopoverContent className="w-auto p-0" align="center">
            <Calendar
              mode="single"
              selected={field.value as Date}
              onSelect={field.onChange}
              disabled={disabled}
            />
          </PopoverContent>
        </Popover>
      );

    default:
      return null;
  }
}
