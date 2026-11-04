import ReactGA from "react-ga4";

const GA_ID = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;

export const initAnalytics = () => {
  if (!GA_ID) return;
  ReactGA.initialize(GA_ID);
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
};

// No-op when GA isn't configured, so callers never need to check.
export const trackEvent = (name, params = {}) => {
  if (!GA_ID) return;
  ReactGA.event(name, params);
};

export const trackResumeDownload = (location) =>
  trackEvent("resume_download", { location });

export const trackOutboundClick = (label, url) =>
  trackEvent("outbound_click", { label, url });
