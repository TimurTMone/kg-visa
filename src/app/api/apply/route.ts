import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { personal, passport, travel } = body;

    if (!personal?.firstName || !personal?.email || !passport?.number || !travel?.visaType) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("applications")
      .insert({
        user_id: user.id,
        status: "submitted",
        first_name: personal.firstName,
        last_name: personal.lastName,
        date_of_birth: personal.dateOfBirth,
        gender: personal.gender,
        nationality: personal.nationality,
        email: personal.email,
        phone: personal.phone,
        passport_number: passport.number,
        passport_issue_date: passport.issueDate,
        passport_expiry_date: passport.expiryDate,
        passport_issuing_country: passport.issuingCountry,
        entry_date: travel.entryDate,
        exit_date: travel.exitDate,
        purpose: travel.purpose,
        accommodation: travel.accommodation,
        visa_type: travel.visaType,
        photo_url: body.photoUrl ?? null,
        passport_scan_url: body.passportScanUrl ?? null,
        invitation_url: body.invitationUrl ?? null,
      })
      .select("id, ref_id, status, created_at")
      .single();

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({
      id: data.id,
      refId: data.ref_id,
      status: data.status,
      createdAt: data.created_at,
      message: "Application submitted successfully",
    }, { status: 201 });
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }
}

// GET: list user's applications
export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("applications")
    .select("id, ref_id, status, first_name, last_name, visa_type, created_at, updated_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json(data);
}
