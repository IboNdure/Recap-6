import dbConnect from "@/lib/db/connect";
import Citie from "@/lib/db/models/citie";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const citie = await Citie.findById(id);

    if (!citie) {
      return response.status(404).json({ status: "Not Found" });
    }

    return response.status(200).json(citie);
  }

  // PATCH
  if (request.method === "PATCH") {
    try {
      const updatedCitie = await Citie.findByIdAndUpdate(id, request.body, {
        new: true,
        runValidators: true,
      });

      if (!updatedCitie) {
        return response.status(404).json({ status: "Not Found" });
      }

      return response.status(200).json(updatedCitie); // Erfolgreiche Aktualisierung
    } catch (error) {
      console.error("Error updating place:", error);
      return response.status(400).json({ error: "Failed to update place" });
    }
  }

  // DELETE
  if (request.method === "DELETE") {
    try {
      const deletedCitie = await Citie.findByIdAndDelete(id);

      if (!deletedCitie) {
        return response.status(404).json({ status: "Not Found" });
      }

      return response.status(204).end(); // Erfolgreiches Löschen ohne Inhalt zurückgeben
    } catch (error) {
      console.error("Error deleting place:", error);
      return response.status(400).json({ error: "Failed to delete place" });
    }
  }

  // Wenn die Methode nicht erlaubt ist
  response.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
  response.status(405).end(`Method ${request.method} Not Allowed`);
}
