import gulp from 'gulp';
import { path } from './gulp/config/path.js';
import { plugins } from './gulp/config/plugins.js';

global.app = {
  path: path,
  gulp: gulp,
  plugins: plugins,
};

import { copy } from './gulp/tasks/copy.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { server } from './gulp/tasks/server.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { images } from './gulp/tasks/images.js';
import { favicon } from './gulp/tasks/favicon.js';
import { otfToTtf, ttfToWoff, fonstStyle } from './gulp/tasks/fonts.js';
import { sprite } from './gulp/tasks/sprite.js';
import { videos } from "./gulp/tasks/videos.js";

function watcher() {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
  gulp.watch(path.watch.video, videos);
  gulp.watch(path.watch.favicon, favicon);
}

export { sprite };

const fonts = gulp.series(otfToTtf, ttfToWoff, fonstStyle);

const mainTasks = gulp.series(
  fonts,
  gulp.parallel(copy, html, scss, js, images, videos, favicon, sprite)
);

const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);

gulp.task('default', dev);
gulp.task('build', build);
