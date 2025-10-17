// Custom hook to handle Calendly integration
export const useCalendly = () => {
  // Function to open Calendly popup
  const openCalendlyPopup = () => {
    if (typeof window !== 'undefined' && window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/contact-real-sales/30min?primary_color=5b5b5b'
      });
    }
  };

  return {
    openCalendlyPopup
  };
};

export default useCalendly;
