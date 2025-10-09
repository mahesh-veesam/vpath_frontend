import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize("G-Z160DKYFH1");
};

// Log a pageview (send the current route)
export const logPageView = (path) => {
  ReactGA.send({ hitType: "pageview", page: path });
};