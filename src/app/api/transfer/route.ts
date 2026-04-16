import { db } from "@/lib/store";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { visaNumber, oldPassport, newPassport, newPassportExpiry, email, reason } = body;

    if (!visaNumber || !oldPassport || !newPassport || !newPassportExpiry || !email || !reason) {
      return Response.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (oldPassport.toUpperCase() === newPassport.toUpperCase()) {
      return Response.json(
        { error: "New passport number must differ from the current one" },
        { status: 400 }
      );
    }

    // Check that new passport expiry is at least 6 months away
    const expiry = new Date(newPassportExpiry);
    const sixMonths = new Date();
    sixMonths.setMonth(sixMonths.getMonth() + 6);
    if (expiry < sixMonths) {
      return Response.json(
        { error: "New passport must be valid for at least 6 months" },
        { status: 400 }
      );
    }

    const transfer = db.transfers.create({
      visaNumber,
      oldPassport,
      newPassport,
      newPassportExpiry,
      email,
      reason,
    });

    return Response.json({
      id: transfer.id,
      status: transfer.status,
      createdAt: transfer.createdAt,
      message: "Transfer request submitted successfully",
    }, { status: 201 });
  } catch {
    return Response.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
