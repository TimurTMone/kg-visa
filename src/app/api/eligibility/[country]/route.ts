import { getEligibility } from "@/lib/constants";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ country: string }> }
) {
  const { country } = await params;

  const result = getEligibility(country.toUpperCase());

  if (!result) {
    return Response.json({
      code: country.toUpperCase(),
      type: "embassy",
      message: "Embassy visa required. Please contact your nearest Kyrgyz embassy.",
    });
  }

  return Response.json(result);
}
