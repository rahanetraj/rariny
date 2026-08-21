"use client";

import { useFormStatus } from "react-dom";
import Spinner from "@/components/Spinner";

export default function SubmitButton({
  children,
  pendingLabel,
  className = "px-6 py-2.5 rounded-md bg-laterite text-white text-sm font-semibold hover:bg-laterite-dark disabled:opacity-60",
}: {
  children: React.ReactNode;
  pendingLabel?: string;
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className={className}>
      {pending ? (
        <span className="inline-flex items-center gap-2">
          <Spinner /> {pendingLabel ?? "Enregistrement…"}
        </span>
      ) : (
        children
      )}
    </button>
  );
}
