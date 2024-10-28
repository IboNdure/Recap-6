import styled from "styled-components";
import { useRouter } from "next/router";
import Form from "../components/Form";
import { StyledLink } from "../components/StyledLink";

const StyledBackLink = styled(StyledLink)`
  justify-self: flex-start;
`;

export default function CreatePlacePage() {
  const router = useRouter();

  async function addPlace(place) {
    // console.log("adding place", place); // Logge die übergebenen Daten

    try {
      const response = await fetch("/api/places", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(place), // Sende die Formulardaten
      });

      if (!response.ok) {
        throw new Error("Failed to add place"); // Fehlerbehandlung, wenn die Antwort nicht OK ist
      }

      // Nach erfolgreichem Hinzufügen des Ortes, weiterleiten zur Homepage
      router.push("/"); // Umleitung zur Hauptseite
    } catch (error) {
      console.error("Error adding place:", error); // Fehlerprotokollierung
    }
  }

  return (
    <>
      <h2 id="add-place">Add Place</h2>
      <StyledBackLink href="/">back</StyledBackLink>
      <Form onSubmit={addPlace} formName={"add-place"} />
    </>
  );
}
