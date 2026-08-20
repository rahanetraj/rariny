import ReferenceForm from "../ReferenceForm";

export const metadata = { title: "Nouvelle référence juridique" };

export default function NewReferencePage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-indigo mb-6">Nouvelle référence juridique</h1>
      <ReferenceForm />
    </div>
  );
}
