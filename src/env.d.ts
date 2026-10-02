declare namespace App {
  interface Locals {
    /** Icon ids already emitted as <symbol> on the page being rendered (see components/ui/Icon.astro). */
    iconSprite?: Set<string>;
  }
}
