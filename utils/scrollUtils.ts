export const scrollToSection = (sectionId: string) => {
  // Check if we're in the browser environment
  if (typeof window !== "undefined") {
    const section = document.getElementById(sectionId);

    if (section) {
      // Get the navbar height to adjust the scroll position
      const navbar =
        document.querySelector("header") || document.querySelector("nav");
      const offset = navbar ? navbar.clientHeight : 80; // Default offset if navbar not found

      // Calculate the target position
      const sectionPosition = section.getBoundingClientRect().top;
      const offsetPosition = sectionPosition + window.pageYOffset - offset;

      // Scroll to the section with smooth behavior
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }
};
