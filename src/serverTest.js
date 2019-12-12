import Server from './server';

const mockTasks = [
    [
        {
            lessonName: 'a',
            taskText: 'b'
        }
    ]
];

const s = new Server();
s.mainPage(mockTasks);
