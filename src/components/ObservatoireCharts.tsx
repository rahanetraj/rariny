"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { CountRow } from "@/lib/db";
import { DISCRIMINATION_TYPE_LABELS, type DiscriminationType } from "@/lib/institutions";
import { MONTH_OPTIONS } from "@/lib/formOptions";

const COLORS = {
  indigo: "#16324F",
  laterite: "#C1502E",
  ravinala: "#2F6B4F",
  or: "#D9A441",
};

function monthKeyLabel(key: string): string {
  const [year, month] = key.split("-");
  const label = MONTH_OPTIONS.find((m) => m.value === Number(month))?.label ?? month;
  return `${label.slice(0, 3)}. ${year}`;
}

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-indigo text-white text-xs rounded-md px-3 py-2 shadow-lg font-mono">
      <p className="font-sans font-semibold mb-0.5">{label}</p>
      <p>{payload[0].value} signalement{payload[0].value > 1 ? "s" : ""}</p>
    </div>
  );
}

export function MonthlyChart({ data }: { data: CountRow[] }) {
  const chartData = data.map((d) => ({ key: monthKeyLabel(d.key), count: d.count }));
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={chartData} margin={{ left: -20, right: 8 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E6EBE3" />
        <XAxis dataKey="key" tick={{ fontSize: 11, fill: "#2B2B28" }} tickLine={false} axisLine={{ stroke: "#E6EBE3" }} />
        <YAxis tick={{ fontSize: 11, fill: "#2B2B28" }} tickLine={false} axisLine={false} allowDecimals={false} />
        <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(22,50,79,0.06)" }} />
        <Bar dataKey="count" fill={COLORS.indigo} radius={[4, 4, 0, 0]} maxBarSize={36} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function TypeChart({ data }: { data: CountRow[] }) {
  const chartData = data.map((d) => ({
    key: DISCRIMINATION_TYPE_LABELS[d.key as DiscriminationType] ?? d.key,
    count: d.count,
  }));
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={chartData} layout="vertical" margin={{ left: 8, right: 24 }}>
        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E6EBE3" />
        <XAxis type="number" tick={{ fontSize: 11, fill: "#2B2B28" }} tickLine={false} axisLine={false} allowDecimals={false} />
        <YAxis
          type="category"
          dataKey="key"
          width={170}
          tick={{ fontSize: 11, fill: "#2B2B28" }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(193,80,46,0.06)" }} />
        <Bar dataKey="count" fill={COLORS.laterite} radius={[0, 4, 4, 0]} maxBarSize={22} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function RegionChart({ data }: { data: CountRow[] }) {
  const chartData = data.map((d) => ({ key: d.key, count: d.count }));
  return (
    <ResponsiveContainer width="100%" height={Math.max(220, chartData.length * 34)}>
      <BarChart data={chartData} layout="vertical" margin={{ left: 8, right: 24 }}>
        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E6EBE3" />
        <XAxis type="number" tick={{ fontSize: 11, fill: "#2B2B28" }} tickLine={false} axisLine={false} allowDecimals={false} />
        <YAxis
          type="category"
          dataKey="key"
          width={130}
          tick={{ fontSize: 11, fill: "#2B2B28" }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(47,107,79,0.06)" }} />
        <Bar dataKey="count" fill={COLORS.ravinala} radius={[0, 4, 4, 0]} maxBarSize={22} />
      </BarChart>
    </ResponsiveContainer>
  );
}
