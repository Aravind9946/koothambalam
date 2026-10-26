
export type DanceForm = {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type DanceFormsResponse = {
  status: string;
  count: number;
  danceForms: DanceForm[];
};

export async function getDanceForms(): Promise<DanceFormsResponse> {
  const response = await fetch("/api/dance-forms");

  if (!response.ok) {
    throw new Error(`Failed to fetch dance forms: ${response.status}`);
  }

  return response.json() as Promise<DanceFormsResponse>;
}
