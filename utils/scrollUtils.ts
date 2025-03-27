export const scrollToSection = (sectionId: string) => {
  // Check if we're in the browser environment
  if (typeof window !== "undefined") {
    // Add a small delay to ensure any state updates have completed
    setTimeout(() => {
      const section = document.getElementById(sectionId);

      if (section) {
        // Get the navbar height to adjust the scroll position
        const navbarHeight = 80; // Should match the height value in Navbar component

        // Calculate the target position
        const sectionPosition = section.getBoundingClientRect().top;
        const offsetPosition =
          sectionPosition + window.pageYOffset - navbarHeight - 20; // Extra 20px padding

        // Scroll to the section with smooth behavior
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 100);
  }
};
