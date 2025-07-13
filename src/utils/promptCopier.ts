/**
 * Utility functions for copying prompts to clipboard
 */

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    // Modern clipboard API
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers or non-secure contexts
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);
      return successful;
    }
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);
    return false;
  }
};

export const copyPromptWithNotification = async (
  prompt: string,
  onSuccess?: () => void,
  onError?: () => void
): Promise<void> => {
  const success = await copyToClipboard(prompt);

  if (success) {
    onSuccess?.();
  } else {
    onError?.();
  }
}; 