# A Tiny Node Modular Synth
This is a very basic modular synth I made that's configured with yaml files. You can call it via:
```
node index.js somefile.yml
```

Check out the examples folder.

## Installation Help
`npm install` may fail on your machine, due to [sound library configuration required by the `speaker` module](https://github.com/TooTallNate/node-speaker#audio-backend-selection).
In short, you may have to change you npm install to something like `npm install --mpg123-backend=openal` or `npm install --mpg123-backend=coreaudio` depending or your system.
