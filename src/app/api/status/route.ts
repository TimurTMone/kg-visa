import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const refId = searchParams.get("id");
  const email = searchParams.get("email");

  if (!refId || !email) {
    return Response.json(
      { error: "Application ID and email are required" },
      { status: 400 }
    );
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("applications")
    .select("id, ref_id, status, first_name, last_name, visa_type, created_at, updated_at")
    .eq("ref_id", refId)
    .eq("email", email.toLowerCase())
    .single();

  if (error || !data) {
    return Response.json({ error: "Application not found" }, { status: 404 });
  }

  return Response.json({
    id: data.id,
    refId: data.ref_id,
    status: data.status,
    applicant: `${data.first_name} ${data.last_name}`,
    visaType: data.visa_type,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  });
}
