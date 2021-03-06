import { Id } from "app/storage";

export const en = {
  common: {
    appProgress: {
      progress: (current: number, total: number) => `${current} of ${total}`
    },
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
      uploadProgressMessage: "Uploading images"
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
    fileTableHeader: "Files",
    columns: {
      name: "Name",
      extension: "Extension",
      updated: "Updated",
      actions: "Actions"
    },
    openFileAction: "Open file",
    newFileAction: "New file",
    addFilesAction: "Add files",
    editFileAction: "Edit file",
    saveFileToComputerAction: "Save file to computer",
    updateFileAction: "Update file in Koi Helper",
    uploadProgressMessage: "Uploading files",
    updateProgressMessage: "Updating file",
    saveProgressMessage: "Saving file",
    deleteProgressMessage: "Deleting file",
    prepareEditProgressMessage: "Preparing file for editing",
    editFileInProgress: "Editing of file in progress in other application",
    editFileProgressAction: "Stop editing",
    errors: {
      errorViewHeader: "Error occured",
      alreadyExist: "File already exist, unable to overwrite file",
      doesNotExist: "File does not exist, unable to open file",
      unableToReadOrWrite: "Unable to read or write to file location",
      editOpenFailed: "Failed to open file in edit mode",
      updateFailed: "Failed to update file"
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
      diseases: "Diseases",
      openMenu: "Open menu",
      closeMenu: "Close menu"
    }
  },
  disease: {
    diseaseListTitle: "Diseases",
    addAction: "Add disease",
    deleteAction: "Delete disease",
    medicationLabel: "Medication",
    newDiseaseName: "New disease",
    deleteProgressMessage: "Deleting disease",
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
    addPondAction: "Add pond",
    deleteProgressMessage: "Deleting pond"
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
    doesNotExistMessage: (id: Id) => `Fish '${id}' does not exist`,
    deleteProgressMessage: "Deleting fish"
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
    deleteProgressMessage: "Deleting variety",
    delete: {
      errorReferencedByFish:
        "Unable to delete variety, it is referenced by a fish"
    }
  }
};
