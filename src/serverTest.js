import Server from './server';

const mockTasks = {
    '0': {
        '0': { lessonLocation: '6', lessonName: 'luilw' },
        '1': { lessonLocation: '7', lessonName: '67i67' },
        '2': { lessonName: 'tyj' },
        '3': { lessonName: 'tyjtyj' }
    },
    '1': {
        '0': { lessonName: 'Лит. чит.' },
        '1': { lessonName: 'Матем.' },
        '2': { lessonName: 'Англ. яз.' },
        '3': { lessonName: 'Укр. мова' },
        '4': { lessonName: 'Обр. мист.' }
    },
    '2': {
        '0': { lessonLocation: '5', lessonName: 'Русск. яз.' },
        '1': { lessonLocation: '5', lessonName: 'Матем.' },
        '2': { lessonLocation: '5', lessonName: 'Укр. мова' },
        '3': { lessonLocation: '5', lessonName: 'Информ.' },
        '4': { lessonLocation: '5', lessonName: 'Музыка' }
    },
    '3': {
        '0': { lessonName: 'Физ-ра' },
        '1': { lessonName: 'Лит. чит.' },
        '2': { lessonName: 'Укр. мова' },
        '3': { lessonName: 'Англ. яз' },
        '4': { lessonName: 'Осн. зд.' }
    },
    '4': {
        '0': { lessonName: 'Лит. чит.' },
        '1': { lessonName: 'Матем.' },
        '2': { lessonName: 'Природа' },
        '3': { lessonName: 'Я у світі' },
        '4': { lessonName: 'Труд' }
    }
};

const s = new Server();
console.log(s.currentWeekPage(mockTasks));
