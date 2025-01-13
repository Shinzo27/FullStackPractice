// Interface segregation principle

// interface DocumentManager {
//     openDocument(): void;
//     saveDocument(): void;
//     closeDocument(): void;
//     scanDocument(): void;
// }

interface DocumentOpener {
    openDocument(): void;
}

interface DocumentSaver {
    saveDocument(): void;
}

interface DocumentCloser {
    closeDocument(): void;
}

interface DocumentScanner {
    scanDocument(): void;
}

class BasicEditor implements DocumentOpener, DocumentSaver, DocumentCloser {
    openDocument(): void {
        console.log("Opening document");
    }
    saveDocument(): void {
        console.log("Saving document");
    }
    closeDocument(): void {
        console.log("Closing document");
    }
}

class AdvancedEditor implements DocumentOpener, DocumentSaver, DocumentCloser, DocumentScanner {
    openDocument(): void {
        console.log("Opening document");
    }
    saveDocument(): void {
        console.log("Saving document");
    }
    closeDocument() {
        console.log("Closing document");
    }
    scanDocument() {
        console.log("Scanning document");
    }
}
