"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Problem = void 0;
class Problem {
    constructor({ contestId, index, name, type, tags, contestName, classification, problemsetName, points, rating, solvedCount, }) {
        this.contestId = contestId;
        this.contestName = contestName;
        this.index = index;
        this.name = name;
        this.type = type;
        this.tags = tags;
        this.classification = classification;
        this.problemsetName = problemsetName;
        this.points = points;
        this.rating = rating;
        this.solvedCount = solvedCount;
    }
}
exports.Problem = Problem;
