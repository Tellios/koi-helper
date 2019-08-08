export const en = {
  common: {
    loading: "Loading...",
    toggleShowArchivedText: (showArchived: boolean): string =>
      showArchived ? "Hide archived" : "Show archived",
    toggleArchiveAction: (archived: boolean): string =>
      archived ? "Restore from archive" : "Archive",
    saveAction: "Save",
    resetAction: "Reset",
    cancelAction: "Cancel",
    form: {
      descriptionLabel: "Description",
      nameLabel: "Name"
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
  menu: {
    ponds: "Ponds",
    varieties: "Varieties",
    diseases: "Diseases"
  },
  disease: {
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
    addVariantsFirst: "Add variants before adding fish"
  },
  variety: {
    varietyListTitle: "Varieties",
    descriptionLabel: "Description",
    newVarietyName: "New variety",
    addAction: "Add variety",
    deleteAction: "Delete variety",
    delete: {
      errorReferencedByFish:
        "Unable to delete variety, it is referenced by a fish"
    }
  }
};
