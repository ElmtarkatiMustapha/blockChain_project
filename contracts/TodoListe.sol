// pragma solidity ^0.5.16;

// contract TodoListe {
//     uint public taskCount = 0;

//     struct Task {
//         uint id;
//         string content;
//         bool completed;
//     }

//     mapping(uint => Task) public tasks;

//     constructor() public {
//         createTask("Check out dappuniversity.com");
//     }

//     event TaskCreated(uint id, string content, bool completed);

//     function createTask(string memory _content) public {
//         taskCount++;
//         tasks[taskCount] = Task(taskCount, _content, false);
//         emit TaskCreated(taskCount, _content, false);
//     }

//     function toggleCompleted(uint _taskId) public {
//         Task memory _task = tasks[_taskId];
//         _task.completed = !_task.completed;
//         tasks[_taskId] = _task;
//     }
// }
