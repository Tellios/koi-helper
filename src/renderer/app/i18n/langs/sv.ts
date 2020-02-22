import { Translations } from "./Translations";
import { Id } from "app/storage";

export const sv: Translations = {
  common: {
    appProgress: {
      progress: (current: number, total: number) => `${current} av ${total}`
    },
    loading: "Laddar...",
    toggleShowArchivedText: (showArchived: boolean) =>
      showArchived ? "Dölj arkiverade" : "Visa arkiverade",
    toggleArchiveAction: (archived: boolean): string =>
      archived ? "Återställ från arkiv" : "Arkivera",
    saveAction: "Spara",
    selectAction: "Välj",
    deleteAction: "Ta bort",
    resetAction: "Återställ",
    cancelAction: "Avbryt",
    form: {
      descriptionLabel: "Beskrivning",
      nameLabel: "Namn"
    },
    imageGallery: {
      header: "Bilder",
      addImagesAction: "Lägg till bilder",
      uploadProgressMessage: "Laddar upp bilder"
    },
    imageProfile: {
      addAction: "Lägg till profil bild"
    },
    tabs: {
      fishes: "Fiskar",
      info: "Info",
      images: "Bilder"
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
    fileTableHeader: "Filer",
    columns: {
      name: "Namn",
      extension: "Filändelse",
      updated: "Uppdaterad",
      actions: "Funktioner"
    },
    openFileAction: "Öppna fil",
    newFileAction: "Ny fil",
    addFilesAction: "Lägg till filer",
    editFileAction: "Edit file",
    saveFileToComputerAction: "Spara fil till dator",
    updateFileAction: "Uppdatera fil i Koi Helper",
    uploadProgressMessage: "Laddar upp filer",
    updateProgressMessage: "Uppdaterar fil",
    saveProgressMessage: "Sparar fil",
    deleteProgressMessage: "Tar bort fil",
    prepareEditProgressMessage: "Förbereder fil för redigering",
    editFileInProgress: "Redigering av fil pågår",
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
      diseases: "Sjukdomar",
      openMenu: "Öppna meny",
      closeMenu: "Stäng meny"
    }
  },
  disease: {
    diseaseListTitle: "Sjukdomar",
    addAction: "Skapa sjukdom",
    deleteAction: "Ta bort sjukdom",
    medicationLabel: "Medicinering",
    newDiseaseName: "Ny sjukdom",
    deleteProgressMessage: "Tar bort sjukdom",
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
    addPondAction: "Skapa damm",
    deleteProgressMessage: "Tar bort damm"
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
    femaleLabel: "Hona",
    doesNotExistMessage: (id: Id) => `Fisk '${id}' saknas`,
    deleteProgressMessage: "Tar bort fisk"
  },
  measurement: {
    addAction: "Skapa mätning",
    editHeader: "Redigera mätning",
    tabHeader: "Mätningar",
    dateLabel: "Datum för mätning",
    lengthLabel: "Längd",
    weightLabel: "Vikt",
    commentLabel: "Kommentar"
  },
  variety: {
    varietyListTitle: "Varianter",
    descriptionLabel: "Beskrivning",
    newVarietyName: "Ny variant",
    addAction: "Skapa variant",
    notSelected: "Ingen varietet vald",
    selectDialogHeader: "Välj varietet",
    deleteProgressMessage: "Tar bort varietet",
    delete: {
      errorReferencedByFish:
        "Kan inte ta bort varianten, den är kopplad till fiskar"
    }
  }
};
