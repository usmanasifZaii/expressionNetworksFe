import { useState } from "react";
import { EuiGlobalToastList } from "@elastic/eui";
import { Toast } from "@elastic/eui/src/components/toast/global_toast_list";

import { IAddToast, IToast } from "./types";

let addToastHandler: (arg: IAddToast) => void;
let removeAllToastsHandler: () => void;
let toastId = 0;

export function addToast(arg: IAddToast) {
  addToastHandler(arg);
}

export function removeAllToasts() {
  removeAllToastsHandler();
}

const MyToast = () => {
  const [toasts, setToasts] = useState<Array<IToast>>([]);

  addToastHandler = (arg: IAddToast) => {
    const toast = {
      title: arg.title,
      color: arg.color,
      text: arg.text,
      id: `${toastId++}`,
    };
    setToasts(toasts.concat(toast));
    return;
  };

  const removeToast = (removedToast: Toast) => {
    setToasts(toasts.filter((toast) => toast.id !== removedToast.id));
  };

  removeAllToastsHandler = () => {
    setToasts([]);
  };

  return (
    <div style={{ maxWidth: 320 }}>
      <EuiGlobalToastList
        toasts={toasts}
        dismissToast={removeToast}
        toastLifeTimeMs={6000}
      />
    </div>
  );
};

export default MyToast;
