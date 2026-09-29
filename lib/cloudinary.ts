const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export const CLOUDINARY_CONFIGURED = !!CLOUD_NAME && !!UPLOAD_PRESET;

export const MAX_BOOKING_PHOTOS = 5;
export const MAX_PHOTO_SIZE_MB = 10;

/** Sube un archivo directo al navegador -> Cloudinary (unsigned upload preset) y devuelve la URL pública. */
export async function uploadBookingPhoto(file: File): Promise<string> {
  if (!CLOUDINARY_CONFIGURED) {
    throw new Error("Cloudinary no está configurado");
  }

  const form = new FormData();
  form.append("file", file);
  form.append("upload_preset", UPLOAD_PRESET!);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    throw new Error("No se pudo subir la foto");
  }

  const data = await res.json();
  return data.secure_url as string;
}
