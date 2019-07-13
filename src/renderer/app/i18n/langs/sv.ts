import { Translations } from "./Translations";

export const sv: Translations = {
  common: {
    loading: "Laddar...",
    toggleShowArchivedText: (showArchived: boolean) =>
      showArchived ? "Dölj arkiverade" : "Visa arkiverade",
    toggleArchiveAction: (archived: boolean): string =>
      archived ? "Återställ från arkiv" : "Arkivera",
    saveAction: "Spara",
    resetAction: "Återställ",
    cancelAction: "Avbryt",
    infoHeader: "Info",
    expandInfo: "Expandera för att visa och redigera information"
  },
  settings: {
    dialogTitle: "Inställningar",
    languageLabel: "Språk",
    languages: {
      en: "Engelska",
      sv: "Svenska"
    }
  },
  menu: {
    ponds: "Dammar",
    varieties: "Arter",
    diseases: "Sjukdomar"
  },
  pond: {
    pondListTitle: "Dammar",
    volumeLabel: "Volym",
    depthLabel: "Djup",
    lengthLabel: "Längd",
    widthLabel: "Bredd",
    nameLabel: "Namn",
    newPondName: "Min nya damm",
    addPondAction: "Skapa damm"
  },
  variety: {
    varietyListTitle: "Arter",
    newVarietyName: "Ny art",
    addAction: "Skapa art",
    deleteAction: "Ta bort art",
    delete: {
      errorReferencedByFish:
        "Kan inte ta bort arten, den är kopplad till fiskar"
    }
  }
};