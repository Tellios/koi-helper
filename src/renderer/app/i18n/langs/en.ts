import { Id } from "app/storage";

export const en = {
  common: {
    loading: "Loading...",
    toggleShowArchivedText: (showArchived: boolean): string =>
      showArchived ? "Hide archived" : "Show archived",
    toggleArchiveAction: (archived: boolean): string =>
      archived ? "Restore from archive" : "Archive",
    saveAction: "Save",
    selectAction: "Select",
    resetAction: "Reset",
    deleteAction: "Delete",
    cancelAction: "Cancel",
    form: {
      descriptionLabel: "Description",
      nameLabel: "Name"
    },
    imageGallery: {
      header: "Images",
      addImagesAction: "Add images",
      uploadTitle: "Uploading images",
      uploadMessage: (current: number, total: number) =>
        `Image ${current} of ${total}`
    },
    imageProfile: {
      addAction: "Add profile image"
    },
    tabs: {
      fishes: "Fishes",
      info: "Info",
      images: "Images"
    }
  },
  settings: {
    dialogTitle: "Settings",
    languageLabel: "Language",
    languages: {
      en: "English",
      sv: "Swedish"
    }
  },
  file: {
    openFileAction: "Open file",
    newFileAction: "New file",
    errors: {
      errorViewHeader: "Error occured",
      alreadyExist: "File already exist, unable to overwrite file",
      doesNotExist: "File does not exist, unable to open file",
      unableToReadOrWrite: "Unable to read or write to file location"
    }
  },
  menu: {
    app: {
      newFile: "New file",
      openFile: "Open file",
      exit: "Exit"
    },
    main: {
      ponds: "Ponds",
      varieties: "Varieties",
      diseases: "Diseases"
    }
  },
  disease: {
    diseaseListTitle: "Diseases",
    addAction: "Add disease",
    deleteAction: "Delete disease",
    medicationLabel: "Medication",
    newDiseaseName: "New disease",
    delete: {
      errorReferencedByDisease:
        "Unable to delete disease, it is referenced by a treatment"
    }
  },
  pond: {
    pondListTitle: "Ponds",
    volumeLabel: "Volume",
    depthLabel: "Depth",
    lengthLabel: "Length",
    widthLabel: "Width",
    newPondName: "My new pond",
    addPondAction: "Add pond"
  },
  fish: {
    addAction: "Add fish",
    listHeading: "Fishes",
    newFishName: "My new fish",
    addVariantsFirst: "Add variants before adding fish",
    breederLabel: "Breeder",
    bornLabel: "Born",
    originLabel: "Origin",
    sexLabel: "Sex",
    valueLabel: "Value",
    varietyLabel: "Variety",
    maleLabel: "Male",
    femaleLabel: "Female",
    doesNotExistMessage: (id: Id) => `Fish '${id}' does not exist`
  },
  measurement: {
    addAction: "Add measurement",
    editHeader: "Edit measurement",
    tabHeader: "Measurements",
    dateLabel: "Measuring date",
    lengthLabel: "Length",
    weightLabel: "Weight",
    commentLabel: "Comment"
  },
  variety: {
    varietyListTitle: "Varieties",
    descriptionLabel: "Description",
    newVarietyName: "New variety",
    addAction: "Add variety",
    notSelected: "No variety selected",
    selectDialogHeader: "Select variety",
    delete: {
      errorReferencedByFish:
        "Unable to delete variety, it is referenced by a fish"
    }
  }
};
