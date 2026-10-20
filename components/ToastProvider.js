"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const ToastContext = createContext(() => {});

export const useToast = () => useContext(ToastContext);

export default function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  const showToast = useCallback((message, variant = "success") => {
    setToast({ message, variant, id: Date.now() });
  }, []);
  const contextValue = useMemo(() => showToast, [showToast]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer position="top-end" className="p-3 toast-stack">
        {toast && (
          <Toast
            key={toast.id}
            onClose={() => setToast(null)}
            delay={2800}
            autohide
            bg={toast.variant}
          >
            <Toast.Header closeButton>
              <strong className="me-auto">Coffee vth Kaavi</strong>
            </Toast.Header>
            <Toast.Body className={toast.variant === "success" ? "text-white" : ""}>
              {toast.message}
            </Toast.Body>
          </Toast>
        )}
      </ToastContainer>
    </ToastContext.Provider>
  );
}
