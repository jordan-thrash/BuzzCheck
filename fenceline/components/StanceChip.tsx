import { Check, ClipboardList, Ban } from "lucide-react";
import type { Stance } from "@/lib/types";

const STANCE_STYLE: Record<
  Stance,
  { label: string; chip: string; Icon: typeof Check }
> = {
  allowed: {
    label: "Allowed",
    chip: "bg-chill-tint text-chill-deep",
    Icon: Check,
  },
  conditional: {
    label: "Conditional",
    chip: "bg-uptight-tint text-uptight-deep",
    Icon: ClipboardList,
  },
  banned: {
    label: "Banned",
    chip: "bg-hostile-tint text-hostile-deep",
    Icon: Ban,
  },
};

export function StanceChip({ stance }: { stance: Stance }) {
  const { label, chip, Icon } = STANCE_STYLE[stance];
  return (
    <span
      className={`label-micro inline-flex shrink-0 items-center gap-1 rounded-[2px] px-1.5 py-0.5 font-bold ${chip}`}
    >
      <Icon size={11} strokeWidth={2.5} aria-hidden />
      {label}
    </span>
  );
}
