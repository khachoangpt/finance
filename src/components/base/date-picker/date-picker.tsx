"use client";

import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import type { Matcher } from "react-day-picker";
import { vi } from "react-day-picker/locale";
import { Button } from "../button";
import { Calendar } from "../calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";

type Props = {
  date?: Date;
  onChange: (date: Date | undefined) => void;
  disabled?: Matcher | Matcher[] | undefined;
};

const DatePicker = ({ date, onChange, disabled }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant={"outline"}
            data-empty={!date}
            className="min-w-53 justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
          >
            {date ? (
              format(date, "P", { locale: vi })
            ) : (
              <span>Pick a date</span>
            )}
            <ChevronDownIcon data-icon="inline-end" />
          </Button>
        }
      />
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          locale={vi}
          mode="single"
          selected={date}
          onSelect={(value) => {
            setOpen(false);
            onChange(value);
          }}
          disabled={disabled}
          defaultMonth={date}
        />
      </PopoverContent>
    </Popover>
  );
};

export { DatePicker };
