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
    form: {
      descriptionLabel: "Beskrivning",
      nameLabel: "Namn"
    },
    imageGallery: {
      header: "Bilder",
      addImagesAction: "Lägg till bilder"
    }
  },
  settings: {
    dialogTitle: "Inställningar",
    languageLabel: "Språk",
    languages: {
      en: "Engelska",
      sv: "Svenska"
    }
  },
  file: {
    openFileAction: "Öppna fil",
    newFileAction: "Ny fil",
    errors: {
      errorViewHeader: "Fel uppstod",
      alreadyExist: "Filen finns redan och går inte att skriva över",
      doesNotExist: "Filen hittades inte",
      unableToReadOrWrite:
        "Det gick inte att läsa eller skriva till filsökvägen"
    }
  },
  menu: {
    app: {
      newFile: "Ny fil",
      openFile: "Öppna fil",
      exit: "Avsluta"
    },
    main: {
      ponds: "Dammar",
      varieties: "Arter",
      diseases: "Sjukdomar"
    }
  },
  disease: {
    addAction: "Skapa sjukdom",
    deleteAction: "Ta bort sjukdom",
    medicationLabel: "Medicinering",
    newDiseaseName: "Ny sjukdom",
    delete: {
      errorReferencedByDisease:
        "Kan inte ta bort sjukdom, den är kopplad till en behandling"
    }
  },
  pond: {
    pondListTitle: "Dammar",
    volumeLabel: "Volym",
    depthLabel: "Djup",
    lengthLabel: "Längd",
    widthLabel: "Bredd",
    newPondName: "Min nya damm",
    addPondAction: "Skapa damm"
  },
  fish: {
    addAction: "Skapa fisk",
    listHeading: "Fiskar",
    newFishName: "Min nya fisk",
    addVariantsFirst: "Skapa arter innan du lägger till fiskar",
    breederLabel: "Uppfödare",
    bornLabel: "Födelsedag",
    originLabel: "Ursprung",
    sexLabel: "Kön",
    valueLabel: "Värde",
    varietyLabel: "Art"
  },
  variety: {
    varietyListTitle: "Arter",
    descriptionLabel: "Beskrivning",
    newVarietyName: "Ny art",
    addAction: "Skapa art",
    deleteAction: "Ta bort art",
    delete: {
      errorReferencedByFish:
        "Kan inte ta bort arten, den är kopplad till fiskar"
    }
  }
};
