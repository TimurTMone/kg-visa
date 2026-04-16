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
    const { visaNumber, oldPassport, newPassport, newPassportExpiry, email, reason } = body;

    if (!visaNumber || !oldPassport || !newPassport || !newPassportExpiry || !email || !reason) {
      return Response.json({ error: "All fields are required" }, { status: 400 });
    }

    if (oldPassport.toUpperCase() === newPassport.toUpperCase()) {
      return Response.json(
        { error: "New passport number must differ from the current one" },
        { status: 400 }
      );
    }

    const expiry = new Date(newPassportExpiry);
    const sixMonths = new Date();
    sixMonths.setMonth(sixMonths.getMonth() + 6);
    if (expiry < sixMonths) {
      return Response.json(
        { error: "New passport must be valid for at least 6 months" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("transfers")
      .insert({
        user_id: user.id,
        visa_number: visaNumber,
        old_passport: oldPassport,
        new_passport: newPassport,
        new_passport_expiry: newPassportExpiry,
        email,
        reason,
      })
      .select("id, tracking_id, status, created_at")
      .single();

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({
      id: data.id,
      trackingId: data.tracking_id,
      status: data.status,
      createdAt: data.created_at,
      message: "Transfer request submitted successfully",
    }, { status: 201 });
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }
}
