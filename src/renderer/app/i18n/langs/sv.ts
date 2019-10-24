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
      varieties: "Varianter",
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
    addVariantsFirst: "Skapa varianter innan du lägger till fiskar",
    breederLabel: "Uppfödare",
    bornLabel: "Födelsedag",
    originLabel: "Ursprung",
    sexLabel: "Kön",
    valueLabel: "Värde",
    varietyLabel: "Variant",
    maleLabel: "Hane",
    femaleLabel: "Hona"
  },
  variety: {
    varietyListTitle: "Varianter",
    descriptionLabel: "Beskrivning",
    newVarietyName: "Ny variant",
    addAction: "Skapa variant",
    deleteAction: "Ta bort variant",
    delete: {
      errorReferencedByFish:
        "Kan inte ta bort varianten, den är kopplad till fiskar"
    }
  }
};
