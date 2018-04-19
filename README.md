# A Tiny Node Modular Synth
This is a very basic modular synth I made that's configured with yaml files. You can call it via:
```
npm start path/to/file.yml
```

There's some examples in the `examples` folder, which you can try out via:
```
npm start examples/chords.yml
```

Moreover, there's a way to draw the node graph, if you'd like:
```
npm test examples/chords.yml
```

This can be helpful for building your own things and testing them out.

## Configuring the Synth
The synth is configured with a YAML file, that is passed as the first argument to the script.
It consists of three sections: `nodes`, `values`, and `connections`.

### Nodes
`nodes` allows you declare nodes and assign them names for later use.
An example section might look something like this
```yaml
nodes:
  osc1: Oscillator
  osc2: Oscillator
  chord: Sequencer
  lfo: Oscillator
```
You can then reference those nodes by name in later sections

### Values
The `values` section allows you to assign constant values to properties of a node.
For instance, an oscillator can be created to have a constant frequency
```yaml
values:
  osc1.carrier: 220
  osc2.carrier: 440
```

### Connections
The `connections` section allows you to provide the dynamic portions of the synthesizer and connect nodes you've previously declared.
For instance, you can connect the above sequencer to the first oscillator, then connect that oscillator to the speaker
```yaml
connections:
    chord: osc1.carrier
    os1: speaker.input
```

The examples folder also provides some sample configuration files for creating various sounds.

## Available Node Types
There are multiple node types available, and all of them have a predefined set of inputs and a single output.

### Oscillator
The Oscillator node provides a simple sine or square oscillator. Setting `carrier` defines it's frequency, and `amplitude` the amplitude.
`waveform` is a string value set to either `"sine"` or `"square"` which will change the waveform.

### LowPassFilter
The LowPassFilter implements a basic low pass filter. It has two parameters: `filterWidth` a number which, when higher, lowers the cutoff frequency and `input`, the input to filter.

### Noise
The noise node implements random noise, with no inputs.

### Sequencer
The sequencer node will loop over an array of values periodically and emit those as values.
Its first input parameter is `sequence`, an array of values to emit.
Its second is `length` which denotes how long to stay on a given value before moving to the next one.

### Adder
The adder node adds its two inputs `input1` and `input2` and provides the sum as it's output

### Multiplier
The multiplier node multiplies its two inputs `input1` and `input2` and provides the sum as it's output

### Envelope
The envelope node provides an [ADSR Envelope](https://en.wikipedia.org/wiki/Synthesizer). You can set a couple of inputs:
- `attack` the attack time of the envelope
- `decay` the decay time of the envelope
- `sustain` the sustain level of the envelope
- `release` the release time of the envelope
- `trigger` should be a `1` or a `0` triggering the envelope to start. For instance, if the envelope is silenced,
   setting `trigger` to 1 will start the envelope. It will attack, then decay, and wait at sustain until a `trigger` of
  0 is encountered, upon which it will because the release process.

## Installation Help
`npm install` may fail on your machine, due to [sound library configuration required by the `speaker` module](https://github.com/TooTallNate/node-speaker#audio-backend-selection).
In short, you may have to change you npm install to something like `npm install --mpg123-backend=openal` or `npm install --mpg123-backend=coreaudio` depending or your system.
