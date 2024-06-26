# Iosevka Custom build plan

This build plan includes only glyphs `U+0000-036F` to reduce the filesize of font files (which are much larger than normal for the web, but I _really_ like it).

Font files are stored as [public assets](../../public/assets/IosevkaCustom@30.3.0/) with a custom stylesheet for loading.

## Usage

To rebuild the font files for any reason, replicate the process:

1. [Import/customise as necessary](https://typeof.net/Iosevka/customizer)
2. [Make any further changes by hand in the generated TOML](https://github.com/be5invis/Iosevka/blob/main/doc/custom-build.md)
3. Install the Iosevka repository and dependencies, using the instructions in the link above
4. Execute `npm run build webfont-unhinted::IosevkaCustom`
5. Execute `cp dist/IosevkaCustom/WOFF2-Unhinted/*.woff2 <project-root>/public/assets/IosevkaCustom@30.3.0`

When excluding glyphs, [codepoints.net](https://codepoints.net/basic_multilingual_plane) is a helpful reference. [Convert the hexadecimal values to decimal](https://www.rapidtables.com/convert/number/hex-to-decimal.html) for use in TOML.

> Note: the font directory is named for the [latest version at the time of writing](https://github.com/be5invis/Iosevka/releases/tag/v30.3.0) and should be updated as applicable if the font files are rebuilt in future.

## Issues

This solution is work in progress, mainly because font files are quite large. I have already taken some steps to reduce client-side impact:

- Removed glyphs outside the main latin range, since I don't use them
- Used unhinted font files, which causes console warnings (`downloadable font: maxp: Bad maxZones: 0`) but reduces file size noticeably
- [Deferred loading font stylesheet](https://stackoverflow.com/a/65076370) to prioritise other resources

There may be opportunity for further optimisation, but for now I'm happy especially since all other resources are so lightweight.
