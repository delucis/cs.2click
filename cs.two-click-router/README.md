# The Perfect Audio Router for a Modular System?

## What/why?

Audio routing in a context that involves even a moderate number of potential nodes can get messy very quickly. Matrices that map inputs and outputs become unreadable with just a handful of rows and columns, while input/output selection embedded within modules degenerates into a stream of potentially tens of clicks to get your basic routing set up. The aim here is to build a better way of routing, designed for speed, ease, and clarity, hopefully making on-the-fly routing a less tedious experience. The inspiration is the two-click pattern used in [Ableton Live](https://www.ableton.com/), where the first click indicates one end of a signal flow and the second the other (HT @delta-6400).

## To build

### GUI components

* **channel number setter**
  * sets `module.in-chan-num` and/or `module.out-chan-num`
* **input selector**
  * reacts to `module.in-chan-num`
  * reacts to first mousedownup on other modules’ outputs
* **output selector**
  * reacts to `module.out-chan-num`
  * reacts to first mousedownup on other modules’ inputs
* **network visualiser**
  * [speculative] draws visualisation of routing network using central dictionary

### Management components

* **send~ manager**
  * handles messages from output selector (and handles correct number of channels)
  * fades between `[send~]`s to avoid clicks
* **receive~ manager**
  * handles messages from input selector (and handles correct number of channels)
  * fades between `[receive~]`s to avoid clicks
* **central dictionary**
  * keeps track of all connections
* **mouse watcher**
  * keeps track of click activity

### Data

#### module-specific
* `module.in-chan-num` — can be set graphically or predetermined on a module by module basis
* `module.out-chan-num` — can be set graphically or predetermined on a module by module basis
* `module.in~[n]` — input slots where n ≤ `module.in-chan-num`
* `module.out~[n]` — output slots where n ≤ `module.out-chan-num`

#### global
* `global.mouse` — collection of mouse data including position and click detection
* `global.origin` — stored first mousedownup selection
* `global.destination` — stored second mousedownup selection

### Methods

* first mousedownup selects module out-/input and holds it
* second mousedownup binds two modules together
* holding shift during second mousedownup permits continued routing of initially selected module (like Max patch cords)
