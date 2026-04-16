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
    .select("*")
    .eq("ref_id", refId)
    .eq("email", email.toLowerCase())
    .or("status.eq.draft,status.eq.submitted")
    .single();

  if (error || !data) {
    return Response.json({ error: "Application not found" }, { status: 404 });
  }

  const app = data as Record<string, unknown>;

  return Response.json({
    id: app.id,
    refId: app.ref_id,
    status: app.status,
    personal: {
      firstName: app.first_name,
      lastName: app.last_name,
      dateOfBirth: app.date_of_birth,
      gender: app.gender,
      nationality: app.nationality,
      email: app.email,
      phone: app.phone,
    },
    passport: {
      number: app.passport_number,
      issueDate: app.passport_issue_date,
      expiryDate: app.passport_expiry_date,
      issuingCountry: app.passport_issuing_country,
    },
    travel: {
      entryDate: app.entry_date,
      exitDate: app.exit_date,
      purpose: app.purpose,
      accommodation: app.accommodation,
      visaType: app.visa_type,
    },
  });
}
