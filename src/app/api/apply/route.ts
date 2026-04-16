import { db } from "@/lib/store";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { personal, passport, travel } = body;

    if (!personal?.firstName || !personal?.email || !passport?.number || !travel?.visaType) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const application = db.applications.create({
      email: personal.email,
      personal,
      passport,
      travel,
    });

    return Response.json({
      id: application.id,
      status: application.status,
      createdAt: application.createdAt,
      message: "Application submitted successfully",
    }, { status: 201 });
  } catch {
    return Response.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
