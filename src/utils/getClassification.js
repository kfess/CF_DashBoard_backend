"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClassification = void 0;
const getClassification = (contestName) => {
    const classifications = [
        'Div. 1 + Div. 2',
        'Div. 1',
        'Div. 2',
        'Div. 3',
        'Div. 4',
        'ICPC',
        'Kotlin Heroes',
        'Global',
        'Educational',
        'Others',
    ];
    const foundClassification = classifications.find((classification) => contestName.includes(classification));
    return foundClassification || 'Others';
};
exports.getClassification = getClassification;
