# pewpewjs

Space ship shooter in HTML, CSS, and JS

[![Travis](https://img.shields.io/travis/rust-lang/rust.svg)]()
![npm@v5.0.3](https://img.shields.io/npm/v/npm.svg)

### Startup & initialization

Must have:
- [`Node.JS`](https://nodejs.org/en/)
- [`git`](https://git-scm.com/)
- [`gulp`](http://gulpjs.com/): `sudo npm i -g gulp`
- [`browserify`](http://browserify.org/): `sudo npm i -g browserify`

```
git clone https://github.com/iSkore/shooterjs.git
cd shooterjs/
npm i
gulp
```

Server will start on http://localhost:8080/

### Classes

**`MMath`**

`MMath` is a class created to make calculations with different precision levels.

JavaScript's native `Math.sqrt` is the most precise way to calculate the square root of a number, but, due to the nature of the calculation, is rather slow.

Two additional algorithms are implemented to allow for faster, less precise calculations.

- `HIGH_PRECISION: h_root`
    - returns Native JavaScript `Math.sqrt`
    - Margin of error: `~0.00% ± 0`
    - Execution: `0.086ms`

- `MID_PRECISION: m_root`
    - Margin of error: `~0.538% ± 0.1`
    - Execution: `0.053ms`
    - `38.37%` faster

- `LOW_PRECISION: l_root`
    - Margin of error: `~1.65% ± 3`
    - Execution: `0.022ms`
    - `74.42%` faster
