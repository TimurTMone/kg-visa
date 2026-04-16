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
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const type = formData.get("type") as string | null; // "photo" | "passport_scan" | "invitation"

    if (!file || !type) {
      return Response.json({ error: "File and type are required" }, { status: 400 });
    }

    // Validate file size (5MB for images, 10MB for PDFs)
    const maxSize = type === "invitation" ? 10 * 1024 * 1024 : 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return Response.json(
        { error: `File too large. Maximum size: ${maxSize / (1024 * 1024)}MB` },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedImageTypes = ["image/jpeg", "image/png"];
    const allowedPdfTypes = ["application/pdf"];
    const allowedTypes = type === "invitation" ? [...allowedImageTypes, ...allowedPdfTypes] : allowedImageTypes;

    if (!allowedTypes.includes(file.type)) {
      return Response.json(
        { error: `Invalid file type. Allowed: ${allowedTypes.join(", ")}` },
        { status: 400 }
      );
    }

    const ext = file.name.split(".").pop() || "jpg";
    const filePath = `${user.id}/${type}_${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("documents")
      .upload(filePath, file, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      return Response.json({ error: uploadError.message }, { status: 500 });
    }

    const { data: urlData } = supabase.storage
      .from("documents")
      .getPublicUrl(filePath);

    return Response.json({
      url: urlData.publicUrl,
      path: filePath,
    });
  } catch {
    return Response.json({ error: "Upload failed" }, { status: 500 });
  }
}
