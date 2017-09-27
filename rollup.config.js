export default {
  input: 'dist/index.js',
  output: {
    file: 'dist/bundles/ngmodaldialog.umd.js',
    format: 'umd'
  },
  sourceMap: false,
  name: 'ng.modal.dialog',
  globals: {
    '@angular/core': 'core',
    'rxjs/Rx': 'Rx'
  },
  external: [
    '@angular/core', 'rxjs/Rx'
  ]
}