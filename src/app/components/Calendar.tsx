import { useState } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "react-day-picker/dist/style.css";
import { useT } from "../../i18n/LanguageContext";

interface CalendarProps {
  mode?: "single" | "range";
  selected?: Date | DateRange;
  onSelect: (date: Date | DateRange | undefined) => void;
  disabled?: (date: Date) => boolean;
  minDate?: Date;
  numberOfMonths?: number;
}

export function Calendar({ mode = "single", selected, onSelect, disabled, minDate, numberOfMonths = 2 }: CalendarProps) {
  const { lang } = useT();
  const [month, setMonth] = useState<Date>(
    mode === "range" && selected && typeof selected === "object" && "from" in selected && selected.from
      ? selected.from
      : mode === "single" && selected instanceof Date
      ? selected
      : new Date()
  );

  return (
    <div className="bg-white rounded-lg shadow-xl border-2 border-amber-200 p-3">
      <style>{`
        .rdp {
          --rdp-cell-size: 32px;
          --rdp-accent-color: #d97706;
          --rdp-background-color: #fef3c7;
          --rdp-accent-color-dark: #b45309;
          --rdp-background-color-dark: #fde68a;
          --rdp-outline: 2px solid var(--rdp-accent-color);
          --rdp-outline-selected: 2px solid var(--rdp-accent-color);
        }

        .rdp-months {
          justify-content: center;
          display: flex;
          gap: 1.25rem;
        }

        .rdp-month {
          width: auto;
        }

        .rdp-caption {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0;
          margin-bottom: 0.6rem;
        }

        .rdp-caption_label {
          font-size: 0.875rem;
          font-weight: 700;
          color: #d97706;
        }

        .rdp-head_cell {
          font-weight: 600;
          color: #92400e;
          font-size: 0.7rem;
          text-transform: uppercase;
          padding: 0.25rem 0;
        }

        .rdp-cell {
          padding: 1px;
        }

        .rdp-day {
          width: 32px;
          height: 32px;
          border-radius: 0.375rem;
          font-size: 0.8rem;
          font-weight: 500;
          transition: all 0.2s;
        }

        .rdp-day:hover:not(.rdp-day_disabled):not(.rdp-day_selected) {
          background-color: #fef3c7;
        }

        .rdp-day_selected, .rdp-day_range_middle, .rdp-day_range_start, .rdp-day_range_end {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: white;
          font-weight: 700;
        }

        .rdp-day_range_middle {
          opacity: 0.5;
          border-radius: 0;
        }

        .rdp-day_range_start {
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }

        .rdp-day_range_end {
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }

        .rdp-day_selected:hover, .rdp-day_range_start:hover, .rdp-day_range_end:hover {
          background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
        }

        .rdp-day_today {
          font-weight: 700;
          color: #d97706;
          border: 2px solid #fbbf24;
        }

        .rdp-day_disabled {
          color: #d1d5db;
          cursor: not-allowed;
        }

        .rdp-nav {
          display: none;
        }
      `}</style>

      <div className="flex items-center justify-between mb-2">
        <button
          onClick={() => {
            const newMonth = new Date(month);
            newMonth.setMonth(newMonth.getMonth() - 1);
            setMonth(newMonth);
          }}
          className="p-1.5 hover:bg-amber-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="text-amber-600" size={18} />
        </button>

        <div className="flex-1" />

        <button
          onClick={() => {
            const newMonth = new Date(month);
            newMonth.setMonth(newMonth.getMonth() + 1);
            setMonth(newMonth);
          }}
          className="p-1.5 hover:bg-amber-100 rounded-lg transition-colors"
        >
          <ChevronRight className="text-amber-600" size={18} />
        </button>
      </div>

      <DayPicker
        mode={mode}
        selected={selected as any}
        onSelect={onSelect as any}
        disabled={disabled}
        month={month}
        onMonthChange={setMonth}
        numberOfMonths={numberOfMonths}
        locale={{
          localize: {
            day: (n: number) =>
              lang === "en"
                ? ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'][n]
                : ['Κυ', 'Δε', 'Τρ', 'Τε', 'Πε', 'Πα', 'Σα'][n],
            month: (n: number) =>
              lang === "en"
                ? ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][n]
                : ['Ιανουάριος', 'Φεβρουάριος', 'Μάρτιος', 'Απρίλιος', 'Μάιος', 'Ιούνιος', 'Ιούλιος', 'Αύγουστος', 'Σεπτέμβριος', 'Οκτώβριος', 'Νοέμβριος', 'Δεκέμβριος'][n]
          },
          formatLong: {
            date: () => 'dd/MM/yyyy',
            time: () => 'HH:mm',
            dateTime: () => 'dd/MM/yyyy HH:mm'
          },
          code: lang === "en" ? "en-GB" : "el-GR",
          options: {
            weekStartsOn: 1
          }
        } as any}
      />
    </div>
  );
}