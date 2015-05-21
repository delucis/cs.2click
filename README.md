# cs.2click

A Better Audio Router for a Modular System.

## What/why?

Audio routing in a context that involves even a moderate number of potential nodes can get messy very quickly. Matrices that map inputs and outputs become unreadable with just a handful of rows and columns, while input/output selection embedded within modules degenerates into a stream of potentially tens of clicks to get your basic routing set up. The aim here is to build a better way of routing, designed for speed, ease, and clarity, hopefully making on-the-fly routing a less tedious experience. The inspiration is the two-click pattern used in [Ableton Live](https://www.ableton.com/), where the first click indicates one end of a signal flow and the second the other (HT [Sam Wolk](https://github.com/delta-6400)).

## Functionality

![cs.2click animated demo](http://www.chrisswithinbank.net/wp-content/uploads/2015/04/cs2click-example-2.gif)

A simple interface of in- and output slots are provided by `[bpatcher]` modules `cs.2click-inputs` and `cs.2click-outputs`. These modules require a unique string as their first argument, naming the module. An optional second argument sets the number of channels that are available (between 1 and 8). If no second argument is provided, the modules default to 8 channels.

Routing pairs are stored in a global dictionary named `cs.2click-routing-pairs`.

The inputs module contains a `[receive~]` mechanism that will permit you to get audio from an outputs module, which contains an equivalent `[send~]` mechanism.

The [README.maxpat](README.maxpat) demonstrates basic functionality and also includes some information on getting up and running.

### Preset storage & recall

An additional abstraction `[cs.2click-presets]` permits you to store numbered presets and recall them by sending a preset’s index number. An argument provided to `[cs.2click-presets]` sets a filename to which you can save your preset (as a JSON file) and it will automatically try to load that file when the patch is opened. A “save” message will write your current presets to disk.

Point 6 in the README.maxpat demonstrates these capabilities. The [readme-presets.json](readme-presets.json) file contains some example presets.

## Compatibility

These modules have been tested with Max 6 and 7. They will not work with Max/MSP 5 or lower. Please report bugs under the issues tab above.

## License

This software is free to use, modify, and redistribute under a [GNU General Public License](http://www.gnu.org/licenses/gpl-3.0.txt).
