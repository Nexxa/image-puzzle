let module = {
  update: update,
  sub   : sub
};

// Exports
// -------
export default module;

// Public methods
// --------------
function update(value) {
  state.push(value);

  return check();
}

function sub(cb) {
  subscribers.push(cb);

  return module;
}

// Private properties
// ------------------
let state = [];
let subscribers = [];

// Private methods
// ---------------
function check() {
  if (state.length < 2) {
    return;
  }

  if (state[0] === state[1]) {
    state.pop();

    return;
  }

  return pub();
}

function pub() {
  subscribers.forEach(cb => cb(state));

  state = [];
}
