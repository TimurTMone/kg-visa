import { db } from "@/lib/store";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const email = searchParams.get("email");

  if (!id || !email) {
    return Response.json(
      { error: "Application ID and email are required" },
      { status: 400 }
    );
  }

  const application = db.applications.findByIdAndEmail(id, email);

  if (!application) {
    return Response.json(
      { error: "Application not found" },
      { status: 404 }
    );
  }

  return Response.json({
    id: application.id,
    status: application.status,
    createdAt: application.createdAt,
    updatedAt: application.updatedAt,
    applicant: `${application.personal.firstName} ${application.personal.lastName}`,
    visaType: application.travel.visaType,
  });
}
