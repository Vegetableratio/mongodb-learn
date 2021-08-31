const async = require('async');
const tasks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const queue = async.queue((task, completed) => {
  console.log('Currently Busy Processing Task ' + task);

  setTimeout(() => {
    const remaining = queue.length();
    completed(null, { task, remaining });
  }, 1000);
}, 5);

console.log(`Did the queue start ? ${queue.started}`);

tasks.forEach(task => {
  queue.push(task, (error, { task, remaining }) => {
    if (error) {
      console.log(`An error occurred while processing task ${task}`);
    } else {
      console.log(`Finished processing task ${task}. ${remaining} tasks remaining`);
    }
  });
});
queue.drain(() => {
  console.log('Successfully processed all items');
});
console.log(`Did the queue start ? ${queue.started}`);
