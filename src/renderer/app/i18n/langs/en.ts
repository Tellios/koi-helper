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
  pond: {
    pondListTitle: "Ponds",
    volumeLabel: "Volume",
    depthLabel: "Depth",
    lengthLabel: "Length",
    widthLabel: "Width",
    nameLabel: "Name",
    newPondName: "My new pond",
    addPondAction: "Add pond"
  }
};
