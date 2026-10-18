import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

// Embedded mode for the TalkyHub app's help panel (the page is shown in an iframe). The inline <head> script
// in docusaurus.config.ts sets the flag before the first paint; this keeps it on across client-side
// navigations, in case anything rewrites <html> attributes. CSS: `html[data-th-embed]` in src/css/custom.css.
function isEmbedded(): boolean {
  try {
    return window.self !== window.top || /[?&]embed=1(&|$)/.test(window.location.search);
  } catch {
    return true; // cross-origin parent access throws — that means we're framed
  }
}

export function onRouteDidUpdate(): void {
  if (ExecutionEnvironment.canUseDOM && isEmbedded()) {
    document.documentElement.setAttribute('data-th-embed', '');
  }
}
