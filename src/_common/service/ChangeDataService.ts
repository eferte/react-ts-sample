import debounce from "lodash/fp/debounce";
import Listener from "../type/Listener";
import EventEmitter, { RemoveListener } from "./EventEmitter";

export const CHANGED_DATA_MESSAGE: string =
  "Les modifications en cours seront perdues. Êtes-vous sûr de vouloir continuer ?";
const ChangeDataService = {
  _emitter: new EventEmitter<boolean>(),
  _message: "",
  clean: (): void => {
    ChangeDataService._message = "";
    ChangeDataService._emitter.trigger(false);
  },
  setDirty: debounce(500, (isDirty: boolean, msg?: string): void => {
    if (isDirty) {
      ChangeDataService._message = msg || CHANGED_DATA_MESSAGE;
    } else {
      ChangeDataService._message = "";
    }
    ChangeDataService._emitter.trigger(isDirty);
  }),
  isDirty(): boolean {
    return !!ChangeDataService._message;
  },
  getMessage(): string {
    return ChangeDataService._message;
  },
  addChangeListener(listener: Listener<boolean>): RemoveListener {
    return ChangeDataService._emitter.addListener(listener);
  },
};

window.addEventListener("beforeunload", (e) => {
  if (ChangeDataService.isDirty()) {
    const confirmationMessage = ChangeDataService.getMessage();
    e.returnValue = confirmationMessage; // Gecko and Trident
    return confirmationMessage;
  }

  return undefined;
});

export default ChangeDataService;
