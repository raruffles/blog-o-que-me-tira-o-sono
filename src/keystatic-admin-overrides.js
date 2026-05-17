if (typeof document !== 'undefined') {
  const styleId = 'keystatic-admin-overrides-style';

  function injectStyle() {
    if (document.getElementById(styleId)) {
      return;
    }

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      [data-keystatic-hidden-slug="true"] {
        display: none !important;
      }

      [data-keystatic-publish-button="true"] {
        margin-left: 12px !important;
      }
    `;

    document.head.appendChild(style);
  }

  function findSlugFieldContainer() {
    const regenerateButton = document.querySelector('button[aria-label="regenerate"]');

    if (!regenerateButton) {
      return null;
    }

    let container = regenerateButton.parentElement;

    while (container) {
      const textInputs = container.querySelectorAll('input[type="text"]');
      const regenerateButtons = container.querySelectorAll('button[aria-label="regenerate"]');

      if (textInputs.length >= 2 && regenerateButtons.length === 1) {
        return container;
      }

      container = container.parentElement;
    }

    return null;
  }

  function renameSaveButtons() {
    const saveButton = Array.from(document.querySelectorAll('button[type="submit"]')).find((button) => {
      const text = button.textContent?.trim() ?? '';
      return text === 'Save' || text === 'Salvar rascunho';
    });

    if (!saveButton) {
      return;
    }

    saveButton.textContent = 'Salvar rascunho';

    if (!document.querySelector('[data-keystatic-publish-button="true"]')) {
      const publishButton = document.createElement('button');
      publishButton.type = 'button';
      publishButton.textContent = 'Postar';
      publishButton.className = saveButton.className;
      publishButton.setAttribute('data-keystatic-publish-button', 'true');
      publishButton.addEventListener('click', () => {
        saveButton.click();
      });

      saveButton.insertAdjacentElement('afterend', publishButton);
    }
  }

  function applyOverrides() {
    if (!location.pathname.startsWith('/keystatic')) {
      return;
    }

    injectStyle();

    const slugContainer = findSlugFieldContainer();

    if (slugContainer) {
      slugContainer.setAttribute('data-keystatic-hidden-slug', 'true');
    }

    renameSaveButtons();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyOverrides, { once: true });
  } else {
    applyOverrides();
  }

  const observer = new MutationObserver(() => {
    applyOverrides();
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
}