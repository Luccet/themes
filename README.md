# Luccet themes

Luccet CSS color themes.

## Loading them

List [`classic.css`](classic.css), then a color theme, in a note's `data-use` (or `:::use`):

```html
<script src="luccet.js" data-use="https://cdn.luccet.dev/themes/v1/classic.css https://cdn.luccet.dev/themes/v1/nord.css"></script>
```

`v1/` is the newest 1.x release, checked for a newer one every hour; a release's own folder, such as `v1.0.0/`, never changes, and browsers keep it a year. jsDelivr serves the same tags (`https://cdn.jsdelivr.net/gh/Luccet/themes@1/nord.css`), and a copy next to the note works too.

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

## Your own theme

Copy a file and change its values. To add a color theme here, add its palette to `build.js`; [`classic.css`](classic.css) is written by hand. Then:

```sh
node build.js   # writes the color themes and the table above
node test.js    # the modes, contrast and prefers-contrast checks, classic.css's too
```

`npm test` runs `node build.js --check` and `node test.js`, as CI does.

## License and credits

MIT ([LICENSE](LICENSE)). The palettes are their authors': each file and the table name and link the original. The themes adapt them to Luccet's color properties, with colors raised where they fall short of the contrast above.
