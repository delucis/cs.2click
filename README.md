# cs.2click

A Better Audio Router for a Modular System.

## What/why?

Audio routing in a context that involves even a moderate number of potential nodes can get messy very quickly. Matrices that map inputs and outputs become unreadable with just a handful of rows and columns, while input/output selection embedded within modules degenerates into a stream of potentially tens of clicks to get your basic routing set up. The aim here is to build a better way of routing, designed for speed, ease, and clarity, hopefully making on-the-fly routing a less tedious experience. The inspiration is the two-click pattern used in [Ableton Live](https://www.ableton.com/), where the first click indicates one end of a signal flow and the second the other (HT [Sam Wolk](https://github.com/delta-6400)).

## Functionality

![cs.2click animated demo](http://www.chrisswithinbank.net/wp-content/uploads/2015/04/cs2click-example-2.gif)

A simple interface of in- and output slots are provided by `[bpatcher]` modules `cs.2click-inputs` and `cs.2click-outputs`. These modules require a unique string as their first argument, naming the module. An optional second argument sets the number of slots that are available (between 1 and 8). If no second argument is provided, the modules default to a single slot.

Routing pairs are stored in a global dictionary named `cs.2click-routing-pairs`. This permits easy routing not only within a single Max patch, but also between patches.

The [README.maxpat](examples/README.maxpat) demonstrates basic functionality and also includes some information on getting up and running.

### Preset storage & recall

An additional abstraction `[cs.2click-presets]` permits you to store numbered presets and recall them by sending a preset’s index number. An argument provided to `[cs.2click-presets]` sets a filename to which you can save your preset (as a JSON file) and it will automatically try to load that file when the patch is opened. A “save” message will write your current presets to disk (in the same directory as the patch containing the abstraction).

This mechanism is built on a central `[dict]` object, which contains the stored presets. Messages whose meaning is not defined by the abstraction (`store`, `save`, `storagewindow`, `storage_close`, integers/floats) are passed on to this `[dict]`, permitting direct communication if desired. For example, using Max’s standard import/export messages one can load and save preset files that are not in the same directory as your patch.

Point 6 in the README.maxpat demonstrates the basic preset capabilities, and the [readme-presets.json](examples/readme-presets.json) file contains some example presets.

## Installation

Download the [latest release](https://github.com/delucis/cs.2click/releases/latest), to your Max packages folder. You can find this under `~/Documents/Max/Packages` for Max 6 or `~/Documents/Max 7/Packages` for Max 7.

I’d highly recommend using Nathanaël Léclaudé’s [Max Package Downloader](https://github.com/natcl/max_package_downloader) to help stay up-to-date with new version releases.

## Compatibility

These modules have been tested with Max 6 and 7. They will not work with Max/MSP 5 or lower. Please report bugs under the issues tab above.

## License

This software is free to use, modify, and redistribute under a [GNU General Public License](http://www.gnu.org/licenses/gpl-3.0.txt).
