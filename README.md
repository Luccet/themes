# Luccet themes

Colour themes for [Luccet](https://luccet.dev) after well-known editor palettes. A theme is a stylesheet add-on: list it in `data-use` and the note takes its colours, code colours included.

```html
<!doctype html><meta charset="utf-8"><script src="luccet.js" data-use="https://cdn.jsdelivr.net/gh/Luccet/themes@1/nord.css"></script>
```

Pin a release (`@v1.0.0`) to be sure; `@1` follows every release of this major. A copy next to your note works the same: `data-use="themes/nord.css"`.

## The themes

<!-- themes -->
| Theme | Files | Modes | After |
|---|---|---|---|
| Catppuccin | [`catppuccin.css`](catppuccin.css), [`catppuccin-light.css`](catppuccin-light.css), [`catppuccin-dark.css`](catppuccin-dark.css) | light and dark | [Catppuccin Latte (light) and Mocha (dark)](https://catppuccin.com/palette) |
| Dracula | [`dracula.css`](dracula.css) | dark | [Dracula](https://draculatheme.com) |
| Everforest | [`everforest.css`](everforest.css), [`everforest-light.css`](everforest-light.css), [`everforest-dark.css`](everforest-dark.css) | light and dark | [sainnhe's Everforest (medium)](https://github.com/sainnhe/everforest) |
| GitHub | [`github.css`](github.css), [`github-light.css`](github-light.css), [`github-dark.css`](github-dark.css) | light and dark | [GitHub's Primer colours](https://primer.style/foundations/color) |
| Gruvbox | [`gruvbox.css`](gruvbox.css), [`gruvbox-light.css`](gruvbox-light.css), [`gruvbox-dark.css`](gruvbox-dark.css) | light and dark | [Pavel Pertsev's gruvbox](https://github.com/morhetz/gruvbox) |
| High contrast | [`high-contrast.css`](high-contrast.css), [`high-contrast-light.css`](high-contrast-light.css), [`high-contrast-dark.css`](high-contrast-dark.css) | light and dark | black and white, for low vision |
| Kanagawa | [`kanagawa.css`](kanagawa.css) | dark | [rebelot's Kanagawa (wave)](https://github.com/rebelot/kanagawa.nvim) |
| Monokai | [`monokai.css`](monokai.css) | dark | [Wimer Hazenberg's Monokai](https://monokai.nl) |
| Nord | [`nord.css`](nord.css) | dark | [Arctic Ice Studio's Nord](https://www.nordtheme.com) |
| One | [`one.css`](one.css), [`one-light.css`](one-light.css), [`one-dark.css`](one-dark.css) | light and dark | [Atom's One Light and One Dark](https://github.com/atom/atom/tree/master/packages/one-dark-syntax) |
| Rosé Pine | [`rose-pine.css`](rose-pine.css), [`rose-pine-light.css`](rose-pine-light.css), [`rose-pine-dark.css`](rose-pine-dark.css) | light and dark | [Rosé Pine Dawn (light) and Rosé Pine (dark)](https://rosepinetheme.com/palette/) |
| Sepia | [`sepia.css`](sepia.css) | light | the warm paper of e-readers |
| Solarized | [`solarized.css`](solarized.css), [`solarized-light.css`](solarized-light.css), [`solarized-dark.css`](solarized-dark.css) | light and dark | [Ethan Schoonover's Solarized](https://ethanschoonover.com/solarized/) |
| Tokyo Night | [`tokyo-night.css`](tokyo-night.css), [`tokyo-night-light.css`](tokyo-night-light.css), [`tokyo-night-dark.css`](tokyo-night-dark.css) | light and dark | [Tokyo Night Day (light) and Night (dark)](https://github.com/folke/tokyonight.nvim) |
<!-- /themes -->

- **A theme with both modes has three files.** `NAME.css` follows the reader's system setting, as luccet.css does. `NAME-light.css` and `NAME-dark.css` give every reader one palette. A theme with one mode is one file, the same for every reader.
- **Colours only.** A theme sets luccet.css's colour properties and `color-scheme`, the code colours included, after the original theme's syntax colours. Fonts, sizes and the column width stay luccet.css's ([custom properties](https://luccet.dev/docs/schema.html#custom-properties)).
- **Your CSS still wins.** A theme cascades after luccet.css and before your own styles: set a property yourself to change one colour of a theme.
- **Readable.** Every text colour has at least 4.5:1 contrast against what it is drawn on (WCAG AA), and 7:1 in High contrast; code colours too, on the code background, and 3:1 on a highlighted line (4.5:1 in High contrast); a control's border (`--t-line-strong`) 3:1 against the page. Where a palette's own colour falls short, the theme darkens or lightens it until it passes, and the first lines of the file name those colours. A highlight keeps the palette's yellow hue, and text in it is the text colour, so muted text and links stay readable on it.
- **More contrast, forced colours.** For a reader who asks for more contrast (`prefers-contrast: more`), muted text takes the text colour and rules the strong line. Under forced colours (a Windows high-contrast theme), every property takes the system's colour, as luccet.css does.
- **Print.** A theme prints as luccet.css does: black on white.

## Which Luccet

The themes set luccet.css's `--t-*` colour properties, which Luccet 2 has, as Tern 1 did before the rename. They are built against a copy of the engine's stylesheet, `engine/luccet.css`, from which they take the print palette and the forced-colors block.

## Your own theme

Copy a file and change its values. To add one here, add its palette to `build.js`, then:

```sh
node build.js   # writes the stylesheets and the table above
node test.js    # the modes, print, contrast and forced-colors checks
```

`npm test` runs `node build.js --check` and `node test.js`, as CI does.

To follow a new release of the engine, replace `engine/luccet.css` with its stylesheet and rebuild:

```sh
curl -fo engine/luccet.css https://cdn.jsdelivr.net/gh/Luccet/luccet@vX.Y.Z/luccet.css
node build.js && node test.js
```

## Licence and credits

MIT ([LICENSE](LICENSE)). The palettes are their authors': each file and the table name and link the original. The themes adapt them to Luccet's colour properties, with colours raised where they fall short of the contrast above.
