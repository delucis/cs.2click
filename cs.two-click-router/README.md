# The Perfect Audio Router for a Modular System?

## What/why?

Audio routing in a context that involves even a moderate number of potential nodes can get messy very quickly. Matrices that map inputs and outputs become unreadable with just a handful of rows and columns, while input/output selection embedded within modules degenerates into a stream of potentially tens of clicks to get your basic routing set up. The aim here is to build a better way of routing, designed for speed, ease, and clarity, hopefully making on-the-fly routing a less tedious experience. The inspiration is the two-click pattern used in [Ableton Live](https://www.ableton.com/), where the first click indicates one end of a signal flow and the second the other (HT [Sam Wolk](https://github.com/delta-6400)).

## Current Functionality

A simple interface of in- and output slots are provided by `[bpatcher]` modules `cs.2click-inputs` and `cs.2click-outputs`. These modules require a unique string as their first argument, naming the module. An optional second argument sets the number of channels that are available (between 1 and 8). If no second argument is provided, the modules default to two channels.

Routing pairs are stored in a global dictionary named `cs.2click-routing-pairs`.

**Currently, these do not yet communicate with an audio send–receive mechanism.**
