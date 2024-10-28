import styled from "styled-components";
import { StyledButton } from "./StyledButton";

export const FormContainer = styled.form`
  display: grid;
  gap: 0.5rem;
`;

export const Input = styled.input`
  padding: 0.5rem;
  font-size: inherit;
  border: 1px solid black;
  border-radius: 0.5rem;
`;

export const Textarea = styled.textarea`
  font-family: inherit;
  border: 1px solid black;
  border-radius: 0.5rem;
  padding: 0.5rem;
`;

export const Label = styled.label`
  font-weight: bold;
`;

export default function Form({ onSubmit, formName, defaultData }) {
  function handleSubmit(event) {
    event.preventDefault(); // Verhindert die Standard-Formularübermittlung
    const formData = new FormData(event.target); // Holt die Formulardaten
    const data = Object.fromEntries(formData); // Wandelt die Formulardaten in ein Objekt um
    onSubmit(data); // Ruft die onSubmit-Funktion auf, um die Daten zu verarbeiten
  }

  return (
    <FormContainer aria-labelledby={formName} onSubmit={handleSubmit}>
      <Label htmlFor="name">Name</Label>
      <Input
        id="name"
        name="name"
        type="text"
        defaultValue={defaultData?.name}
        required // optional: setzt das Feld als erforderlich
      />
      <Label htmlFor="image-url">Image Url</Label>
      <Input
        id="image-url"
        name="image"
        type="text"
        defaultValue={defaultData?.image}
        required // optional: setzt das Feld als erforderlich
      />
      <Label htmlFor="location">Location</Label>
      <Input
        id="location"
        name="location"
        type="text"
        defaultValue={defaultData?.location}
        required // optional: setzt das Feld als erforderlich
      />
      <Label htmlFor="map-url">Map Url</Label>
      <Input
        id="map-url"
        name="mapURL"
        type="text"
        defaultValue={defaultData?.mapURL}
        required // optional: setzt das Feld als erforderlich
      />
      <Label htmlFor="description">Description</Label>
      <Textarea
        name="description"
        id="description"
        cols="30"
        rows="10"
        defaultValue={defaultData?.description}
      ></Textarea>
      <StyledButton type="submit">
        {defaultData ? "Update place" : "Add place"}{" "}
        {/* Button-Text anpassen */}
      </StyledButton>
    </FormContainer>
  );
}