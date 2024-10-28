import dbConnect from "@/lib/db/connect";
import Citie from "@/lib/db/models/citie";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const places = await Citie.find(); // Abruf aus der Citie-Sammlung
      res.status(200).json(places);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch places" });
    }
  } else if (req.method === "POST") {
    try {
      const newPlace = await Citie.create(req.body); // Neuer Eintrag in der Citie-Sammlung
      res.status(201).json(newPlace); // Erfolgreiche Erstellung des Ortes
    } catch (error) {
      console.error("Error adding place:", error);
      res.status(400).json({ error: "Failed to add place" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
