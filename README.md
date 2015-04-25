# A Better Audio Router for a Modular System

## What/why?

Audio routing in a context that involves even a moderate number of potential nodes can get messy very quickly. Matrices that map inputs and outputs become unreadable with just a handful of rows and columns, while input/output selection embedded within modules degenerates into a stream of potentially tens of clicks to get your basic routing set up. The aim here is to build a better way of routing, designed for speed, ease, and clarity, hopefully making on-the-fly routing a less tedious experience. The inspiration is the two-click pattern used in [Ableton Live](https://www.ableton.com/), where the first click indicates one end of a signal flow and the second the other (HT [Sam Wolk](https://github.com/delta-6400)).

## Functionality

![cs.2click animated demo](http://www.chrisswithinbank.net/wp-content/uploads/2015/04/cs2click-example-2.gif)

A simple interface of in- and output slots are provided by `[bpatcher]` modules `cs.2click-inputs` and `cs.2click-outputs`. These modules require a unique string as their first argument, naming the module. An optional second argument sets the number of channels that are available (between 1 and 8). If no second argument is provided, the modules default to 8 channels.

Routing pairs are stored in a global dictionary named `cs.2click-routing-pairs`.

The inputs module contains a `[receive~]` mechanism that will permit you to get audio from an outputs module, which contains an equivalent `[send~]` mechanism.

The [README.maxpat](README.maxpat) explains the basic functionality and also includes some information on getting up and running.

**For preset storage possibilities see point 6 in the README.maxpat**


