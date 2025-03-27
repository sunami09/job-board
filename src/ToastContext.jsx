// src/ToastContext.jsx
import React, { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toast, setToast] = useState("");

  const showToast = (msg, duration = 3000) => {
    setToast(msg);
    setTimeout(() => setToast(""), duration);
  };

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {toast && (
        <div style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#1e293b",
          color: "#94a3b8",
          padding: "20px 32px",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.6)",
          fontSize: "16px",
          fontWeight: "bold",
          textAlign: "center",
          zIndex: 9999
        }}>
          {toast}
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
