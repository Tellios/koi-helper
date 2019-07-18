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
    infoHeader: "Info",
    expandInfo: "Expand to view or edit info"
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
  pond: {
    pondListTitle: "Ponds",
    volumeLabel: "Volume",
    depthLabel: "Depth",
    lengthLabel: "Length",
    widthLabel: "Width",
    nameLabel: "Name",
    newPondName: "My new pond",
    addPondAction: "Add pond"
  },
  variety: {
    varietyListTitle: "Varieties",
    nameLabel: "Name",
    descriptionLabel: "Description",
    newVarietyName: "New variety",
    addAction: "Add variety",
    deleteAction: "Delete variety",
    delete: {
      errorReferencedByFish:
        "Unable to delete variety, it is referenced by fish"
    }
  }
};
