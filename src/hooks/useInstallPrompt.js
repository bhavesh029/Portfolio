import { useEffect, useState } from "react";
import { trackEvent } from "../utils/analytics";

const isStandalone = () =>
  window.matchMedia("(display-mode: standalone)").matches ||
  window.navigator.standalone === true;

// iPadOS 13+ reports itself as "Macintosh", so also check for touch support
const isIOS = () =>
  /iphone|ipad|ipod/i.test(navigator.userAgent) ||
  (navigator.userAgent.includes("Macintosh") && navigator.maxTouchPoints > 1);

// Install state for the PWA:
//  - canInstall: Chromium fired `beforeinstallprompt`, so promptInstall() shows the native dialog
//  - showIOSHint: Safari on iOS has no prompt; visitors must use Share → "Add to Home Screen"
//  - installed: already running as an installed app, so hide every install UI
export const useInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [installed, setInstalled] = useState(isStandalone);
  const [ios] = useState(isIOS);

  useEffect(() => {
    const handleBeforeInstall = (e) => {
      e.preventDefault(); // keep the event so our own button can trigger it
      setDeferredPrompt(e);
    };
    const handleInstalled = () => {
      setInstalled(true);
      setDeferredPrompt(null);
      trackEvent("pwa_installed");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    window.addEventListener("appinstalled", handleInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  const promptInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    trackEvent("pwa_install_prompt", { outcome });
    setDeferredPrompt(null); // a prompt event can only be used once
  };

  return {
    canInstall: !installed && Boolean(deferredPrompt),
    showIOSHint: !installed && ios,
    promptInstall,
  };
};
